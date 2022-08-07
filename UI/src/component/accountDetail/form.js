import { Grid, Paper, TextField, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function AccountForm(props) {
    return (
        <>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 3,
                        mx: 2,
                        paddingTop: '12px'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Account Details: {`${props.account.name}`.toUpperCase()}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                <Typography variant="h6">
                                    Account Number :
                                </Typography>
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                    <b>{props.account.accountNo}</b>
                                </Paper>
                            </Grid>
                            <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                <Typography variant="h6">
                                    {(props.account.isInterest && !props.account.loanType) ? 'Amount :' : 'Borrowed Amount :'}
                                </Typography>
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                    <b>{props.account.principal}</b>
                                </Paper>
                            </Grid>
                            <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                <Typography variant="h6">
                                    Account Opening Date :
                                </Typography>
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DesktopDatePicker
                                        inputFormat="dddd, DD-MMMM-yyyy"
                                        value={props.account.openDate}
                                        disabled={true}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            {(props.account.interest && !props.account.loanType) && <>
                                <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                    <Typography variant="h6">
                                        Maturity Amount :
                                    </Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                        <b>{props.account.maturityAmount}</b>
                                    </Paper>
                                </Grid>
                            </>
                            }
                            {(props.account.interest) && <>
                                <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                    <Typography variant="h6">
                                        Total Amount :
                                    </Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                        <b>{props.account.totalPayment}</b>
                                    </Paper>
                                </Grid>
                            </>
                            }
                            {props.account.loanType && <>
                                <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                    <Typography variant="h6">
                                        EMI:
                                    </Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                        <b>{props.account.interestAmount}</b>
                                    </Paper>
                                </Grid>
                            </>
                            }
                            {props.account.interest && <>
                                <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                    <Typography variant="h6">
                                        Interest Amount:
                                    </Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                        <b>{props.account.totalInterest}</b>
                                    </Paper>
                                </Grid>
                                <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                    <Typography variant="h6">
                                        Rate:
                                    </Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                        <b>{props.account.rate}</b>
                                    </Paper>
                                </Grid>
                                <Grid item md={3} sm={6} style={{ marginBottom: '12px', marginTop: '8px' }}>
                                    <Typography variant="h6">
                                        Tenure:
                                    </Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <Paper elevation={3} style={{ padding: '10px', marginBottom: '12px' }} >
                                        <b>{props.account.tenure}</b>
                                    </Paper>
                                </Grid>
                            </>
                            }
                        </Grid>











                    </Box>
                </Box>
            </Grid>
        </>
    );
}