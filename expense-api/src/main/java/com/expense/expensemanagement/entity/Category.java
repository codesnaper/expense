package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "em_category_t")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userID;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
}
