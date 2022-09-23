package com.expense.expensemanagement.service.notification;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.NotificationDao;
import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.NotificationCount;
import com.expense.expensemanagement.model.NotificationModel;
import com.expense.expensemanagement.model.NotificationSocketMessage;
import com.expense.expensemanagement.model.NotificationType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationService implements INotificationService{

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private NotificationDao notificationDao;

    @Autowired
    @Qualifier("notificationConversion")
    private EntityModalConversion<Notification, NotificationModel> entityModalConversion;

    @Override
    public void sendNewNotification(String userid, String heading, String description, NotificationType notificationType) {
        NotificationSocketMessage<NotificationModel> message = new NotificationSocketMessage<>();
        NotificationModel notificationModel = new NotificationModel();
        notificationModel.setHeading(heading);
        notificationModel.setDescription(description);
        notificationModel.setNotificationType(notificationType);
        notificationModel.setUnread(true);
        notificationModel.setUserId(userid);
        Notification notification = notificationDao.save(entityModalConversion.getEntity(notificationModel));
        message.setT(entityModalConversion.getModel(notification));
        message.setNotificationType("APPEND");
        messagingTemplate.convertAndSendToUser(userid, "/queue/notification", message);
        this.broadcastUnreadNotificationCount(userid);
    }

    public void getNotifications(String userId){
        NotificationSocketMessage<NotificationModel> message = new NotificationSocketMessage<>();
        message.setTs(
                notificationDao.findByUserId(userId)
                        .stream()
                        .map(entityModalConversion::getModel)
                        .collect(Collectors.toList())
        );
        message.setNotificationType("NEW");
        messagingTemplate.convertAndSendToUser(userId, "/queue/notification", message);
        this.broadcastUnreadNotificationCount(userId);
    }

    public void broadcastNewNotificationToAllUser(String heading, String description, NotificationType notificationType){
        NotificationModel notificationModel = new NotificationModel();
        notificationModel.setUserId("-1");
        notificationModel.setNotificationType(notificationType);
        notificationModel.setHeading(heading);
        notificationModel.setDescription(description);
        Notification notification = this.notificationDao.save(entityModalConversion.getEntity(notificationModel));
        NotificationSocketMessage<NotificationModel> message = new NotificationSocketMessage<>();
        message.setT(entityModalConversion.getModel(notification));
        message.setNotificationType("APPEND");
        messagingTemplate.convertAndSend("/expense/ws/topic/broadcast", new GenericMessage<>(message));
    }

    public void removeNotification(long id, String userId){
        Notification notification = this.notificationDao.findByUserIdAndId(userId, id).orElseThrow(NoSuchElementException::new);
        notificationDao.delete(notification);
        this.broadcastUnreadNotificationCount(userId);
    }

    @Override
    public void readNotification(long id, String userId) {
        Notification notification = this.notificationDao.findByUserIdAndId(userId, id).orElseThrow(NoSuchElementException::new);
        notification.setUnread(false);
        notificationDao.save(notification);
        this.broadcastUnreadNotificationCount(userId);
    }

    private List<NotificationModel> getNotificationForAllUser(){
        return notificationDao.findByUserId("-1")
                .stream()
                .map(entityModalConversion::getModel)
                .collect(Collectors.toList());
    }

    @Override
    public void broadcastUnreadNotificationCount(String userId) {
        int count = this.notificationDao.countByUserIdAndIsUnread(userId, true);
        NotificationSocketMessage<NotificationCount> message = new NotificationSocketMessage<>();
        NotificationCount notificationCount = new NotificationCount();
        notificationCount.setCount(count);
        message.setT(notificationCount);
        message.setNotificationType("COUNT");
        messagingTemplate.convertAndSendToUser(userId, "/queue/count-notification",message);
    }
}
