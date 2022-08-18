import { Box, Button, CircularProgress, CssBaseline, Grid, Paper, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { error } from "console";
import { useContext, useState } from "react";
import { LocalizationContext } from "../../context";
import { useFormValidation } from "../../hooks/FormValidation";
import { PasswordReset } from "../../modal/PasswordReset";

interface PasswordResetFormProps{
    loader: boolean,
    failedVerification: boolean | undefined,
    failedVerificationMessage: string | undefined,
    passwordRestCallback: (passwordReset: PasswordReset) => void,
    sendVerificationCodeCallback: (PasswordReset: PasswordReset) => void
}

export default function PasswordResetForm(props: PasswordResetFormProps) {
    const localization = useContext(LocalizationContext);
    const [firstStepInitiated, setFirstStepInitiated] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const { handleSubmit, handleChange, data: passwordReset, errors } = useFormValidation<PasswordReset>({
        validations: {
            username: {
                pattern: {
                    value: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                    message: `${localization.getString?.('Login.invalidEmail', localization.getLanguage?.(), false)}`,
                },
                required: {
                    value: true,
                    message: `Username is required.`
                }
            },
            code: {
                required: {
                    value: true,
                    message: `Verification Code is required`,
                },
            },
            password: {
                required: {
                    value: true,
                    message: `Password is required`,
                },
            }
        },
        onSubmit: () => { props.passwordRestCallback(passwordReset) }
    });

    return (<>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ maxWidth: 400, padding: '20px' }}>
                <Typography variant="h3" style={{ marginBottom: '40px', marginTop: '20px' }}>Forgot Password</Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step key={'1'}>
                        <StepLabel>
                            <Typography variant="caption">Email Address</Typography>
                            {(errors.username) &&
                                <>
                                    <Typography variant="caption" color="error">
                                        <span> {`Error: ${errors.username}`}</span>
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
                                onChange={handleChange('username')}
                            />
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={props.loader}
                                        variant="contained"
                                        onClick={() => {props.sendVerificationCodeCallback(passwordReset)}}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {props.loader && (
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
                            {(props.failedVerification && props.failedVerificationMessage) &&
                                <>
                                    <Typography variant="caption" color="error">
                                        <span>{`Verification Code failed ${props.failedVerificationMessage}`}</span>
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
                                onChange={handleChange('code')}
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
                                onChange={handleChange('password')}
                                autoFocus
                            />
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        disabled={props.loader}
                                        variant="contained"
                                        type="submit"
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {props.loader && (
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
    </>)
}