package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.model.BankModel;
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
class BankConversionTest {

    @Autowired
    BankConversion bankConversion;

    @Test
    void getModel() {
        Assert.assertNotNull(bankConversion.getModel(new Bank()));
    }

    @Test
    void getEntity() {
        Bank bank= bankConversion.getEntity(new BankModel());
        Assert.assertNotNull(bank);
        Assert.assertEquals(0,bank.getId());
    }

    @Test
    void getEntityWithId() {
        BankModel bankModel = new BankModel();
        bankModel.setId(1l);
        Assert.assertNotNull(bankConversion.getEntity(bankModel));
    }
}