package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.LimitModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component("ExpenditureConversion")
public class ExpenditureConversion implements EntityModalConversion<Expenditure, ExpenditureModel> {

    @Autowired
    @Qualifier("AccountEntityModel")
    private EntityModalConversion<Account, AccountModel> accountConversion;

    @Autowired
    @Qualifier("CategoryConversion")
    private EntityModalConversion<Category, com.expense.expensemanagement.model.Category> categoryConversion;

    @Autowired
    @Qualifier("limitConversion")
    private EntityModalConversion<Limit, LimitModel> limitConversion;

    @Override
    public ExpenditureModel getModel(Expenditure expenditure) {
        ExpenditureModel expenditureModel = new ExpenditureModel();
        expenditureModel.setAccount(accountConversion.getModel(expenditure.getAccount()));
        expenditureModel.setUserId(expenditure.getUserId());
        expenditureModel.setAmount(expenditure.getAmount().doubleValue());
        if(expenditure.getCategory() != null){
            expenditureModel.setCategory(categoryConversion.getModel(expenditure.getCategory()));
        }
        expenditureModel.setDescription(expenditure.getDescription());
        expenditureModel.setDate(expenditure.getLoggedDate());
        expenditureModel.setId(expenditure.getId());
        expenditureModel.setName(expenditure.getName());
        if(expenditure.getFromAccount() != null){
            expenditureModel.setFromAccount(accountConversion.getModel(expenditure.getFromAccount()));
        }
        if(expenditure.getLimit() != null){
            expenditureModel.setLimit(limitConversion.getModel(expenditure.getLimit()));
        }
        expenditureModel.setType(expenditure.getType());
        return expenditureModel;
    }

    @Override
    public Expenditure getEntity(ExpenditureModel expenditureModel) {
        Expenditure expenditure = new Expenditure();
        expenditure.setAmount(new BigDecimal(expenditureModel.getAmount()));
        expenditure.setAccount(accountConversion.getEntity(expenditureModel.getAccount()));
        if(expenditureModel.getFromAccount() != null){
            expenditure.setFromAccount(accountConversion.getEntity(expenditureModel.getFromAccount()));
        }
        if(expenditureModel.getLimit() != null){
            expenditure.setLimit(limitConversion.getEntity(expenditureModel.getLimit()));
        }
        expenditure.setDescription(expenditureModel.getDescription());
        if(expenditureModel.getCategory() != null){
            expenditure.setCategory(categoryConversion.getEntity(expenditureModel.getCategory()));
        }
        expenditure.setId(expenditureModel.getId());
        expenditure.setType(expenditureModel.getType());
        expenditure.setName(expenditureModel.getName());
        expenditure.setUserId(expenditureModel.getUserId());
        expenditure.setLoggedDate(expenditureModel.getDate());
        return expenditure;
    }
}
