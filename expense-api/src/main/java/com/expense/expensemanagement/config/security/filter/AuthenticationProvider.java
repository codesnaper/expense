package com.expense.expensemanagement.config.security.filter;

import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.RSAKeyProvider;
import com.expense.expensemanagement.config.AwsCognitoRSAKeyProvider;
import com.expense.expensemanagement.config.CognitoConfiguration;
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
	private CognitoConfiguration cognitoConfiguration;

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

		RSAKeyProvider keyProvider = new AwsCognitoRSAKeyProvider(cognitoConfiguration.getJwkUrl());
		Algorithm algorithm = Algorithm.RSA256(keyProvider);
		JWTVerifier jwtVerifier = JWT.require(algorithm).build();

		DecodedJWT decodedJWT = jwtVerifier.verify(authResult.getAuthenticationResult().getAccessToken());

		Map<String, Claim> claims = decodedJWT.getClaims();
		String userId = claims.get(cognitoConfiguration.getUserNameField()).asString();

		String challengeName = authResult.getChallengeName();

		if (challengeName != null && challengeName.equals(ChallengeNameType.NEW_PASSWORD_REQUIRED.toString())) {
			throw new NewPasswordRequiredException("New Password Challenge");
		}
		authenticationHolder.setAuthResult(authResult.getAuthenticationResult());
		UserContext userContext = UserContext.create(userId, username, null);
		return new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());

	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
