package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Category;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDao extends PagingAndSortingRepository<Category, Long> {


}
