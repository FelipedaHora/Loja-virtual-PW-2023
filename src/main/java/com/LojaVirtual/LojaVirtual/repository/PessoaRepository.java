package com.LojaVirtual.LojaVirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LojaVirtual.LojaVirtual.entity.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    
}
