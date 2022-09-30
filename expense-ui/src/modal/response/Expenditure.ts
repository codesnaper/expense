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
}

export enum ExpenditureType{
    expense, revenue, transfer
}