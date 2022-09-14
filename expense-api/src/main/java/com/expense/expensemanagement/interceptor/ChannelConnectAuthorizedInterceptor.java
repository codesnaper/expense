package com.expense.expensemanagement.interceptor;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

import java.security.Principal;

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
                stompHeaderAccessor.setLogin(((UserContext) authentication.getPrincipal()).getUsername());

            } catch (Exception e){
                throw e;
            }
        }
        return ChannelInterceptor.super.preSend(message, channel);

    }


}
