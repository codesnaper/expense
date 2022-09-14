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

    @Column
    private BigDecimal min_amount;
    @Column
    private BigDecimal max_amount;
    @Column
    private Long thresold_warning_amount;
    @Column
    @Enumerated(EnumType.ORDINAL)
    private Recursive reset_recursively;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @Column
    private String priority;
    @Column
    private BigDecimal used_amount;
}
