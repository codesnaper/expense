package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.NotificationModel;
import org.springframework.stereotype.Component;

/**
 * Conversion Class for Notification POJO
 */
@Component("notificationConversion")
public class NotificationConversion implements EntityModalConversion<Notification, NotificationModel>{

    /**
     * {@inheritDoc}
     */
    @Override
    public NotificationModel getModel(Notification notification) {
        NotificationModel notificationModel = new NotificationModel();
        notificationModel.setDate(notification.getCreatedDate());
        notificationModel.setNotificationType(notification.getNotificationType());
        notificationModel.setDescription(notification.getDescription());
        notificationModel.setUnread(notification.isUnread());
        notificationModel.setHeading(notification.getHeading());
        notificationModel.setId(notification.getId());
        notificationModel.setUserId(notification.getUserId());
        return notificationModel;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Notification getEntity(NotificationModel notificationModel) {
        Notification notification = new Notification();
        notification.setId(notificationModel.getId());
        notification.setUserId(notificationModel.getUserId());
        notification.setNotificationType(notificationModel.getNotificationType());
        notification.setDescription(notificationModel.getDescription());
        notification.setHeading(notificationModel.getHeading());
        notification.setUnread(notificationModel.isUnread());
        return notification;
    }
}
