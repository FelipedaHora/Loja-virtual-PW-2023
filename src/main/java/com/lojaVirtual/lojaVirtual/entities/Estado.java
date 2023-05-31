package com.lojaVirtual.lojaVirtual.entities;

import com.lojaVirtual.lojaVirtual.dto.EstadoDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Table
@Data
@Entity(name = "estado")
public class Estado extends EntidadeBase{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String nome;
    @Column
    private String sigla;
    @OneToMany
    private Set<Cidade> cidades;

    public EstadoDTO paraDTO(Estado estado){
        EstadoDTO estadoDTO = new EstadoDTO();     
        estadoDTO.setId(estado.getId());
        estadoDTO.setNome(estado.getNome());
        estadoDTO.setSigla(estado.getSigla());
        
    
        return estadoDTO;
    };
}
