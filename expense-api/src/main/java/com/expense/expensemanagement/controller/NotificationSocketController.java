package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.exception.AuthenticationFailedException;
import com.expense.expensemanagement.exception.modal.ErrorCode;
import com.expense.expensemanagement.exception.modal.ErrorResponse;
import com.expense.expensemanagement.service.notification.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.NoSuchElementException;

@Controller
public class NotificationSocketController {

    @Autowired
    private INotificationService notificationService;

    @MessageMapping("/notification/refresh")
    public void sendSpecific(Principal user) throws Exception {
        if(user == null && user.getName() == null){
            throw new AuthenticationFailedException("User not known");
        }
        notificationService.getNotifications(user.getName());
    }

    @MessageMapping("/notification/delete/{notificationId}")
    public void deleteNotification(@DestinationVariable long id, Principal user){
        if(user == null && user.getName() == null){
            throw new AuthenticationFailedException("User not known");
        }
        notificationService.removeNotification(id, user.getName());
    }

    @MessageExceptionHandler
    public ErrorResponse handleException(Exception ex){
        ErrorCode errorCode = ErrorCode.WS_NOTIFICATION_REFRESH;
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if(ex instanceof AuthenticationFailedException){
            errorCode = ErrorCode.AUTHENTICATION;
            status = HttpStatus.UNAUTHORIZED;
        } else if (ex instanceof NoSuchElementException) {
            errorCode = ErrorCode.NO_ELEMENT;
            status = HttpStatus.BAD_REQUEST;
        }
        return new ErrorResponse(
                ex.getMessage(), errorCode, status
        );
    }


}
