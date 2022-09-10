package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseDao extends PagingAndSortingRepository<Expense, Long> , JpaRepository<Expense, Long> {
}
