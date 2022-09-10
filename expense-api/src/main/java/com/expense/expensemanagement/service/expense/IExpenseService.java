package com.expense.expensemanagement.service.expense;

import com.expense.expensemanagement.model.ExpenseModel;
import com.expense.expensemanagement.model.ResponseList;

public interface IExpenseService {
    /**
     * *
     * @param pageNo
     * @param pageSize
     * @return
     */
    public ResponseList<ExpenseModel> getExpenses(int pageNo,int pageSize);

    /**
     * *
     * @param expenseModel
     * @return
     */
    public ExpenseModel addExpense(ExpenseModel expenseModel);

    /**
     * *
     * @param expenseModel
     * @return
     */
    public ExpenseModel updateExpense(ExpenseModel expenseModel);

    /**
     * *
     * @param id
     * @param userId
     */
    public void deleteExpense(long id,String userId);
}
