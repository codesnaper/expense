package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface TagDAO extends PagingAndSortingRepository<Tag, Long> {

    Page<Tag> findByUserId(String userId, Pageable pageable);

    Optional<Tag> findByUserIdAndId(String userId, long id);
}
