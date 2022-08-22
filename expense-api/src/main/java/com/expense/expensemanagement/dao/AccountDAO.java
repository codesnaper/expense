package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDAO extends PagingAndSortingRepository<Account, Long > {
}
