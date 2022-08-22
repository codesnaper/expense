package com.expense.expensemanagement.entity;

import com.expense.expensemanagement.model.Constants;
import com.expense.expensemanagement.model.TagMappingType;
import lombok.Data;
import org.hibernate.annotations.Where;
import org.hibernate.annotations.WhereJoinTable;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "em_tag_mapping_t")
@Data
public class TagMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(fetch = FetchType.LAZY, targetEntity = Tag.class)
    @JoinColumn(name = "tag_id", referencedColumnName = "id")
    private Tag tags;


    @Column(name = "ref_id", nullable = false)
    private long refId;

    @Column(name = "mapping_table", nullable = false)
    @Enumerated(EnumType.STRING)
    private TagMappingType tagMappingType;


}
