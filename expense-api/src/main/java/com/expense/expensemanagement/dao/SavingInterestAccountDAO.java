package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.LoanAccount;
import com.expense.expensemanagement.entity.SavingInterestAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingInterestAccountDAO extends PagingAndSortingRepository<SavingInterestAccount, Long > {

    Page<SavingInterestAccount> findByBank(long bankId, Pageable pageable);
}
