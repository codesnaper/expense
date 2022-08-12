import React from "react";
import { BankService } from "./bankService";

export const AppContext = React.createContext({
    bankService: new BankService()
})