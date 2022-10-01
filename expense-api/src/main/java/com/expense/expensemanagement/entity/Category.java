package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "em_category_t" ,uniqueConstraints = {
        @UniqueConstraint(name = "CategoryNameAndUserId", columnNames = {"name", "user_id"})
}
)
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id",nullable = false)
    private String userID;
    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "description")
    private String description;
}
