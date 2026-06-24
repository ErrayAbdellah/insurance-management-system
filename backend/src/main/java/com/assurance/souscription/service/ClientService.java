package com.assurance.souscription.service;

import com.assurance.souscription.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ClientService {
    Client createClient(Client client);
    Page<Client> getAllClients(Pageable pageable);
}