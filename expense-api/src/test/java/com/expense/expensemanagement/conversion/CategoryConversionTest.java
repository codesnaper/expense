package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.CategoryModal;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
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
class CategoryConversionTest {

    @Autowired
    CategoryConversion categoryConversion;

    @Test
    void getModel() {
        Assert.assertNotNull(categoryConversion.getModel(new Category()));
    }

    @Test
    void getEntity() {
        Assert.assertNotNull(categoryConversion.getEntity(new CategoryModal()));
    }
}