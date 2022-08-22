package com.expense.expensemanagement.model;

import com.expense.expensemanagement.entity.Tag;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AccountModel {
    private long id;

    private String name;

    private String accountNumber;

    private double amount;

    private Date openDate;

    private Date createdDate;

    private Date updatedDate = new Date();

    private String userId;

    private List<Tag> tags;

    private BankModel bank;
}
