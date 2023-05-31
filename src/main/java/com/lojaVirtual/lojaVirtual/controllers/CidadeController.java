package com.lojaVirtual.lojaVirtual.controllers;

import com.lojaVirtual.lojaVirtual.dto.CidadeDTO;
import com.lojaVirtual.lojaVirtual.services.endereco.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cidade")
public class CidadeController implements ControllerCRUD<CidadeDTO> {

    @Autowired
    private CidadeService cidadeService;


    @Override
    @GetMapping("/")
    public List<CidadeDTO> buscarTodos() {
        return cidadeService.buscaTodasCidade();
    }

    @Override
    @GetMapping("/id")
    public CidadeDTO buscarPorId(long id) {
        return cidadeService.buscaCidadePorId(id);
    }

    @Override
    @PostMapping("/post")
    public boolean criar(CidadeDTO cidadeDTO) {
        return cidadeService.criarCidade(cidadeDTO);
    }

    @Override
    @DeleteMapping("/delete")
    public boolean deletar(long id) {
        return cidadeService.deletarCidade(id);
    }
}
