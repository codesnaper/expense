package com.expense.expensemanagement.model;

import lombok.Data;

import java.util.Date;

@Data
public class SIAccountModel extends AccountModel {

    private float rate;

    private float tenure;

    private double maturityAmount;

    private Date accountEndDate;
}
