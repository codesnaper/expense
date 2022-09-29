import { Account } from "./Account";
import { Category } from "./Category";
import { Limit } from "./Limit";

export interface Expenditure{
    id: number;
    description: string;
    name: string;
    amount: number;
    type: string;
    limit: Limit;
    account: Account;
    category: Category;
    date: Date;
}