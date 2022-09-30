package com.expense.expensemanagement.service.expenditure;

import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;

public interface ExpenditureService {

    ExpenditureModel addExpenditure(ExpenditureModel expenditureModel ) throws MaxLimitException;

}
