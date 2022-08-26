package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.bank.IBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bank")
public class BankController {

    private final IBankService bankService;

    private final AccountController accountController;

    @Autowired
    public BankController(IBankService bankService, AccountController accountController) {
        this.bankService = bankService;
        this.accountController = accountController;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public BankModel addBank(
            @RequestBody(required = true) BankModel bankModel
    ){
        return this.bankService.addBank(bankModel);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<BankModel> getBanks(
            @RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
            @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize,
            @RequestHeader(name = "user_id", defaultValue = "", required = false) String userId
    ){
        return this.bankService.getAllBanks(userId, pageNo,pageSize);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteBank(
            @PathVariable long id
    ){
        this.bankService.deleteBank(id);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public BankModel updateBank(
            @RequestBody(required = true) BankModel bankModel
    ) {
        if(bankModel.getId() == null){
            throw new IllegalArgumentException("Id is required");
        }
        return this.bankService.updateBank(bankModel);
    }

}
