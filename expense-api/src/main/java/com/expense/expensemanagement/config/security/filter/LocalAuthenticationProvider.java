package com.expense.expensemanagement.config.security.filter;

import com.amazonaws.services.cognitoidp.model.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.RSAKeyProvider;
import com.expense.expensemanagement.config.AwsCognitoRSAKeyProvider;
import com.expense.expensemanagement.config.CognitoConfiguration;
import com.expense.expensemanagement.config.TestUser;
import com.expense.expensemanagement.exception.NewPasswordRequiredException;
import com.expense.expensemanagement.model.CognitoAuthenticationResultHolder;
import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.cognito.CognitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.io.UnsupportedEncodingException;
import java.util.*;

@Component("authenticationProvider")
@Profile("local")
public class LocalAuthenticationProvider implements org.springframework.security.authentication.AuthenticationProvider {

	private final BCryptPasswordEncoder encoder;

	@Autowired
	public LocalAuthenticationProvider(final BCryptPasswordEncoder encoder) {
		this.encoder = encoder;
	}

	@Autowired
	private TestUser user;

	@Override
	public Authentication authenticate(Authentication authentication) {
		Assert.notNull(authentication, "No authentication data provided");
		String username = (String) authentication.getPrincipal();
		String password = (String) authentication.getCredentials();
		if(!password.equals(user.getUserPassword()) && !username.equals(user.getUserEmail())){
			throw new BadCredentialsException("Authentication Failed. Username or Password not valid.");
		}
		UserContext userContext = UserContext.create("test-123", user.getUserEmail(), null);
		return new UsernamePasswordAuthenticationToken(userContext, null, userContext.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
