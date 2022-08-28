package com.expense.expensemanagement.conversion;


import com.expense.expensemanagement.entity.CategoryDto;
import com.expense.expensemanagement.model.Category;

public class CategoryConversion implements EntityModalConversion<CategoryDto, Category>{
    @Override
    public Category getModel(CategoryDto categoryDto) {
        Category category=new Category();
        category.setName(categoryDto.getName());
        category.setId(categoryDto.getId());
        category.setDescription(categoryDto.getDescription());
        category.setUserID(categoryDto.getUserID());
        return category;
    }

    @Override
    public CategoryDto getEntity(Category category) {
        CategoryDto categoryDto=new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setUserID(category.getUserID());
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());
        return categoryDto;
    }
}
