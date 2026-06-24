package com.assurance.souscription.service;

import com.assurance.souscription.entity.Contract;
import java.time.LocalDate;
import java.util.List;

public interface ContractService {
    Contract createContract(Long quoteId, LocalDate dateEffet);
    List<Contract> getAllContracts();
}