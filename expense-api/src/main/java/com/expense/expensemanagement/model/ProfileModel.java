package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ProfileModel {

    @JsonIgnore
    private String userId;

    private String theme;

    private CurrencyType selectedCurrency;
}
