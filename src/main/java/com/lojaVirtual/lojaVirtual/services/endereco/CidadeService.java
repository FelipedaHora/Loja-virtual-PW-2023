package com.lojaVirtual.lojaVirtual.services.endereco;

import com.lojaVirtual.lojaVirtual.dto.CidadeDTO;

import java.util.List;


public interface CidadeService {
    CidadeDTO buscaCidadePorId(long id);

    List<CidadeDTO> buscaTodasCidade();

    boolean criarCidade(CidadeDTO cidadeDTO);

    boolean deletarCidade(long id);
}
