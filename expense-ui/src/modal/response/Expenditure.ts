import { Account } from "./Account";
import { Category } from "./Category";
import { Limit } from "./Limit";

export interface Expenditure{
    id: number;
    description: string;
    name: string;
    amount: number;
    type: ExpenditureType;
    limit: Limit;
    account: Account;
    category: Category;
    date: Date;
    fromAccount: Account;
    localeCurrency: number;
}

export enum ExpenditureType{
    EXPENSE = 'EXPENSE',
    REVENUE = 'REVENUE',
    TRANSFER = 'TRANSFER'
}