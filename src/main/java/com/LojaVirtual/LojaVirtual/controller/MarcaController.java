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

import com.LojaVirtual.LojaVirtual.entity.Marca;
import com.LojaVirtual.LojaVirtual.service.MarcaService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/marcas")
@CrossOrigin
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    public List<Marca> buscarTodos() {
        return marcaService.buscarTodos();
    }

    @PostMapping
    public Marca inserir(@Valid@RequestBody Marca objeto) {
        return marcaService.inserir(objeto);
    }

    @PutMapping
    public Marca alterar(@RequestBody Marca objeto) {
        return marcaService.alterar(objeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirMarca(@PathVariable Long id) {
        try {
            marcaService.excluir(id);
            return ResponseEntity.ok("Marca excluída com sucesso");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marca> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(marcaService.buscarPorId(id));
    }

}