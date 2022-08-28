package com.expense.expensemanagement.exception;

import com.expense.expensemanagement.model.ResponseError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestException extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ IllegalArgumentException.class })
    public ResponseEntity<ResponseError> handleAccessDeniedException(
            Exception ex, WebRequest request) {
        ResponseError error = new ResponseError();
        error.setMessage(ex.getMessage());
        error.setDetails(ex.getLocalizedMessage());
        return new ResponseEntity<ResponseError>(
                error, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<ResponseError> handleInternalException(
            Exception ex, WebRequest request) {
        ResponseError error = new ResponseError();
        error.setMessage(ex.getMessage());
        error.setDetails(ex.getLocalizedMessage());
        return new ResponseEntity<ResponseError>(
                error, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
