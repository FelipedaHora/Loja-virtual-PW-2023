package com.LojaVirtual.LojaVirtual.controller;



import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LojaVirtual.LojaVirtual.entity.Estado;
import com.LojaVirtual.LojaVirtual.service.EstadoService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/estados")
@CrossOrigin
public class EstadoController {

    @Autowired
    private EstadoService estadoService;

    @GetMapping
    public List<Estado> buscarTodos() {
        return estadoService.buscarTodos();
    }

    @PostMapping
    public Estado inserir(@Valid@RequestBody Estado estado) {
        return estadoService.inserir(estado);
    }

    @PutMapping
    public Estado alterar(@RequestBody Estado estado) {
        return estadoService.alterar(estado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirEstado(@PathVariable Long id) {
        try {
            estadoService.excluir(id);
            return ResponseEntity.ok("Estado excluído com sucesso");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estado> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(estadoService.buscarPorId(id));
    }

}