package com.expense.expensemanagement.service.profile;

import com.expense.expensemanagement.ExpenseManagementApplication;
import com.expense.expensemanagement.model.CurrencyType;
import com.expense.expensemanagement.model.ErrorConstantMessage;
import com.expense.expensemanagement.model.ProfileModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.util.Assert;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = ExpenseManagementApplication.class)
@Transactional
@TestPropertySource(locations = "classpath:application-test.yaml")
@ActiveProfiles({"test", "local"})
class ProfileServiceTest {

    @Autowired
    ProfileService profileService;

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void newProfile() {
        ProfileModel profileModel = profileService.newProfile("test-123");
        Assert.hasText(profileModel.getTheme(),"light");
        Assert.hasText(profileModel.getSelectedCurrency().getSymbol(), CurrencyType.INR.getSymbol());
        Assert.notNull(profileService.getProfile("test-123"));
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void expectProfileNotFoundError() {
        try{
            profileService.getProfile("123");
        } catch (Exception ex){
            Assert.hasText(ErrorConstantMessage.PROFILE_NOT_FOUND, ex.getMessage());
        }
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void updateProfile() {
        ProfileModel profileModel = profileService.newProfile("test-123");
        profileModel.setTheme("dark");
        profileModel = profileService.updateProfile(profileModel);
        Assert.hasText(profileModel.getTheme(),"dark");
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void updateTheme() {
        ProfileModel profileModel = profileService.newProfile("test-123");
        profileService.updateTheme(profileModel.getUserId(), "dark");
        Assert.hasText("dark", profileModel.getTheme());
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    void updateSelectedCurrency() {
        ProfileModel profileModel = profileService.newProfile("test-123");
        profileModel = profileService.updateSelectedCurrency(profileModel.getUserId(),CurrencyType.USD);
        Assert.hasText(profileModel.getSelectedCurrency().getSymbol(), CurrencyType.USD.getSymbol());
    }
}