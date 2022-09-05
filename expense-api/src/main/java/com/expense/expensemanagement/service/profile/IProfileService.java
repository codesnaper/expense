package com.expense.expensemanagement.service.profile;

import com.expense.expensemanagement.model.ProfileModel;

public interface IProfileService {

    ProfileModel newProfile(String userId);

    ProfileModel getProfile(String userId);

    ProfileModel updateProfile(ProfileModel profileModel);
}
