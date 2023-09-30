package com.LojaVirtual.LojaVirtual.config.model;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.LojaVirtual.LojaVirtual.config.model.ObjectValidationError;
import com.LojaVirtual.LojaVirtual.config.model.ResponseValidationError;




@RestControllerAdvice
public class RestValidationException extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        HttpStatus status = HttpStatus.valueOf(statusCode.value());
        ResponseValidationError errorResponse = getErrorResponse(ex, status);
        return new ResponseEntity<>(errorResponse, status);
    }

    private ResponseValidationError getErrorResponse(MethodArgumentNotValidException ex, HttpStatus status) {
        return new ResponseValidationError("A requisição possui campos inválidos", status.value(),
                status.getReasonPhrase(), ex.getBindingResult().getObjectName(), getErrors(ex));
    }

    private List<ObjectValidationError> getErrors(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getFieldErrors().stream()
                .map(error -> new ObjectValidationError(error.getDefaultMessage(), error.getField(),
                        error.getRejectedValue()))
                .collect(Collectors.toList());
    }
}
