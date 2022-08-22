package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Tag;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TagDAO extends PagingAndSortingRepository<Tag, Long> {

    List<Tag> findByUserId(String userId);
}
