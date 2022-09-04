package com.expense.expensemanagement.exception;

import com.expense.expensemanagement.exception.modal.ErrorCode;
import com.expense.expensemanagement.exception.modal.ErrorResponse;
import com.expense.expensemanagement.model.ResponseError;
import org.springframework.dao.DuplicateKeyException;
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
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            Exception ex, WebRequest request) {
        return new ResponseEntity<ErrorResponse>(
                ErrorResponse.of(ex.getMessage(), ErrorCode.MISSING_FIELD, HttpStatus.BAD_REQUEST ), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DuplicateKeyException.class})
    public ResponseEntity<ErrorResponse> handleFieldException(Exception ex){
        ErrorResponse errorResponse =
                ErrorResponse.of(ex.getMessage().split(":")[1], ErrorCode.DUPLICATE_FIELD, HttpStatus.BAD_REQUEST );
        errorResponse.setIsErrorFieldName(ex.getMessage().split(":")[0]);
        return new ResponseEntity(errorResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<ErrorResponse> handleInternalException(
            Exception ex, WebRequest request) {
        return new ResponseEntity(
                ErrorResponse.of(ex.getMessage(), ErrorCode.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
