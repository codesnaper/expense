package com.expense.expensemanagement.service.account;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.*;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.AccountType;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.bank.IBankService;
import com.expense.expensemanagement.service.tagMapping.TagMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountService implements IAccountService {

    private final AccountDAO accountDAO;

    private final BankDAO bankDAO;

    private final IAddAccountService addAccountService;

    private final IBankService bankService;

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
    public AccountModel addAccount(AccountModel accountModel, long bankid) {
        return this.addAccountService.addAccount(accountModel, bankid);
    }

    @Override
    @Transactional
    public ResponseList<? extends AccountModel> getAccount(long bankId, AccountType accountType, int pageNo, int pageSize) {
        Page<? extends Account> accounts;
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        switch (accountType) {
            case ACCOUNT:
                accounts = this.accountDAO.findByBank(bankId, pageRequest);
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
    public void deleteAccount(long accountId){
        this.accountDAO.deleteById(accountId);
    }

    @Override
    @Transactional
    public List<Object[]> getAccountGroupCount(long bankId){
        return this.accountDAO.accountGroupType(bankId);
    }

}
