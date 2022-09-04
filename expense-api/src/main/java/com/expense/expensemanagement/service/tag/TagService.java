package com.expense.expensemanagement.service.tag;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.TagDAO;
import com.expense.expensemanagement.dao.TagMappingDAO;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.TagModel;
import com.expense.expensemanagement.service.tagMapping.TagMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TagService implements ITagService {

    private final TagDAO tagDAO;
    @Autowired
    @Qualifier("TagEntityModel")
    private EntityModalConversion<Tag, TagModel> tagEntityModel;

    @Autowired
    private TagMappingDAO tagMappingDAO;

    @Autowired
    public TagService(TagDAO tagDAO ) {
        this.tagDAO = tagDAO;
    }

    public ResponseList<TagModel> getTags(String userId, int page, int size) {
        Page<Tag> tagModels = this.tagDAO.findByUserId( userId,PageRequest.of(page, size));
        ResponseList<TagModel> tagResponseList = new ResponseList<>();
        tagResponseList.setPageNo(tagModels.getNumber());
        tagResponseList.setTotalPage(tagModels.getTotalPages());
        tagResponseList.setTotalCount(tagModels.getTotalElements());
        tagResponseList.setData(tagModels.stream().map((tagEntity) -> tagEntityModel.getModel(tagEntity)).collect(Collectors.toList()));
        return tagResponseList;
    }

    public void deleteTag(Long id) {
        Tag tag = tagDAO.findById(id).orElseThrow(
                () -> new NoSuchElementException("Tag Not found")
        );
        if(this.tagMappingDAO.findByTags(tag).size() != 0){
            throw new IllegalStateException("Tag is being in used");
        }
        this.tagDAO.deleteById(tag.getId());
    }

    public TagModel addTag(TagModel tagModel) {
        try {
            Tag tagEntity = this.tagDAO.save(tagEntityModel.getEntity(tagModel));
            tagModel.setId(tagEntity.getId());
            return tagModel;
        }
        catch (DataIntegrityViolationException ex){
            throw new DuplicateKeyException("name:Tag already exits. Tag name should be unique");
        }
    }

    public List<Tag> findAllByIds(List<Long> ids) {
        Iterator<Tag> tagIterator = this.tagDAO.findAllById(ids).iterator();
        List<Tag> tagEntities = new ArrayList<>();
        while (tagIterator.hasNext()) {
            tagEntities.add(tagIterator.next());
        }
        return tagEntities;
    }

    @Override
    public TagModel findTags(long tagId, String userId) {
        return this.tagEntityModel.getModel(this.tagDAO.findByUserIdAndId(userId, tagId).orElseThrow(() -> new NoSuchElementException("Tag id not found for the user")));
    }
}
