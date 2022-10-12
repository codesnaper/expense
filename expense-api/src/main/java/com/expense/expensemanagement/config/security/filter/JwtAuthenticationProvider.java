package com.expense.expensemanagement.config.security.filter;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.config.AwsCognitoRSAKeyProvider;
import com.expense.expensemanagement.config.CognitoConfiguration;
import com.expense.expensemanagement.exception.JwtExpiredTokenException;
import com.expense.expensemanagement.exception.JwtInvalidTokenException;
import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.cognito.CognitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.RSAKeyProvider;

@Component("jwtAuthenticationProvider")
@Profile("prod")
public class JwtAuthenticationProvider implements AuthenticationProvider {

	private static final String ROLE_PREFIX = "ROLE_";

	@Autowired
	private CognitoConfiguration cognitoConfiguration;

	@Autowired
	private CognitoService cognitoService;

	@Override
	public Authentication authenticate(Authentication authentication) {
		try {
			String token = authentication.getCredentials().toString();

			RSAKeyProvider keyProvider = new AwsCognitoRSAKeyProvider(cognitoConfiguration.getJwkUrl());
			Algorithm algorithm = Algorithm.RSA256(keyProvider);
			JWTVerifier jwtVerifier = JWT.require(algorithm).build();

			DecodedJWT decodedJWT = jwtVerifier.verify(token);

			Map<String, Claim> claims = decodedJWT.getClaims();
			String username = claims.get(cognitoConfiguration.getUserNameField()).asString();

//			List<String> groups = claims.get(cognitoConfiguration.getGroupsField()).asList(String.class);
			List<String> groups = Arrays.asList(new String[]{"USER"});
			List<GrantedAuthority> grantedAuthorities = convertList(groups,
					group -> new SimpleGrantedAuthority(ROLE_PREFIX + group.toUpperCase()));

			User user = cognitoService.getUser(username);
			String name = user.getNameFromAttribute();
			UserContext context = UserContext.create(username, name, grantedAuthorities);
			return new JwtAuthenticationToken(context, context.getAuthorities());
		} catch (JWTVerificationException exception) {
			throw new JwtExpiredTokenException("Token has expired. ".concat(exception.getMessage()));
		} catch (Exception exception) {
			throw new JwtInvalidTokenException("Invalid Token. ");
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
	}

	private static <T, U> List<U> convertList(List<T> from, Function<T, U> func) {
		return from.stream().map(func).collect(Collectors.toList());
	}
}
