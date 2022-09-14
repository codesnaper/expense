package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.Recursive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;

@Repository
public interface LimitDao extends PagingAndSortingRepository<Limit, Long> , JpaRepository<Limit, Long> {

    Page<Limit> findByResetRecursively(Recursive resetRecursively, PageRequest pageRequest);


}
