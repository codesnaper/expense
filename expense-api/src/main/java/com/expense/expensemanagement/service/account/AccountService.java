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

    public AccountModel addAccount(AccountModel accountModel){
        BankModel bank = accountModel.getBank();
        bank.setTotalAccount(bank.getTotalAccount() + 1);
        if(accountModel instanceof LoanAccountModel){
            LoanAccount loanAccount = (LoanAccount) accountEntityModel.getEntity((LoanAccountModel) accountModel);
            calculateLoanInterest(loanAccount);
            loanAccount = this.accountDAO.save(loanAccount);
            accountModel.setId(loanAccount.getId());
            bank.setDebitAmount(new BigDecimal(((LoanAccountModel) accountModel).getTotalPayment() + bank.getCreditAmount().doubleValue()));
            loanAccount = this.accountDAO.save(loanAccount);
            return accountEntityModel.getModel(loanAccount);
        }
        return null;
    }

    private void calculateLoanInterest(LoanAccount account){
        float interest = account.getRate() / 100/ 12;
        double x = Math.pow(1+ interest, account.getTenure() * 12);
        double monthly = (account.getAmount().doubleValue() * x * interest)/(x-1);
        float tenure = account.getTenure() * 12;
        account.setInterestAmount(monthly);
        account.setTotalInterestAmount(new BigDecimal((account.getInterestAmount() * tenure) - account.getAmount().doubleValue()));
        account.setTotalPayment(new BigDecimal(account.getInterestAmount() * tenure));
    }



}
