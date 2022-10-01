package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.Recursive;
import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="em_limit_t",
        uniqueConstraints = {
                @UniqueConstraint(name = "LimitNameAndUserId", columnNames = {"name", "user_id"})
        }
)
@Data
public class Limit {
    @Id
    @GeneratedValue(generator = "limit-sequence-generator")
    @GenericGenerator(
            name = "limit-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_limit_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private long id;

    @Column(name="user_id", nullable = false)
    private String userid;

    @Column
    private String name;

    @Column
    private String description;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    @JsonBackReference
    private Account account;

    @Column(name = "account_id", insertable = false, updatable = false)
    protected long accountId;

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

    @Column(name = "category_id", insertable = false, updatable = false)
    protected long categoryId;

    @Column
    private String priority;
    @Column(name = "used_amount")
    private BigDecimal usedAmount;
}
