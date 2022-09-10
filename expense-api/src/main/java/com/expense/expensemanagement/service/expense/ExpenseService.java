package com.expense.expensemanagement.service.expense;

import com.expense.expensemanagement.model.ExpenseModel;
import com.expense.expensemanagement.model.ResponseList;

public class ExpenseService implements IExpenseService{
    /**
     * *
     *
     * @param pageNo
     * @param pageSize
     * @return
     */
    @Override
    public ResponseList<ExpenseModel> getExpenses(int pageNo, int pageSize) {
        return null;
    }

    /**
     * *
     *
     * @param expenseModel
     * @return
     */
    @Override
    public ExpenseModel addExpense(ExpenseModel expenseModel) {
        return null;
    }

    /**
     * *
     *
     * @param expenseModel
     * @return
     */
    @Override
    public ExpenseModel updateExpense(ExpenseModel expenseModel) {
        return null;
    }

    /**
     * *
     *
     * @param id
     * @param userId
     */
    @Override
    public void deleteExpense(long id, String userId) {

    }
}
