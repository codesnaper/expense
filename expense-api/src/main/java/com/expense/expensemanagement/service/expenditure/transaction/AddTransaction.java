package com.expense.expensemanagement.service.expenditure.transaction;

import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.BankDAO;
import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.exception.AmountInsufficientException;
import com.expense.expensemanagement.model.AccountType;
import com.expense.expensemanagement.model.ExpenditureModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.NoSuchElementException;

@Service("addTransaction")
public class AddTransaction implements Transaction{

    @Autowired
    AccountDAO accountDAO;

    @Autowired
    BankDAO bankDAO;

    @Autowired
    LimitDao limitDao;

    @Transactional
    public void expenseTransaction(ExpenditureModel expenditureModel) throws AmountInsufficientException {
        double amount = 0;
        if(expenditureModel.getAccount().getAmount() < expenditureModel.getAmount()){
            throw new AmountInsufficientException("Insufficient amount in account");
        }
        if(expenditureModel.getLimit() != null){
            Limit limit = limitDao.findById(expenditureModel.getLimit().getId()).orElseThrow(() -> {throw new NoSuchElementException("Limit not found");});
            amount = limit.getUsedAmount().doubleValue() + expenditureModel.getAmount();
            limit.setUsedAmount(new BigDecimal(amount));
            limitDao.save(limit);
        }
        Account account = accountDAO.findById(expenditureModel.getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
        amount = account.getAmount().doubleValue() - expenditureModel.getAmount();
        account.setAmount(new BigDecimal(amount));
        accountDAO.save(account);
        Bank bank = bankDAO.findById(account.getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
        amount = bank.getCreditAmount().doubleValue() - expenditureModel.getAmount();
        bank.setCreditAmount(new BigDecimal(amount));
        bankDAO.save(bank);
    }

    @Transactional
    public void revenueTransaction(ExpenditureModel expenditureModel){
        double amount = 0;
        Account account = accountDAO.findById(expenditureModel.getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
        amount = account.getAmount().doubleValue() + expenditureModel.getAmount();
        account.setAmount(new BigDecimal(amount));
        accountDAO.save(account);
        Bank bank = bankDAO.findById(account.getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
        amount = bank.getCreditAmount().doubleValue() + expenditureModel.getAmount();
        bank.setCreditAmount(new BigDecimal(amount));
        bankDAO.save(bank);
    }

    @Transactional
    public void transferTransaction(ExpenditureModel expenditureModel) throws AmountInsufficientException {
        double amount = 0;
        double fromAmount = 0;
        if(expenditureModel.getAccount().getAmount() < expenditureModel.getAmount()){
            throw new AmountInsufficientException("Account don't have much amount to transfer");
        }
        double toAmount = expenditureModel.getAccount().getAmount() - expenditureModel.getAmount();
        Account account = accountDAO.findById(expenditureModel.getAccount().getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
        account.setAmount(new BigDecimal(toAmount));
        accountDAO.save(account);
        account = accountDAO.findById(expenditureModel.getFromAccount().getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer to Account is not found");});
        if(account.getAccountType().equalsIgnoreCase(AccountType.LOAN.getAccountType())){
            fromAmount = expenditureModel.getFromAccount().getAmount() - expenditureModel.getAmount();
            Bank bank = bankDAO.findById(expenditureModel.getFromAccount().getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
            amount = bank.getDebitAmount().doubleValue() - expenditureModel.getAmount();
            bank.setDebitAmount(new BigDecimal(amount));
            if(expenditureModel.getAccount().getBankId() == expenditureModel.getFromAccount().getBankId()){
                bankDAO.save(bank);
                bank = bankDAO.findById(expenditureModel.getAccount().getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
            }
            amount = bank.getCreditAmount().doubleValue() - expenditureModel.getAmount();
            bank.setCreditAmount(new BigDecimal(amount));
            bankDAO.save(bank);
        } else {
            fromAmount = expenditureModel.getFromAccount().getAmount() + expenditureModel.getAmount();
        }
        account.setAmount(new BigDecimal(fromAmount));
        accountDAO.save(account);
    }
}
