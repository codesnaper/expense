package com.expense.expensemanagement.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LoanAccountModel extends AccountModel{

    private float rate;

    private float tenure;

    private double interestAmount;

    private int totalEMI;

    private double totalInterestAmount;

    private double totalPayment;

    private int emiPaid = 0;
}
