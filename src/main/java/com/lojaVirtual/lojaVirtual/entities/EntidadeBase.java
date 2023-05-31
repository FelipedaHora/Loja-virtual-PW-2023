package com.lojaVirtual.lojaVirtual.entities;


import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;


@MappedSuperclass
@Data
public class EntidadeBase {
    @Column(name="DATA_CRIACAO")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="DATA_ALTERACAO")
    private Date dateAlteracao;
}
