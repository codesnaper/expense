import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import { AlertContext, ServiceContext } from '../../context';
import { AlertType } from '../../modal/ExpenseAlert';
import useQuery from '../../hooks/Query';
import { SignUp } from '../../modal/SignUp';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import PasswordResetForm from './PasswordResetForm';
import { PasswordReset } from '../../modal/PasswordReset';
import { LoginCredential, User } from '../../modal/response/User';
import { ApiError, ErrorCode } from '../../modal/response/Error';
import { useNavigate } from 'react-router-dom';

export default function UserComponent() {
    const query = useQuery();
    const formType: string | null = query.get('form');
    const [isError, setIsError] = React.useState<boolean>(false);
    const [errorHelperText, setErrorHelperText] = React.useState<string>('');
    const [loader, setLoader] = React.useState(false);
    const [isVerifyFail, setIsVerifyFail] = React.useState<boolean>(false);
    const [failedVerifyMessage, setFailedVerifyMessage] = React.useState(undefined);
    const expenseAlertModal = React.useContext(AlertContext);
    const service = React.useContext(ServiceContext);
    const navigate = useNavigate();

    const loginCallback =  (loginCredential: LoginCredential, rememberFlag: boolean) => {
        setLoader(true);
        service.userService?.loginUser(loginCredential, rememberFlag)
        .then(() => {
            window.location.reload();
        })
        .catch((error: ApiError) => {
            if(ErrorCode[error.errorCode] === ErrorCode.AUTHENTICATION){
                setIsError(true);
                setErrorHelperText(error.message);
            }
            expenseAlertModal.setAlert?.(error.message, AlertType.ERROR);
        })
        .finally(() => {
            setLoader(false);
        })
    }

    const signUpCallback = async (signUp: SignUp) => {
        setLoader(true);
        const user: User = {
            name: `${signUp.firstName} ${signUp.lastName}`,
            phone_number: '+15555555555',
            username: signUp.email,
            user: {}
        };
        service.userService?.newUser(user)
        .then(() => {
            expenseAlertModal?.setAlert?.('User Created Successfully.', AlertType.SUCCESS);
        }).catch(err => {
            expenseAlertModal.setAlert?.(err, AlertType.ERROR);
        })
        .finally(() => {
            setLoader(false);
        });
    }

    const passwordResetCallback = async (passwordReset: PasswordReset) => {
        setLoader(true);
        service.userService?.forgotPassword(passwordReset)
        .then(() => {
            expenseAlertModal?.setAlert?.('Password changed successfully.', AlertType.SUCCESS);
        }).catch(err => {
            expenseAlertModal.setAlert?.(err, AlertType.ERROR);
        })
        .finally(() => {
            setLoader(false);
        })
    }

    const sendConfirmationCodeCallback = (passwordReset: PasswordReset) => {
        service.userService?.sendForgotPasswordCode(passwordReset.username)
        .then(() => {
            expenseAlertModal?.setAlert?.('Code has been sent successfully to your registered mail id.', AlertType.SUCCESS);
        }).catch(err => {
            expenseAlertModal.setAlert?.(err, AlertType.ERROR);
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
                        backgroundImage: `url(${process.env.PUBLIC_URL}/banner.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover'
                    }}
                />
                {(formType === 'login' || !formType) &&
                    <LoginForm
                        errorHelperText={errorHelperText}
                        isError={isError}
                        loginLoader={loader}
                        loginCallback={(credential: LoginCredential, rememberFlag: boolean) => loginCallback(credential, rememberFlag)}
                    ></LoginForm>
                }
                {(formType === 'signup') &&
                    <SignUpForm
                        loader={loader}
                        signUpCallback={(signUpForm: SignUp) => signUpCallback(signUpForm)}
                    ></SignUpForm>
                }
                {(formType === 'passwordReset') &&
                    <PasswordResetForm
                        loader={loader}
                        failedVerification = {isVerifyFail}
                        failedVerificationMessage = {failedVerifyMessage}
                        passwordRestCallback={(passwordReset: PasswordReset) => passwordResetCallback(passwordReset)}
                        sendVerificationCodeCallback = {(passwordReset: PasswordReset) => sendConfirmationCodeCallback(passwordReset)}
                    ></PasswordResetForm>
                }
            </Grid>
            {loader && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </>
    );
}