package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.CategoryDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Category;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.AccountModel;
import com.expense.expensemanagement.model.CategoryModal;
import com.expense.expensemanagement.model.ErrorConstantMessage;
import com.expense.expensemanagement.model.LimitModel;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import javax.transaction.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = ExpenseManagementApplication.class)
@Transactional
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles({"test", "local"})
class LimitConversionTest {

    @Mock
    CategoryDao categoryDao;

    @Mock
    AccountDAO accountDAO;

    @Mock
    CategoryConversion categoryConversion;

    @Mock
    AccountConversion accountConversion;

    static LimitModel limitModel = new LimitModel();

    static Category category = new Category();

    static Account account = new Account();

    static {
        limitModel.setUserid("test-123");
        limitModel.setName("Test Limit");
        limitModel.setDescription("Test Description");
    }

    @InjectMocks
    @Autowired
    LimitConversion limitConversion;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void exceptErrorFromAccountInLimit() {
        limitModel.setCategoryId(1l);
        Mockito.when(accountDAO.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        limitModel.setAccountId(null);
        Mockito.when(categoryDao.findById(Mockito.anyLong())).thenReturn(Optional.of(category));
        try{
            limitConversion.getEntity(limitModel);
        }catch (Exception ex){
            Assert.assertEquals(ErrorConstantMessage.ACCOUNT_ID_NOT_PROVIDED, ex.getMessage());
        }
        limitModel.setAccountId(1l);
        try {
            limitConversion.getEntity(limitModel);
        } catch (Exception ex){
            Assert.assertEquals(ErrorConstantMessage.ACCOUNT_NOT_FOUND, ex.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void exceptErrorFromCategoryInLimit(){
        limitModel.setAccountId(1l);
        Mockito.when(accountDAO.findById(Mockito.anyLong())).thenReturn(Optional.of(account));
        Mockito.when(categoryDao.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        limitModel.setCategoryId(null);
        try{
            limitConversion.getEntity(limitModel);
        } catch (Exception ex){
            Assert.assertEquals(ErrorConstantMessage.CATEGORY_ID_NOT_PROVIDED, ex.getMessage());
        }
        limitModel.setCategoryId(1l);
        try{
            limitConversion.getEntity(limitModel);
        } catch (Exception ex){
            Assert.assertEquals(ErrorConstantMessage.CATEGORY_NOT_FOUND, ex.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void convertEntity(){
        limitModel.setAccountId(1l);
        limitModel.setCategoryId(1l);
        Mockito.when(accountDAO.findById(Mockito.anyLong())).thenReturn(Optional.of(account));
        Mockito.when(categoryDao.findById(Mockito.anyLong())).thenReturn(Optional.of(category));
        Assert.assertNotNull(limitConversion.getEntity(limitModel));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void convertModel(){
        Mockito.when(categoryConversion.getModel(Mockito.any(Category.class))).thenReturn(new CategoryModal());
        Mockito.when(accountConversion.getModel(Mockito.any(Account.class))).thenReturn(new AccountModel());
        Assert.assertNotNull(limitConversion.getModel(new Limit()));
        Limit limit = new Limit();
        limit.setMaxAmount(new BigDecimal(10));
        limit.setMinAmount(new BigDecimal(10));
        limit.setUsedAmount(new BigDecimal(10));
        Assert.assertNotNull(limitConversion.getModel(limit));
    }
}