package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "em_expense_t")
@Data
public class Expense {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user-id",nullable = false)
    private String userId;
}
