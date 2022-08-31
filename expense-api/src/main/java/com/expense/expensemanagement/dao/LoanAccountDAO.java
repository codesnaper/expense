package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.LoanAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanAccountDAO extends PagingAndSortingRepository<LoanAccount, Long > {

    Page<LoanAccount> findByBankIdAndLendAccount(long bankId, boolean lendAccount, Pageable pageable);
}
