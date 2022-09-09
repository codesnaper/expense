package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.category.ICategoryService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.security.Principal;

@RestController
@RequestMapping("/expense/api/v1/category")
public class CategoryController {

    @Autowired
    public ICategoryService categoryService;


    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<Category> getCategory(Principal principal,@RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
                                              @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize) throws IllegalAccessException {
        return this.categoryService.getCategory(pageNo,pageSize, ExpenseUtil.getUserId(principal));

    }
    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public com.expense.expensemanagement.model.Category addCategory(@RequestBody com.expense.expensemanagement.model.Category category) throws IllegalAccessException {
        return this.categoryService.addCategory(category);

    }
    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Category updateCategory(Principal principal , @RequestBody com.expense.expensemanagement.model.Category category) throws IllegalAccessException {
       category.setUserID(ExpenseUtil.getUserId(principal));
        return this.categoryService.updateCategory(category);
    }
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteCategory(@PathVariable long id,Principal principal) throws IllegalAccessException {
         this.categoryService.deleteCategory(id,ExpenseUtil.getUserId(principal));
    }


}
