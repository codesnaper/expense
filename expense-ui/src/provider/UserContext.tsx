import { useEffect, useState } from 'react';
import * as React from 'react';
import { LocalizationContextProvider } from './LocalizationProvider';
import Navbar from '../component/HeaderBar/Navbar';
import { ServiceContextProvider } from './ServiceContext';
import { ServiceContext, UserContext } from '../context';
import UserComponent from '../component/User';
import ExpenseDrawer from '../component/HeaderBar/Drawer/Drawer';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { Theme } from '@mui/system';
import { brown, grey } from '@mui/material/colors';
import { User } from '../modal/response/User';
import { Profile } from '../modal/response/Profile';
import { ApiError } from '../modal/response/Error';
import { NotificationContextProvider } from './NotificationProvider';

interface UserContextProps {
    children: React.ReactNode
}

const UserContextProvider = (props: UserContextProps) => {
    const [user, setUser] = useState<User>({ user: {}, profile: {} });
    const [loader, setLoader] = useState<Boolean>(true);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [appTheme, setAppTheme] = useState<Theme>(
        createTheme({
            palette: {
                mode: 'light'
            },
        })
    );
    const handleSetProfile = (profile: Profile) => {
        const userStr: string | null = localStorage.getItem('user');
        if (userStr) {
            const mode: PaletteMode = profile.theme === 'dark' ? 'dark' : 'light';
            setAppTheme(createTheme({
                palette: {
                    mode: mode
                },
            }));
            const body: HTMLElement = document.getElementsByTagName('body')[0];
            if (profile.theme === 'dark') {
                body.style.backgroundColor = `${grey[500]}`
            } else {
                body.style.backgroundColor = `${brown[50]}`
            }
            const user: User = JSON.parse(userStr);
            setUser(user);
            user.profile = profile;
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    useEffect(() => {
        const userStr: string | null = localStorage.getItem('user');
        if (userStr) {
            const user: User = JSON.parse(userStr);
            setUser(user);
            const body: HTMLElement = document.getElementsByTagName('body')[0];
            const mode: PaletteMode = user.profile?.theme === 'dark' ? 'dark' : 'light';
            setAppTheme(createTheme({
                palette: {
                    mode: mode
                },
            }));
            if (user.profile?.theme === 'dark') {
                body.style.backgroundColor = `${grey[500]}`
            } else {
                body.style.backgroundColor = `${brown[50]}`
            }
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
                    <ServiceContextProvider>
                        {!loader && <>
                            {!user.user.name ?
                                <>
                                    <UserComponent />
                                </>
                                :
                                <>
                                    <NotificationContextProvider>
                                        <Navbar openDrawer={handleOpenDrawer} updateUserProfile={handleSetProfile}></Navbar>
                                        <ExpenseDrawer open={openDrawer} openDrawer={handleOpenDrawer}></ExpenseDrawer>
                                        {props.children}
                                    </NotificationContextProvider>
                                </>
                            }</>}
                    </ServiceContextProvider>
                </LocalizationContextProvider>
            </UserContext.Provider>
        </ThemeProvider>
    );
};


export { UserContextProvider };