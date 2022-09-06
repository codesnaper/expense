package com.expense.expensemanagement.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import com.expense.expensemanagement.model.ProfileModel;
import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.service.cognito.CognitoService;
import com.expense.expensemanagement.service.profile.IProfileService;
import com.expense.expensemanagement.util.ExpenseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.cognitoidp.model.UserType;

@RestController
public class UserController {

	@Autowired
	private CognitoService cognitoService;

	@Autowired
	private IProfileService profileService;

	@RequestMapping(method = RequestMethod.GET, value = "/api/users")
	public List<UserType> getUsers() {
		ListUsersResult listUsersResult = cognitoService.getUsers();
		List<UserType> userTypeList = listUsersResult.getUsers();
		return userTypeList;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/api/user/{username}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public User getUser(@PathVariable String username) {
		User user = cognitoService.getUser(username);
		return user;
	}

	@PostMapping(value = "/expense/api/v1/user/profile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@PreAuthorize("isAuthenticated()")
	public void addProfile(Principal principal){
		profileService.newProfile(ExpenseUtil.getUserId(principal));
	}

	@RequestMapping(method = RequestMethod.POST, value = "/user")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		ResponseEntity<?> response;
		try {
			User authUser = cognitoService.createUser(user);
			response = new ResponseEntity<User>(authUser, HttpStatus.CREATED);
		} catch (Exception exception) {
			response = new ResponseEntity<String>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "api/user")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		ResponseEntity<?> response;
		try {
			User authUser = cognitoService.updateUser(user);
			response = new ResponseEntity<User>(authUser, HttpStatus.CREATED);
		} catch (Exception exception) {
			response = new ResponseEntity<String>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/api/auth/forgotPassword")
	public ResponseEntity<?> forgotPassword(@RequestParam(name = "username") String username) {
		ResponseEntity<?> response;
		try {
			if (cognitoService.forgotPassword(username))
				response = new ResponseEntity<Object>(HttpStatus.OK);
			else
				response = new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception exception) {
			response = new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
	}

//	@RequestMapping(method = RequestMethod.POST, value = "api/auth/resetPassword", consumes = "application/json")
//	public boolean resetPassword(@RequestBody String json) throws Exception {
//		JSONObject credentials = new JSONObject(json);
//
//		try {
//			String username = (!credentials.isNull("username")) ? credentials.getString("username") : "";
//			String oldPassword = (!credentials.isNull("oldPassword")) ? credentials.getString("oldPassword") : "";
//			String newPassword = (!credentials.isNull("newPassword")) ? credentials.getString("newPassword") : "";
//			String confirmationCode = (!credentials.isNull("confirmationCode"))
//					? credentials.getString("confirmationCode") : "";
//
//			if (username.equals("") || (oldPassword.equals("") && confirmationCode.equals(""))
//					|| newPassword.equals("")) {
//				throw new Exception("Invalid Parameters");
//			} else {
//				if (!confirmationCode.equals("")) {
//					return cognitoService.confirmForgotPassword(username, newPassword, confirmationCode);
//				} else {
//					return cognitoService.resetPassword(username, oldPassword, newPassword);
//				}
//			}
//		} catch (JSONException exception) {
//			throw new Exception("Invalid Parameters");
//		}
//	}

	@RequestMapping(method = RequestMethod.GET, value = "api/auth/token/{refreshToken}")
	public Map<String, String> refreshToken(@PathVariable String refreshToken) throws Exception {
		return cognitoService.getToken(refreshToken);
	}
}
