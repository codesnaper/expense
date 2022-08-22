package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.CurrencyType;
import lombok.Data;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "em_bank_t")
@Data
public class Bank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "currency_type", nullable = false)
    private CurrencyType currency;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "location", nullable = false)
    private String location;

    private BigDecimal creditAmount;

    private BigDecimal debitAmount;

    @OneToMany(mappedBy = "id",fetch = FetchType.LAZY)
    private List<Account> accounts;

    @OneToMany(mappedBy = "refId", fetch = FetchType.LAZY)
    @Where(clause = "mapping_table = 'BANK'")
    private List<TagMapping> tagMappings;

    @Column(name = "total_account", nullable = false)
    private int nAccount;

    @CreatedDate
    private Date createdDate;

    @Column
    private Date updatedDate = new Date();

}
