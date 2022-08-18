import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Auth } from 'aws-amplify';
import configure from '../../service/CognitoService';
import { CircularProgress } from '@mui/material';
import { AlertContext, LocalizationContext } from '../../context';
import { AlertType } from '../../modal/ExpenseAlert';
import { UserLogin } from '../../modal/UserLogin';
import useQuery from '../../hooks/Query';
import { SignUp } from '../../modal/SignUp';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import PasswordResetForm from './PasswordResetForm';
import { PasswordReset } from '../../modal/PasswordReset';

export default function UserComponent() {
    const query = useQuery();
    const formType: string | null = query.get('form');
    const [loader, setLoader] = React.useState(false);
    const [isVerifyFail, setIsVerifyFail] = React.useState<boolean>(false);
    const [failedVerifyMessage, setFailedVerifyMessage] = React.useState(undefined);
    const localization = React.useContext(LocalizationContext);
    const expenseAlertModal = React.useContext(AlertContext);

    React.useEffect(() => {
        configure();
    }, [])

    const loginCallback = async (userLogin: UserLogin) => {
        setLoader(true);
        try {
            const user = await Auth.signIn(userLogin.Username, userLogin.password);
            window.sessionStorage.setItem('user', JSON.stringify(user));
            setLoader(false);
            window.location.reload();
        } catch (error: any) {
            expenseAlertModal.setAlert?.(error.message, AlertType.ERROR);
            setLoader(false);
        }
    }

    const signUpCallback = async (signUp: SignUp) => {
        setLoader(true);
        try {
            const user =  await Auth.signUp({
                username: signUp.email,
                password: signUp.password,
                attributes: {
                    email: signUp.email,
                    phone_number: '+15555555555',
                    name: `${signUp.firstName} ${signUp.lastName}`,
                },
                autoSignIn: {
                    enabled: true,
                }
            });
            window.sessionStorage.setItem('user', JSON.stringify(user));
            setLoader(false);
            expenseAlertModal.setAlert?.(`Welcome ${signUp.firstName} ${signUp.lastName}!! Your Account is set up successfully`, AlertType.SUCCESS );
        } catch (error: any) {
            expenseAlertModal.setAlert?.(error.message, AlertType.ERROR);
            setLoader(false);
        }
    }

    const passwordResetCallback = async (passwordReset: PasswordReset) => {
        Auth.forgotPasswordSubmit(passwordReset.username, passwordReset.code, passwordReset.password)
        .then(() => {
            expenseAlertModal.setAlert?.('Password Change Successfully', AlertType.SUCCESS);
        })
        .catch(err => {
            expenseAlertModal.setAlert?.(err, AlertType.ERROR);
            console.error(JSON.stringify(err));
        });
    }

    const sendConfirmationCodeCallback = (passwordReset: PasswordReset) => {
        Auth.forgotPassword(passwordReset.username)
            .then(() => {
                expenseAlertModal.setAlert?.('Verification mail have been sent successfully to mail id', AlertType.SUCCESS);
            })
            .catch(err => {
                setIsVerifyFail(true);
                setFailedVerifyMessage(err);
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
                        backgroundImage: 'url(/image/banner.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {(formType === 'login' || !formType) &&
                    <LoginForm
                        loginLoader={loader}
                        loginCallback={(userlogin: UserLogin) => loginCallback(userlogin)}
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