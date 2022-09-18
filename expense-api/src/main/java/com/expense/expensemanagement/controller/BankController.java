package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.NotificationType;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.bank.IBankService;
import com.expense.expensemanagement.service.notification.INotificationService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("${expense.base}${expense.version}${expense.bank.base}")
public class BankController {

    private final IBankService bankService;

    private final AccountController accountController;

    @Autowired
    private INotificationService notificationService;

    @Autowired
    private NotificationSocketController socketController;

    @Autowired
    public BankController(IBankService bankService, AccountController accountController) {
        this.bankService = bankService;
        this.accountController = accountController;
    }

    @PostMapping(value = "${expense.bank.post}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)    public BankModel addBank(
            @RequestBody BankModel bankModel,
            Principal principal
    ){
        bankModel.setUserId(ExpenseUtil.getUserId(principal));
        return this.bankService.addBank(bankModel);
    }

    @GetMapping(value = "${expense.bank.get}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<BankModel> getBanks(
            @RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
            @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize,
            Principal principal
    ){
        notificationService.sendNewNotification(ExpenseUtil.getUserId(principal), "Sample","This is sample notification", NotificationType.INFO);
        return this.bankService.getAllBanks(((UserContext)((JwtAuthenticationToken) principal).getPrincipal()).getUsername(), pageNo,pageSize);
    }

    @DeleteMapping(value = "${expense.bank.delete}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteBank(
            @PathVariable("bank-id") long id,
            Principal principal
    ){
        this.bankService.deleteBank(ExpenseUtil.getUserId(principal), id);
    }

    @PutMapping(value = "${expense.bank.update}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public BankModel updateBank(
            Principal principal,
            @RequestBody(required = true) BankModel bankModel
    ) {
        if(bankModel.getId() == null){
            throw new IllegalArgumentException("Bank Id is missing in request");
        }
        bankModel.setUserId(ExpenseUtil.getUserId(principal));
        return this.bankService.updateBank(bankModel);
    }

}
