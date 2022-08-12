import { createContext, useEffect, useState } from "react";
import Navbar from "../component/header/navbar";
import Login from "../component/user/login";
import { LocalizationContextProvider } from "./localizationContext";
import { ServiceContextProvider } from "./serviceContext";


// create context
const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    // the value that will be given to the context
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // fetch a user from a fake backend API
    useEffect(() => {
        const getUser = () => {
            const userSession = JSON.parse(window.sessionStorage.getItem('user'));
            if (userSession) {
                setUser({
                    id: userSession.username,
                    name: userSession.attributes && userSession.attributes.name,
                    email: userSession.attributes && userSession.attributes.email,
                    accessToken: userSession.signInUserSession.accessToken.jwtToken,
                    refreshToken: userSession.signInUserSession.refreshToken.token
                })
            }
            setLoader(false);
        };

        getUser();
    }, []);



    return (
        // the Provider gives access to the context to its children
        <UserContext.Provider value={user}>
            <LocalizationContextProvider>
                {!loader && <>
                    {!user ?
                        <>
                            <Login />
                        </>
                        :
                        <>
                            <Navbar></Navbar>
                            <ServiceContextProvider>
                                {children}
                            </ServiceContextProvider>
                        </>
                    }</>}
            </LocalizationContextProvider>

        </UserContext.Provider>
    );
};




export { UserContext, UserContextProvider };