package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.CurrencyType;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="em_user_profile_t")
@Data
public class Profile {

    @Id
    @GeneratedValue(generator = "profile-sequence-generator")
    @GenericGenerator(
            name = "profile-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_profile_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private String id;

    @Column(name = "theme")
    private String theme;

    @Column(name = "selected_currency")
    @Enumerated(EnumType.STRING)
    private CurrencyType selectedCurrency ;

    @CreationTimestamp
    private Date createdDate;
}
