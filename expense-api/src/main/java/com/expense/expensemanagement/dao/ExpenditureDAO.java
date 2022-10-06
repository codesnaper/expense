package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.model.ExpenditureType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ExpenditureDAO extends PagingAndSortingRepository<Expenditure, Long> {

    List<Expenditure> findByLoggedDateBetween(Date startDate, Date endDate);

    Optional<Expenditure> findByUserIdAndId(String userId, long id);

    @Query("SELECT SUM(amount) from Expenditure where FUNC('YEAR', c_Date)=:year and FUNC('MONTH', c_Date)=:month and type=:type")
    long groupByMonthAndYear(int month, String year, ExpenditureType type);
}
