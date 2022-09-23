package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.Recursive;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(
        name = "em_revenue_t",
        uniqueConstraints = {
                @UniqueConstraint(name = "nameAndUserId", columnNames = {"name", "user_id"})
        },
        indexes = {
                @Index(name = "revenue_name_userid_idx", columnList = "name,user_id")
        }
)
@Data
public class Revenue {

    @Id
    @GeneratedValue(generator = "revenue-sequence-generator")
    @GenericGenerator(
            name = "revenue-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_revenue_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private long id;

    @Column
    private String name;

    @Column
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    @JsonBackReference
    private Account account;

    @Column(name = "reset_recursively")
    @Enumerated(EnumType.ORDINAL)
    private Recursive resetRecursively;

    @Column(name = "user_id")
    private String userId;
}
