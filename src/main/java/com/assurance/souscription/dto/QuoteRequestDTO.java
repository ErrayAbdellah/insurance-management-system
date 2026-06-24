package com.assurance.souscription.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class QuoteRequestDTO {
    @NotNull(message = "L'ID du client est obligatoire")
    private Long clientId;

    @NotNull(message = "L'ID du produit est obligatoire")
    private Long produitId;

    @NotNull(message = "Le montant est obligatoire")
    @Positive(message = "Le montant doit être supérieur à 0")
    private BigDecimal montant;

}