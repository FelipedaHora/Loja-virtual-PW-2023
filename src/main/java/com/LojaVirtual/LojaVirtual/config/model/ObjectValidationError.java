package com.LojaVirtual.LojaVirtual.config.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ObjectValidationError{
    private String message;
    private String campo;
    private Object valorEnviado;
}