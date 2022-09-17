import { Notification } from "./response/Notification";
import { NotificationOperation } from "./response/NotificationSocketMessage";

export interface NotificationContextModel{
    type: NotificationOperation,
    notifications: Notification[];
}

