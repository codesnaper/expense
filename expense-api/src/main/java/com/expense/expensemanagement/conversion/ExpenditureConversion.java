package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.ExpenditureModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component("ExpenditureConversion")
public class ExpenditureConversion implements EntityModalConversion<Expenditure, ExpenditureModel> {

    @Autowired
    @Qualifier("AccountEntityModel")
    private EntityModalConversion<Account, AccountModel> accountConversion;

    @Override
    public ExpenditureModel getModel(Expenditure expenditure) {
        ExpenditureModel expenditureModel = new ExpenditureModel();
        expenditureModel.setAccount(accountConversion.getModel(expenditure.getAccount()));
        return expenditureModel;
    }

    @Override
    public Expenditure getEntity(ExpenditureModel expenditureModel) {
        return null;
    }
}
