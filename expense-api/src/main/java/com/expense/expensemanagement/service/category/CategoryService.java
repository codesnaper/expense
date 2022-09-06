package com.expense.expensemanagement.service.category;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.NoSuchElementException;

/**
 *
 */
@Service
public class CategoryService implements ICategoryService{


    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    @Qualifier("CategoryConversion")
    private EntityModalConversion<Category, com.expense.expensemanagement.model.Category> categoryConversion;


    @Override
    public ResponseList<Category> getCategory(int pageNo, int pageSize, String userid) {
        Page page= categoryDao.findByUserID(userid,PageRequest.of(pageNo,pageSize));
        ResponseList<Category> responseList=new ResponseList<>();
        responseList.setPageNo(page.getNumber());
        responseList.setTotalPage(page.getTotalPages());
        responseList.setTotalCount(page.getTotalElements());
        responseList.setData(page.getContent());
        return responseList;
    }

    @Override
    public com.expense.expensemanagement.model.Category addCategory(com.expense.expensemanagement.model.Category category) {
        Category entity=categoryDao.save(categoryConversion.getEntity(category));
        return categoryConversion.getModel(entity);

    }

    @Override
    public Category updateCategory(com.expense.expensemanagement.model.Category category) {
         Category categoryDto = categoryDao.findByUserIDAndId(category.getUserID(), category.getId()).orElseThrow(NoSuchElementException::new);
        if (categoryDto.getUserID() == null) {
            throw new IllegalStateException("Category not exist ");
        }
             category.setId(categoryDto.getId());
            return categoryDao.save(categoryConversion.getEntity(category));

    }

    @Override
    public void deleteCategory(long id, Principal principal) {
        Category category = categoryDao.findByUserIDAndId(ExpenseUtil.getUserId(principal), id).orElseThrow(NoSuchElementException::new);
        categoryDao.delete(category);
    }
}

