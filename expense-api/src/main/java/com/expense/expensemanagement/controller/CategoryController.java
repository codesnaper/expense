package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.entity.CategoryDto;
import com.expense.expensemanagement.model.Category;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.service.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    public ICategoryService categoryService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseList<CategoryDto> getCategory(@RequestHeader(name = "pageNo",defaultValue = "0", required = false) int pageNo,
                                                 @RequestHeader(name = "size",defaultValue = "10", required = false) int pageSize) throws IllegalAccessException {
        return this.categoryService.getCategory(pageNo,pageSize);

    }
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Category addCategory(@RequestBody Category category) throws IllegalAccessException {
        return this.categoryService.addCategory(category);

    }
    @PatchMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateCategory(@RequestParam long id,@RequestParam Category category) throws IllegalAccessException {
        this.categoryService.updateCategory(id,category);

    }
    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteCategory(@RequestParam long id) throws IllegalAccessException {
         this.categoryService.deleteCategory(id);

    }


}
