package com.expense.expensemanagement.service.expenditure.transaction;

import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.BankDAO;
import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.exception.AmountInsufficientException;
import com.expense.expensemanagement.fxrates.FXConversion;
import com.expense.expensemanagement.model.AccountType;
import com.expense.expensemanagement.model.CurrencyType;
import com.expense.expensemanagement.model.ExpenditureModel;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.NoSuchElementException;

@Service("addTransaction")
@AllArgsConstructor
public class AddTransaction implements Transaction{

    AccountDAO accountDAO;

    BankDAO bankDAO;

    LimitDao limitDao;

    FXConversion fxConversion;

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
        Account account = accountDAO.findById(expenditureModel.getAccount().getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
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
        Account account = accountDAO.findById(expenditureModel.getAccount().getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
        amount = account.getAmount().doubleValue() + expenditureModel.getAmount();
        account.setAmount(new BigDecimal(amount));
        accountDAO.save(account);
        Bank bank = bankDAO.findById(account.getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
        amount = bank.getCreditAmount().doubleValue() + expenditureModel.getAmount();
        bank.setCreditAmount(new BigDecimal(amount));
        bankDAO.save(bank);
    }

    @Transactional
    public void transferTransaction(ExpenditureModel expenditureModel) throws Exception {
        double fromAmount,rate= 0, toAmount;
        BigDecimal amount;
        if(expenditureModel.getAccount().getAmount() < expenditureModel.getAmount()){
            throw new AmountInsufficientException("Account don't have much amount to transfer");
        }
        Bank toBank = bankDAO.findById(expenditureModel.getAccount().getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
        Bank fromBank = expenditureModel.getAccount().getBankId() == expenditureModel.getFromAccount().getBankId() ?
                toBank: bankDAO.findById(expenditureModel.getFromAccount().getBankId()).orElseThrow(()-> {throw new NoSuchElementException("Bank Not found");});
        Account toAccount = accountDAO.findById(expenditureModel.getAccount().getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
        Account fromAccount = accountDAO.findById(expenditureModel.getFromAccount().getId()).orElseThrow(() -> {throw new NoSuchElementException("Transfer from Account is not found");});
        toAmount = expenditureModel.getAmount();
        CurrencyType fromBankCurrencyType = bankDAO.findById(expenditureModel.getFromAccount().getBankId()).orElseThrow(() -> {throw new NoSuchElementException("Bank Not found");})
                .getCurrency();
        CurrencyType toBankCurrencyType = bankDAO.findById(expenditureModel.getAccount().getBankId()).orElseThrow(() -> {throw new NoSuchElementException("Bank Not found");})
                .getCurrency();
        if(toBankCurrencyType != fromBankCurrencyType){
            rate = fxConversion.getRate(toBankCurrencyType, fromBankCurrencyType);
        }
        fromAmount = expenditureModel.getAmount() * rate;
        if(fromAccount.getAccountType().equalsIgnoreCase(AccountType.LOAN.getAccountType())){
            amount = toAccount.getAmount().add(new BigDecimal(toAmount * -1));
            toAccount.setAmount(amount);
            amount = fromAccount.getAmount().add(new BigDecimal(fromAmount * -1));
            fromAccount.setAmount(amount);
            accountDAO.saveAll(Arrays.asList(toAccount, fromAccount));
            amount = toBank.getCreditAmount().add(new BigDecimal(toAmount * -1));
            toBank.setCreditAmount(amount);
            amount = fromBank.getDebitAmount().add(new BigDecimal(fromAmount * -1));
            fromBank.setDebitAmount(amount);
            bankDAO.saveAll(Arrays.asList(toBank, fromBank));
        } else {
            amount = toAccount.getAmount().add(new BigDecimal(toAmount * -1));
            toAccount.setAmount(amount);
            amount = fromAccount.getAmount().add(new BigDecimal(fromAmount));
            fromAccount.setAmount(amount);
            accountDAO.saveAll(Arrays.asList(toAccount, fromAccount));
            amount = toBank.getCreditAmount().add(new BigDecimal(toAmount * -1));
            toBank.setCreditAmount(amount);
            amount = fromBank.getCreditAmount().add(new BigDecimal(fromAmount));
            fromBank.setCreditAmount(amount);
            bankDAO.saveAll(Arrays.asList(toBank, fromBank));
        }
    }
}
