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
        AccountModel accountModelResponse;
        switch (loanType){
            case "loan":
                accountModelResponse = new ObjectMapper().convertValue(accountModel,LoanAccountModel.class);
                break;

            case "si":
                accountModelResponse = new ObjectMapper().convertValue(accountModel,SIAccountModel.class);
                break;

            default:
                throw new IllegalArgumentException("Its not supported loan type");
        }
        accountModelResponse = this.accountService.addAccount(accountModelResponse, bankid);
        return accountModelResponse;
    }
}
