import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined, ReceiptLong } from "@mui/icons-material";
import { Box, Card, CardContent, Container, Divider, Typography, Stack, Button, Grid, LinearProgress, Fab, SvgIcon } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { AlertContext, ServiceContext, UserContext } from "../../context";
import { getSymbol } from "../../modal/CurrencyType";
import { AlertType } from "../../modal/ExpenseAlert";
import { ExpenseMenuLink } from "../../modal/MenuLink";
import { OperationType } from "../../modal/OperationType";
import { ApiError } from "../../modal/response/Error";
import { Expenditure, ExpenditureType } from "../../modal/response/Expenditure";
import { ExpenditureSummary } from "../../modal/response/ExpenditureSummary";
import InfoCardComponent from "../Card/InfoCard";
import ContentLoader from "../ContentLoader";
import ExpenditureCard from "./card";
import ExpenditureForm from "./expenditureForm";
import TimeDialog from "./timeDialog";

export default function ExpenditureComponent() {

    const [loader, setLoader] = useState<boolean>(false);

    const [summaryLoader, setSummaryLoader] = useState<boolean>(false);

    const [deleteLoader, setDeleteLoader] = useState<boolean>(false);

    const [selectDate, setSelectDate] = useState<Date>(new Date());

    const [openYearDialog, setOpenYearDialog] = useState<boolean>(false);

    const [openMonthDialog, setOpenMonthDialog] = useState<boolean>(false);

    const [openExpenditureDialog, setOpenExpenditureDialog] = useState<boolean>(false);

    const [operationType, setOperationType] = useState<OperationType>(OperationType.ADD);

    const [expenditures, setExpenditures] = useState<Expenditure[]>([]);

    const [viewExpenditure, setViewExpenditure] = useState<Expenditure>();

    const service = useContext(ServiceContext);

    const expenseAlert = useContext(AlertContext);

    const [totalExpenseRangeDate, setTotalExpenseRangeDate] = useState<number>(0);

    const [totalRevenueRangeDate, setTotalRevenueRangeDate] = useState<number>(0);

    const [totalExpenseRangeMonth, setTotalExpenseRangeMonth] = useState<number>(0);

    const [totalRevenueRangeMonth, setTotalRevenueRangeMonth] = useState<number>(0);

    const user = useContext(UserContext);

    const handleOnSelect = (date: Date) => {
        setSelectDate(date);
    }

    useEffect(() => {
        setLoader(true);
        service.expenditureService?.fetchExpenditureByDateRange(moment(selectDate).format('DD-MM-yyyy'), moment(selectDate).add(5, 'days').format('DD-MM-yyyy'), user.profile?.selectedCurrency)
            .then((res: Expenditure[]) => {
                setExpenditures(res);
                let totalExpense = 0;
                let totalRevenue = 0;
                res.filter((expenditure: Expenditure) => expenditure.type === ExpenditureType.EXPENSE).
                    forEach((expenditure: Expenditure) => {
                        totalExpense += expenditure.localeCurrency;
                    });
                res.filter((expenditure: Expenditure) => expenditure.type === ExpenditureType.REVENUE).
                    forEach((expenditure: Expenditure) => {
                        totalRevenue += expenditure.localeCurrency;
                    })
                setTotalRevenueRangeDate(totalRevenue);
                setTotalExpenseRangeDate(totalExpense);
            }).catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            }).finally(() => {
                setLoader(false);
            });
    }, [service, selectDate, user.profile?.selectedCurrency])

    useEffect(() => {
        setSummaryLoader(true);
        service.expenditureService?.fetchExpenditureSummary(moment(selectDate).format("MM"), moment(selectDate).format("YYYY"), user.profile?.selectedCurrency)
            .then((res: ExpenditureSummary[]) => {
                res.forEach((expenditureSummary: ExpenditureSummary) => {
                    if(expenditureSummary.type === ExpenditureType.EXPENSE){
                        setTotalExpenseRangeMonth(expenditureSummary.amount);
                    } else if(expenditureSummary.type === ExpenditureType.REVENUE) {
                        setTotalRevenueRangeDate(expenditureSummary.amount);
                    }
                })
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() =>{
                setSummaryLoader(false);
            })
    }, [moment(selectDate).format("MM"), moment(selectDate).format("YYYY"), user.profile?.selectedCurrency]);

    const handleExpenditure = (expenditure: Expenditure) => {
        if (operationType === OperationType.ADD) {
            const newExpenditures = [...expenditures, expenditure];
            setExpenditures(newExpenditures);
        } else {

        }
    }

    const habdleOnDelete = (expenditure: Expenditure) => {
        setDeleteLoader(true);
        service.expenditureService?.deleteExpenditureService(expenditure.id)
            .then(() => {
                const fetchIndex: number = expenditures.findIndex((loopExpenditure: Expenditure) => loopExpenditure.id === expenditure.id);
                if (fetchIndex !== -1) {
                    expenditures.splice(fetchIndex, 1);
                }
                setExpenditures(expenditures);
                expenseAlert.setAlert?.('Expenditure deleted successfully', AlertType.SUCCESS);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
            .finally(() => {
                setDeleteLoader(false);
            })
    }

    const handleOnView = (expenditure: Expenditure) => {
        setViewExpenditure(expenditure);
        setOperationType(OperationType.EDIT);
        setOpenExpenditureDialog(true);
    }

    return (
        <>
            {loader && <ContentLoader heading={`Loading Expenditure`}>
            </ContentLoader>}
            {deleteLoader && <ContentLoader heading={`Deleting Expenditure`}>
            </ContentLoader>}
            <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                <Typography sx={{ marginBottom: '24px' }} variant="h4" letterSpacing={2}>
                    <Stack direction={'row'} spacing={2}>
                        <SvgIcon component={ExpenseMenuLink.icon} fontSize={'large'} />
                        <span>{ExpenseMenuLink.title}</span>
                    </Stack>
                </Typography>
                <Grid container spacing={2}>
                    <InfoCardComponent header="Total Expense" loader={summaryLoader} secondaryText={`Month : ${moment(selectDate).format('MMMM')}`} value={totalExpenseRangeMonth.toFixed(2)} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={red[700]} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue" loader={summaryLoader} secondaryText={`Month : ${moment(selectDate).format('MMMM')}`} value={totalRevenueRangeMonth.toFixed(2)} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={green[700]}></InfoCardComponent>
                    <InfoCardComponent header="Total Expense " loader={loader} secondaryText={`Date : ${moment(selectDate).format('DD,MMMM')} - ${moment(selectDate).add(5, 'day').format('DD,MMMM')}`} value={`${totalExpenseRangeDate.toFixed(2)}`} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={red[700]} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue " loader={loader} secondaryText={`Date : ${moment(selectDate).format('DD,MMMM')} - ${moment(selectDate).add(5, 'day').format('DD,MMMM')}`} value={`${totalRevenueRangeDate.toFixed(2)}`} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={green[700]}></InfoCardComponent>
                </Grid>
                <Card raised sx={{ marginTop: '40px', marginBottom: '40px' }}>
                    <CardContent>
                        <Stack spacing={2} direction='row' sx={{ display: 'flex' }}>
                            <Typography variant="h5">Expenditure Details</Typography>
                            <Typography variant="subtitle1" component="div">
                                Month: {moment(selectDate).format('MMM')}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                                Year: {moment(selectDate).format('yyyy')}
                            </Typography>
                            <Button sx={{ marginLeft: 'auto' }} variant="text" onClick={() => setOpenMonthDialog(true)}>
                                Select Month
                            </Button>
                            <TimeDialog
                                date={selectDate}
                                title="Select Month"
                                open={openMonthDialog}
                                onSelect={handleOnSelect}
                                onClose={() => setOpenMonthDialog(false)}
                                month={true}
                            />
                            <Button variant="text" onClick={() => setOpenYearDialog(true)}>
                                Select Year
                            </Button>
                            <TimeDialog
                                date={selectDate}
                                title="Select Year"
                                open={openYearDialog}
                                onSelect={handleOnSelect}
                                onClose={() => setOpenYearDialog(false)}
                                year={true}
                            />
                        </Stack>
                        <Divider></Divider>
                        <Stack direction={'row'} sx={{ display: 'flex' }}>
                            <Button startIcon={<KeyboardArrowLeftOutlined />} variant="text" onClick={() => setSelectDate(moment(selectDate).subtract('6', 'day').toDate())}>
                                Previous
                            </Button>
                            <Button sx={{ marginLeft: 'auto' }} endIcon={<KeyboardArrowRightOutlined></KeyboardArrowRightOutlined>} variant="text" onClick={() => setSelectDate(moment(selectDate).add('6', 'day').toDate())}>
                                Next
                            </Button>
                        </Stack>
                        <Divider />
                        <Grid container columnSpacing={0.5}>
                            {
                                [0, 1, 2, 3, 4, 5].map((index: number) => <>
                                    <Grid item xs={2}>
                                        <Card elevation={4}>
                                            {moment(selectDate).add(index, 'day').isSame(moment(new Date()), 'day') && <>
                                                <LinearProgress value={100} variant='determinate'></LinearProgress>
                                            </>}
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color={blue['700']} gutterBottom>
                                                    {moment(selectDate).add(index, 'day').format('dddd, DD/MMM')}
                                                </Typography>
                                                <Divider sx={{ marginBottom: '12px', marginTop: '12px' }} />
                                                <Box sx={{ height: '70vh', overflowY: 'scroll' }}>
                                                    {expenditures?.
                                                        filter((expenditure: Expenditure) => moment(selectDate).add(index, 'day').isSame(moment(expenditure.date), 'day'))
                                                        .length === 0 && <>
                                                            <Typography variant="caption" letterSpacing={2}  >
                                                                {`No transaction log on ${moment(selectDate).add(index, 'day').format('DD MMMM')}`}
                                                            </Typography>
                                                        </>
                                                    }

                                                    {expenditures?.
                                                        filter((expenditure: Expenditure) => moment(selectDate).add(index, 'day').isSame(moment(expenditure.date), 'day'))
                                                        .map((expenditure: Expenditure) => <>
                                                            <ExpenditureCard
                                                                expenditure={expenditure}
                                                                onDelete={habdleOnDelete}
                                                                onView={handleOnView}
                                                            ></ExpenditureCard>
                                                        </>)
                                                    }
                                                </Box>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>)
                            }


                        </Grid>
                    </CardContent>
                </Card>

            </Box>
            <ExpenditureForm
                operation={operationType}
                onClose={() => { setOpenExpenditureDialog(false); setOperationType(OperationType.ADD) }}
                show={openExpenditureDialog}
                onChange={handleExpenditure}
                defaultValue={viewExpenditure}
            ></ExpenditureForm>
            {
                !openExpenditureDialog &&
                <>
                    <Fab variant="extended" color="secondary" aria-label="add" onClick={() => setOpenExpenditureDialog(true)} sx={{ position: 'fixed', bottom: '40px', right: '24px' }}>
                        <ReceiptLong sx={{ mr: 1 }} />
                        Add Expenditure
                    </Fab>
                </>
            }

        </>
    );

}