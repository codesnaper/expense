package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.LimitModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("limitConversion")
public class LimitConversion implements EntityModalConversion<Limit, LimitModel> {

    @Autowired
    @Qualifier("AccountEntityModel")
    EntityModalConversion<Account, AccountModel> accountConversion;

    @Autowired
    @Qualifier("CategoryConversion")
    EntityModalConversion<Category, com.expense.expensemanagement.model.Category> categoryConversion;

    @Autowired
    AccountDAO accountDAO;

    @Autowired
    CategoryDao categoryDao;


    @Override
    public LimitModel getModel(Limit limit) {
        LimitModel limitModel=new LimitModel();
        limitModel.setId(limit.getId());
        limitModel.setAccountId(accountConversion.getModel(limit.getAccount()).getId());
        limitModel.setName(limit.getName());
        limitModel.setDescription(limit.getDescription());
        limitModel.setCategoryId(categoryConversion.getModel(limit.getCategory()).getId());
        limitModel.setMaxAmount(limit.getMax_amount());
        limitModel.setMinAmount(limit.getMin_amount());
        limitModel.setPriority(limit.getPriority());
        limitModel.setResetRecursively(limit.getReset_recursively());
        limitModel.setUserid(limit.getUserid());
        limitModel.setUsedAmount(limit.getUsed_amount());
        limitModel.setThresoldWarningAmount(limit.getThresold_warning_amount());

        return limitModel;
    }

    @Override
    public Limit getEntity(LimitModel limitModel) {
        Limit limit=new Limit();
        limit.setId(limitModel.getId());
         Account account=accountDAO.findById(limitModel.getAccountId()).orElse(new Account());
        limit.setAccount(account);
        limit.setName(limitModel.getName());
        limit.setDescription(limitModel.getDescription());
        limit.setMax_amount(limitModel.getMaxAmount());
        limit.setMin_amount(limitModel.getMinAmount());
        limit.setPriority(limitModel.getPriority());
        limit.setReset_recursively(limitModel.getResetRecursively());
        limit.setUserid(limitModel.getUserid());
        limit.setUsed_amount(limitModel.getUsedAmount());
        limit.setThresold_warning_amount(limitModel.getThresoldWarningAmount());
        return limit;
    }
}
