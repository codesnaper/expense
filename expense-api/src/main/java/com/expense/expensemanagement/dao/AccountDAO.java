package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface AccountDAO extends PagingAndSortingRepository<Account, Long > {

    Page<Account> findByBankId(long bankId, Pageable pageable);

    Page<Account> findByBankIdAndAccountType( long bankId, String accountType, Pageable pageable);

    @Query(value = "" +
            "SELECT account.accountType as accountType, COUNT(account.accountType) as cnt FROM Account AS account " +
            "where account.bankId =:bankId and account.userId=:userId  GROUP BY account.accountType")
    List<Map<String, Object>> accountGroupType(long bankId, String userId);

    Optional<Account> findByUserIdAndId(String userId, long id);
}
