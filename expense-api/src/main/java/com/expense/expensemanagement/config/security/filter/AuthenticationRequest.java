package com.expense.expensemanagement.config.security.filter;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticationRequest {
	private String username;
	private String password;
	private String newPassword;

	@JsonCreator
	public AuthenticationRequest(@JsonProperty("username") String username,
								 @JsonProperty("password") String password, @JsonProperty("newPassword") String newPassword) {
		this.username = username;
		this.password = password;
		this.newPassword = newPassword;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getNewPassword() {
		return newPassword;
	}
}
