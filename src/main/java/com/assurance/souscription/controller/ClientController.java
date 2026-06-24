package com.assurance.souscription.controller;

import com.assurance.souscription.dto.ClientRequestDTO;
import com.assurance.souscription.entity.Client;
import com.assurance.souscription.mapper.ClientMapper;
import com.assurance.souscription.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    @PostMapping
    public ResponseEntity<Client> createClient(@Valid @RequestBody ClientRequestDTO dto) {
        Client client = clientMapper.toEntity(dto);
        Client created = clientService.createClient(client);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Client>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }
}