package com.expense.expensemanagement.config.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.RSAKeyProvider;
import com.expense.expensemanagement.config.AwsCognitoRSAKeyProvider;
import com.expense.expensemanagement.config.CognitoConfiguration;
import com.expense.expensemanagement.config.TestUser;
import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
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

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component("jwtAuthenticationProvider")
@Profile("local")
public class LocalJwtAuthenticationProvider implements AuthenticationProvider {

	private static final String ROLE_PREFIX = "ROLE_";

	@Autowired
	TestUser user;

	@Override
	public Authentication authenticate(Authentication authentication) {
		try {
			String token = authentication.getCredentials().toString();
			JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getSecret())).build();
			DecodedJWT decodedJWT = jwtVerifier.verify(token);
			Map<String, Claim> claims = decodedJWT.getClaims();
			String username = claims.get("sub").asString();
			List<String> groups = Arrays.asList(new String[]{"USER"});
			List<GrantedAuthority> grantedAuthorities = convertList(groups,
					group -> new SimpleGrantedAuthority(ROLE_PREFIX + group.toUpperCase()));
			String name = user.getName();
			UserContext context = UserContext.create(username, name, grantedAuthorities);
			return new JwtAuthenticationToken(context, context.getAuthorities());
//			return null;
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
