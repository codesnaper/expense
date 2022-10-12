package com.expense.expensemanagement.config.security.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.*;
import com.expense.expensemanagement.service.cognito.CognitoService;
import com.expense.expensemanagement.service.profile.IProfileService;
import com.expense.expensemanagement.service.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
@Profile("prod")
public class AuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

	private ObjectMapper mapper;
	private final CognitoAuthenticationResultHolder cognitoAuthenticationResultHolder;

	@Autowired
	CognitoService cognitoService;

	@Autowired
	private IProfileService profileService;

	@Autowired
	public AuthenticationSuccessHandler(final ObjectMapper mapper,
                                        final CognitoAuthenticationResultHolder cognitoAuthenticationResultHolder) {
		this.mapper = mapper;
		this.cognitoAuthenticationResultHolder = cognitoAuthenticationResultHolder;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		response.setHeader(Constants.AUTHENTICATION_HEADER_NAME,
				cognitoAuthenticationResultHolder.getAuthResult().getAccessToken());
		response.setHeader(Constants.EXPIRE_TIME, cognitoAuthenticationResultHolder.getAuthResult().getExpiresIn().toString());
		response.setHeader(Constants.REFRESH_TOKEN, cognitoAuthenticationResultHolder.getAuthResult().getRefreshToken());
		response.setStatus(HttpStatus.OK.value());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		Map<String, Object> responseMap = new HashMap<>();
		Map<String, String> userDetail = new HashMap<>();
		User user = cognitoService.getUser(
				((UserContext) authentication.getPrincipal()).getUsername()
		);
		ProfileModel profileModel = null;
		try{
			 profileModel = profileService.getProfile(((UserContext) authentication.getPrincipal()).getUsername());
		} catch(NoSuchElementException ex){
			this.profileService.newProfile(((UserContext) authentication.getPrincipal()).getUsername());
			profileModel = profileService.getProfile(((UserContext) authentication.getPrincipal()).getUsername());
		} catch(Exception ex){
			throw ex;
		}
		userDetail.put("name", user.getNameFromAttribute());
		userDetail.put("email", user.getEmail());
		responseMap.put("user", userDetail);
		responseMap.put("profile", profileModel);
		mapper.writeValue(response.getWriter(), responseMap);
		clearAuthenticationAttributes(request);
	}


	protected final void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);

		if (session == null) {
			return;
		}

		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}

}
