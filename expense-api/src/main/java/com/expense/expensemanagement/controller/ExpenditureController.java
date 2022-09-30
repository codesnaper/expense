package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.expenditure.ExpenditureService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/expense/api/v1/expenditure")
public class ExpenditureController {

    private final ExpenditureService expenditureService;

    public ExpenditureController(ExpenditureService expenditureService) {
        this.expenditureService = expenditureService;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ExpenditureModel addExpenditure(Principal principal, @RequestBody ExpenditureModel expenditureModel) throws MaxLimitException {
        expenditureModel.setUserId(ExpenseUtil.getUserId(principal));
        return this.expenditureService.addExpenditure(expenditureModel);
    }

    @GetMapping(value = "/date={toDate}-{fromDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<ExpenditureModel> getExpenditureFromRange(
            Principal principal,
            @PathVariable("toDate") Date toDate,
            @PathVariable("toDate") Date fromDate
            ){
        return null;
    }

    @GetMapping(value = "/summary/{month}/{year}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Object getExpenditureSummary(){
        return null;
    }
}
