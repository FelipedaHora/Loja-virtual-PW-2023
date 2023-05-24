package com.lojaVirtual.lojaVirtual.dto;

import com.lojaVirtual.lojaVirtual.entities.Estado;
import lombok.Data;

@Data
public class EstadoDTO {
    private long id;
    private String nome;
    private String sigla;

    public Estado paraEntidade(EstadoDTO estadoDTO){
        Estado estado = new Estado();
        estado.setNome(estadoDTO.getNome());
        estado.setSigla(estadoDTO.getSigla());
        return estado;
    }
}
