package com.lojaVirtual.lojaVirtual.controllers;


import java.util.List;

public interface ControllerCRUD<T> {

    List<T> buscarTodos();

    T buscarPorId(long id);

    boolean criar(T objeto);

    boolean deletar(long id);

}
