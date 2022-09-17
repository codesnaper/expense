package com.expense.expensemanagement.service.notification;

import com.expense.expensemanagement.model.NotificationModel;
import com.expense.expensemanagement.model.NotificationSocketMessage;
import com.expense.expensemanagement.model.NotificationType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class NotificationService implements INotificationService{

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @SendToUser
    public void sendNotificationToUser(String userId, NotificationSocketMessage<NotificationModel> notification){
        Assert.notNull(userId,"Userid should be present");
        log.debug("Sending Notification to user...");
        Map<String, Object> header = new HashMap<>();
        header.put("TYPE","ADD");
        System.out.println(userId);
        messagingTemplate.convertAndSendToUser(userId, "/queue/notification", notification, header);
        log.debug("Notification [{0}] has been send to user [{1}]", notification, userId);
        log.info("Send notification to user {0}",userId);
    }

    @Override
    public void sendNewNotification(String userid, String heading, String description, NotificationType notificationType) {
        NotificationSocketMessage<NotificationModel> message = new NotificationSocketMessage<>();
        NotificationModel notificationModel = new NotificationModel();
        notificationModel.setHeading(heading);
        notificationModel.setDescription(description);
        notificationModel.setNotificationType(notificationType);
        notificationModel.setUnread(true);
        notificationModel.setDate(new Date());
        //TODO: save this model into db also
        message.setT(notificationModel);
        message.setNotificationType("APPEND");
        messagingTemplate.convertAndSendToUser(userid, "/queue/notification", message);
    }


}
