
export interface Limit {
    id: number
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    thresoldWarningAmount: number;
    resetRecursively: Recursively;
    priority: Priority;
    usedAmount: number;
    accountId: number;
    categoryId: number
}

export enum Recursively {
    DAY = 'day',
    MONTH = 'month',
    YEAR = 'year'
}

export enum Priority{
    HIGH ='high',
    NORMAL = 'normal',
    LOW = 'low'
}