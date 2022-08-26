package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.entity.TagMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagMappingDAO extends JpaRepository<TagMapping, Long> {

    List<TagMapping> findByTags(Tag tag);
}
