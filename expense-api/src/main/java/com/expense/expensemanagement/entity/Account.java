package com.expense.expensemanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "em_account_t",
    indexes = {
        @Index(name = "account_bank_em_idx", columnList = "bank_id")
    }
)
@DiscriminatorColumn(name="account_type",
        discriminatorType = DiscriminatorType.STRING)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorValue("account")
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;

    @Column(name="account_type", insertable = false, updatable = false)
    protected String accountType;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "number", nullable = false, unique = true)
    private String accountNumber;

    @Column(name="amount")
    private BigDecimal amount = new BigDecimal(0);

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_id",referencedColumnName = "id")
    @JsonBackReference
    private Bank bank;

    @Column(name="bank_id", insertable = false, updatable = false)
    protected String bankId;

    @Column(name = "account_open_date", nullable = false)
    private Date openDate;

    @CreatedDate
    private Date createdDate;

    @Column
    private Date updatedDate = new Date();

    @Column(name="user_id")
    private String userId;

    @OneToMany(mappedBy = "refId", fetch = FetchType.LAZY)
    @Where(clause = "mapping_table = 'ACCOUNT'")
    private List<TagMapping> tagMappings;
}
