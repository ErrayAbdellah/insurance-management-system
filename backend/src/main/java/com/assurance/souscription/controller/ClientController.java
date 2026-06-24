package com.assurance.souscription.controller;

import com.assurance.souscription.dto.ClientRequestDTO;
import com.assurance.souscription.entity.Client;
import com.assurance.souscription.mapper.ClientMapper;
import com.assurance.souscription.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
@Tag(name = "Clients", description = "Client management APIs")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    @PostMapping
    @Operation(summary = "Create a new client")

    public ResponseEntity<Client> createClient(@Valid @RequestBody ClientRequestDTO dto) {
        Client client = clientMapper.toEntity(dto);
        Client created = clientService.createClient(client);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all clients")
    public ResponseEntity<Page<Client>> getAllClients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(clientService.getAllClients(PageRequest.of(page, size)));
    }
}