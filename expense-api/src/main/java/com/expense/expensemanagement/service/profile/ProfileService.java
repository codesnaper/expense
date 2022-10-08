package com.expense.expensemanagement.service.profile;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.ProfileDAO;
import com.expense.expensemanagement.entity.Profile;
import com.expense.expensemanagement.model.CurrencyType;
import com.expense.expensemanagement.model.ProfileModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class ProfileService implements IProfileService{

    private final ProfileDAO profileDAO;
    private final EntityModalConversion<Profile, ProfileModel> profileModelEntity;

    @Autowired
    public ProfileService(ProfileDAO profileDAO, @Qualifier("ProfileConversion") EntityModalConversion<Profile, ProfileModel> profileModelEntity) {
        this.profileDAO = profileDAO;
        this.profileModelEntity = profileModelEntity;
    }

    public ProfileModel newProfile(String userId){
        Profile profile = new Profile();
        profile.setId(userId);
        profile.setTheme("light");
        profile.setSelectedCurrency(CurrencyType.INR);
        profile = this.profileDAO.save(profile);
        return this.profileModelEntity.getModel(profile);
    }

    public ProfileModel getProfile(String userId){
        Profile profile = this.profileDAO.findById(userId).orElseThrow(() -> new NoSuchElementException("Profile not found"));
        return this.profileModelEntity.getModel(profile);
    }

    public ProfileModel updateProfile(ProfileModel profileModel){
        this.profileDAO.save(profileModelEntity.getEntity(profileModel));
        return profileModel;
    }

    @Override
    public ProfileModel updateTheme(String userId, String theme) {
        Profile profile = this.profileDAO.findById(userId).orElseThrow(NoSuchElementException::new);
        profile.setTheme(theme);
        this.profileDAO.save(profile);
        return profileModelEntity.getModel(profile);
    }

    @Override
    public ProfileModel updateSelectedCurrency(String userId, CurrencyType currencyType) {
        Profile profile = this.profileDAO.findById(userId).orElseThrow(NoSuchElementException::new);
        profile.setSelectedCurrency(currencyType);
        this.profileDAO.save(profile);
        return profileModelEntity.getModel(profile);
    }
}
