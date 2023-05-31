package com.lojaVirtual.lojaVirtual.repository;

import com.lojaVirtual.lojaVirtual.entities.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {
}
