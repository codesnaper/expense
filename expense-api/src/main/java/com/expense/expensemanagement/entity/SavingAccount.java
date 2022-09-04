package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue("Saving")
@Table(name = "em_saving_account_t")
@Data
public class SavingAccount extends Account{

    @Column(name = "rate", nullable = false)
    private float rate;

    @Column(nullable = false)
    private float tenure;

    @Column(name = "maturity_amount")
    private BigDecimal maturityAmount;
}
