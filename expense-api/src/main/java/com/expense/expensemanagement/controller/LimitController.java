package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.limit.ILimitService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
@RequestMapping("/expense/api/v1/limit")
public class LimitController {

    @Autowired
    public ILimitService limitService;


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<LimitModel> getLimits(@RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
                                              @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize) throws IllegalAccessException {
        return this.limitService.getLimits(pageNo,pageSize);

    }
    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public LimitModel addLimit(@RequestBody LimitModel limitModel) throws IllegalAccessException {
        return this.limitService.addLimit(limitModel);

    }
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public LimitModel updateLimit(Principal principal, @RequestBody LimitModel limitModel) throws IllegalAccessException {
        limitModel.setUserid(ExpenseUtil.getUserId(principal));
        return this.limitService.updateLimit(limitModel);
    }
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteLimit(@PathVariable long id,Principal principal) throws IllegalAccessException {
        this.limitService.deleteLimit(id,ExpenseUtil.getUserId(principal));
    }


}
