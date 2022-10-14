package com.expense.expensemanagement.config.security.auth;

import com.expense.expensemanagement.model.Constants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Component;

@Component
public class JwtHeaderTokenExtractor implements TokenExtractor {

	@Override
	public String extract(String header) {

		if (StringUtils.isBlank(header)) {
			throw new AuthenticationServiceException("Authorization header cannot be blank!");
		}

		if (header.length() < Constants.HEADER_PREFIX.length()) {
			throw new AuthenticationServiceException("Invalid authorization header size.");
		}

		return header.substring(Constants.HEADER_PREFIX.length());
	}

}
