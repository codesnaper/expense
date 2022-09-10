package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.ExpenseModel;
import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.expense.IExpenseService;
import com.expense.expensemanagement.service.limit.ILimitService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/expense/api/v1/expense")
public class ExpenseController {
    @Autowired
    public IExpenseService expenseService;


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<ExpenseModel> getExpenses(@RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
                                                  @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize) throws IllegalAccessException {
        return this.expenseService.getExpenses(pageNo,pageSize);

    }
    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ExpenseModel addExpenses(@RequestBody ExpenseModel expenseModel) throws IllegalAccessException {
        return this.expenseService.addExpense(expenseModel);

    }
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ExpenseModel updateExpense(Principal principal, @RequestBody ExpenseModel expenseModel) throws IllegalAccessException {
        expenseModel.setUserId(ExpenseUtil.getUserId(principal));
        return this.expenseService.updateExpense(expenseModel);
    }
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteExpense(@PathVariable long id,Principal principal) throws IllegalAccessException {
        this.expenseService.deleteExpense(id,ExpenseUtil.getUserId(principal));
    }
}
