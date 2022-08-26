package com.expense.expensemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ResponseError {

    private String message;

    private String details;


}
