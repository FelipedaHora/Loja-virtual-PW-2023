package com.LojaVirtual.LojaVirtual.service;


import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LojaVirtual.LojaVirtual.entity.Estado;
import com.LojaVirtual.LojaVirtual.repository.EstadoRepository;
@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

    public List<Estado> buscarTodos(){
        return estadoRepository.findAll();
    } 

    public Estado buscarPorId(Long id) {
        return estadoRepository.findById(id).get();
    }

    public Estado inserir (Estado estado){
        estado.setDataCriacao(new Date());
        Estado estadoNovo = estadoRepository.saveAndFlush(estado);
        return estadoNovo;
    }

    public Estado alterar (Estado estado){
        estado.setDataAtualizacao(new Date());
        return estadoRepository.saveAndFlush(estado);
    }

    public void excluir(Long id) {
        Estado estado = estadoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Estado não encontrado."));
        estadoRepository.delete(estado);

    }
}