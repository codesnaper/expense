package com.expense.expensemanagement.config.security;

import com.expense.expensemanagement.config.security.auth.TokenExtractor;
import com.expense.expensemanagement.config.security.filter.*;
import com.expense.expensemanagement.model.Constants;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);


	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private AuthenticationSuccessHandler successHandler;

	@Autowired
	private AuthenticationFailureHandler failureHandler;

	@Autowired
	@Qualifier("authenticationProvider")
	private AuthenticationProvider authenticationProvider;

	@Autowired
	@Qualifier("jwtAuthenticationProvider")
	private AuthenticationProvider jwtAuthenticationProvider;

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

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
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
		List<String> permitAllEndpointList = Arrays.asList(Constants.AUTHENTICATION_URL, Constants.REFRESH_TOKEN_URL, Constants.ACTUATOR,
				Constants.FORGOT_PASSWORD, Constants.RESET_PASSWORD, Constants.SWAGGER_URL, Constants.CREATE_USER, Constants.H2_URL);

		http.csrf().disable().exceptionHandling().authenticationEntryPoint(this.authenticationEntryPoint)
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and().authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.antMatchers("/expense/ws/**").permitAll()
				.antMatchers(permitAllEndpointList.toArray(new String[permitAllEndpointList.size()])).permitAll().and()
				.authorizeRequests().antMatchers(Constants.API_ROOT_URL).authenticated().and()
				.addFilterBefore(buildExampleAuthenticationFilter(Constants.AUTHENTICATION_URL),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(permitAllEndpointList, Constants.API_ROOT_URL),
						UsernamePasswordAuthenticationFilter.class);

		logger.debug("Completed security endpoints");
	}
}
