package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.exception.AuthenticationFailedException;
import com.expense.expensemanagement.exception.modal.ErrorCode;
import com.expense.expensemanagement.exception.modal.ErrorResponse;
import com.expense.expensemanagement.model.NotificationModel;
import com.expense.expensemanagement.model.NotificationSocketMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class NotificationSocketController {

    @MessageMapping("/notification/refresh")
    public void sendSpecific(Principal user) throws Exception {
        if(user == null && user.getName() == null){
            throw new AuthenticationFailedException("User not known");
        }
        //fetch notification from service and send to sendNotification

    }

    //            simpMessagingTemplate.convertAndSend("/expense/ws/topic/notification",new GenericMessage<>(messages));

    @MessageMapping("/notification")
    @SendToUser("/queue/notification")
    public NotificationSocketMessage<NotificationModel> sendNotification(NotificationSocketMessage<NotificationModel> message){
        return message;
    }

    @MessageExceptionHandler
    public ErrorResponse handleException(Exception ex){
        return new ErrorResponse(
                ex.getMessage(), ErrorCode.WS_NOTIFICATION_REFRESH, HttpStatus.INTERNAL_SERVER_ERROR
        );
    }


}
