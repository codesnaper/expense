package com.expense.expensemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CurrencyType {
    INR("₹"), USD("$"), EUR("€"), ZLOTTY("zl");
    private String symbol;

}
