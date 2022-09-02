package com.expense.expensemanagement.model;

public enum Scopes {
	REFRESH_TOKEN;

	public String authority() {
		return "ROLE_" + this.name();
	}
}
