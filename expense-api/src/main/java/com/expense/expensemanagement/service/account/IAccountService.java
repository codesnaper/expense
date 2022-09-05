package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.AccountType;
import com.expense.expensemanagement.model.ResponseList;

import java.util.List;

public interface IAccountService {

    /**
     * Method will add the account for the bank
     * @param accountModel
     * @return
     */
    AccountModel addAccount(AccountModel accountModel, long bankId);

    ResponseList<? extends AccountModel> getAccount(long bankId, AccountType accountType, int pageNo, int pageSize);

    void deleteAccount(long accountId, String userId);

    List<Object[]> getAccountGroupCount(long bankId);
}
