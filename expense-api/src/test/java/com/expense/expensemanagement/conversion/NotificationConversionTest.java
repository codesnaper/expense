package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.NotificationModel;
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
class NotificationConversionTest {

    @Autowired
    NotificationConversion notificationConversion;
    @Test
    void getModel() {
        Assert.assertNotNull(notificationConversion.getModel(new Notification()));
    }

    @Test
    void getEntity() {
        Assert.assertNotNull(notificationConversion.getEntity(new NotificationModel()));
    }
}