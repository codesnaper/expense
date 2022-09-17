package com.expense.expensemanagement.interceptor;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.UserContext;
import org.apache.catalina.User;
import org.apache.catalina.users.AbstractUser;
import org.apache.http.auth.BasicUserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Configuration("connectAuthorizedInterceptor")
public class ChannelConnectAuthorizedInterceptor implements ChannelInterceptor {

    @Autowired
    AuthenticationManager authenticationManager;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor stompHeaderAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (stompHeaderAccessor.getCommand().equals(StompCommand.CONNECT)) {
            String token = stompHeaderAccessor.getPasscode();
            JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(token);
            try{
                Authentication authentication = authenticationManager.authenticate(jwtAuthenticationToken);
                Principal principal = new BasicUserPrincipal(((UserContext) authentication.getPrincipal()).getUsername());
                stompHeaderAccessor.setUser(principal);
            } catch (Exception e){
                throw e;
            }
        }
        return ChannelInterceptor.super.preSend(message, channel);
    }






}
