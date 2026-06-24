package com.assurance.souscription.config;

import com.assurance.souscription.entity.Produit;
import com.assurance.souscription.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProduitRepository produitRepository;

    @Override
    public void run(String... args) throws Exception {
        if (produitRepository.count() == 0) {
            produitRepository.save(new Produit(null, "AUTO-01", "Assurance Auto Tiers", "AUTO"));
            produitRepository.save(new Produit(null, "AUTO-02", "Assurance Auto Tous Risques", "AUTO"));
            produitRepository.save(new Produit(null, "MRH-01", "Multirisque Habitation", "HABITATION"));
            System.out.println(">> Catalogue de produits initialisé avec succès !");
        }
    }
}