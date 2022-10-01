import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined, ReceiptLong } from "@mui/icons-material";
import { Box, Card, CardContent, Container, Divider, Typography, Stack, Button, Grid, LinearProgress, Fab } from "@mui/material";
import { blue } from "@mui/material/colors";
import moment from "moment";
import { useState } from "react";
import { OperationType } from "../../modal/OperationType";
import { Expenditure } from "../../modal/response/Expenditure";
import InfoCardComponent from "../Card/InfoCard";
import ExpenditureCard from "./card";
import ExpenditureForm from "./expenditureForm";
import TimeDialog from "./timeDialog";

export default function ExpenditureComponent() {

    const [selectDate, setSelectDate] = useState<Date>(new Date());

    const [openYearDialog, setOpenYearDialog] = useState<boolean>(false);

    const [openMonthDialog, setOpenMonthDialog] = useState<boolean>(false);

    const [openExpenditureDialog, setOpenExpenditureDialog] = useState<boolean>(false);

    const [operationType, setOperationType] = useState<OperationType>(OperationType.ADD);

    const [expenditures, setExpenditures] = useState<Expenditure[]>([]);

    const handleOnSelect = (date: Date) => {
        setSelectDate(date);
    }

    const handleExpenditure = (expenditure: Expenditure) => {
        if(operationType === OperationType.ADD){
            const newExpenditures = [...expenditures, expenditure];
            setExpenditures(newExpenditures);
        } else {

        }
    }

    return (
        <>
            <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                <Grid container spacing={2}>
                    <InfoCardComponent header="Total Expense" secondaryText={`Month : ${moment(selectDate).format('MMM')}`} value={'0'} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue" secondaryText={`Month : ${moment(selectDate).format('MMM')}`} value={'0'} ></InfoCardComponent>
                    <InfoCardComponent header="Total Expense " secondaryText={`Date : ${moment(selectDate).format('DD,MMM')} - ${moment(selectDate).add(6, 'day').format('DD,MMM')}`} value={'0'} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue " secondaryText={`Date : ${moment(selectDate).format('DD,MMM')} - ${moment(selectDate).add(6, 'day').format('DD,MMM')}`} value={'0'} ></InfoCardComponent>
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
                                            {/* {moment(selectDate).add(index, 'day').isSame(moment(new Date())) && <>
                                            <LinearProgress value={100} variant='determinate'></LinearProgress>
                                            </>} */}
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color={blue['700']} gutterBottom>
                                                    {moment(selectDate).add(index, 'day').format('dddd, DD/MMM')}
                                                </Typography>
                                                <Divider sx={{ marginBottom: '12px', marginTop: '12px' }} />
                                                {expenditures?.
                                                    filter((expenditure: Expenditure) => moment(selectDate).add(index, 'day').isSame(moment(expenditure.date)))
                                                    .length === 0 && <>
                                                        <Typography variant="caption" letterSpacing={2}  >
                                                            {`No transaction log on ${moment(selectDate).add(index, 'day').format('DD MMMM')}`}
                                                        </Typography>
                                                    </>
                                                }

                                                {expenditures?.
                                                    filter((expenditure: Expenditure) => moment(selectDate).add(index, 'day').isSame(moment(expenditure.date)))
                                                    .map((expenditure: Expenditure) => <>
                                                        <ExpenditureCard
                                                            expenditure={expenditure}
                                                        ></ExpenditureCard>
                                                    </>)
                                                }

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
                onClose={() => setOpenExpenditureDialog(false)}
                show={openExpenditureDialog}
                onChange={handleExpenditure}
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