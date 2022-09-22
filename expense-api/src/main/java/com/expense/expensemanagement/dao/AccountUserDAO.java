package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.AccountUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

@Repository
public interface AccountUserDAO extends JpaRepository<AccountUser,Long> {
}
