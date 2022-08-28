package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.ResponseList;

public interface IAccountService {

    /**
     * Method will add the account for the bank
     * @param accountModel
     * @return
     */
    AccountModel addAccount(AccountModel accountModel, long bankId);

    /**
     * Method will fetch all the account based on bankid
     * @param bankId
     * @param page
     * @param size
     * @return
     */
    ResponseList<Account> getAllAccountByBank(long bankId, int page, int size);

}
