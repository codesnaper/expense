package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.entity.TagMapping;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.TagMappingModal;
import com.expense.expensemanagement.model.TagModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 * Conversion class for TagMapping POJO
 */
@Component("TagMappingModelConversion")
public class TagMappingConversion implements EntityModalConversion<TagMapping, TagMappingModal> {

    @Autowired
    @Qualifier("TagEntityModel")
    private EntityModalConversion<Tag, TagModel> tagConversion;


    /**
     * {@inheritDoc}
     */
    @Override
    public TagMappingModal getModel(TagMapping tagMappingEntity) {
        TagMappingModal tagMappingModal = new TagMappingModal();
        tagMappingModal.setTagModel(tagConversion.getModel(tagMappingEntity.getTags()));
        return tagMappingModal;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TagMapping getEntity(TagMappingModal tagMappingModal) {
        return null;
    }
}
