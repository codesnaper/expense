package com.expense.expensemanagement.entity;

import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(
        name = "em_tag_t",
        uniqueConstraints = {
                @UniqueConstraint(name = "tagNameAndUserId", columnNames = {"name", "user_id"})
        },
        indexes = @Index(name = "tag_name_idx", columnList = "name,user_id")
        )
@Data
@ToString
public class Tag {
    @Id
    @GeneratedValue(generator = "tag-sequence-generator")
    @GenericGenerator(
            name = "tag-sequence-generator",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "sequence_name", value = "em_tag_sequence"),
                    @org.hibernate.annotations.Parameter(name = "initial_value", value = "1"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "1")
            }
    )
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "value", nullable = false)
    private String value;

    @CreatedDate
    private Date createdDate;

    @Column
    private Date updatedDate = new Date();

    @Column(name="user_id", nullable = false)
    private String userId;

    @OneToMany(targetEntity = TagMapping.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", referencedColumnName = "id")
    private List<TagMapping> tagMappings;

}
