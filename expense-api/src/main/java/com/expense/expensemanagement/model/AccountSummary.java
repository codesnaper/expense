package com.expense.expensemanagement.model;

import lombok.Data;

@Data
public class AccountSummary {

    private AccountType accountType;

    private int count;
}
