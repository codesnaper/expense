package com.expense.expensemanagement.conversion;


import com.expense.expensemanagement.entity.Category;
import org.springframework.stereotype.Component;

@Component("CategoryConversion")
public class CategoryConversion implements EntityModalConversion<Category, com.expense.expensemanagement.model.Category>{
    @Override
    public com.expense.expensemanagement.model.Category getModel(Category categoryDto) {
        com.expense.expensemanagement.model.Category category=new com.expense.expensemanagement.model.Category();
        category.setName(categoryDto.getName());
        category.setId(categoryDto.getId());
        category.setDescription(categoryDto.getDescription());
        category.setUserID(categoryDto.getUserID());
        return category;
    }

    @Override
    public Category getEntity(com.expense.expensemanagement.model.Category category) {
        Category categoryDto=new Category();
        categoryDto.setId(category.getId());
        categoryDto.setUserID(category.getUserID());
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());
        return categoryDto;
    }
}
