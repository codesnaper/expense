package com.expense.expensemanagement.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "em_notification_t",
 indexes = {@Index(name = "notification_userid_idx", columnList = "user_id")}
)
@SQLDelete(sql = "update em_notification_t set is_deleted=true where id = ?")
@Where(clause = "is_deleted = false")
@Data
public class Notification {

    @Id
    @GeneratedValue(generator = "notification-sequence-generator")
    @GenericGenerator(
            name = "bank-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_notification_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private long id;

    private String heading;

    private String description;

    @Column(name = "user_id")
    private String userId;

    @CreationTimestamp
    private Date createdDate;

    private boolean isUnread;

    @Column(name = "is_deleted")
    private boolean deletedFalg = false;
}
