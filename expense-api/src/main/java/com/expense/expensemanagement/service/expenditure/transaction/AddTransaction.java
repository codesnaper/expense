package com.expense.expensemanagement.service.expenditure.transaction;

import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.service.account.AccountService;
import com.expense.expensemanagement.service.bank.BankService;
import com.expense.expensemanagement.service.limit.LimitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.NoSuchElementException;

@Service("addTransaction")
public class AddTransaction implements Transaction{

    @Autowired
    BankService bankService;

    @Autowired
    AccountService accountService;

    @Autowired
    LimitService limitService;

    @Autowired
    AccountDAO accountDAO;

    @Transactional
    public void expenseTransaction(ExpenditureModel expenditureModel){
        double amount = 0;
        if(expenditureModel.getLimit() != null){
            LimitModel limitModel = expenditureModel.getLimit();
            amount = limitModel.getUsedAmount() + expenditureModel.getAmount();
            limitModel.setUsedAmount((long) amount);
            limitService.updateLimit(limitModel);
        }
        AccountModel accountModel = expenditureModel.getAccount();
        amount = accountModel.getAmount() - expenditureModel.getAmount();
        accountModel.setAmount(amount);
        accountService.updateAccount(accountModel, expenditureModel.getUserId());
        BankModel bank = accountModel.getBank();
        amount = bank.getCreditAmount().doubleValue() - expenditureModel.getAmount();
        bank.setCreditAmount(new BigDecimal(amount));
        bankService.updateBank(bank);
    }

    @Transactional
    public void revenueTransaction(ExpenditureModel expenditureModel){
        double amount = 0;
        if(expenditureModel.getLimit() != null){
            LimitModel limitModel = expenditureModel.getLimit();
            amount = limitModel.getUsedAmount() - expenditureModel.getAmount();
            limitModel.setUsedAmount((long) amount);
            limitService.updateLimit(limitModel);
        }
        AccountModel accountModel = expenditureModel.getAccount();
        amount = accountModel.getAmount() + expenditureModel.getAmount();
        accountModel.setAmount(amount);
        accountService.updateAccount(accountModel, expenditureModel.getUserId());
        BankModel bank = accountModel.getBank();
        amount = bank.getCreditAmount().doubleValue() + expenditureModel.getAmount();
        bank.setCreditAmount(new BigDecimal(amount));
        bankService.updateBank(bank);
    }

    @Transactional
    public void transferTransaction(ExpenditureModel expenditureModel){
        double amount = 0;
        Account account = accountDAO.findById(expenditureModel.getFromAccount().getId()).orElseThrow(NoSuchElementException::new);
        if(account.getAccountType().equalsIgnoreCase(AccountType.LOAN.getAccountType())){
            BankModel bank = expenditureModel.getAccount().getBank();
            amount = bank.getDebitAmount().doubleValue() - expenditureModel.getAmount();
            bank.setDebitAmount(new BigDecimal(amount));
            bankService.updateBank(bank);
        }
        AccountModel accountModel = expenditureModel.getAccount();
        amount = accountModel.getAmount() - expenditureModel.getAmount();
        accountModel.setAmount(amount);
        accountService.updateAccount(accountModel, expenditureModel.getUserId());
        accountModel = expenditureModel.getFromAccount();
        if(account.getAccountType().equalsIgnoreCase(AccountType.LOAN.getAccountType())){
            amount = accountModel.getAmount() - expenditureModel.getAmount();
        } else {
            amount = accountModel.getAmount() + expenditureModel.getAmount();
        }
        accountModel.setAmount(amount);
        accountService.updateAccount(accountModel, expenditureModel.getUserId());
    }
}
