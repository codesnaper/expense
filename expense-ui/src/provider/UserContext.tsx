import { useEffect, useState } from 'react';
import * as React from 'react';
import { User } from '../modal/User';
import { LocalizationContextProvider } from './LocalizationProvider';
import Navbar from '../component/header/Navbar';
import { ServiceContextProvider } from './ServiceContext';
import { UserContext } from '../context';
import UserComponent from '../component/User';
import ExpenseDrawer from '../component/header/Drawer/Drawer';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { Theme } from '@mui/system';
import { blue, brown, cyan, grey } from '@mui/material/colors';

interface UserContextProps {
    children: React.ReactNode
}

const UserContextProvider = (props: UserContextProps) => {
    const [user, setUser] = useState<Partial<User>>({});
    const [loader, setLoader] = useState<Boolean>(true);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [appTheme, setAppTheme] = useState<Theme>(
        createTheme({
            palette: {
                mode: 'light'
            },
        })
    );
    const handleSetTheme = (theme: string) => {
        const mode: PaletteMode = theme === 'dark'? 'dark': 'light';
        setAppTheme(createTheme({
            palette: {
                mode: mode
            },
        }));
        const body: HTMLElement = document.getElementsByTagName('body')[0];
        if(theme === 'dark'){
            body.style.backgroundColor = `${grey[500]}`
        } else{
            body.style.backgroundColor = `${blue[300]}`
        }
    }

    useEffect(() => {
        const body: HTMLElement = document.getElementsByTagName('body')[0];
        body.style.backgroundColor = `${brown[50]}`
        const userSession = window.sessionStorage.getItem('user');
        if (userSession) {
            const userSessionObj:
                {
                    username: string,
                    attributes: { name: string, email: string },
                    signInUserSession: {
                        accessToken: {
                            jwtToken: string
                        }
                        refreshToken: {
                            token: string
                        }
                    }
                } = JSON.parse(userSession);
            const user: User = {
                id: userSessionObj.username,
                name: userSessionObj.attributes.name,
                email: userSessionObj.attributes.email,
                accessToken: userSessionObj.signInUserSession.accessToken.jwtToken,
                refreshToken: userSessionObj.signInUserSession.refreshToken.token,
            }
            setUser(user);
        }
        setLoader(false);
    }, []);

    const handleOpenDrawer = (open: boolean) => {
        setOpenDrawer(open);
    }

    //TODO: Move below to layout file
    return (
        <ThemeProvider theme={appTheme}>
            <UserContext.Provider value={user}>
                <LocalizationContextProvider>
                    {!loader && <>
                        {!user.id ?
                            <>
                                <UserComponent />
                            </>
                            :
                            <>
                                <Navbar openDrawer={handleOpenDrawer} setTheme={handleSetTheme}></Navbar>
                                <ExpenseDrawer open={openDrawer} openDrawer={handleOpenDrawer}></ExpenseDrawer>
                                <ServiceContextProvider>
                                    {props.children}
                                </ServiceContextProvider>
                            </>
                        }</>}
                </LocalizationContextProvider>
            </UserContext.Provider>
        </ThemeProvider>
    );
};


export { UserContextProvider };