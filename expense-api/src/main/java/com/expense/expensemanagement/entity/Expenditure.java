package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.ExpenditureType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(
        name = "em_expenditure_t",
        indexes = {
                @Index(name = "get_expenditure_idx", columnList = "log_date,expenditure_type,user_id"),
                @Index(name = "user_id_idx", columnList = "id,user_id")
        }
)
@Data
public class Expenditure {

    @Id
    @GeneratedValue(generator = "expenditure-sequence-generator")
    @GenericGenerator(
            name = "expenditure-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_expenditure_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private long id;

    private String description;

    private String name;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name="expenditure_type")
    private ExpenditureType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "limit_id",referencedColumnName = "id")
    private Limit limit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;

    @Column(name="log_date")
    private Date loggedDate;

    @Column(name = "user_id")
    private String userId;
}
