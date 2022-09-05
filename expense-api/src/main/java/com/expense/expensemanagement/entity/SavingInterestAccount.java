package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.AccountTypeValue;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@DiscriminatorValue(AccountTypeValue.SAVING_INTEREST)
@Data
@Table(name = "em_si_account_t")
public class SavingInterestAccount extends Account{

    @Column(name = "rate", nullable = false)
    private float rate;

    @Column(nullable = false)
    private float tenure;

    @Column(name = "maturity_amount")
    private BigDecimal maturityAmount;
}
