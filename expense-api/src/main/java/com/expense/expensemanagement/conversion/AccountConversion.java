package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.LoanAccount;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.LoanAccountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component("AccountEntityModel")
public class AccountConversion implements EntityModalConversion<Account, AccountModel> {

    @Autowired
    @Qualifier("BankEntityModel")
    private EntityModalConversion<Bank, BankModel> bankEntityModelConversion;
    @Override
    public AccountModel getModel(Account account) {
        AccountModel accountModel = new AccountModel();
        accountModel.setId(account.getId());
        accountModel.setAccountNumber(account.getAccountNumber());
//        accountModel.setBank(account.getBank());
        accountModel.setAmount(account.getAmount().doubleValue());
        accountModel.setName(account.getName());
        accountModel.setOpenDate(account.getOpenDate());
        accountModel.setUserId(account.getUserId());
        accountModel.setBank(bankEntityModelConversion.getModel(account.getBank()));
        if(account instanceof LoanAccount){
            ((LoanAccountModel) accountModel).setEmiPaid(((LoanAccount) account).getEmiPaid());
            ((LoanAccountModel) accountModel).setInterestAmount(((LoanAccount) account).getInterestAmount());
            ((LoanAccountModel) accountModel).setRate(((LoanAccountModel) accountModel).getRate());
            ((LoanAccount) account).setTotalInterestAmount(((LoanAccount) account).getTotalInterestAmount());
            ((LoanAccount) account).setTotalPayment(((LoanAccount) account).getTotalPayment());
        }
        return accountModel;
    }

    @Override
    public Account getEntity(AccountModel accountModel) {
        if(accountModel instanceof LoanAccountModel){
            LoanAccount loanAccount = new LoanAccount();
            loanAccount.setAccountNumber(accountModel.getAccountNumber());
            loanAccount.setAmount(new BigDecimal(accountModel.getAmount()));
//            loanAccount.setBank(accountModel.getBank());
            loanAccount.setId(Optional.ofNullable(accountModel.getId()).orElse(null));
            loanAccount.setName(accountModel.getName());
            loanAccount.setOpenDate(accountModel.getOpenDate());
            loanAccount.setEmiPaid(0);
            loanAccount.setBank(bankEntityModelConversion.getEntity(accountModel.getBank()));
            loanAccount.setRate(((LoanAccountModel) accountModel).getRate());
            loanAccount.setTenure(((LoanAccountModel) accountModel).getTenure());
            calculateLoanInterest(loanAccount);
            return loanAccount;
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
