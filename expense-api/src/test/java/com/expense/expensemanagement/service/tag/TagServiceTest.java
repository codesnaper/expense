package com.expense.expensemanagement.service.tag;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.dao.TagMappingDAO;
import com.expense.expensemanagement.model.ErrorConstantMessage;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.TagModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.util.Arrays;

@SpringBootTest(classes = ExpenseManagementApplication.class)
@Transactional
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles({"test", "local"})
class TagServiceTest {

    @Autowired
    @InjectMocks
    TagService tagService;

    @Mock
    TagMappingDAO tagMappingDAO;

    TagModel resultTagModel;

    TagModel tagModel = new TagModel();

    @BeforeEach
    public void setUp() {
        tagModel.setValue("value");
        tagModel.setKey("key");
        tagModel.setUserId("test-123");
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void getTags() {
        ResponseList<TagModel> tags = tagService.getTags("test-123", 0, 10);
        Assert.isTrue(tags.getData() != null, "No Tag Data");
        Assert.hasText("0", String.valueOf(tags.getPageNo()));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void deleteTag() {
        TagModel resultTag = tagService.addTag(tagModel);
        tagService.deleteTag(resultTag.getId());
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void exceptErrorWhenTagIdNotFound() {
        try {
            tagService.deleteTag(100l);
        } catch (Exception exception) {
            Assert.hasText(ErrorConstantMessage.TAG_NOT_FOUND, exception.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void exceptErrorWhenTagIdInUse() {
        try {
            Mockito.when(tagMappingDAO.findByTags(Mockito.any()).size()).thenReturn(1);
            tagService.deleteTag(100l);
        } catch (Exception exception) {
            Assert.hasText(ErrorConstantMessage.TAG_IN_USED, exception.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void addTag() {
        resultTagModel = tagService.addTag(tagModel);
        Assert.hasText("value", resultTagModel.getValue());
        Assert.hasText("key", resultTagModel.getKey());
        Assert.hasText("test-123", resultTagModel.getUserId());
        Assert.notNull(String.valueOf(resultTagModel.getId()));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void exceptDuplicationKeyError() {
        tagService.addTag(tagModel);
        try {
            tagService.addTag(tagModel);
        } catch (Exception ex) {
            Assert.hasText(ErrorConstantMessage.TAG_CONSTRAINT_ERROR, ex.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void findTags() {
        TagModel tagModel1 = tagService.addTag(tagModel);
        Assert.notNull(tagService.findTags(tagModel1.getId(), tagModel1.getUserId()));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void FindTagsWithError() {
        try {
            tagService.findTags(resultTagModel.getId(), resultTagModel.getUserId());
        } catch (Exception ex) {
            Assert.hasText(ErrorConstantMessage.TAG_NOT_FOUND, ex.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void findAllByIds() {
        TagModel resultTagModel = tagService.addTag(tagModel);
        Assert.isTrue(tagService.findAllByIds(Arrays.asList(resultTagModel.getId())).size() != 0, "Should contain one tag");
    }


}