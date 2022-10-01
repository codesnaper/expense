package com.expense.expensemanagement.service.expenditure;

import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;

import java.util.Date;
import java.util.List;

public interface ExpenditureService {

    ExpenditureModel addExpenditure(ExpenditureModel expenditureModel ) throws MaxLimitException;

    List<ExpenditureModel> fetchExpenditureBetweenDate(Date toDate, Date fromDate);

}
