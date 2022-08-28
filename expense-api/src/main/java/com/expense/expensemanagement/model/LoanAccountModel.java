package com.expense.expensemanagement.model;

import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class LoanAccountModel extends AccountModel {

    private float rate;

    private Date accountEndDate;

    private float tenure;

    private double interestAmount;

    private int totalEMI;

    private double totalInterestAmount;

    private double totalPayment;

    private int emiPaid = 0;

    private boolean isLendType;

}
