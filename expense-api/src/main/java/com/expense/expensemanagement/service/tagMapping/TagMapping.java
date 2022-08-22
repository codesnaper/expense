package com.expense.expensemanagement.service.tagMapping;

import com.expense.expensemanagement.entity.Tag;

import java.util.List;

public interface TagMapping {

    /**
     * Method will add tag mapping for Bank, Account and expense object
     * @param model
     * @return
     */
    List<com.expense.expensemanagement.entity.TagMapping> addTagMapping(Object model);
}
