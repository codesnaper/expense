package com.expense.expensemanagement.service.category;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ResponseList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

/**
 *
 */
@Service
public class CategoryService implements ICategoryService{


    @Autowired
    private CategoryDao categoryDao;
    @Autowired
    @Qualifier("CategoryConversion")
    private EntityModalConversion<Category, CategoryModal> categoryConversion;


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
    public CategoryModal addCategory(CategoryModal categoryModal) {
        Category entity=categoryDao.save(categoryConversion.getEntity(categoryModal));
        return categoryConversion.getModel(entity);

    }

    @Override
    public Category updateCategory(CategoryModal categoryModal) {
         Category categoryDto = categoryDao.findByUserIDAndId(categoryModal.getUserID(), categoryModal.getId()).orElseThrow(NoSuchElementException::new);
        if (categoryDto.getUserID() == null) {
            throw new IllegalStateException("Category not exist ");
        }
             categoryModal.setId(categoryDto.getId());
            return categoryDao.save(categoryConversion.getEntity(categoryModal));

    }

    @Override
    public void deleteCategory(long id, String userId) {
        Category category = categoryDao.findByUserIDAndId(userId, id).orElseThrow(NoSuchElementException::new);
        categoryDao.delete(category);
    }

    @Override
    public List<CategoryModal> fetchAllCategory(String userId) {
        return this.categoryDao.findByUserID(userId).stream()
                .map(categoryConversion::getModel)
                .collect(Collectors.toList());
    }
}

