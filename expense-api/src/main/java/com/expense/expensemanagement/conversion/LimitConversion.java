package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ErrorConstantMessage;
import com.expense.expensemanagement.model.LimitModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.NoSuchElementException;

/**
 * Conversion Class for LIMIT POJO
 */
@Component("limitConversion")
public class LimitConversion implements EntityModalConversion<Limit, LimitModel> {

    @Autowired
    @Qualifier("AccountEntityModel")
    EntityModalConversion<Account, AccountModel> accountConversion;

    @Autowired
    @Qualifier("CategoryConversion")
    EntityModalConversion<Category, CategoryModal> categoryConversion;

    @Autowired
    AccountDAO accountDAO;

    @Autowired
    CategoryDao categoryDao;


    /**
     * {@inheritDoc}
     */
    @Override
    public LimitModel getModel(Limit limit) {
        LimitModel limitModel = new LimitModel();
        limitModel.setId(limit.getId());
        limitModel.setAccountId(limit.getAccountId());
        limitModel.setName(limit.getName());
        limitModel.setDescription(limit.getDescription());
        limitModel.setCategoryId(limit.getCategoryId());
        if (limit.getMaxAmount() == null) {
            limitModel.setMaxAmount(0);
        } else {
            limitModel.setMaxAmount(limit.getMaxAmount().longValue());
        }
        if (limit.getMinAmount() == null) {
            limitModel.setMinAmount(0);
        } else {
            limitModel.setMinAmount(limit.getMinAmount().longValue());
        }
        limitModel.setPriority(limit.getPriority());
        limitModel.setResetRecursively(limit.getResetRecursively());
        limitModel.setUserid(limit.getUserid());
        if (limit.getUsedAmount() == null) {
            limitModel.setUsedAmount(0);
        } else {
            limitModel.setUsedAmount(limit.getUsedAmount().longValue());
        }
        limitModel.setThresoldWarningAmount(limit.getThresoldWarningAmount());
        limitModel.setCategoryModal(categoryConversion.getModel(limit.getCategory()));
        limitModel.setAccount(accountConversion.getModel(limit.getAccount()));
        return limitModel;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Limit getEntity(LimitModel limitModel) {
        Limit limit = new Limit();
        limit.setId(limitModel.getId());
        if (limitModel.getAccountId() == null) {
            throw new IllegalArgumentException(ErrorConstantMessage.ACCOUNT_ID_NOT_PROVIDED);
        }
        Account account = accountDAO.findById(limitModel.getAccountId()).orElseThrow(() -> {
            throw new NoSuchElementException(ErrorConstantMessage.ACCOUNT_NOT_FOUND);
        });
        limit.setAccount(account);
        limit.setName(limitModel.getName());
        limit.setDescription(limitModel.getDescription());
        limit.setMaxAmount(BigDecimal.valueOf(limitModel.getMaxAmount()));
        limit.setMinAmount(BigDecimal.valueOf(limitModel.getMinAmount()));
        limit.setPriority(limitModel.getPriority());
        limit.setResetRecursively(limitModel.getResetRecursively());
        limit.setUserid(limitModel.getUserid());
        limit.setUsedAmount(BigDecimal.valueOf(limitModel.getUsedAmount()));
        limit.setThresoldWarningAmount(limitModel.getThresoldWarningAmount());
        if (limitModel.getCategoryId() == null) {
            throw new IllegalArgumentException(ErrorConstantMessage.CATEGORY_ID_NOT_PROVIDED);
        }
        Category category = categoryDao.findById(limitModel.getCategoryId()).orElseThrow(() -> {
            throw new NoSuchElementException(ErrorConstantMessage.CATEGORY_NOT_FOUND);
        });
        limit.setCategory(category);
        return limit;
    }
}
