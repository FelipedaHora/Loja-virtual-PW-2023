package com.LojaVirtual.LojaVirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LojaVirtual.LojaVirtual.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
    
}
