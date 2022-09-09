import { createContext } from "react";
import { ExpenseAlertModal } from "../modal/ExpenseAlert";
import { LocalizedStrings } from 'react-localization';
import { Service } from "../modal/Service";
import { useDataSet } from "../hooks/TableDataSet";
import { User } from "../modal/response/User";

export const AlertContext = createContext<Partial<ExpenseAlertModal>>({});
export const LocalizationContext = createContext<Partial<LocalizedStrings<string>>>({});
export const ServiceContext = createContext<Partial<Service>>({});
export const UserContext = createContext<User>({
    user:{},
    profile:{}
});
export const TableContext = createContext(useDataSet)
