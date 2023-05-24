package com.lojaVirtual.lojaVirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lojaVirtual.lojaVirtual.entities.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    
}
