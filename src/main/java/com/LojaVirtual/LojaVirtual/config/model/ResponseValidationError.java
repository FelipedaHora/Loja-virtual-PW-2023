package com.LojaVirtual.LojaVirtual.config.model;



import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResponseValidationError {
    private String message;
    private int code;
    private String status;
    private String objectName;
    private List<ObjectValidationError> errors;
}