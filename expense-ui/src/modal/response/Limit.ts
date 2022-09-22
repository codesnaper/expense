
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
    DAY = 'DAILY',
    MONTH = 'MONTHLY',
    YEAR = 'YEARLY'
}

export enum Priority{
    HIGH ='high',
    NORMAL = 'normal',
    LOW = 'low'
}