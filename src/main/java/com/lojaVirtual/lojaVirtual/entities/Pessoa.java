package com.lojaVirtual.lojaVirtual.entities;

import java.util.List;

import com.lojaVirtual.lojaVirtual.dto.PessoaDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Table
@Data
@Entity(name = "pessoa")
public class Pessoa extends EntidadeBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column
    private String cpf;
    @Column
    private String email;
    @Column
    private String endereco;
    @Column
    private String cep;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;
    @OneToMany(mappedBy = "pessoa")
    private List<PermissaoPessoa> permissaoPessoa;

    public PessoaDTO paraDTO(Pessoa pessoa) {
        PessoaDTO pessoaDTO = new PessoaDTO();
        pessoaDTO.setId(pessoa.getId());
        estadoDTO.setNome(estado.getNome());
        estadoDTO.setSigla(estado.getSigla());

        return estadoDTO;
    };
}
