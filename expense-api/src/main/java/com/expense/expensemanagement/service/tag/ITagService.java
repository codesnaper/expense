package com.expense.expensemanagement.service.tag;

import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.TagModel;

import java.util.List;

public interface ITagService {
    void deleteTag(Long id);
    ResponseList<TagModel> getTags(String userId, int page, int size);
    TagModel addTag(TagModel tagModel);
    List<com.expense.expensemanagement.entity.Tag> findAllByIds(List<Long> ids);

    TagModel findTags(long tagId, String userId);
}
