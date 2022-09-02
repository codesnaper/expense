package com.expense.expensemanagement.service.category;

import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.ResponseList;

public interface ICategoryService {

    /**
     *
     * @param pageNo
     * @param pageSize
     * @return Responce list for the category details
     */
   public ResponseList<Category> getCategory(int pageNo, int pageSize);

    /**
     *
     * @param category
     * @return its return category after the add category
     */
    public com.expense.expensemanagement.model.Category addCategory(com.expense.expensemanagement.model.Category category);

    /**
     *
     * @param id
     * @param category
     */
    public Category updateCategory(long id, com.expense.expensemanagement.model.Category category);

    /**
     *
     * @param id
     */
    public void deleteCategory(long id);
}
