package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.entity.SavingInterestAccount;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.service.account.IAccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

@RestController
@RequestMapping(value = "/bank/{bank-id}/account")
public class AccountController {

    private final IAccountService accountService;

    @Autowired
    public AccountController(IAccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(value = "/type={loan-type}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public AccountModel addLoanAccount(
            @RequestBody() Object accountModel,
            @PathVariable("bank-id") long bankid,
            @PathVariable("loan-type") String loanType
            ){
        AccountModel accountModelResponse = convertAccountModel(loanType,accountModel);
        accountModelResponse = this.accountService.addAccount(accountModelResponse, bankid);
        return accountModelResponse;
    }

    @PutMapping(value = "/type={loan-type}" , produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public AccountModel updateAccount(
            @RequestBody Object accountModel,
            @PathVariable("loan-type") String loanType
    ){
        AccountModel accountModelResponse = convertAccountModel(loanType,accountModel);
        return null;
    }

    @DeleteMapping(value = "/{account-id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteAccount(
            @PathVariable("account-id") long accountId
    ){

    }

    @GetMapping(value = "/{account-id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public AccountModel getAccountModel(
            @PathVariable("account-id") long accountId
    ) {
        return null;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<AccountModel> accountModelResponseList(){
        return null;
    }

    private AccountModel convertAccountModel(String loanType, Object account){
        switch (loanType){
            case "loan":
                return new ObjectMapper().convertValue(account,LoanAccountModel.class);
            case "si":
                return new ObjectMapper().convertValue(account,SIAccountModel.class);
            case "sci":
                return new ObjectMapper().convertValue(account, SavingCompoundInterestModel.class);
            case "account":
                return new ObjectMapper().convertValue(account, AccountModel.class);
            case "lend":
                AccountModel accountModel = new ObjectMapper().convertValue(account, LoanAccountModel.class);
                ((LoanAccountModel) accountModel).setLendType(true);
                return accountModel;
            default:
                throw new IllegalArgumentException("Its not supported loan type");
        }
    }
}
