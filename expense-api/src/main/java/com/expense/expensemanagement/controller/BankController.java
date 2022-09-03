package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.bank.IBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/expense/api/v1/bank")
public class BankController {

    private final IBankService bankService;

    private final AccountController accountController;

    @Autowired
    public BankController(IBankService bankService, AccountController accountController) {
        this.bankService = bankService;
        this.accountController = accountController;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)    public BankModel addBank(
            @RequestBody BankModel bankModel,
            Principal principal
    ){
        bankModel.setUserId(((UserContext)((JwtAuthenticationToken) principal).getPrincipal()).getUsername());
        return this.bankService.addBank(bankModel);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<BankModel> getBanks(
            @RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
            @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize,
            Principal principal
    ){
        return this.bankService.getAllBanks(((UserContext)((JwtAuthenticationToken) principal).getPrincipal()).getUsername(), pageNo,pageSize);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteBank(
            @PathVariable long id
    ){
        this.bankService.deleteBank(id);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public BankModel updateBank(
            Principal principal,
            @RequestBody(required = true) BankModel bankModel
    ) {
        bankModel.setUserId(((UserContext)((JwtAuthenticationToken) principal).getPrincipal()).getUsername());
        return this.bankService.updateBank(bankModel);
    }

}
