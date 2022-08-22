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

import java.util.ArrayList;
import java.util.List;

@Component("TagMappingModelConversion")
public class TagMappingConversion implements EntityModalConversion<TagMapping, TagMappingModal>{

    @Autowired
    @Qualifier("TagEntityModel")
    private EntityModalConversion<Tag, TagModel> tagConversion;

    @Autowired
    @Qualifier("BankEntityModel")
    private EntityModalConversion<Bank, BankModel> bankConversion;

    @Override
    public TagMappingModal getModel(TagMapping tagMappingEntity) {
        TagMappingModal tagMappingModal = new TagMappingModal();
        if(tagConversion != null){
            tagMappingModal.setTagModel(tagConversion.getModel(tagMappingEntity.getTags()));
        }
        return tagMappingModal;
    }

    @Override
    public TagMapping getEntity(TagMappingModal tagMappingModal) {
        return null;
    }
}
