package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.BankDAO;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.LoanAccount;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.LoanAccountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AccountService implements IAccountService{

    private final AccountDAO accountDAO;

    private final BankDAO bankDAO;

    @Autowired
    @Qualifier("AccountEntityModel")
    private EntityModalConversion<Account, AccountModel> accountEntityModel;

    @Autowired
    public AccountService(AccountDAO accountDAO, BankDAO bankDAO) {
        this.accountDAO = accountDAO;
        this.bankDAO = bankDAO;
    }

    public AccountModel addLoanAccount(AccountModel accountModel){
        Account account = this.accountDAO.save(accountEntityModel.getEntity(accountModel));
        accountModel.setId(account.getId());
        BankModel bank = accountModel.getBank();
        bank.setTotalAccount(bank.getTotalAccount() + 1);
        if(accountModel instanceof LoanAccountModel){
            bank.setDebitAmount(new BigDecimal(((LoanAccountModel) accountModel).getTotalPayment() + bank.getCreditAmount().doubleValue()));
        }
        return accountEntityModel.getModel(account);
    }



}
