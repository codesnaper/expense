package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.AppMessage;
import com.expense.expensemanagement.model.NotificationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Controller
public class AppSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/generate")
    public void sendSpecific(
            Principal user) throws Exception {
        AppMessage<Notification> message= new AppMessage<>();
        Notification notification = new Notification();
        int cnt = 0;
        while(cnt < 10){
            Thread.sleep(100);
            notification.setHeading("Sample"+ cnt);
            message.setT(notification);
            cnt++;
            System.out.println("Sending");
            simpMessagingTemplate.send("/topic",new GenericMessage<AppMessage>(message));
        }

    }


}
