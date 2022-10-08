package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.CurrencyType;
import com.expense.expensemanagement.model.ProfileModel;
import com.expense.expensemanagement.service.profile.IProfileService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/expense/api/v1/profile")
public class ProfileController {

    private final IProfileService profileService;

    @Autowired
    public ProfileController(IProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void addProfile(Principal principal){
        profileService.newProfile(ExpenseUtil.getUserId(principal));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ProfileModel updateProfile(ProfileModel profileModel, Principal principal){
        profileModel.setUserId(ExpenseUtil.getUserId(principal));
        return this.profileService.updateProfile(profileModel);
    }

    @PatchMapping(value = "/theme={theme}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ProfileModel updateTheme(Principal principal, @PathVariable("theme") String theme){
        return this.profileService.updateTheme(ExpenseUtil.getUserId(principal), theme);
    }

    @PatchMapping(value = "/currency={currency}", produces= MediaType.APPLICATION_JSON_VALUE)
    public ProfileModel updateTheme(Principal principal, @PathVariable("currency")CurrencyType currencyType){
        return this.profileService.updateSelectedCurrency(ExpenseUtil.getUserId(principal), currencyType);
    }

}
