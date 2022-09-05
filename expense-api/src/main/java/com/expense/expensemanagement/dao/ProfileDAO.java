package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileDAO extends JpaRepository<Profile, String> {
}
