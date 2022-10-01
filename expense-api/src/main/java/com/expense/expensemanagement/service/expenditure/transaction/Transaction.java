package com.expense.expensemanagement.service.expenditure.transaction;

import com.expense.expensemanagement.model.ExpenditureModel;

public interface Transaction {

    void expenseTransaction(ExpenditureModel expenditureModel);

    void revenueTransaction(ExpenditureModel expenditureModel);

    void transferTransaction(ExpenditureModel expenditureModel);
}
