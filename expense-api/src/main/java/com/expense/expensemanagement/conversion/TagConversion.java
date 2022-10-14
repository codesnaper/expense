package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.model.TagModel;
import org.springframework.stereotype.Component;

/**
 * Conversion class for Tag POJO
 */
@Component("TagEntityModel")
public class TagConversion implements EntityModalConversion<Tag, TagModel> {

    /**
     * {@inheritDoc}
     */
    @Override
    public TagModel getModel(Tag tagEntity) {
        TagModel tagModel = new TagModel();
        tagModel.setId(tagEntity.getId());
        tagModel.setKey(tagEntity.getName());
        tagModel.setValue(tagEntity.getValue());
        tagModel.setUserId(tagEntity.getUserId());
        return tagModel;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Tag getEntity(TagModel tagModel) {
        Tag tag = new Tag();
        tag.setName(tagModel.getKey());
        tag.setValue(tagModel.getValue());
        tag.setUserId(tagModel.getUserId());
        tag.setId(tagModel.getId());
        return tag;
    }
}
