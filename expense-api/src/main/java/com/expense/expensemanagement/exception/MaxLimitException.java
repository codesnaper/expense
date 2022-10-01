package com.expense.expensemanagement.exception;

public class MaxLimitException extends Exception{

    public MaxLimitException(String message) {
        super(message);
    }

    public MaxLimitException(String message, Throwable cause) {
        super(message, cause);
    }

    public MaxLimitException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
