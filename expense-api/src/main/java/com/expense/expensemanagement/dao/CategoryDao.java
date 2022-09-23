package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryDao extends PagingAndSortingRepository<Category, Long> {


    Page<Category> findByUserID(String userID, Pageable pageable);

    Optional<Category> findByUserIDAndId(String userID, long id);

    List<Category> findByUserID(String userID);
}
