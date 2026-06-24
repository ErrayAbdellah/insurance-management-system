import axios from 'axios';
import type { Client, Quote, Contract } from '../types';


const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const apiService = {
  // Pageable clients
  getClients: (page = 0, size = 5): Promise<{ content: Client[]; totalPages: number }> => 
    API.get(`/clients?page=${page}&size=${size}`).then(res => res.data),
    
  createClient: (client: Client): Promise<Client> => 
    API.post('/clients', client).then(res => res.data),
    
  // Pageable quotes
  getQuotes: (page = 0, size = 5): Promise<{ content: Quote[]; totalPages: number }> => 
    API.get(`/quotes?page=${page}&size=${size}`).then(res => res.data),
    
  createQuote: (quote: { clientId: number; produitId: number; montant: number }): Promise<Quote> => 
    API.post('/quotes', quote).then(res => res.data),
    
  approveQuote: (id: number): Promise<Quote> => 
    API.post(`/quotes/${id}/approve`).then(res => res.data),

  getContracts: (): Promise<Contract[]> => 
    API.get('/contracts').then(res => res.data),
    
  createContract: (contract: { quoteId: number; dateEffet: string }): Promise<Contract> => 
    API.post('/contracts', contract).then(res => res.data),
};