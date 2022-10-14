package com.expense.expensemanagement.service.tagMapping;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.ErrorConstantMessage;
import com.expense.expensemanagement.model.TagModel;
import com.expense.expensemanagement.service.tag.TagService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;

@SpringBootTest(classes = ExpenseManagementApplication.class)
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles({"test", "local"})
class TagMappingServiceTest {

    @InjectMocks
    @Autowired
    TagMappingService tagMappingService;

    @Mock
    TagService tagService;

    BankModel bankModel = new BankModel();

    AccountModel accountModel = new AccountModel();

    @BeforeEach
    public void setUp() throws Exception {
        bankModel.setId(1L);
        TagModel tagModel = new TagModel();
        tagModel.setId(1);
        tagModel.setKey("tag");
        tagModel.setValue("value");
        bankModel.setTagModels(Arrays.asList(tagModel));
        bankModel.setUserId("test-123");
        Tag tag = new Tag();
        tag.setName("tag");
        tag.setValue("value");
        tag.setUserId("test-123");
        tag.setId(1);
        accountModel.setId(1l);
        accountModel.setUserId("test-123");
        accountModel.setTags(Arrays.asList(tagModel));
        MockitoAnnotations.initMocks(this);
        Mockito.when(tagService.findAllByIds(Mockito.any())).thenReturn(Arrays.asList(tag));
    }

    @Test
    void addTagMappingForBank() {
        tagMappingService.addTagMapping(bankModel);
    }

    @Test
    void addTagMappingForAccount() {
        tagMappingService.addTagMapping(accountModel);
    }

    @Test
    void expectExceptionWhenTagNotCreated() {
        Mockito.when(tagService.findAllByIds(Mockito.any())).thenReturn(new ArrayList<>());
        try {
            tagMappingService.addTagMapping(bankModel);
        } catch (Exception ex) {
            Assert.hasText(ErrorConstantMessage.TAG_NOT_CREATED, ex.getMessage());
        }
    }
}