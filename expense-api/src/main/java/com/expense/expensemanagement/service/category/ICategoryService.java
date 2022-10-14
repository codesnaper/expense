package com.expense.expensemanagement.service.category;

import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ResponseList;

import java.util.List;

public interface ICategoryService {

    /**
     *
     * @param pageNo
     * @param pageSize
     * @return Responce list for the category details
     */
   public ResponseList<Category> getCategory(int pageNo, int pageSize,String userId);

    /**
     *
     * @param categoryModal
     * @return its return category after the add category
     */
    public CategoryModal addCategory(CategoryModal categoryModal);

    /**
     *
     *
     * @param categoryModal
     */
    public Category updateCategory(CategoryModal categoryModal);

    /**
     *
     * @param id
     * @param userId
     */
    public void deleteCategory(long id, String userId);

    public List<CategoryModal> fetchAllCategory(String userId);
}
