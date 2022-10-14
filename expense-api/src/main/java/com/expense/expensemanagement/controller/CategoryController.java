package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.category.ICategoryService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/expense/api/v1/category")
public class CategoryController {

    @Autowired
    public ICategoryService categoryService;


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<Category> getCategory(Principal principal,@RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
                                              @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize) throws IllegalAccessException {
        return this.categoryService.getCategory(pageNo,pageSize, ExpenseUtil.getUserId(principal));

    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CategoryModal> getAllCategory(Principal principal) throws IllegalAccessException {
        return this.categoryService.fetchAllCategory(ExpenseUtil.getUserId(principal));
    }
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public CategoryModal addCategory(Principal principal, @RequestBody CategoryModal categoryModal) throws IllegalAccessException {
        categoryModal.setUserID(ExpenseUtil.getUserId(principal));
        return this.categoryService.addCategory(categoryModal);

    }
    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Category updateCategory(Principal principal , @RequestBody CategoryModal categoryModal) throws IllegalAccessException {
       categoryModal.setUserID(ExpenseUtil.getUserId(principal));
        return this.categoryService.updateCategory(categoryModal);
    }
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteCategory(@PathVariable long id,Principal principal) throws IllegalAccessException {
         this.categoryService.deleteCategory(id,ExpenseUtil.getUserId(principal));
    }


}
