export class BankModal{
    name!: string;
    location!: string;
    currency!: string;
    tags!: string;
    USERID!: string;
    ID!: string;
    creditAmount!: number;
    debitAmount!: number;
    accounts!: number;
    holdAmount!: number;
}

export class BankModalsResponse{
    Items!: BankModal[];
    Count!: number;
    pageNo!: number;
    pageSize!: number;
}

export interface ResponseDelete {
    message: string;
}
