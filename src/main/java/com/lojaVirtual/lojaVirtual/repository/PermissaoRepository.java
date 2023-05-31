package com.lojaVirtual.lojaVirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lojaVirtual.lojaVirtual.entities.Permissao;

@Repository
public interface PermissaoRepository extends JpaRepository<Permissao,Long> {
    
}
