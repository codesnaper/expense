package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
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
}
