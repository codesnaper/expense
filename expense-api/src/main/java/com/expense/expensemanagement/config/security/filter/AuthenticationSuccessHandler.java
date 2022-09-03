package com.expense.expensemanagement.config.security.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.CognitoAuthenticationResultHolder;
import com.expense.expensemanagement.model.Constants;
import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.cognito.CognitoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class AuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

	private ObjectMapper mapper;
	private final CognitoAuthenticationResultHolder cognitoAuthenticationResultHolder;

	@Autowired
	CognitoService cognitoService;

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
		//TODO: send Setting data for user
		Map<String, Object> responseMap = new HashMap<>();
		Map<String, String> userDetail = new HashMap<>();
		User user = cognitoService.getUser(
				((UserContext) authentication.getPrincipal()).getUsername()
		);
		userDetail.put("name", user.getName());
		userDetail.put("email", user.getEmail());
		responseMap.put("user", userDetail);
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
