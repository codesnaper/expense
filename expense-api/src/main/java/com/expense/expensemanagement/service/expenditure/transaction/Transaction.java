package com.expense.expensemanagement.service.expenditure.transaction;

import com.expense.expensemanagement.exception.AmountInsufficientException;
import com.expense.expensemanagement.model.ExpenditureModel;

public interface Transaction {

    void expenseTransaction(ExpenditureModel expenditureModel) throws AmountInsufficientException;

    void revenueTransaction(ExpenditureModel expenditureModel);

    void transferTransaction(ExpenditureModel expenditureModel) throws AmountInsufficientException;
}
