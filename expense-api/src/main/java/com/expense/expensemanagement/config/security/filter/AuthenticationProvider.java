package com.expense.expensemanagement.config.security.filter;

import java.util.HashMap;
import java.util.Map;

import com.expense.expensemanagement.exception.NewPasswordRequiredException;
import com.expense.expensemanagement.model.CognitoAuthenticationResultHolder;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.cognito.CognitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.amazonaws.services.cognitoidp.model.AdminInitiateAuthResult;
import com.amazonaws.services.cognitoidp.model.ChallengeNameType;
import org.springframework.util.Assert;

@Component
public class AuthenticationProvider implements org.springframework.security.authentication.AuthenticationProvider {

	private final BCryptPasswordEncoder encoder;

	@Autowired
	public AuthenticationProvider(final BCryptPasswordEncoder encoder) {
		this.encoder = encoder;
	}

	@Autowired
	private CognitoService cognitoService;

	@Autowired
	private CognitoAuthenticationResultHolder authenticationHolder;

	@Override
	public Authentication authenticate(Authentication authentication) {
		Assert.notNull(authentication, "No authentication data provided");

		String username = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();

		Map<String, String> authParams = new HashMap<String, String>();
		authParams.put("USERNAME", username);
		authParams.put("PASSWORD", password);

		AdminInitiateAuthResult authResult = cognitoService.initializeAuthentication(authParams);

		if (authResult == null) {
			throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
		}

		String challengeName = authResult.getChallengeName();

		if (challengeName != null && challengeName.equals(ChallengeNameType.NEW_PASSWORD_REQUIRED.toString())) {
			throw new NewPasswordRequiredException("New Password Challenge");
		}
		authenticationHolder.setAuthResult(authResult.getAuthenticationResult());
		UserContext userContext = UserContext.create(username, null, null);
		return new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());

	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
