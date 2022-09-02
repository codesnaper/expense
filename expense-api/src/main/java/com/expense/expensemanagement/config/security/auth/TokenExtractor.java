package com.expense.expensemanagement.config.security.auth;

public interface TokenExtractor {
	public String extract(String payload);
}
