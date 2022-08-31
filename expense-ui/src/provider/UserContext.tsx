import { useEffect, useState } from 'react';
import * as React from 'react';
import { User } from '../modal/User';
import { LocalizationContextProvider } from './LocalizationProvider';
import Navbar from '../component/header/Navbar';
import { ServiceContextProvider } from './ServiceContext';
import { UserContext } from '../context';
import UserComponent from '../component/User';
import ExpenseDrawer from '../component/header/Drawer/Drawer';

interface UserContextProps {
    children: React.ReactNode
}

const UserContextProvider = (props: UserContextProps) => {
    const [user, setUser] = useState<Partial<User>>({});
    const [loader, setLoader] = useState<Boolean>(true);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    useEffect(() => {
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

    return (
        <UserContext.Provider value={user}>
            <LocalizationContextProvider>
                {!loader && <>
                    {!user.id ?
                        <>
                            <UserComponent />
                        </>
                        :
                        <>
                            <Navbar openDrawer={handleOpenDrawer}></Navbar>
                            <ExpenseDrawer open={openDrawer} openDrawer={handleOpenDrawer}></ExpenseDrawer>
                            <ServiceContextProvider>
                                {props.children}
                            </ServiceContextProvider>
                        </>
                    }</>}
            </LocalizationContextProvider>

        </UserContext.Provider>
    );
};


export { UserContextProvider };