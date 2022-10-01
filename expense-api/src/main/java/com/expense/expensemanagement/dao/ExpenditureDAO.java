package com.expense.expensemanagement.dao;

import com.expense.expensemanagement.entity.Expenditure;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Date;
import java.util.List;

public interface ExpenditureDAO extends PagingAndSortingRepository<Expenditure, Long> {
//
//    Page<Expenditure> findByTypeAndLoggedDateAndUserId(ExpenditureType type, Date loggedDate, String userId);
//
//    Optional<Expenditure> findByIdAndUserId(long id, String userId);
////
////    @Query("select expenditure from Expenditure expenditure where expenditure.loggedDate <= :endDate " +
////            "and expenditure.loggedDate>= :startDate and type = :type and userId = :userId")
////    Page<Expenditure> findExpenditureByRange(
////            @Param("endDate") Date endLoggedDate, @Param("startDate")Date startLoggedDate,
////            @Param("type") ExpenditureType type, @Param("userId") String userId
////    );

    List<Expenditure> findByLoggedDateBetween(Date startDate, Date endDate);
}
