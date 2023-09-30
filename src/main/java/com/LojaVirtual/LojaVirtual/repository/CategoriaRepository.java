package com.LojaVirtual.LojaVirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LojaVirtual.LojaVirtual.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}
