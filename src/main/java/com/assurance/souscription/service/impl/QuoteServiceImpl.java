package com.assurance.souscription.service.impl;

import com.assurance.souscription.entity.*;
import com.assurance.souscription.exception.BusinessException;
import com.assurance.souscription.repository.*;
import com.assurance.souscription.service.QuoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuoteServiceImpl implements QuoteService {

    private final QuoteRepository quoteRepository;
    private final ClientRepository clientRepository;
    private final ProduitRepository produitRepository;

    @Override
    @Transactional
    public Quote createQuote(Long clientId, Long produitId, BigDecimal montant) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new BusinessException("Client introuvable"));
        Produit produit = produitRepository.findById(produitId)
                .orElseThrow(() -> new BusinessException("Produit introuvable"));

        Quote quote = new Quote();
        quote.setClient(client);
        quote.setProduit(produit);
        quote.setMontant(montant);

        if (montant.compareTo(new BigDecimal("10000")) <= 0) {
            quote.setStatut(QuoteStatus.APPROVED);
        } else {
            quote.setStatut(QuoteStatus.PENDING_MANAGER);
        }

        return quoteRepository.save(quote);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    @Override
    @Transactional
    public Quote approveQuote(Long quoteId) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new BusinessException("Devis introuvable"));

        if (!QuoteStatus.PENDING_MANAGER.equals(quote.getStatut())) {
            throw new BusinessException("Seuls les devis en attente de validation (PENDING_MANAGER) peuvent être approuvés.");
        }

        quote.setStatut(QuoteStatus.APPROVED);
        return quoteRepository.save(quote);
    }
}