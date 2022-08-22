package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.LoanAccount;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.LoanAccountModel;
import com.expense.expensemanagement.model.TagModel;
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
        AccountModel accountModel;
        if(account instanceof LoanAccount){
            accountModel = new LoanAccountModel();
            ((LoanAccountModel) accountModel).setEmiPaid(Optional.ofNullable(((LoanAccount) account).getEmiPaid()).orElse(0));
            ((LoanAccountModel) accountModel).setInterestAmount(Optional.ofNullable(((LoanAccount) account).getInterestAmount()).orElse(new Double(0)));
            ((LoanAccountModel) accountModel).setRate(Optional.ofNullable(((LoanAccountModel) accountModel).getRate()).orElse(0f));
        } else{
            accountModel = new AccountModel();
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
        Account account;
        if(accountModel instanceof LoanAccountModel){
            account = new LoanAccount();
            ((LoanAccount)account).setEmiPaid(((LoanAccountModel) accountModel).getEmiPaid());
            ((LoanAccount)account).setRate(((LoanAccountModel) accountModel).getRate());
            ((LoanAccount)account).setTenure(((LoanAccountModel) accountModel).getTenure());
        } else{
            account = new Account();
        }
        account.setBank(bankEntityModelConversion.getEntity(accountModel.getBank()));
        account.setOpenDate(accountModel.getOpenDate());
        account.setAccountNumber(accountModel.getAccountNumber());
        account.setAmount(new BigDecimal(accountModel.getAmount()));
        account.setId(Optional.ofNullable(accountModel.getId()).orElse(null));
        account.setName(accountModel.getName());
        account.setOpenDate(accountModel.getOpenDate());
        return account;
    }
}
