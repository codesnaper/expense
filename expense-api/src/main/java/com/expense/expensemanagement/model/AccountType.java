package com.expense.expensemanagement.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AccountType {
    LOAN(AccountTypeValue.LOAN),  SAVING_INTEREST(AccountTypeValue.SAVING_INTEREST), MONEY_LENDING(AccountTypeValue.MONEY_LENDING), ACCOUNT(AccountTypeValue.ACCOUNT), SAVING_COMPOUND_INTEREST(AccountTypeValue.SAVING_COMPOUND_INTEREST), SAVING_ACCOUNT(AccountTypeValue.SAVING_ACCOUNT)
    ,ALL(AccountTypeValue.ALL);

    private String accountType ;

    public static AccountType valueOfAccountType(String accountType){
        switch (accountType){
            case AccountTypeValue.ACCOUNT:
                return AccountType.ACCOUNT;

            case AccountTypeValue.SAVING_ACCOUNT:
                return AccountType.SAVING_ACCOUNT;

            case AccountTypeValue.LOAN:
                return AccountType.LOAN;

            case AccountTypeValue.SAVING_INTEREST:
                return AccountType.SAVING_ACCOUNT;

            case AccountTypeValue.MONEY_LENDING:
                return AccountType.MONEY_LENDING;

            case AccountTypeValue.SAVING_COMPOUND_INTEREST:
                return AccountType.SAVING_COMPOUND_INTEREST;

            default:
                throw new IllegalArgumentException("Account Type not supported");
        }
    }

}
