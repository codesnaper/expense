package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Profile;
import com.expense.expensemanagement.model.ProfileModel;
import org.springframework.stereotype.Component;

@Component("ProfileConversion")
public class ProfileConversion implements EntityModalConversion<Profile, ProfileModel> {

    @Override
    public ProfileModel getModel(Profile profile) {
        ProfileModel profileModel = new ProfileModel();
        profileModel.setTheme(profileModel.getTheme());
        profileModel.setUserId(profile.getId());
        profileModel.setSelectedCurrency(profile.getSelectedCurrency());
        return profileModel;
    }

    @Override
    public Profile getEntity(ProfileModel profileModel) {
        Profile profile = new Profile();
        profile.setId(profileModel.getUserId());
        profile.setTheme(profileModel.getTheme());
        profile.setSelectedCurrency(profileModel.getSelectedCurrency());
        return profile;
    }
}
