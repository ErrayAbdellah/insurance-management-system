package com.assurance.souscription.service;


import com.assurance.souscription.entity.Quote;
import java.math.BigDecimal;
import java.util.List;

public interface QuoteService {
    Quote createQuote(Long clientId, Long produitId, BigDecimal montant);
    List<Quote> getAllQuotes();
    Quote approveQuote(Long quoteId); // Validation managériale
}