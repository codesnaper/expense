package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.*;
import com.expense.expensemanagement.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Conversion class for Account POJO
 */
@Component("AccountEntityModel")
public class AccountConversion implements EntityModalConversion<Account, AccountModel> {

    @Autowired
    @Qualifier("BankEntityModel")
    private EntityModalConversion<Bank, BankModel> bankEntityModelConversion;

    @Autowired
    @Qualifier("TagEntityModel")
    private EntityModalConversion<Tag, TagModel> tagEntityModalConversion;

    /**
     * {@inheritDoc}
     */
    @Override
    public AccountModel getModel(Account account) {
        AccountModel accountModel = new AccountModel();
        if (account instanceof LoanAccount) {
            accountModel = new LoanAccountModel();
            ((LoanAccountModel) accountModel).setLendType(Optional.of(((LoanAccount) account).isLendAccount()).orElse(false));
            ((LoanAccountModel) accountModel).setTotalInterestAmount(Optional.ofNullable(((LoanAccount) account).getTotalInterestAmount()).orElse(BigDecimal.valueOf(0)).doubleValue());
            ((LoanAccountModel) accountModel).setTotalPayment(Optional.ofNullable(((LoanAccount) account).getTotalPayment()).orElse(BigDecimal.valueOf(0)).doubleValue());
            ((LoanAccountModel) accountModel).setTotalEMI(((LoanAccount) account).getTotalEMI());
            ((LoanAccountModel) accountModel).setEmiPaid(Optional.of(((LoanAccount) account).getEmiPaid()).orElse(0));
            ((LoanAccountModel) accountModel).setInterestAmount(Optional.of(((LoanAccount) account).getInterestAmount()).orElse((double) 0));
            ((LoanAccountModel) accountModel).setRate(Optional.of(((LoanAccount) account).getRate()).orElse(0f));
            ((LoanAccountModel) accountModel).setTenure(Optional.of(((LoanAccount) account).getTenure()).orElse(0f));
        } else if (account instanceof SavingInterestAccount) {
            accountModel = new SIAccountModel();
            ((SIAccountModel) accountModel).setRate(((SavingInterestAccount) account).getRate());
            ((SIAccountModel) accountModel).setTenure(((SavingInterestAccount) account).getTenure());
            ((SIAccountModel) accountModel).setMaturityAmount(Optional.ofNullable(((SavingInterestAccount) account).getMaturityAmount()).orElse(BigDecimal.valueOf(0)).doubleValue());
        } else if (account instanceof SavingCompoundInterestAccount) {
            accountModel = new SavingCompoundInterestModel();
            ((SavingCompoundInterestModel) accountModel).setRate(((SavingCompoundInterestAccount) account).getRate());
            ((SavingCompoundInterestModel) accountModel).setTenure(((SavingCompoundInterestAccount) account).getTenure());
            ((SavingCompoundInterestModel) accountModel).setMaturityAmount(Optional.ofNullable(((SavingCompoundInterestAccount) account).getMaturityAmount()).orElse(BigDecimal.valueOf(0)).doubleValue());
            ((SavingCompoundInterestModel) accountModel).setCompoundYear(Optional.of(((SavingCompoundInterestAccount) account).getCompoundYear()).orElse(0));
        }
        accountModel.setId(account.getId());
        accountModel.setAccountNumber(account.getAccountNumber());
        accountModel.setAmount(account.getAmount().doubleValue());
        accountModel.setName(account.getName());
        accountModel.setOpenDate(account.getOpenDate());
        accountModel.setUserId(account.getUserId());
        accountModel.setBankId(account.getBankId());
        accountModel.setBank(bankEntityModelConversion.getModel(account.getBank()));
        accountModel.setEndDate(account.getEndDate());
        accountModel.setTags(
                Optional.ofNullable(account.getTagMappings())
                        .orElse(new ArrayList<>())
                        .parallelStream()
                        .map(tagMapping -> this.tagEntityModalConversion.getModel(tagMapping.getTags()))
                        .collect(Collectors.toList())
        );
        return accountModel;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Account getEntity(AccountModel accountModel) {
        Account account = new Account();
        if (accountModel instanceof LoanAccountModel) {
            account = new LoanAccount();
            ((LoanAccount) account).setTotalInterestAmount(BigDecimal.valueOf(Optional.of(((LoanAccountModel) accountModel).getTotalInterestAmount()).orElse((double) 0)));
            ((LoanAccount) account).setTotalPayment(BigDecimal.valueOf(Optional.of(((LoanAccountModel) accountModel).getTotalPayment()).orElse((double) 0)));
            ((LoanAccount) account).setLendAccount(Optional.of(((LoanAccountModel) accountModel).isLendType()).orElse(false));
            ((LoanAccount) account).setTotalEMI(((LoanAccountModel) accountModel).getTotalEMI());
            ((LoanAccount) account).setEmiPaid(Optional.of(((LoanAccountModel) accountModel).getEmiPaid()).orElse(0));
            ((LoanAccount) account).setInterestAmount(Optional.of(((LoanAccountModel) accountModel).getInterestAmount()).orElse((double) 0));
            ((LoanAccount) account).setRate(Optional.of(((LoanAccountModel) accountModel).getRate()).orElse(0f));
            ((LoanAccount) account).setTenure(((LoanAccountModel) accountModel).getTenure());
        } else if (accountModel instanceof SIAccountModel) {
            account = new SavingInterestAccount();
            ((SavingInterestAccount) account).setRate(((SIAccountModel) accountModel).getRate());
            ((SavingInterestAccount) account).setTenure(((SIAccountModel) accountModel).getTenure());
            ((SavingInterestAccount) account).setMaturityAmount(BigDecimal.valueOf(((SIAccountModel) accountModel).getMaturityAmount()));
        } else if (accountModel instanceof SavingCompoundInterestModel) {
            account = new SavingCompoundInterestAccount();
            ((SavingCompoundInterestAccount) account).setRate(((SavingCompoundInterestModel) accountModel).getRate());
            ((SavingCompoundInterestAccount) account).setTenure(((SavingCompoundInterestModel) accountModel).getTenure());
            ((SavingCompoundInterestAccount) account).setMaturityAmount(BigDecimal.valueOf(((SavingCompoundInterestModel) accountModel).getMaturityAmount()));
            ((SavingCompoundInterestAccount) account).setCompoundYear(((SavingCompoundInterestModel) accountModel).getCompoundYear());
        }
        account.setBank(bankEntityModelConversion.getEntity(Optional.ofNullable(accountModel.getBank()).orElseThrow(() -> {
            throw new IllegalArgumentException(ErrorConstantMessage.BANK_DATA_NOT_PROVIDED);
        })));
        account.setOpenDate(accountModel.getOpenDate());
        account.setAccountNumber(accountModel.getAccountNumber());
        account.setAmount(BigDecimal.valueOf(accountModel.getAmount()));
        account.setId(Optional.of(accountModel.getId()).orElse(null));
        account.setName(accountModel.getName());
        account.setUserId(accountModel.getUserId());
        account.setOpenDate(accountModel.getOpenDate());
        account.setEndDate(accountModel.getEndDate());
        return account;
    }
}
