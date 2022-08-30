import { createContext, useEffect, useState } from "react";
import { BankService } from "../service/BankService";
import * as React from "react";
import { Service } from "../modal/Service";
import { ServiceContext } from "../context";
import { AccountService } from "../service/AccountService";
import { TagService } from "../service/TagService";

interface ServiceContextProps  { 
    children: React.ReactNode
 }


const ServiceContextProvider = (props: ServiceContextProps) => {
    const [service, setService] = useState({});

    useEffect(() => {
        setService({
            bankService: new BankService(),
            accountService: new AccountService(),
            tagService: new TagService()
        })
    }, []);

    return (
        <ServiceContext.Provider value={service}>
            {props.children}
        </ServiceContext.Provider>
    );
};


export { ServiceContextProvider };