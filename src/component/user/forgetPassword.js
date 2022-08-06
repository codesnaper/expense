import { Box, Button, CircularProgress, CssBaseline, Grid, Paper, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Auth } from 'aws-amplify';
import configure from "../../service/cognitoService";
import useAlert from "../alert/alertHook";
import { grey } from "@mui/material/colors";

export default function ForgetPassword(props) {
    configure();
    const [loginLoader, setLoginLoader] = useState(false);
    const { setAlert } = useAlert();
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [activeStep, setActiveStep] = useState(0);
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    const [firstStepInitiated, setFirstStepInitiated] = useState(false);
    const [verifyUsername, setVerifyUsername] = useState(true);
    const [verifyCode, setVerifyCode] = useState(false);
    const [verifyInitiated, setVerifyInitiated] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleUsername = (event) => setUserName(event.target.value);

    const handleCode = (event) => setCode(event.target.value);

    const handlePassword = (event) => setPassword(event.target.value);

    const sendConfirmationCode = () => {
        setLoginLoader(true);
        setFirstStepInitiated(true);
        Auth.forgotPassword(username)
            .then(() => {
                setVerifyUsername(true);
                setLoginLoader(false);
                handleNext();
                setAlert('Verification mail have been sent successfully to mail id', 'success');
            })
            .catch(err => {
                setError(JSON.stringify(err))
                setVerifyUsername(false);
                setLoginLoader(false);
                setAlert('Failed to sent verification mail', 'error');
            });
    }

    const changePassword = () => {
        setVerifyInitiated(true);
        setLoginLoader(true);
        Auth.forgotPasswordSubmit(username, code, password)
            .then(() => {
                setVerifyCode(true);
                setLoginLoader(false);
                setAlert('Password Change Successfully', 'success');
            })
            .catch(err => {
                setError(JSON.stringify(err))
                setVerifyCode(false);
                setLoginLoader(false);
                setAlert('Failed to Change password', 'error');
            });
    }

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/image/banner.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box sx={{ maxWidth: 400, padding: '20px' }}>
                        <Typography variant="h3" style={{ marginBovttom: '40px', marginTop: '20px' }}>Forgot Password</Typography>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step key={'1'}>
                                <StepLabel>
                                    <Typography variant="caption">Email Address</Typography>
                                    {(firstStepInitiated && !verifyUsername) &&
                                        <>
                                            <Typography variant="caption" color="error">
                                                Verification failed {error}
                                            </Typography>
                                        </>
                                    }
                                    {(firstStepInitiated && verifyUsername) &&
                                        <>
                                            <Typography variant="caption" color="green">
                                                Verification code sent!!
                                            </Typography>
                                        </>
                                    }
                                </StepLabel>
                                <StepContent>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={handleUsername}
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                disabled={loginLoader}
                                                variant="contained"
                                                onClick={sendConfirmationCode}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {loginLoader && (
                                                    <CircularProgress
                                                        size={24}
                                                        sx={{
                                                            color: grey[50],
                                                        }}
                                                    />
                                                )}
                                                Verify
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                            <Step key={'2'}>
                                <StepLabel>
                                    <Typography variant="caption">Verification Code</Typography>
                                    {(verifyInitiated && !verifyCode) &&
                                        <>
                                            <Typography variant="caption" color="error">
                                                Verification Code failed {error}
                                            </Typography>
                                        </>
                                    }
                                    {(verifyInitiated && verifyCode) &&
                                        <>
                                            <Typography variant="caption" color="green">
                                                Password Change !!!
                                            </Typography>
                                        </>
                                    }
                                </StepLabel>
                                <StepContent>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="code"
                                        label="Verification code"
                                        name="code"
                                        onChange={handleCode}
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        type="password"
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        autoComplete="password"
                                        onChange={handlePassword}
                                        autoFocus
                                    />
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                disabled={loginLoader}
                                                variant="contained"
                                                onClick={changePassword}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                 {loginLoader && (
                                                    <CircularProgress
                                                        size={24}
                                                        sx={{
                                                            color: grey[50],
                                                        }}
                                                    />
                                                )}
                                                Change Password
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </Box>
                </Grid>
            </Grid>

        </>
    );

}