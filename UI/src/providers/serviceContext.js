import { createContext, useEffect, useState } from "react";
import { BankService } from "../service/bankService";


// create context
const ServiceContext = createContext({});

const ServiceContextProvider = ({ children }) => {
    // the value that will be given to the context
    const [service, setService] = useState({});

    // fetch a user from a fake backend API
    useEffect(() => {
        setService({
            bankService: new BankService()
        })
    }, []);



    return (
        // the Provider gives access to the context to its children
        <ServiceContext.Provider value={service}>
            {children}
        </ServiceContext.Provider>
    );
};




export { ServiceContext, ServiceContextProvider };