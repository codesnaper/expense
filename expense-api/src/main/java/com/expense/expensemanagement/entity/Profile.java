package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.CurrencyType;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="em_user_profile_t")
@Data
public class Profile {

    @Id
    private String id;

    @Column(name = "theme")
    private String theme;

    @Column(name = "selected_currency")
    @Enumerated(EnumType.STRING)
    private CurrencyType selectedCurrency ;

    @CreationTimestamp
    private Date createdDate;
}
