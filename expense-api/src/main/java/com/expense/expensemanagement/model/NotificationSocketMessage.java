package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class NotificationSocketMessage<T extends NotificationModel>{

    @JsonProperty("notification")
    private T t;

    @JsonProperty("notifications")
    private List<T> ts;

    @JsonProperty("operation")
    private String notificationType;
}
