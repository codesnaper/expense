import { Client, IMessage } from "@stomp/stompjs";
import { Notification } from "./response/Notification";
import { NotificationOperation } from "./response/NotificationSocketMessage";

export interface NotificationContextModel{
    type: NotificationOperation,
    notifications: Notification[];
    onDeleteNotification?: (id: number) => void;
    onRead?: (id: number) => void;
    subscribeToCount?: (callback: (message: IMessage) => void) => void
}

