package com.assurance.souscription.repository;

import com.assurance.souscription.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    boolean existsByQuoteId(Long quoteId);
}