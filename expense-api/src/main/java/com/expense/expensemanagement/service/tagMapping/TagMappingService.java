package com.expense.expensemanagement.service.tagMapping;

import com.expense.expensemanagement.dao.TagMappingDAO;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.service.tag.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagMappingService implements TagMapping {

    private final ITagService tagService;
    private final TagMappingDAO tagMappingDAO;

    @Autowired
    public TagMappingService(ITagService tagService, TagMappingDAO tagMappingDAO) {
        this.tagService = tagService;
        this.tagMappingDAO = tagMappingDAO;
    }

    @Override
    public List<com.expense.expensemanagement.entity.TagMapping> addTagMapping(Object model) {
        List<com.expense.expensemanagement.entity.TagMapping> tagMappingEntities = new ArrayList<>();
        List<TagModel> tagModels = new ArrayList<>();
        String userId = "";
        if (model instanceof BankModel) {
            tagModels = Optional.ofNullable(((BankModel) model).getTagModels()).orElse(new ArrayList<>());
            userId = ((BankModel) model).getUserId();
        } else if (model instanceof AccountModel) {
            tagModels = Optional.ofNullable(((AccountModel) model).getTags()).orElse(new ArrayList<>());
            userId = ((AccountModel) model).getUserId();
        }
        String user = userId;
        List<Long> tagIds = tagModels.stream().map(tag -> tag.getId()).collect(Collectors.toList());
        List<Tag> tagEntities = this.tagService.findAllByIds(tagIds).stream().filter(tag -> tag.getUserId().equalsIgnoreCase(user))
                .collect(Collectors.toList());
        if (tagIds.size() != tagEntities.size()) {
            throw new IllegalArgumentException(ErrorConstantMessage.TAG_NOT_CREATED);
        }
        tagEntities.parallelStream().forEach(tag -> {
            com.expense.expensemanagement.entity.TagMapping tagMapping = new com.expense.expensemanagement.entity.TagMapping();
            if (model instanceof BankModel) {
                tagMapping.setTagMappingType(TagMappingType.BANK);
                tagMapping.setRefId(((BankModel) model).getId());
            } else if (model instanceof AccountModel) {
                tagMapping.setTagMappingType(TagMappingType.ACCOUNT);
                tagMapping.setRefId(((AccountModel) model).getId());
            }
            tagMapping.setTags(tag);
            tagMappingEntities.add(tagMapping);
        });
        return tagMappingDAO.saveAll(tagMappingEntities);
    }
}
