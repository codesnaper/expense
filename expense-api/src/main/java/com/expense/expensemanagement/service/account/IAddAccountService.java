package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.model.AccountModel;

public interface IAddAccountService {

    AccountModel addAccount(AccountModel accountModel, long bankid);
}
