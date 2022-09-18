package com.expense.expensemanagement.model;

import lombok.Data;

import javax.persistence.Transient;
import java.util.Date;

@Data
public class NotificationModel {

    private long id;

    private String heading;

    private String description;

    private boolean isUnread;

    private NotificationType notificationType;

    private Date date;

    @Transient
    private String userId;

}
