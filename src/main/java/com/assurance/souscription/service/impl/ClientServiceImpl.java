package com.assurance.souscription.service.impl;


import com.assurance.souscription.entity.Client;
import com.assurance.souscription.exception.BusinessException;
import com.assurance.souscription.repository.ClientRepository;
import com.assurance.souscription.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Override
    @Transactional
    public Client createClient(Client client) {
        if (clientRepository.existsByEmail(client.getEmail())) {
            throw new BusinessException("Un client existe déjà avec l'email : " + client.getEmail());
        }
        return clientRepository.save(client);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
