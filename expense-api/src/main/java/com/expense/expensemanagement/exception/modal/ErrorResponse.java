package com.expense.expensemanagement.exception.modal;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ErrorResponse {
	// HTTP Response Status Code
	private final HttpStatus status;

	// General Error message
	private final String message;

	// Error code
	private final ErrorCode errorCode;

	private final Date timestamp;

	@JsonProperty("field")
	private String isErrorFieldName;

	public ErrorResponse(final String message, final ErrorCode errorCode, HttpStatus status) {
		this.message = message;
		this.errorCode = errorCode;
		this.status = status;
		this.timestamp = new Date();
	}

	public static ErrorResponse of(final String message, final ErrorCode errorCode, HttpStatus status) {
		return new ErrorResponse(message, errorCode, status);
	}
}