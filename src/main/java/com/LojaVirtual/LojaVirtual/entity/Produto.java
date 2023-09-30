package com.LojaVirtual.LojaVirtual.entity;

import java.util.Date;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;


@Entity
@Table(name = "produto")
@Data
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull(message = "A descrição detalhada não pode ser nulo")
    @NotBlank(message = "A descrição detalhada não pode ser vazia")
    private String descricao;

    @Positive(message = "O valor de custe deve ser um valor positivo")
    private Double valor;
    @Positive(message = "O valor de venda dever ser um valor positivo")
    private Double valorPromocional;
}
