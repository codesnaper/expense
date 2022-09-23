export interface Notification{
    heading: string;
    description: string;
    isUnread: boolean;
    notification: NotificationType;
    date: string;
    id: number;
    count: number;
}

export enum NotificationType{
    LIMIT_WARNING, EXPENSE, LIMIT_CROSSED, LIMIT_REACHED, REVENUE, SUMMARY, INFO
}