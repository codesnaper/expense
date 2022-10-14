package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Profile;
import com.expense.expensemanagement.model.ProfileModel;
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
class ProfileConversionTest {

    @Autowired
    ProfileConversion profileConversion;

    @Test
    void getModel() {
        Assert.assertNotNull(profileConversion.getModel(new Profile()));
    }

    @Test
    void getEntity() {
        Assert.assertNotNull(profileConversion.getEntity(new ProfileModel()));
    }
}