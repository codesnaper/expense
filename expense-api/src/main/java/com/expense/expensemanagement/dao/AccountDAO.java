package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountDAO extends PagingAndSortingRepository<Account, Long > {

    Page<Account> findByBankId(long bankId, Pageable pageable);

    @Query(value = "" +
            "SELECT account.accountType, COUNT(account.accountType) FROM Account AS account " +
            "where account.bankId =?1  GROUP BY account.accountType")
    List<Object[]> accountGroupType(long bankId);

    Optional<Account> findByUserIdAndId(String userId, long id);
}
