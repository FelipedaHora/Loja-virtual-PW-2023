package com.aula.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aula.backend.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
    
}
