package com.assurance.souscription.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "contracts")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_contrat", unique = true, nullable = false)
    private String numeroContrat;

    @Column(name = "date_effet", nullable = false)
    private LocalDate dateEffet;

    private String statut = "ACTIVE";

    @OneToOne(optional = false)
    @JoinColumn(name = "quote_id", nullable = false, unique = true)
    private Quote quote;
}