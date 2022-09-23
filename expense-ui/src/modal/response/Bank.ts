import { Tag } from "./Tag";

export class BankModal{
    name!: string;
    location!: string;
    currency!: string;
    tagNames!: string;
    tags!: Array<Tag>;
    USERID!: string;
    ID!: string;
    creditAmount!: number;
    debitAmount!: number;
    accounts!: number;
    holdAmount!: number;
    totalAccounts!: number;
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
