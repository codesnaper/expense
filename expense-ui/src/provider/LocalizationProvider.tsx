import { createContext, useEffect, useState } from "react";
import LocalizedStrings from 'react-localization';
import { LocalizationContext } from "../context";
import { Bank } from '../locale/bank'
import { Login } from '../locale/login'

interface LocalizationContextProps  { 
    children: React.ReactNode
 }
// create context

const LocalizationContextProvider = (props: LocalizationContextProps) => {
    // the value that will be given to the context
    const [localization, setLocalization] = useState({});

    // fetch a user from a fake backend API
    useEffect(() => {
        setLocalization(
            new LocalizedStrings({
                en: {
                    Bank,
                    Login
                }
            })
        )
    }, []);



    return (
        // the Provider gives access to the context to its children
        <LocalizationContext.Provider value={localization}>
            {props.children}
        </LocalizationContext.Provider>
    );
};




export {  LocalizationContextProvider };