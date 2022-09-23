package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.service.account.IAccountService;
import com.expense.expensemanagement.util.ExpenseUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/expense/api/v1/bank/{bank-id}/account")
@Slf4j
public class AccountController {

    private final IAccountService accountService;

    @Autowired
    public AccountController(IAccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(value = "${expense.account.bank.add}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    @LogExecutionTime
    public AccountModel addLoanAccount(
            @RequestBody() Object accountModel,
            @PathVariable("bank-id") long bankId,
            @PathVariable("account-type") AccountType accountType,
            Principal principal
            ){
        AccountModel accountModelResponse = convertAccountModel(accountType,accountModel);
        accountModelResponse.setUserId(ExpenseUtil.getUserId(principal));
        accountModelResponse = this.accountService.addAccount(accountModelResponse, bankId);
        return accountModelResponse;
    }

    @PutMapping(value = "${expense.account.bank.update}" , produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public AccountModel updateAccount(
            @RequestBody Object accountModel,
            @PathVariable("account-type") AccountType accountType,
            Principal principal
    ){
        AccountModel accountModelResponse = convertAccountModel(accountType,accountModel);
        return this.accountService.updateAccount(accountModelResponse, ExpenseUtil.getUserId(principal));
    }

    @DeleteMapping(value = "${expense.account.bank.delete}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteAccount(
            @PathVariable("account-id") long accountId,
            Principal principal
    ){
        this.accountService.deleteAccount(accountId, ExpenseUtil.getUserId(principal));
    }

    @GetMapping(value = "${expense.account.bank.get}", produces = MediaType.APPLICATION_JSON_VALUE)
    public AccountModel getAccountModel(
            @PathVariable("account-id") long accountId
    ) {
        return null;
    }

    @GetMapping(value = "/type={account-type}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<? extends AccountModel> accountModelResponseList(
            @PathVariable("account-type") AccountType accountType,
            @PathVariable("bank-id") long bankId,
            @RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
            @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize
    ){
        return this.accountService.getAccount(bankId, accountType, pageNo,pageSize);
    }

    @GetMapping(value = "/summary", produces= MediaType.APPLICATION_JSON_VALUE)
    public List<AccountSummary> getSummary(
            @PathVariable("bank-id")long bankId,
            Principal principal
    ){
        return this.accountService.getAccountGroupCount(bankId, ExpenseUtil.getUserId(principal));
    }

    private AccountModel convertAccountModel(AccountType accountType, Object account){
        switch (accountType){
            case LOAN:
                return new ObjectMapper().convertValue(account,LoanAccountModel.class);
            case SAVING_INTEREST:
                return new ObjectMapper().convertValue(account,SIAccountModel.class);
            case SAVING_COMPOUND_INTEREST:
                return new ObjectMapper().convertValue(account, SavingCompoundInterestModel.class);
            case ACCOUNT:
                return new ObjectMapper().convertValue(account, AccountModel.class);
            case MONEY_LENDING:
                AccountModel accountModel = new ObjectMapper().convertValue(account, LoanAccountModel.class);
                ((LoanAccountModel) accountModel).setLendType(true);
                return accountModel;
            default:
                throw new IllegalArgumentException("Account type not supported");
        }
    }
}
