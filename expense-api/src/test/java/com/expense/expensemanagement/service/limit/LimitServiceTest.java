//package com.expense.expensemanagement.service.limit;
//
//import com.expense.expensemanagement.ExpenseManagementApplication;
//import com.expense.expensemanagement.conversion.LimitConversion;
//import com.expense.expensemanagement.model.*;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.util.Assert;
//
//import javax.transaction.Transactional;
//import java.util.Optional;
//
//@SpringBootTest(classes = ExpenseManagementApplication.class)
//@Transactional
//@TestPropertySource(locations = "classpath:application-test.yaml")
//class LimitServiceTest {
//
//    @Mock
//    LimitConversion limitConversion;
//
//    @InjectMocks
//    @Autowired
//    LimitService limitService;
//
//    static LimitModel limitModel = new LimitModel();
//
//    static {
//        limitModel.setAccount(new AccountModel());
//        limitModel.setAccountId(1l);
//        categoryModal.setId(1l);
//        limitModel.setCategoryId(categoryModal.getId());
//        limitModel.setCategoryModal(categoryModal);
//        accountModel.setId(1l);
//        limitModel.setAccount(accountModel);
//        limitModel.setAccountId(accountModel.getId());
//        limitModel.setDescription("Test Description");
//        limitModel.setMaxAmount(100);
//        limitModel.setMinAmount(0);
//        limitModel.setName("Test Limit");
//        limitModel.setUserid("test-123");
//        limitModel.setResetRecursively(Recursive.DAILY);
//    }
//
//    @BeforeEach
//    public void setUp() {
//    }
//
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    void addLimit() {
//        Assert.notNull(limitService.addLimit(limitModel), "Limit modal should not be null");
//    }
//
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    void getLimits() {
//        ResponseList<LimitModel> responseList = limitService.getLimits(0, 10, "test-123");
//        org.junit.Assert.assertEquals(responseList.getTotalCount(), 0);
//        org.junit.Assert.assertEquals(responseList.getPageNo(), 0);
//        Assert.notNull(limitService.addLimit(limitModel), "Limit modal should not be null");
//        responseList = limitService.getLimits(0, 10, "test-123");
//        org.junit.Assert.assertEquals(responseList.getTotalCount(), 1);
//    }
//
//    @Test
//    void updateLimit() {
//    }
//
//    @Test
//    void deleteLimit() {
//    }
//
//    @Test
//    void fetchAllLimit() {
//    }
//}