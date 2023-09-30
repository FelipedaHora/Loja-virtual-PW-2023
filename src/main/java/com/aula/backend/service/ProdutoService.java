package com.aula.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aula.backend.entity.Produto;
import com.aula.backend.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos(){
        return produtoRepository.findAll();
    }

    public Produto salvar(Produto produto){
        return produtoRepository.saveAndFlush(produto);
    }

    public Produto atualizar(Produto produto) {
        return produtoRepository.saveAndFlush(produto);
    }

    public void excluir(Long id){
        produtoRepository.deleteById(id);
    }

}
