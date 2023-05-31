package com.lojaVirtual.lojaVirtual.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lojaVirtual.lojaVirtual.dto.PessoaDTO;
import com.lojaVirtual.lojaVirtual.services.endereco.PessoaService;


@RestController
@RequestMapping("/api/pessoa")
public class PessoaController implements ControllerCRUD<PessoaDTO> {

    @Autowired
    private PessoaService pessoaService;

    @Override
    @GetMapping("/")
    public List<PessoaDTO> buscarTodos() {
        return pessoaService.buscaPessoas();
    }

    @Override
    @GetMapping("/id")
    public PessoaDTO buscarPorId(long id) {
        return pessoaService.buscaPessoaPorId(id);
    }

    @Override
    @PostMapping("/post")
    public boolean criar(PessoaDTO objeto) {
        return pessoaService.criarPessoa(objeto);
    }

    @Override
    @DeleteMapping("/delete")
    public boolean deletar(long id) {
        return pessoaService.deletarPessoa(id);
    }
    
}
