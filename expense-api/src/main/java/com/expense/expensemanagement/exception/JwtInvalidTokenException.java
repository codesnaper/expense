package com.expense.expensemanagement.exception;

import org.springframework.security.authentication.AuthenticationServiceException;

public class JwtInvalidTokenException extends AuthenticationServiceException {

	private static final long serialVersionUID = 2960457289098019968L;

	public JwtInvalidTokenException(String msg) {
		super(msg);
	}
}
