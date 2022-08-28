package com.expense.expensemanagement.model;

import lombok.Data;

import javax.persistence.Column;

@Data
public class Category {
    private Long id;

    private String userID;

    private String name;
    
    private String description;
}
