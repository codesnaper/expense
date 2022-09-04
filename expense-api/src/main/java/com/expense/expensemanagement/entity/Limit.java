package com.expense.expensemanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

import javax.persistence.*;

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
    private Long min_amount;
    @Column
    private Long max_amount;
    @Column
    private Long thresold_warning_amount;
    @Column
    private String reset_recursively;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @Column
    private String priority;
    @Column
    private String used_amount;
}
