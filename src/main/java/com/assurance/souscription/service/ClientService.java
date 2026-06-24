package com.assurance.souscription.service;

import com.assurance.souscription.entity.Client;
import java.util.List;

public interface ClientService {
    Client createClient(Client client);
    List<Client> getAllClients();
}