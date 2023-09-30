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

import com.LojaVirtual.LojaVirtual.entity.CarrinhoCompra;
import com.LojaVirtual.LojaVirtual.service.CarrinhoCompraService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/carrinhoCompra")
@CrossOrigin
public class CarrinhoCompraController {

    @Autowired
    private CarrinhoCompraService carrinhoCompraService;

    @GetMapping("/")
    public List<CarrinhoCompra> buscarTodos() {
        return carrinhoCompraService.buscarTodos();
    }

    @PostMapping("/")
    public CarrinhoCompra inserir(@Valid@RequestBody CarrinhoCompra objeto) {
        return carrinhoCompraService.inserir(objeto);
    }

    @PutMapping("/")
    public CarrinhoCompra alterar(@RequestBody CarrinhoCompra objeto) {
        return carrinhoCompraService.alterar(objeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluircarrinhoCompraService(@PathVariable Long id) {
        try {
            carrinhoCompraService.excluir(id);
            return ResponseEntity.ok("Carrinho de Compras finalizado com sucesso");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarrinhoCompra> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(carrinhoCompraService.buscarPorId(id));
    }

}