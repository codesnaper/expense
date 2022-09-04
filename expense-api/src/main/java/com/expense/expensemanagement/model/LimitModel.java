package com.expense.expensemanagement.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.OneToMany;

@Data
public class LimitModel {
    private long id;

    private String userid;

    private String name;

    private String description;

    private Long account_id;

    private Long min_amount;

    private Long max_amount;

    private Long thresold_warning_amount;

    private String reset_recursively;

    private Long category_id;

    private String priority;

    private String used_amount;
}
