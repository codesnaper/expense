package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.entity.*;
import com.expense.expensemanagement.model.*;
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
class AccountConversionTest {

    @Mock
    BankConversion bankConversion;

    @Resource
    @InjectMocks
    AccountConversion accountConversion;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getEntityExpectErrorWhenBankDetailIsMissing() {
        AccountModel accountModel = new AccountModel();
        try{
            accountConversion.getEntity(accountModel);
        } catch (Exception ex){
            Assert.assertEquals(ErrorConstantMessage.BANK_DATA_NOT_PROVIDED, ex.getMessage());
        }
    }

    @Test
    void getEntity(){
        Mockito.when(bankConversion.getEntity(Mockito.any(BankModel.class))).thenReturn(new Bank());
        AccountModel accountModel = new AccountModel();
        accountModel.setBank(new BankModel());
        Assert.assertNotNull(accountConversion.getEntity(accountModel));
    }

    @Test
    void getEntityLoanAccount(){
        Mockito.when(bankConversion.getEntity(Mockito.any(BankModel.class))).thenReturn(new Bank());
        AccountModel accountModel = new LoanAccountModel();
        accountModel.setBank(new BankModel());
        Assert.assertNotNull(accountConversion.getEntity(accountModel));
    }

    @Test
    void getEntitySIAccount(){
        Mockito.when(bankConversion.getEntity(Mockito.any(BankModel.class))).thenReturn(new Bank());
        SIAccountModel accountModel = new SIAccountModel();
        accountModel.setBank(new BankModel());
        Assert.assertNotNull(accountConversion.getEntity(accountModel));
    }

    @Test
    void getEntitySavingCompoundInterestModel(){
        Mockito.when(bankConversion.getEntity(Mockito.any(BankModel.class))).thenReturn(new Bank());
        SavingCompoundInterestModel accountModel = new SavingCompoundInterestModel();
        accountModel.setBank(new BankModel());
        Assert.assertNotNull(accountConversion.getEntity(accountModel));
    }

    @Test
    void getEntityLoanAccountWithValue(){
        Mockito.when(bankConversion.getEntity(Mockito.any(BankModel.class))).thenReturn(new Bank());
        LoanAccountModel accountModel = new LoanAccountModel();
        accountModel.setTotalInterestAmount(0);
        accountModel.setTotalPayment(0);
        accountModel.setLendType(true);
        accountModel.setEmiPaid(0);
        accountModel.setInterestAmount(0);
        accountModel.setRate(1);
        accountModel.setBank(new BankModel());
        Assert.assertNotNull(accountConversion.getEntity(accountModel));
    }

    @Test
    void getModel(){
        Assert.assertNotNull(accountConversion.getModel(new Account()));
        Assert.assertNotNull(accountConversion.getModel(new LoanAccount()));
        Assert.assertNotNull(accountConversion.getModel(new SavingInterestAccount()));
        Assert.assertNotNull(accountConversion.getModel(new SavingCompoundInterestAccount()));
    }
}