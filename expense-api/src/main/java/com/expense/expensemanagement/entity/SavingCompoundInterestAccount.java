package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("SavingCompoundInterest")
@Data
@Table(name = "em_sci_account_t")
public class SavingCompoundInterestAccount extends Account{

    @Column(name = "rate", nullable = false)
    private float rate;

    @Column(nullable = false)
    private float tenure;

    @Column(name = "compound_year")
    private int compoundYear;

    @Column(name = "maturity_amount")
    private BigDecimal maturityAmount;
}
