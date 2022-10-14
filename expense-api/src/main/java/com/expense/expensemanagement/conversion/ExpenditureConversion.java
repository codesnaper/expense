package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.LimitModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

/**
 * Conversion Class for Expenditure POJO
 */
@Component("ExpenditureConversion")
public class ExpenditureConversion implements EntityModalConversion<Expenditure, ExpenditureModel> {

    @Autowired
    @Qualifier("AccountEntityModel")
    private EntityModalConversion<Account, AccountModel> accountConversion;

    @Autowired
    @Qualifier("CategoryConversion")
    private EntityModalConversion<Category, CategoryModal> categoryConversion;

    @Autowired
    @Qualifier("limitConversion")
    private EntityModalConversion<Limit, LimitModel> limitConversion;

    /**
     * {@inheritDoc}
     */
    @Override
    public ExpenditureModel getModel(Expenditure expenditure) {
        ExpenditureModel expenditureModel = new ExpenditureModel();
        expenditureModel.setAccount(accountConversion.getModel(expenditure.getAccount()));
        expenditureModel.setUserId(expenditure.getUserId());
        expenditureModel.setAmount(Optional.ofNullable(expenditure.getAmount()).orElse(BigDecimal.valueOf(0)).doubleValue());
        if (expenditure.getCategory() != null) {
            expenditureModel.setCategoryModal(categoryConversion.getModel(expenditure.getCategory()));
        }
        expenditureModel.setDescription(expenditure.getDescription());
        expenditureModel.setDate(expenditure.getLoggedDate());
        expenditureModel.setId(expenditure.getId());
        expenditureModel.setName(expenditure.getName());
        if (expenditure.getFromAccount() != null) {
            expenditureModel.setFromAccount(accountConversion.getModel(expenditure.getFromAccount()));
        }
        if (expenditure.getLimit() != null) {
            expenditureModel.setLimit(limitConversion.getModel(expenditure.getLimit()));
        }
        expenditureModel.setType(expenditure.getType());
        return expenditureModel;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Expenditure getEntity(ExpenditureModel expenditureModel) {
        Expenditure expenditure = new Expenditure();
        if (expenditureModel.getFromAccount() != null) {
            expenditure.setFromAccount(accountConversion.getEntity(expenditureModel.getFromAccount()));
        }
        if (expenditureModel.getLimit() != null) {
            expenditure.setLimit(limitConversion.getEntity(expenditureModel.getLimit()));
        }
        if (expenditureModel.getCategoryModal() != null) {
            expenditure.setCategory(categoryConversion.getEntity(expenditureModel.getCategoryModal()));
        }
        expenditure.setAmount(BigDecimal.valueOf(expenditureModel.getAmount()));
        expenditure.setAccount(accountConversion.getEntity(expenditureModel.getAccount()));
        expenditure.setDescription(expenditureModel.getDescription());
        expenditure.setId(expenditureModel.getId());
        expenditure.setType(expenditureModel.getType());
        expenditure.setName(expenditureModel.getName());
        expenditure.setUserId(expenditureModel.getUserId());
        expenditure.setLoggedDate(expenditureModel.getDate());
        return expenditure;
    }
}
