package com.expense.expensemanagement.service.expenditure;

import com.expense.expensemanagement.exception.AmountInsufficientException;
import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.ExpenditureSummary;

import java.util.Date;
import java.util.List;

public interface ExpenditureService {

    ExpenditureModel addExpenditure(ExpenditureModel expenditureModel ) throws MaxLimitException, AmountInsufficientException;

    List<ExpenditureModel> fetchExpenditureBetweenDate(Date toDate, Date fromDate);

    List<ExpenditureSummary> getExpenditureSummary(int month, String year);

}
