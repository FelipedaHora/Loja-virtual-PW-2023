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

import com.LojaVirtual.LojaVirtual.entity.Produto;
import com.LojaVirtual.LojaVirtual.service.ProdutoService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/produtos")
@CrossOrigin
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoService.listarTodos();
    }

    @PostMapping
    public Produto salvar(@Valid@RequestBody Produto objeto) {
        return produtoService.salvar(objeto);
    }

    @PutMapping
    public Produto atualizar(@RequestBody Produto objeto) {
        return produtoService.atualizar(objeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluir (@PathVariable Long id) {
        try {
            produtoService.excluir(id);
            return ResponseEntity.ok("Produto excluído com sucesso");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

}
