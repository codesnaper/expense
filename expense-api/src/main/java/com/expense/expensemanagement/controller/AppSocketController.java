package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.AppMessage;
import com.expense.expensemanagement.model.NotificationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/expense/api/v1/app")
public class AppSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void getNotification(Principal principal) throws Exception {
        sendSpecific(principal);
    }

    @MessageMapping("/expense/api/v1/ws")
    public void sendSpecific(
            Principal user) throws Exception {
        AppMessage<Notification> message= new AppMessage<>();
        message.setT(new Notification());

        simpMessagingTemplate.convertAndSendToUser(
                user.getName(), "/expense/api/v1/user/queue", message);
    }


}
