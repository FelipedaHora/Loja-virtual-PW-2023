package com.lojaVirtual.lojaVirtual.controllers;

import com.lojaVirtual.lojaVirtual.dto.EstadoDTO;
import com.lojaVirtual.lojaVirtual.services.endereco.EstadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/estado")
public class EstadoController implements ControllerCRUD<EstadoDTO> {

    @Autowired
    private EstadoService estadoService;

    @Override
    @GetMapping("/")
    public List<EstadoDTO> buscarTodos() {
        return estadoService.buscaEstados();
    }

    @Override
    @GetMapping("/{id}")
    @RequestMapping
    public EstadoDTO buscarPorId(@PathVariable long id) {
        return estadoService.buscaEstadoPorId(id);
    }

    @Override
    @PostMapping("/post")
    public boolean criar(@RequestBody EstadoDTO estadoDTO) {
        return estadoService.criarEstado(estadoDTO);
    }

    @Override
    @DeleteMapping("/delete")
    public boolean deletar(long id) {
        return estadoService.deletarEstado(id);
    }
}
