import { BankModal } from "./Bank";
import { Tag } from "./Tag";

export interface Account{
    id: number;
    name: string;
    accountNumber: string;
    amount: number;
    openDate: Date;
    endDate: Date;
    createdDate: Date;
    tags: Array<Tag>;
    bank: BankModal;
}

export interface LoanAccount extends Account{
    rate: number;
    tenure: number;
    interestAmount: number;
    isLendType: boolean
}

export interface SCIAccount extends Account{
    rate: number;
    tenure: number;
    maturityAmount : number;
    compoundYear: boolean
    accountEndDate: Date;
}

export interface SIAccount extends Account {
    rate: number;
    tenure: number;
    maturityAmount: number;
    accountEndDate: Date;
}

export class AccountResponse<T>{
    Items!: Array<T>;
    Count!: number;
    pageNo!: number;
    pageSize!: number;
}


export enum AccountType{
    LOAN = 'LOAN',
    ACCOUNT = 'ACCOUNT',
    MONEY_LENDING = 'MONEY_LENDING',
    SAVING_INTEREST = 'SAVING_INTEREST',
    SAVING_COMPOUND_INTEREST = 'SAVING_COMPOUND_INTEREST'
}
