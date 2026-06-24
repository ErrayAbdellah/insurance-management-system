package com.assurance.souscription.service;


import com.assurance.souscription.entity.Quote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface QuoteService {
    Quote createQuote(Long clientId, Long produitId, BigDecimal montant);
    Page<Quote> getAllQuotes(Pageable pageable);
    Quote approveQuote(Long quoteId);
}