import { ExpenditureType } from "./Expenditure";

export interface ExpenditureSummary{
    month: number;
    amount: number;
    type: ExpenditureType;
    year: string;
}