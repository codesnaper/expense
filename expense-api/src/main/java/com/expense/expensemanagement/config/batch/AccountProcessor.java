package com.expense.expensemanagement.config.batch;

import com.expense.expensemanagement.entity.AccountUser;
import org.springframework.batch.item.ItemProcessor;

public class AccountProcessor implements ItemProcessor<AccountUser,AccountUser> {


    @Override
    public AccountUser process(AccountUser accountUser) throws Exception {
//        if(accountUser.getContactNo()!="+91")
        return accountUser;
    }
}
