import { IMessage } from "@stomp/stompjs";
import { useContext, useEffect, useState } from "react";
import { NotificationContext, ServiceContext } from "../context";
import { NotificationContextModel } from "../modal/NotificationContextModel";
import { Notification } from "../modal/response/Notification";
import { NotificationOperation, NotificationSocketMessage } from "../modal/response/NotificationSocketMessage";
import { Service } from "../modal/Service";
import { ServiceContextProvider } from "./ServiceContext";

interface NotificationContextProps  { 
    children: React.ReactNode
 }

const NotificationContextProvider = (props: NotificationContextProps) => {
    const [notifications, setNotifications] = useState<Partial<NotificationContextModel>>({});

    const service = useContext<Partial<Service>>(ServiceContext);

    const notificationCallback = ((message: IMessage) => {
        const notificationMessgae: NotificationSocketMessage = JSON.parse(message.body);
        if(notificationMessgae.notifications){
            setNotifications({
                type: NotificationOperation.NEW,
                notifications: notificationMessgae.notifications
            })
        } else {
            setNotifications({
                type: NotificationOperation.APPEND,
                notifications: [notificationMessgae.notification]
            })
        }
        
    })

    useEffect(() => {
        service.notificationService?.initialize(notificationCallback);
        service.notificationService?.subscribeNotification();
    }, [service]);



    return (
        <NotificationContext.Provider value={notifications}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export {NotificationContextProvider};