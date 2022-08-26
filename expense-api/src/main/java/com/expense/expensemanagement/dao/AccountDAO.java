package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Bank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDAO extends PagingAndSortingRepository<Account, Long > {

    Page<Account> findByBank(long bankId, Pageable pageable);
}
