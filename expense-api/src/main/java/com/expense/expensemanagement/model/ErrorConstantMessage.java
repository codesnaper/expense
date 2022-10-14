package com.expense.expensemanagement.model;

public interface ErrorConstantMessage {

    String ACCOUNT_NOT_FOUND = "Account not found";

    String ACCOUNT_ID_NOT_PROVIDED = "Account id is missing";

    String BANK_NOT_FOUND = "Bank not found.";

    String BANK_DATA_NOT_PROVIDED = "Missing bank details.";

    String CATEGORY_NOT_FOUND= "Category not found";

    String CATEGORY_ID_NOT_PROVIDED = "Category Id is missing";

    String PROFILE_NOT_FOUND= "Profile not found";

    String TAG_NOT_CREATED = "Provided Tag Id is not found or missing. Please create tag first.";

    String TAG_CONSTRAINT_ERROR = "name:Tag already exits. Tag name should be unique";

    String TAG_NOT_FOUND = "Tag id not found for the user";

    String TAG_IN_USED= "Tag is being in used";


}
