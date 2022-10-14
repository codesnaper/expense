package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.LimitModel;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = ExpenseManagementApplication.class)
@Transactional
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles({"test", "local"})
class ExpenditureConversionTest {

    @Mock
    AccountConversion accountConversion;

    @Mock
    LimitConversion limitConversion;

    @InjectMocks
    @Resource
    ExpenditureConversion expenditureConversion;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getModel() {
        Mockito.when(accountConversion.getModel(Mockito.any(Account.class))).thenReturn(new AccountModel());
        Assert.assertNotNull(expenditureConversion.getModel(new Expenditure()));
    }

    @Test
    void getModelWithCategory() {
        Mockito.when(accountConversion.getModel(Mockito.any(Account.class))).thenReturn(new AccountModel());
        Expenditure expenditure = new Expenditure();
        expenditure.setCategory(new Category());
        Assert.assertNotNull(expenditureConversion.getModel(expenditure));
    }

    @Test
    void getModelWithFromAccount() {
        Mockito.when(accountConversion.getModel(Mockito.any(Account.class))).thenReturn(new AccountModel());
        Expenditure expenditure = new Expenditure();
        expenditure.setFromAccount(new Account());
        Assert.assertNotNull(expenditureConversion.getModel(expenditure));
    }

    @Test
    void getModelWithLimit() {
        Mockito.when(limitConversion.getModel(Mockito.any(Limit.class))).thenReturn(new LimitModel());
        Mockito.when(accountConversion.getModel(Mockito.any(Account.class))).thenReturn(new AccountModel());
        Expenditure expenditure = new Expenditure();
        expenditure.setLimit(new Limit());
        Assert.assertNotNull(expenditureConversion.getModel(expenditure));
    }

    @Test
    void getEntity() {
        Mockito.when(accountConversion.getEntity(Mockito.any(AccountModel.class))).thenReturn(new Account());
        Assert.assertNotNull(expenditureConversion.getEntity(new ExpenditureModel()));
    }

    @Test
    void getEntityWithCategory() {
        Mockito.when(accountConversion.getEntity(Mockito.any(AccountModel.class))).thenReturn(new Account());
        ExpenditureModel expenditure = new ExpenditureModel();
        expenditure.setCategoryModal(new CategoryModal());
        Assert.assertNotNull(expenditureConversion.getEntity(expenditure));
    }

    @Test
    void getEntityWithFromAccount() {
        Mockito.when(accountConversion.getEntity(Mockito.any(AccountModel.class))).thenReturn(new Account());
        ExpenditureModel expenditure = new ExpenditureModel();
        expenditure.setFromAccount(new AccountModel());
        Assert.assertNotNull(expenditureConversion.getEntity(expenditure));
    }

    @Test
    void getEntityWithLimit() {
        Mockito.when(accountConversion.getEntity(Mockito.any(AccountModel.class))).thenReturn(new Account());
        Mockito.when(limitConversion.getEntity(Mockito.any(LimitModel.class))).thenReturn(new Limit());
        ExpenditureModel expenditure = new ExpenditureModel();
        expenditure.setLimit(new LimitModel());
        Assert.assertNotNull(expenditureConversion.getEntity(expenditure));
    }
}