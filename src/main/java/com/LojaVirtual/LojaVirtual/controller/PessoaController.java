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

import com.LojaVirtual.LojaVirtual.entity.Pessoa;
import com.LojaVirtual.LojaVirtual.service.PessoaService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/pessoa")
@CrossOrigin
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping("/")
    public List<Pessoa> buscarTodos() {
        return pessoaService.buscarTodos();
    }

    @PostMapping("/")
    public Pessoa inserir(@Valid@RequestBody Pessoa objeto) {
        return pessoaService.inserir(objeto);
    }

    @PutMapping("/")
    public Pessoa alterar(@RequestBody Pessoa objeto) {
        return pessoaService.alterar(objeto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluirPessoa(@PathVariable Long id) {
        try {
            pessoaService.excluir(id);
            return ResponseEntity.ok("Pessoa excluído com sucesso");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> buscarPorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(pessoaService.buscarPorId(id));
    }

}