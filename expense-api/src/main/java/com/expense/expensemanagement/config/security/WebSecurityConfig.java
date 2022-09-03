package com.expense.expensemanagement.config.security;

import java.util.Arrays;
import java.util.List;

import com.expense.expensemanagement.config.security.auth.TokenExtractor;
import com.expense.expensemanagement.config.security.filter.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

	public static final String AUTHENTICATION_HEADER_NAME = "Authorization";
	public static final String AUTHENTICATION_URL = "/login";
	public static final String REFRESH_TOKEN_URL = "/api/auth/token/**";
	public static final String RESET_PASSWORD = "/api/auth/resetPassword";
	public static final String FORGOT_PASSWORD = "/api/auth/forgotPassword";
	public static final String API_ROOT_URL = "/api/**";
	public static final String SWAGGER_URL = "/swagger-ui.html";

	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private AuthenticationSuccessHandler successHandler;

	@Autowired
	private AuthenticationFailureHandler failureHandler;

	@Autowired
	private AuthenticationProvider authenticationProvider;

	@Autowired
	private JwtAuthenticationProvider jwtAuthenticationProvider;

	@Autowired
	private TokenExtractor tokenExtractor;

	@Autowired
	private ObjectMapper objectMapper;

	protected AuthenticationFilter buildExampleAuthenticationFilter(String authenticationEntryPoint)
			throws Exception {
		AuthenticationFilter filter = new AuthenticationFilter(authenticationEntryPoint, successHandler,
				failureHandler, objectMapper);
		filter.setAuthenticationManager(super.authenticationManager());
		return filter;
	}

	protected JwtAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter(List<String> pathsToSkip,
																							String pattern) throws Exception {
		SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(pathsToSkip, pattern);
		JwtAuthenticationProcessingFilter filter = new JwtAuthenticationProcessingFilter(failureHandler, tokenExtractor,
				matcher);
		filter.setAuthenticationManager(super.authenticationManager());
		return filter;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		logger.debug("Configuring auth endpoints");
		auth.authenticationProvider(authenticationProvider);
		auth.authenticationProvider(jwtAuthenticationProvider);
		logger.debug("Completed auth endpoints");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		logger.debug("Configuring security endpoints");
		List<String> permitAllEndpointList = Arrays.asList(AUTHENTICATION_URL, REFRESH_TOKEN_URL, FORGOT_PASSWORD,
				RESET_PASSWORD, SWAGGER_URL, "/console");

		http.csrf().disable().exceptionHandling().authenticationEntryPoint(this.authenticationEntryPoint)

				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

				.and().authorizeRequests()
				.antMatchers(permitAllEndpointList.toArray(new String[permitAllEndpointList.size()])).permitAll().and()
				.authorizeRequests().antMatchers(API_ROOT_URL).authenticated().and()
				.addFilterBefore(new CORSFilter(), UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(buildExampleAuthenticationFilter(AUTHENTICATION_URL),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(permitAllEndpointList, API_ROOT_URL),
						UsernamePasswordAuthenticationFilter.class);

		logger.debug("Completed security endpoints");
	}

}
