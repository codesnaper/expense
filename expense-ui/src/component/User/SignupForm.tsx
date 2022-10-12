import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SignUp } from '../../modal/SignUp';
import { useFormValidation } from '../../hooks/FormValidation';
import { LocalizationContext } from '../../context';
import { CircularProgress, SvgIcon } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Face } from '@mui/icons-material';
import { LoginLink } from '../../modal/MenuLink';
import { useNavigate } from 'react-router-dom';

interface SingupFormProps{
    loader: boolean,
    signUpCallback: (signUp: SignUp) => void,
}

export default function SignUpForm(props: SingupFormProps) {
    const localization = React.useContext(LocalizationContext);
    const navigate = useNavigate();

    const { handleSubmit, handleChange, data: signUp, errors } = useFormValidation<SignUp>({
        validations: {
            email: {
                pattern: {
                    value: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
                    message: `${localization.getString?.('Login.invalidEmail', localization.getLanguage?.(), false)}`,
                },
            },
            password: {
                required: {
                    value: true,
                    message: `${localization.getString?.('Login.invalidPassword', localization.getLanguage?.(), false)}`,
                },
            },
            firstName: {
                required: {
                    value: true,
                    message: `FirstName is required`
                }
            },
            lastName: {
                required: {
                    value: true,
                    message: `LastName is required`
                }
            }
        },
        onSubmit: () => { props.signUpCallback(signUp) }
    });

    return (
        <>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AdbIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange('firstName')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange('lastName')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange('email')}
                                />
                            </Grid>
                            
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            startIcon={<Face/>}
                            disabled={props.loader}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                            {props.loader && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: blue[200],
                                    }}
                                />
                            )}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            <Button variant='text' startIcon={<SvgIcon component={LoginLink.icon} inheritViewBox />} onClick={() => {navigate( LoginLink.link,{replace: false})}}>{LoginLink.title}</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}