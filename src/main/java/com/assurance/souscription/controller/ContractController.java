package com.assurance.souscription.controller;

import com.assurance.souscription.dto.ContractRequestDTO;
import com.assurance.souscription.entity.Contract;
import com.assurance.souscription.service.ContractService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping
    public ResponseEntity<Contract> createContract(@Valid @RequestBody ContractRequestDTO dto) {
        Contract created = contractService.createContract(dto.getQuoteId(), dto.getDateEffet());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Contract>> getAllContracts() {
        return ResponseEntity.ok(contractService.getAllContracts());
    }
}