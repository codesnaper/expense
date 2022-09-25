import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Container, Divider, Typography, Stack, Button, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import moment from "moment";
import { useState } from "react";
import InfoCardComponent from "../Card/InfoCard";
import TimeDialog from "./timeDialog";

export default function Expenditure() {

    const [selectDate, setSelectDate] = useState<Date>(new Date());

    const [openYearDialog, setOpenYearDialog] = useState<boolean>(false);

    const [openMonthDialog, setOpenMonthDialog] = useState<boolean>(false);

    const handleOnSelect = (date: Date) => {
        setSelectDate(date);
    }

    return (
        <>
            <Box component={Container} maxWidth={'false'} height={'100vh'} sx={{ paddingTop: '40px' }} >
                <Grid container spacing={2}>
                    <InfoCardComponent header="Total Expense" secondaryText={`Month : ${moment(selectDate).format('MMM')}`} value={'0'} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue" secondaryText={`Month : ${moment(selectDate).format('MMM')}`} value={'0'} ></InfoCardComponent>
                    <InfoCardComponent header="Total Expense " secondaryText={`Date : ${moment(selectDate).format('DD,MMM')} - ${moment(selectDate).add(6,'day').format('DD,MMM')}`} value={'0'} ></InfoCardComponent>
                    <InfoCardComponent header="Total Revenue " secondaryText={`Date : ${moment(selectDate).format('DD,MMM')} - ${moment(selectDate).add(6,'day').format('DD,MMM')}`} value={'0'} ></InfoCardComponent>
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
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color={blue['700']} gutterBottom>
                                                    {moment(selectDate).add(index, 'day').format('dddd, DD/MMM')}
                                                </Typography>
                                                <Divider />
                                                <Typography variant="caption" letterSpacing={2}  >
                                                    No transaction on this day
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>)
                            }


                        </Grid>
                    </CardContent>
                </Card>

            </Box>
        </>
    );

}