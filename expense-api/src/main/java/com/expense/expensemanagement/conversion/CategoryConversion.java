package com.expense.expensemanagement.conversion;


import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.CategoryModal;
import org.springframework.stereotype.Component;

/**
 * Conversion Class for Category POJO
 */
@Component("CategoryConversion")
public class CategoryConversion implements EntityModalConversion<Category, CategoryModal> {
    /**
     * {@inheritDoc}
     */
    @Override
    public CategoryModal getModel(Category categoryDto) {
        CategoryModal categoryModal = new CategoryModal();
        categoryModal.setName(categoryDto.getName());
        categoryModal.setId(categoryDto.getId());
        categoryModal.setDescription(categoryDto.getDescription());
        categoryModal.setUserID(categoryDto.getUserID());
        return categoryModal;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Category getEntity(CategoryModal categoryModal) {
        Category categoryDto = new Category();
        categoryDto.setId(categoryModal.getId());
        categoryDto.setUserID(categoryModal.getUserID());
        categoryDto.setName(categoryModal.getName());
        categoryDto.setDescription(categoryModal.getDescription());
        return categoryDto;
    }
}
