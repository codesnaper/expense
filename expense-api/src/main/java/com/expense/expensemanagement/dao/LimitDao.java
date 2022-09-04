package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Limit;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LimitDao extends PagingAndSortingRepository<Limit, Long> {
}
