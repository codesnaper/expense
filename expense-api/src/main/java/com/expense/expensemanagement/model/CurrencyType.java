package com.expense.expensemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CurrencyType {

    INR("inr"), USD("usd"), EUR("eur"), ZLOTTY("pln");
    private String symbol;

}
