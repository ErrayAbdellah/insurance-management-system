package com.assurance.souscription.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
@Data
public class ContractRequestDTO {
    @NotNull(message = "L'ID du devis est obligatoire")
    private Long quoteId;

    @NotNull(message = "La date d'effet est obligatoire")
    private LocalDate dateEffet;

}