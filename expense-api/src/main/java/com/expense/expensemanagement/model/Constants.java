package com.expense.expensemanagement.model;

public interface Constants {

        String BANK_TAG_MAPPING="BANK";
        String ACCOUNT_TAG_MAPPING="ACCOUNT";
        String AUTHENTICATION_HEADER_NAME = "Authorization";
        String AUTHENTICATION_URL = "/login";
        String REFRESH_TOKEN_URL = "/user/token/**";
        String RESET_PASSWORD = "/auth/resetPassword";
        String FORGOT_PASSWORD = "/user/forgotPassword";
        String CREATE_USER = "/user/";
        String API_ROOT_URL = "/expense/api/v1/**";
        String SWAGGER_URL = "/swagger-ui.html";
        String H2_URL = "/h2-console/**";
        String ACTUATOR = "/actuator/**";
        String REFRESH_TOKEN = "refreshtoken";
        String EXPIRE_TIME = "expire";
        String HEADER_PREFIX = "Bearer ";
}
