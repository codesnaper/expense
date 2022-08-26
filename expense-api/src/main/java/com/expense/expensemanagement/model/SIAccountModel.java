package com.expense.expensemanagement.model;

import lombok.Data;

@Data
public class SIAccountModel extends AccountModel {

    private float rate;

    private float tenure;

    private double maturityAmount;
}
