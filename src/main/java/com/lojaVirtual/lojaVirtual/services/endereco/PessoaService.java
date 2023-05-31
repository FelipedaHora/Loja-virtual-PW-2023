package com.lojaVirtual.lojaVirtual.services.endereco;

import java.util.List;

import com.lojaVirtual.lojaVirtual.dto.PessoaDTO;

public interface PessoaService {

    List<PessoaDTO> buscaPessoas();

    PessoaDTO buscaPessoaPorId(long id);

    boolean criarPessoa(PessoaDTO pessoaDTO);

    boolean deletarPessoa(long id);    

}
