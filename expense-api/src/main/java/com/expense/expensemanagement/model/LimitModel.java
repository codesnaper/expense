package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.OneToMany;

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

    private String resetRecursively;

    private Long categoryId;

    private String priority;

    private String usedAmount;
}
