package com.expense.expensemanagement.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(catalog = "category_em")
@Data
public class CategoryDto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user-id")
    private Long userID;
    @Column(name="name")
    private String name;
    @Column(name = "description")
    private String description;
}
