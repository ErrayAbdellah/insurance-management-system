package com.assurance.souscription.service.impl;

import com.assurance.souscription.entity.*;
import com.assurance.souscription.exception.BusinessException;
import com.assurance.souscription.repository.*;
import com.assurance.souscription.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;
    private final QuoteRepository quoteRepository;

    @Override
    @Transactional
    public Contract createContract(Long quoteId, LocalDate dateEffet) {
        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new BusinessException("Devis introuvable"));

        if (!QuoteStatus.APPROVED.equals(quote.getStatut())) {
            throw new BusinessException("Impossible de créer un contrat : le devis n'est pas approuvé.");
        }

        if (contractRepository.existsByQuoteId(quoteId)) {
            throw new BusinessException("Un contrat existe déjà pour ce devis.");
        }

        Contract contract = new Contract();
        contract.setQuote(quote);
        contract.setDateEffet(dateEffet);
        contract.setNumeroContrat("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        return contractRepository.save(contract);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }
}