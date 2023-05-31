package com.lojaVirtual.lojaVirtual.services.endereco;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lojaVirtual.lojaVirtual.dto.PessoaDTO;
import com.lojaVirtual.lojaVirtual.entities.Pessoa;
import com.lojaVirtual.lojaVirtual.repository.PessoaRepository;

@Service
public class PessoaServiceImpl implements PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public List<PessoaDTO> buscaPessoas() {
        List<PessoaDTO> pessoaDTOs = new ArrayList();
        List<Pessoa> pessoas = pessoaRepository.findAll();
        for (Pessoa pessoa : pessoas) {
            pessoaDTOs.add(pessoa.paraDTO(pessoa));
        }
        return pessoaDTOs;
    }

    @Override
    public PessoaDTO buscaPessoaPorId(long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'buscaPessoaPorId'");
    }

    @Override
    public boolean criarPessoa(PessoaDTO pessoaDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'criarPessoa'");
    }

    @Override
    public boolean deletarPessoa(long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deletarPessoa'");
    }

   
    
}
