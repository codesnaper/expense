import { createContext, useEffect, useState } from "react";
import { BankService } from "../service/BankService";
import * as React from "react";
import { Service } from "../modal/Service";
import { ServiceContext } from "../context";
import { AccountService } from "../service/AccountService";

interface ServiceContextProps  { 
    children: React.ReactNode
 }


const ServiceContextProvider = (props: ServiceContextProps) => {
    const [service, setService] = useState({});

    useEffect(() => {
        setService({
            bankService: new BankService(),
            accountService: new AccountService()
        })
    }, []);

    return (
        <ServiceContext.Provider value={service}>
            {props.children}
        </ServiceContext.Provider>
    );
};


export { ServiceContextProvider };