package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.model.User;
import com.expense.expensemanagement.service.cognito.CognitoService;
import com.expense.expensemanagement.service.profile.IProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private CognitoService cognitoService;

	@Autowired
	private IProfileService profileService;

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "/" , produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public User createUser(@RequestBody User user) {
		User authUser = cognitoService.createUser(user);
//		this.profileService.newProfile(authUser.getUser().getUsername());
		return authUser;
	}
	@PostMapping(value = "/forgotPassword", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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

	@GetMapping( value = "/token/{refreshToken}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Map<String, String> refreshToken(@PathVariable String refreshToken) throws Exception {
		return cognitoService.getToken(refreshToken);
	}
}
