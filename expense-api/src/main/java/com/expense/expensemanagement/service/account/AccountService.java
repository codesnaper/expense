package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.*;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.LoanAccount;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.service.bank.IBankService;
import com.expense.expensemanagement.service.tagMapping.TagMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class AccountService implements IAccountService {

    private final AccountDAO accountDAO;

    private final BankDAO bankDAO;

    private final IAddAccountService addAccountService;

    private final IBankService bankService;

    @Autowired
    private TagMappingDAO tagMappingDAO;

    @Autowired
    private LoanAccountDAO loanAccountDAO;

    @Autowired
    private SavingCompoundInterestAccountDAO savingCompoundInterestAccountDAO;

    @Autowired
    private SavingInterestAccountDAO savingInterestAccountDAO;

    @Autowired
    @Qualifier("AccountEntityModel")
    private EntityModalConversion<Account, AccountModel> accountEntityModel;

    @Autowired
    public AccountService(AccountDAO accountDAO, BankDAO bankDAO, IAddAccountService addAccountService, TagMapping tagMappingService, IBankService bankService) {
        this.accountDAO = accountDAO;
        this.bankDAO = bankDAO;
        this.addAccountService = addAccountService;
        this.bankService = bankService;
    }

    @Transactional
    @Override
    public AccountModel
    addAccount(AccountModel accountModel, long bankid) {
        try{
            return this.addAccountService.addAccount(accountModel, bankid);
        } catch (DataIntegrityViolationException ex){
            ex.printStackTrace();
            throw new DuplicateKeyException("number: Account Number already exits. It should be unique");
        } catch (Exception ex){
            throw ex;
        }
    }

    @Override
    @Transactional
    public ResponseList<? extends AccountModel> getAccount(long bankId, AccountType accountType, int pageNo, int pageSize) {
        Page<? extends Account> accounts;
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        switch (accountType) {
            case ALL:
                accounts = this.accountDAO.findByBankId(bankId, pageRequest);
                break;
            case ACCOUNT:
                accounts = this.accountDAO.findByBankIdAndAccountType(bankId, AccountTypeValue.ACCOUNT, pageRequest);
                break;
            case LOAN:
                accounts = this.loanAccountDAO.findByBankIdAndLendAccount(bankId, false, pageRequest);
                break;
            case SAVING_INTEREST:
                accounts = this.savingInterestAccountDAO.findByBank(bankId, pageRequest);
                break;
            case SAVING_COMPOUND_INTEREST:
                accounts = this.savingCompoundInterestAccountDAO.findByBank(bankId, pageRequest);
                break;
            case MONEY_LENDING:
                accounts = this.loanAccountDAO.findByBankIdAndLendAccount(bankId, true, pageRequest);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + accountType);
        }
        ResponseList<AccountModel> accountResponseList = new ResponseList<>();
        accountResponseList.setData(accounts.stream().parallel().map(account -> accountEntityModel.getModel(account)).collect(Collectors.toList()));
        accountResponseList.setPageNo(accounts.getNumber());
        accountResponseList.setTotalPage(accounts.getTotalPages());
        accountResponseList.setTotalCount(accounts.getTotalElements());
        return accountResponseList;
    }

    @Override
    @Transactional
    public void deleteAccount(long accountId, String userId){
        Account account = this.accountDAO.findByUserIdAndId(userId, accountId).orElseThrow(() -> new NoSuchElementException("Account not found"));
        account.getTagMappings().stream()
                .forEach(tagMapping -> this.tagMappingDAO.delete(tagMapping));
        Bank bank = bankService.findById(account.getBankId());
        bank.setNAccount(bank.getNAccount() - 1);
        if(account.getAccountType().equals(AccountTypeValue.ACCOUNT)){
            bank.setCreditAmount(bank.getCreditAmount().add(account.getAmount().multiply(new BigDecimal(-1))));
        }
        this.accountDAO.deleteById(account.getId());
    }

    @Override
    @Transactional
    public List<AccountSummary> getAccountGroupCount(long bankId, String userId){
        List<Map<String, Object>> summariesMap =  this.accountDAO.accountGroupType(bankId, userId);
        return summariesMap.stream()
                .map(summaryMap -> {
                    AccountSummary accountSummary = new AccountSummary();
                    accountSummary.setAccountType(AccountType.valueOfAccountType(summaryMap.get("accountType").toString()));
                    accountSummary.setCount(Integer.parseInt(summaryMap.get("cnt").toString()));
                    return accountSummary;
                }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AccountModel updateAccount(AccountModel accountModel, String userId) {
        Account currentAccount = accountDAO.findByUserIdAndId(userId, accountModel.getId()).orElseThrow(NoSuchElementException:: new);
        Bank bank = bankService.findById(accountModel.getBank().getId());
        Account account = accountEntityModel.getEntity(accountModel);
        if(accountModel instanceof LoanAccountModel){
            BigDecimal amount = account.getAmount().add(((LoanAccount) currentAccount).getTotalPayment().multiply(new BigDecimal(-1)));
            bank.setDebitAmount(bank.getDebitAmount().add(amount.multiply(new BigDecimal(-1))));
        } else {
            BigDecimal amount = account.getAmount().add(currentAccount.getAmount().multiply(new BigDecimal(-1)));
            bank.setCreditAmount(bank.getCreditAmount().add(amount.multiply(new BigDecimal(-1))));
        }
        bankDAO.save(bank);
        accountDAO.save(account);
        return accountEntityModel.getModel(account);
    }
}
