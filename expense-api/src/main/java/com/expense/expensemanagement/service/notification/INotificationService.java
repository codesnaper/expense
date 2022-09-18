package com.expense.expensemanagement.service.notification;

import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.NotificationModel;
import com.expense.expensemanagement.model.NotificationSocketMessage;
import com.expense.expensemanagement.model.NotificationType;

public interface INotificationService {

    void getNotifications(String userId);
    void sendNewNotification(String userid,String heading, String description, NotificationType notificationType);

    void broadcastNewNotificationToAllUser(String heading, String description, NotificationType notificationType);

    void removeNotification(long id, String userId);
}
