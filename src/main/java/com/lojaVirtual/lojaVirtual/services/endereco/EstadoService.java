package com.lojaVirtual.lojaVirtual.services.endereco;

import com.lojaVirtual.lojaVirtual.dto.EstadoDTO;

import java.util.List;

public interface EstadoService {
    List<EstadoDTO> buscaEstados();

    EstadoDTO buscaEstadoPorId(long id);

    boolean criarEstado(EstadoDTO estadoDTO);

    boolean deletarEstado(long id);
}
