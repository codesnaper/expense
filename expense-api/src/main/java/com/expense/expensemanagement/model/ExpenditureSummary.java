package com.expense.expensemanagement.model;

import lombok.Data;

@Data
public class ExpenditureSummary {

    private int month;

    private double amount;

    private ExpenditureType type;

    private String year;
}
