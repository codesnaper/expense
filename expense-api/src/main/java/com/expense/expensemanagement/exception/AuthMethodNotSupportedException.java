package com.expense.expensemanagement.exception;

import org.springframework.security.authentication.AuthenticationServiceException;

public class AuthMethodNotSupportedException extends AuthenticationServiceException {

	private static final long serialVersionUID = -3429603047232799738L;

	public AuthMethodNotSupportedException(String msg) {
		super(msg);
	}
}