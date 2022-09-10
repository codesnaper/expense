package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.dao.ExpenseDao;
import com.expense.expensemanagement.entity.Expense;
import com.expense.expensemanagement.model.ExpenseModel;

public class ExpenseConversion implements EntityModalConversion<ExpenseModel,Expense> {


    @Override
    public Expense getModel(ExpenseModel expenseModel) {
        Expense expense=new Expense();
        expense.setId(expenseModel.getId());
        expense.setUserId(expenseModel.getUserId());
        return expense;
    }

    @Override
    public ExpenseModel getEntity(Expense expense) {
        ExpenseModel expenseModel= new ExpenseModel();
        expenseModel.setId(expense.getId());
        expenseModel.setUserId(expense.getUserId());
        return expenseModel;
    }
}
