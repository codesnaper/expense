package com.expense.expensemanagement.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import java.sql.Date;

@Data
public class NotificationModel {

    private long id;

    private String heading;

    private String description;

    private String userId;

    private Date createdDate;

    private boolean isUnread;

}
