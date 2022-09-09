package com.expense.expensemanagement.exception.modal;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

public enum ErrorCode {
	AUTHENTICATION, JWT_TOKEN_EXPIRED, JWT_TOKEN_INVLID, USER_CREATION_FAILED, NEW_PASSWORD_REQUIRED, MISSING_FIELD
	, SERVER_ERROR, DUPLICATE_FIELD, NO_ELEMENT;
}