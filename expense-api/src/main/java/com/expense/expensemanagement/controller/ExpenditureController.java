package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.ExpenditureSummary;
import com.expense.expensemanagement.service.expenditure.ExpenditureService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

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

    @GetMapping(value = "/'{toDate}'-'{fromDate}'", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ExpenditureModel> getExpenditureFromRange(
            Principal principal,
            @PathVariable("toDate") String toDate,
            @PathVariable("fromDate") String fromDate
            ){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy");
        try {
            return this.expenditureService.fetchExpenditureBetweenDate(simpleDateFormat.parse(toDate), simpleDateFormat.parse(fromDate));
        } catch (ParseException e) {
            throw new IllegalArgumentException("Date should be in format of dd-MM-yyyy");
        }
    }

    @GetMapping(value = "/summary/{month}-{year}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ExpenditureSummary> getExpenditureSummary(
            Principal principal,
            @PathVariable("month") int month,
            @PathVariable("year") String year
    ){
        return expenditureService.getExpenditureSummary(month, year);
    }
}
