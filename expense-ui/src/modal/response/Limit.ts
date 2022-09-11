export interface Limit {
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    thresoldWarningAmount: number;
    resetRecursive: Recursively;
    priority: Priority;
    usedAmount: number;
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