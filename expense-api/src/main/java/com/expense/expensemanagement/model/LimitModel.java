package com.expense.expensemanagement.model;

import lombok.Data;

@Data
public class LimitModel {
    private long id;

    private String userid;

    private String name;

    private String description;

    private Long accountId;

    private Long minAmount;

    private Long maxAmount;

    private Long thresoldWarningAmount;

    private Recursive resetRecursively;

    private Long categoryId;

    private String priority;

    private long usedAmount;

    private Category category;

    private AccountModel account;
}
