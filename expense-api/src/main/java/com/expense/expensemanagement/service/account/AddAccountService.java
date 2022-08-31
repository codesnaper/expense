package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.BankDAO;
import com.expense.expensemanagement.entity.*;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.LoanAccountModel;
import com.expense.expensemanagement.model.SIAccountModel;
import com.expense.expensemanagement.model.SavingCompoundInterestModel;
import com.expense.expensemanagement.service.bank.IBankService;
import com.expense.expensemanagement.service.tagMapping.TagMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@Service
public class AddAccountService implements IAddAccountService {

    private final EntityModalConversion<Account, AccountModel> accountEntityModel;

    private final IBankService bankService;

    private final BankDAO bankDAO;

    private final TagMapping tagMappingService;

    private final AccountDAO accountDAO;

    @Autowired
    public AddAccountService(
            @Qualifier("AccountEntityModel") EntityModalConversion<Account, AccountModel> accountEntityModel,
            IBankService bankService,
            BankDAO bankDAO,
            TagMapping tagMappingService,
            AccountDAO accountDAO) {
        this.accountEntityModel = accountEntityModel;
        this.bankService = bankService;
        this.bankDAO = bankDAO;
        this.tagMappingService = tagMappingService;
        this.accountDAO = accountDAO;
    }

    @Override
    public AccountModel addAccount(AccountModel accountModel, long bankid) {
        Optional.ofNullable(bankid).orElseThrow(() -> new IllegalArgumentException("Bank Id is required"));
        Account account = accountEntityModel.getEntity(accountModel);
        account.getBank().setId(bankid);
        Bank bank = this.bankService.findById(bankid);
        bank.setNAccount(bank.getNAccount() + 1);
        if (accountModel instanceof LoanAccountModel) {
            ((LoanAccount) account).setTenure(calculateTenure(accountModel.getOpenDate(), ((LoanAccountModel) accountModel).getAccountEndDate()));
            calculateLoanInterest((LoanAccount) account);
        } else if (accountModel instanceof SIAccountModel) {
            ((SavingInterestAccount) account).setTenure(calculateTenure(accountModel.getOpenDate(), ((SIAccountModel) accountModel).getAccountEndDate()));
            ((SavingInterestAccount) account).setRate(((SIAccountModel) accountModel).getRate());
            ((SavingInterestAccount) account).setTenure(((SIAccountModel) accountModel).getTenure());
            double interest = (account.getAmount().doubleValue() * ((SavingInterestAccount) account).getRate()
                    * ((SavingInterestAccount) account).getTenure()
            ) / 100;
            ((SavingInterestAccount) account).setMaturityAmount(new BigDecimal((interest + account.getAmount().doubleValue())));
        } else if (accountModel instanceof SavingCompoundInterestModel) {
            ((SavingCompoundInterestAccount) account).setTenure(calculateTenure(accountModel.getOpenDate(), ((SavingCompoundInterestModel) accountModel).getAccountEndDate()));
            calculateSCIAccount((SavingCompoundInterestAccount) account);
        }
        setBankAmount(bank, account);
        try {
            account = this.accountDAO.save(account);
            accountModel.setId(account.getId());
        } catch (DataIntegrityViolationException exception) {
            throw new IllegalArgumentException("Provided Bank data is not available. Please add Bank first.");
        } catch (Exception exception) {
            throw exception;
        }
        this.tagMappingService.addTagMapping(accountModel);
        return accountEntityModel.getModel(account);
    }

    private void calculateLoanInterest(LoanAccount account) {
        float interest = account.getRate() / 100 / 12;
        double x = Math.pow(1 + interest, account.getTenure() * 12);
        double monthly = (account.getAmount().doubleValue() * x * interest) / (x - 1);
        float tenure = account.getTenure() * 12;
        account.setInterestAmount(monthly);
        account.setTotalInterestAmount(new BigDecimal((account.getInterestAmount() * tenure) - account.getAmount().doubleValue()));
        account.setTotalPayment(new BigDecimal(account.getInterestAmount() * tenure));
    }

    private void calculateSCIAccount(SavingCompoundInterestAccount account) {
        float time = account.getCompoundYear() * account.getTenure();
        BigDecimal maturityAmount =
                new BigDecimal(
                        Math.pow(
                                ((1 + account.getRate()) / account.getCompoundYear()) * account.getAmount().doubleValue(),
                                time
                        )
                );
        account.setMaturityAmount(maturityAmount);
    }

    private int calculateTenure(Date accountOpenDate, Date accountEndDate) {
        LocalDate accountOpenLocalDate = accountOpenDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate accountEndLocalDate = accountEndDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Period period = Period.between(accountOpenLocalDate, accountEndLocalDate);
        return period.getYears();
    }

    private void setBankAmount(Bank bank, Account account) {
        if (account instanceof LoanAccount) {
            if (((LoanAccount) account).isLendAccount()) {
                bank.setHoldAmount(bank.getHoldAmount().add(account.getAmount()));
            } else {
                bank.setDebitAmount(account.getAmount().add(account.getAmount()));
            }
        } else if (account instanceof SavingInterestAccount || account instanceof SavingCompoundInterestAccount) {
            bank.setHoldAmount(bank.getHoldAmount().add(account.getAmount()));
        } else {
            bank.setCreditAmount(bank.getCreditAmount().add(account.getAmount()));
        }
    }
}
