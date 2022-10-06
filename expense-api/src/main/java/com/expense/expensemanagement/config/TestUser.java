package com.expense.expensemanagement.config;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserStatusType;
import com.amazonaws.services.cognitoidp.model.UserType;
import com.expense.expensemanagement.model.User;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Configuration
@Profile("local")
@Getter
public class TestUser {
    @Value("${app.user.email}")
    private String userEmail;

    @Value("${app.user.password}")
    private String userPassword;

    @Value("${app.user.name}")
    private String name;

    @Value("${app.secret}")
    private String secret;

    public User user(){
        User user = new User();
        List<AttributeType> attributeTypeList =
                Arrays.asList(
                        new AttributeType().withName("name").withValue(name),
                        new AttributeType().withName("email").withValue(userEmail)
                );
        UserType userType = new UserType()
                .withUsername(userEmail)
                .withUserCreateDate(new Date())
                .withUserStatus(UserStatusType.CONFIRMED)
                .withEnabled(true)
                .withAttributes(attributeTypeList);
        user.setUser(userType);
        return user;
    }
}
