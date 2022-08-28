package com.expense.expensemanagement.service.category;

import com.expense.expensemanagement.conversion.CategoryConversion;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.CategoryDto;
import com.expense.expensemanagement.model.Category;
import com.expense.expensemanagement.model.ResponseList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.NoSuchElementException;

/**
 *
 */
@Service
public class CategoryService implements ICategoryService{


    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    private CategoryConversion categoryConversion;


    @Override
    public ResponseList<CategoryDto> getCategory(int pageNo, int pageSize) {
        Page page= categoryDao.findAll(PageRequest.of(pageNo,pageSize));
        ResponseList<CategoryDto> responseList=new ResponseList<>();
        responseList.setPageNo(page.getNumber());
        responseList.setTotalPage(page.getTotalPages());
        responseList.setTotalCount(page.getTotalElements());
        responseList.setData(page.getContent());
        return responseList;
    }

    @Override
    public Category addCategory(Category category) {
        CategoryDto entity=categoryDao.save(categoryConversion.getEntity(category));
        return categoryConversion.getModel(entity);

    }

    @Override
    public void updateCategory(long id,Category category) {
        CategoryDto categoryDto = categoryDao.findById(id).orElseThrow(NoSuchElementException::new);
        if(categoryDto != null) {
            categoryDao.save(categoryConversion.getEntity(category));
        }
    }

    @Override
    public void deleteCategory(long id) {

        categoryDao.deleteById(id);
    }
}
