package com.assurance.souscription.controller;

import com.assurance.souscription.dto.QuoteRequestDTO;
import com.assurance.souscription.entity.Quote;
import com.assurance.souscription.service.QuoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class QuoteController {

    private final QuoteService quoteService;

    @PostMapping
    public ResponseEntity<Quote> createQuote(@Valid @RequestBody QuoteRequestDTO dto) {
        Quote created = quoteService.createQuote(dto.getClientId(), dto.getProduitId(), dto.getMontant());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Quote>> getAllQuotes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(quoteService.getAllQuotes(PageRequest.of(page, size)));
    }
    @PostMapping("/{id}/approve")
    public ResponseEntity<Quote> approveQuote(@PathVariable Long id) {
        Quote approved = quoteService.approveQuote(id);
        return ResponseEntity.ok(approved);
    }
}