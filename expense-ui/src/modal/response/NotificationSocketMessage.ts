import { Notification } from "./Notification";

export interface NotificationSocketMessage {
    notification: Notification;
    notifications: Notification[];
    operation: NotificationOperation
}

export enum NotificationOperation{
    NEW, APPEND, DELETE, COUNT
}