import { createContext, useEffect, useState } from "react";
import LocalizedStrings from 'react-localization';
import { Bank } from '../localization/en/bankLocale'

// create context
const LocalizationContext = createContext({});

const LocalizationContextProvider = ({ children }) => {
    // the value that will be given to the context
    const [localization, setLocalization] = useState({});

    // fetch a user from a fake backend API
    useEffect(() => {
        setLocalization(
            new LocalizedStrings({
                en: {
                    Bank
                }
            })
        )
    }, []);



    return (
        // the Provider gives access to the context to its children
        <LocalizationContext.Provider value={localization}>
            {children}
        </LocalizationContext.Provider>
    );
};




export { LocalizationContext, LocalizationContextProvider };