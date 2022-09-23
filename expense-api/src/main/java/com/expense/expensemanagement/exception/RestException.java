package com.expense.expensemanagement.exception;

import com.expense.expensemanagement.exception.modal.ErrorCode;
import com.expense.expensemanagement.exception.modal.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
@Slf4j
public class RestException extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ IllegalArgumentException.class })
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            Exception ex, WebRequest request) {
        log.error(ex.getMessage(),ex);
        return new ResponseEntity<ErrorResponse>(
                ErrorResponse.of(ex.getMessage(), ErrorCode.MISSING_FIELD, HttpStatus.BAD_REQUEST ), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({DuplicateKeyException.class})
    public ResponseEntity<ErrorResponse> handleFieldException(Exception ex){
        log.error(ex.getMessage(),ex);
        ErrorResponse errorResponse =
                ErrorResponse.of(ex.getMessage().split(":")[1], ErrorCode.DUPLICATE_FIELD, HttpStatus.BAD_REQUEST );
        errorResponse.setIsErrorFieldName(ex.getMessage().split(":")[0]);
        return new ResponseEntity(errorResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NoSuchElementException.class})
    public ResponseEntity<ErrorResponse> handleNoSuchException(Exception ex){
        log.error(ex.getMessage(),ex);
        return new ResponseEntity(
                ErrorResponse.of(ex.getMessage(), ErrorCode.NO_ELEMENT, HttpStatus.BAD_REQUEST),
                new HttpHeaders(), HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<ErrorResponse> handleInternalException(
            Exception ex, WebRequest request) {
        log.error(ex.getMessage(),ex);
        return new ResponseEntity(
                ErrorResponse.of(ex.getMessage(), ErrorCode.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
