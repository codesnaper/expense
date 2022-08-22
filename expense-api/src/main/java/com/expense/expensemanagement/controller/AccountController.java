package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.AccountType;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.LoanAccountModel;
import com.expense.expensemanagement.service.account.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final IAccountService accountService;

    @Autowired
    public AccountController(IAccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(value = "/loan", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public AccountModel addLoanAccount(
            @RequestBody(required = true) LoanAccountModel loanAccountModel
            ) throws IllegalAccessException {
        return this.accountService.addLoanAccount(loanAccountModel);

    }
}
