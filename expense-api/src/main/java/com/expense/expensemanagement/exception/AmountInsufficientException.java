package com.expense.expensemanagement.exception;

public class AmountInsufficientException extends Exception{

    public AmountInsufficientException(String message) {
        super(message);
    }

    public AmountInsufficientException(String message, Throwable cause) {
        super(message, cause);
    }

    public AmountInsufficientException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
