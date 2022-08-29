package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.SavingCompoundInterestAccount;
import com.expense.expensemanagement.entity.SavingInterestAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingCompoundInterestAccountDAO extends PagingAndSortingRepository<SavingCompoundInterestAccount, Long > {

    Page<SavingCompoundInterestAccount> findByBank(long bankId, Pageable pageable);
}
