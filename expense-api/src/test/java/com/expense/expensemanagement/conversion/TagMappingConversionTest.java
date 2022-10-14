package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.entity.TagMapping;
import com.expense.expensemanagement.model.TagMappingModal;
import com.expense.expensemanagement.model.TagModel;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = ExpenseManagementApplication.class)
@Transactional
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles({"test", "local"})
class TagMappingConversionTest {

    @Mock
    TagConversion tagConversion;

    @InjectMocks
    @Autowired
    TagMappingConversion tagMappingConversion;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getModel() {
        Mockito.when(tagConversion.getModel(Mockito.any(Tag.class))).thenReturn(new TagModel());
        Assert.assertNotNull(tagMappingConversion.getModel(new TagMapping()));
    }

    @Test
    void getEntity() {
        Assert.assertNull(tagMappingConversion.getEntity(new TagMappingModal()));
    }
}