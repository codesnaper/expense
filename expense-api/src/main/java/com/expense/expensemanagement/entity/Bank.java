package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.CurrencyType;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(
        name = "em_bank_t",
        uniqueConstraints = {
                @UniqueConstraint(name = "BanknameAndUserId", columnNames = {"name", "user_id"})
        },
        indexes = {
                @Index(name = "bank_name_userid_idx", columnList = "name,user_id")
        }
)
@Data
public class Bank {

    @Id
    @GeneratedValue(generator = "bank-sequence-generator")
    @GenericGenerator(
            name = "bank-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_bank_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "currency_type", nullable = false)
    private CurrencyType currency;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "location", nullable = false)
    private String location;

    private BigDecimal creditAmount;

    private BigDecimal debitAmount;

    private BigDecimal holdAmount;

    @OneToMany(mappedBy = "bank", fetch = FetchType.LAZY)
    private List<Account> accounts;

    @OneToMany(mappedBy = "refId", fetch = FetchType.LAZY)
    @Where(clause = "mapping_table = 'BANK'")
    private List<TagMapping> tagMappings = new ArrayList<>();

    @Column(name = "total_account", nullable = false)
    private int nAccount;

    @CreatedDate
    private Date createdDate;

    @Column
    private Date updatedDate = new Date();

}
