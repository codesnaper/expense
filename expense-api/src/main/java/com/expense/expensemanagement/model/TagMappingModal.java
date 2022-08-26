package com.expense.expensemanagement.model;

import lombok.Data;

import java.util.List;

@Data
public class TagMappingModal {

    private TagModel tagModel;

    private List<BankModel> banks;

}
