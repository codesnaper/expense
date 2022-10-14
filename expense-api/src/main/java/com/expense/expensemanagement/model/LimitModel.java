package com.expense.expensemanagement.model;

import lombok.Data;

@Data
public class LimitModel {
    private long id;

    private String userid;

    private String name;

    private String description;

    private Long accountId;

    private double minAmount;

    private double maxAmount;

    private Long thresoldWarningAmount;

    private Recursive resetRecursively;

    private Long categoryId;

    private String priority;

    private double usedAmount;

    private CategoryModal categoryModal;

    private AccountModel account;
}
