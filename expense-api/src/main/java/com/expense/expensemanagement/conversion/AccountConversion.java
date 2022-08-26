package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.*;
import com.expense.expensemanagement.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Component("AccountEntityModel")
public class AccountConversion implements EntityModalConversion<Account, AccountModel> {

    @Autowired
    @Qualifier("BankEntityModel")
    private EntityModalConversion<Bank, BankModel> bankEntityModelConversion;

    @Autowired
    @Qualifier("TagEntityModel")
    private EntityModalConversion<Tag, TagModel> tagEntityModalConversion;

    @Override
    public AccountModel getModel(Account account) {
        AccountModel accountModel = new AccountModel();
        if(account instanceof LoanAccount){
            accountModel = new LoanAccountModel();
            ((LoanAccountModel)accountModel).setTotalInterestAmount(Optional.ofNullable(((LoanAccount) account).getTotalInterestAmount().doubleValue()).orElse((double)0));
            ((LoanAccountModel) accountModel).setTotalPayment(Optional.ofNullable(((LoanAccount) account).getTotalPayment().doubleValue()).orElse((double)0));
            ((LoanAccountModel) accountModel).setTotalEMI(((LoanAccount) account).getTotalEMI());
            ((LoanAccountModel) accountModel).setEmiPaid(Optional.ofNullable(((LoanAccount) account).getEmiPaid()).orElse(0));
            ((LoanAccountModel) accountModel).setInterestAmount(Optional.ofNullable(((LoanAccount) account).getInterestAmount()).orElse((double) 0));
            ((LoanAccountModel) accountModel).setRate(Optional.ofNullable(((LoanAccountModel) accountModel).getRate()).orElse(0f));
        } else if( account instanceof SavingInterestAccount) {
            accountModel = new SIAccountModel();
            ((SIAccountModel) accountModel).setRate(((SavingInterestAccount) account).getRate());
            ((SIAccountModel) accountModel).setTenure(((SavingInterestAccount) account).getTenure());
            ((SIAccountModel) accountModel).setMaturityAmount(((SavingInterestAccount) account).getMaturityAmount().doubleValue());
        }
        accountModel.setId(account.getId());
        accountModel.setAccountNumber(account.getAccountNumber());
        accountModel.setAmount(account.getAmount().doubleValue());
        accountModel.setName(account.getName());
        accountModel.setOpenDate(account.getOpenDate());
        accountModel.setUserId(account.getUserId());
        accountModel.setTags(
                Optional.ofNullable(account.getTagMappings())
                .orElse(new ArrayList<>())
                .parallelStream()
                .map(tagMapping -> this.tagEntityModalConversion.getModel(tagMapping.getTags()))
                .collect(Collectors.toList())
        );
        return accountModel;
    }

    @Override
    public Account getEntity(AccountModel accountModel) {
        Account account = new Account();
        if(accountModel instanceof LoanAccountModel){
            account = new LoanAccount();
            ((LoanAccount)account).setEmiPaid(((LoanAccountModel) accountModel).getEmiPaid());
            ((LoanAccount)account).setRate(((LoanAccountModel) accountModel).getRate());
            ((LoanAccount)account).setTenure(((LoanAccountModel) accountModel).getTenure());
        } else if( accountModel instanceof SIAccountModel) {
            account = new SavingInterestAccount();
            ((SavingInterestAccount)account).setRate(((SIAccountModel) accountModel).getRate());
            ((SavingInterestAccount)account).setTenure(((SIAccountModel) accountModel).getTenure());
        }

        account.setBank(bankEntityModelConversion.getEntity(Optional.ofNullable(accountModel.getBank()).orElse(new BankModel())));
        account.setOpenDate(accountModel.getOpenDate());
        account.setAccountNumber(accountModel.getAccountNumber());
        account.setAmount(new BigDecimal(accountModel.getAmount()));
        account.setId(Optional.ofNullable(accountModel.getId()).orElse(null));
        account.setName(accountModel.getName());
        account.setOpenDate(accountModel.getOpenDate());
        return account;
    }
}
