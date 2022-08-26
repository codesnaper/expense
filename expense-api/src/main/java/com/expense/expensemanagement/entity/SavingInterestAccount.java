package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("SavingInterest")
@Data
public class SavingInterestAccount extends Account{

    @Column(name = "rate", nullable = false)
    private float rate;

    @Column(nullable = false)
    private float tenure;

    @Column(name = "maturity_amount")
    private BigDecimal maturityAmount;
}
