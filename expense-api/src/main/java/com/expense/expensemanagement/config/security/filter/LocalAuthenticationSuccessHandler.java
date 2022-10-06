package com.expense.expensemanagement.config.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.expense.expensemanagement.config.TestUser;
import com.expense.expensemanagement.model.Constants;
import com.expense.expensemanagement.model.ProfileModel;
import com.expense.expensemanagement.model.UserContext;
import com.expense.expensemanagement.service.profile.IProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Component
@Profile("local")
public class LocalAuthenticationSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private IProfileService profileService;

    @Autowired
    TestUser user;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        String token = JWT.create()
                .withSubject(((UserContext)authentication.getPrincipal()).getUsername())
                .withExpiresAt( new Date(new Date().getTime() + (1000 * 60 * 60 * 24)))
                .sign(Algorithm.HMAC256(user.getSecret()));
        response.setHeader(Constants.AUTHENTICATION_HEADER_NAME, token);
        response.setHeader(Constants.EXPIRE_TIME, Integer.toString(30000000));
        response.setHeader(Constants.REFRESH_TOKEN,"");
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		Map<String, Object> responseMap = new HashMap<>();
		Map<String, String> userDetail = new HashMap<>();
		ProfileModel profileModel = null;
		try{
			 profileModel = profileService.getProfile(((UserContext) authentication.getPrincipal()).getUsername());
		} catch(NoSuchElementException ex){
			this.profileService.newProfile(((UserContext) authentication.getPrincipal()).getUsername());
			profileModel = profileService.getProfile(((UserContext) authentication.getPrincipal()).getUsername());
		} catch(Exception ex){
			throw ex;
		}
		userDetail.put("name", user.getName());
		userDetail.put("email", user.getUserEmail() );
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
