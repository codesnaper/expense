package com.expense.expensemanagement.service.category;

import com.expense.expensemanagement.entity.CategoryDto;
import com.expense.expensemanagement.model.Category;
import com.expense.expensemanagement.model.ResponseList;

public interface ICategoryService {

    /**
     *
     * @param pageNo
     * @param pageSize
     * @return Responce list for the category details
     */
   public ResponseList<CategoryDto> getCategory(int pageNo, int pageSize);

    /**
     *
     * @param category
     * @return its return category after the add category
     */
    public Category addCategory(Category category);

    /**
     *
     * @param id
     * @param category
     */
    public void updateCategory(long id,Category category);

    /**
     *
     * @param id
     */
    public void deleteCategory(long id);
}
