package com.LojaVirtual.LojaVirtual.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LojaVirtual.LojaVirtual.entity.Pessoa;
import com.LojaVirtual.LojaVirtual.repository.PessoaRepository;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> buscarTodos() {
        return pessoaRepository.findAll();
    }

    public Pessoa buscarPorId(Long id) {
        return pessoaRepository.findById(id).get();
    }

    public Pessoa inserir(Pessoa objeto) {
        objeto.setDataCriacao(new Date());
        Pessoa objetoNovo = pessoaRepository.saveAndFlush(objeto);
        return objetoNovo;
    }

    public Pessoa alterar(Pessoa objeto) {
        objeto.setDataAtualizacao(new Date());
        return pessoaRepository.saveAndFlush(objeto);
    }

    public void excluir(Long id) {
        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Pessoa não encontrado."));
        pessoaRepository.delete(pessoa);

    }
}