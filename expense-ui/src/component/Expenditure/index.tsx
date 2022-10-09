import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined, ReceiptLong } from "@mui/icons-material";
import { Box, Card, CardContent, Container, Divider, Typography, Stack, Button, Grid, LinearProgress, Fab } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { AlertContext, ServiceContext, UserContext } from "../../context";
import { getSymbol } from "../../modal/CurrencyType";
import { AlertType } from "../../modal/ExpenseAlert";
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

    const user = useContext(UserContext);

    const [expenditureSummaries, setExpenditureSummaries] = useState<ExpenditureSummary[]>([]);

    const handleOnSelect = (date: Date) => {
        setSelectDate(date);
    }

    useEffect(() => {
        setLoader(true);
        setTotalExpenseRangeDate(0);
        setTotalRevenueRangeDate(0)
        service.expenditureService?.fetchExpenditureByDateRange(moment(selectDate).format('DD-MM-yyyy'), moment(selectDate).add(5, 'days').format('DD-MM-yyyy'))
            .then((res: Expenditure[]) => {
                setExpenditures(res);
                res.filter((expenditure: Expenditure) => expenditure.type === ExpenditureType.EXPENSE).
                    forEach((expenditure: Expenditure) => {
                        setTotalExpenseRangeDate(totalExpenseRangeDate + expenditure.amount);
                    });
                res.filter((expenditure: Expenditure) => expenditure.type === ExpenditureType.REVENUE).
                    forEach((expenditure: Expenditure) => {
                        setTotalRevenueRangeDate(totalRevenueRangeDate + expenditure.amount);
                    })
            }).catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            }).finally(() => {
                setLoader(false);
            });
    }, [service, selectDate])

    useMemo(() => {
        service.expenditureService?.fetchExpenditureSummary(moment(selectDate).format("MM"), moment(selectDate).format("YYYY"))
            .then((res: ExpenditureSummary[]) => {
                setExpenditureSummaries(res);
            })
            .catch((err: ApiError) => {
                expenseAlert.setAlert?.(err.message, AlertType.ERROR);
            })
    }, [moment(selectDate).format("MM"), moment(selectDate).format("YYYY")]);

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
                <Grid container spacing={2}>
                    <InfoCardComponent header="Total Expense" secondaryText={`Month : ${moment(selectDate).format('MMMM')}`} value={'0'} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={red[700]} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue" secondaryText={`Month : ${moment(selectDate).format('MMMM')}`} value={'0'} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={green[700]}></InfoCardComponent>
                    <InfoCardComponent header="Total Expense " secondaryText={`Date : ${moment(selectDate).format('DD,MMMM')} - ${moment(selectDate).add(5, 'day').format('DD,MMMM')}`} value={`- ${totalExpenseRangeDate}`} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={red[700]} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue " secondaryText={`Date : ${moment(selectDate).format('DD,MMMM')} - ${moment(selectDate).add(5, 'day').format('DD,MMMM')}`} value={`${totalRevenueRangeDate}`} suffixCurrency={getSymbol(user.profile?.selectedCurrency)} color={green[700]}></InfoCardComponent>
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
                onClose={() => {setOpenExpenditureDialog(false); setOperationType(OperationType.ADD)}}
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