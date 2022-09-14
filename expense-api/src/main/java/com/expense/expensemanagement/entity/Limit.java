package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.Recursive;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="em_limit_t")
@Data
public class Limit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String userid;

    @Column
    private String name;

    @Column
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    @JsonBackReference
    private Account account;

    @Column(name = "min_amount")
    private BigDecimal minAmount;

    @Column(name = "max_amount")
    private BigDecimal maxAmount;

    @Column(name = "thresold_warning_amount")
    private Long thresoldWarningAmount;

    @Column(name = "reset_recursively")
    @Enumerated(EnumType.ORDINAL)
    private Recursive resetRecursively;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @Column
    private String priority;
    @Column(name = "used_amount")
    private BigDecimal usedAmount;
}
