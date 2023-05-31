package com.lojaVirtual.lojaVirtual.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table
public class PermissaoPessoa extends EntidadeBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "permissao_id")
    private Permissao permissao;

    @ManyToOne
    @JoinColumn(name="pessoa_id")
    private Pessoa pessoa;

}