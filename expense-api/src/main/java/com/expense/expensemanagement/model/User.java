package com.expense.expensemanagement.model;

import java.util.List;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserType;
import org.springframework.util.Assert;

@Data
public class User {

    private Logger logger = LoggerFactory.getLogger(User.class);

    private UserType user;

    private List<String> groups;

    /**
     * The method reads the value of the user attribute
     *
     * @param attributeName
     * @return
     */
    private String getAttribute(String attributeName) {
        logger.debug("Get the value of the attribute : {}", attributeName);
        logger.debug("Iterate thro the available attributes");
        for (AttributeType attribute : user.getAttributes()) {
            logger.debug("Attribute name : {}", attribute.getName());
            if (attribute.getName().equals(attributeName)) {
                return attribute.getValue();
            }
        }
        return null;
    }

    public String getName(){
        return getAttribute("name");
    }

    public String getEmail(){
        return getAttribute("email");
    }

}
