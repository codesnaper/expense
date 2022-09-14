package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AppMessage<T>{

    @JsonProperty("data")
    private T t;
}
