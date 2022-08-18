import { createContext } from "react";
import { ExpenseAlertModal } from "../modal/ExpenseAlert";
import { LocalizedStrings } from 'react-localization';
import { Service } from "../modal/Service";
import { User } from "../modal/User";
import { useDataSet } from "../hooks/TableDataSet";

export const AlertContext = createContext<Partial<ExpenseAlertModal>>({});
export const LocalizationContext = createContext<Partial<LocalizedStrings<string>>>({});
export const ServiceContext = createContext<Partial<Service>>({});
export const UserContext = createContext<Partial<User>>({});
export const TableContext = createContext(useDataSet)
