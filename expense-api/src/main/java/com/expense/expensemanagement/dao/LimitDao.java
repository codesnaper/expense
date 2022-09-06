package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.function.LongToIntFunction;

@Repository
public interface LimitDao extends PagingAndSortingRepository<Limit, Long> , JpaRepository<Limit, Long> {

}
