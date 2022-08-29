package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ResponseError {

    @JsonProperty("userMessage")
    private String message;

    @JsonProperty("errorDetails")
    private String details;


}
