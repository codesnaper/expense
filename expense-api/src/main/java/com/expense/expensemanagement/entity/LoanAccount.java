package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Loan")
@Data
public class LoanAccount extends Account{
    @Column(name = "rate", nullable = false)
    private float rate;
    @Column(nullable = false)
    private float tenure;

    @Column(name = "monthly_interest_amount", nullable = false)
    private double interestAmount;

    @Column(name = "total_emi_count", nullable = false)
    private int totalEMI;

    @Column(name = "total_interest_amount")
    private BigDecimal totalInterestAmount;

    @Column(name = "total_payment")
    private BigDecimal totalPayment;

    @Column(name = "emi_paid_count")
    private int emiPaid = 0;

}
