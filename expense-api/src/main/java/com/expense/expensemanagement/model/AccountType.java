package com.expense.expensemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
public enum AccountType {
    LOAN(AccountTypeValue.LOAN),  SAVING_INTEREST(AccountTypeValue.SAVING_INTEREST), MONEY_LENDING(AccountTypeValue.MONEY_LENDING), ACCOUNT(AccountTypeValue.ACCOUNT), SAVING_COMPOUND_INTEREST(AccountTypeValue.SAVING_COMPOUND_INTEREST), SAVING_ACCOUNT(AccountTypeValue.SAVING_ACCOUNT);

    private String accountType ;

}
