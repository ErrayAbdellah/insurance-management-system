import { useState, useEffect } from 'react';
import { apiService } from './services/api';
import type { Client, Quote, Contract } from './types';
import ClientForm from './components/ClientForm';
import QuoteForm from './components/QuoteForm';
import QuoteTable from './components/QuoteTable';
import ClientList from './components/ClientList';
import ContractList from './components/ContractList';

export default function App() {
  const [clients, setClients] = useState<Client[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  
  // États de Pagination f l-Front
  const [quotePage, setQuotePage] = useState(0);
  const [quoteTotalPages, setQuoteTotalPages] = useState(1);

  const [clientPage, setClientPage] = useState(0);
  const [clientTotalPages, setClientTotalPages] = useState(1);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadData = async () => {
    try {
      // Passation de la page actuelle l l-API
      const clsRes = await apiService.getClients(clientPage, 5);
      const qtsRes = await apiService.getQuotes(quotePage, 5);
      const cts = await apiService.getContracts();

      // REDRESSEMENT : N-cheddo .content dyal la page !
      setClients(clsRes.content || []);
      setClientTotalPages(clsRes.totalPages || 1);

      setQuotes(qtsRes.content || []);
      setQuoteTotalPages(qtsRes.totalPages || 1);

      setContracts(cts || []);
    } catch (err) {
      setError("Erreur lors du chargement des données.");
    }
  };

  // Re-charger data automatic mli t-bdel l-page dial pagination f l-Front
  useEffect(() => {
    loadData();
  }, [clientPage, quotePage]);

  const handleCreateClient = async (clientData: Client) => {
    setError(null);
    setSuccess(null);
    try {
      await apiService.createClient(clientData);
      setSuccess("Client créé avec succès !");
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de création client.");
    }
  };

  const handleCreateQuote = async (quoteData: { clientId: number; produitId: number; montant: number }) => {
    setError(null);
    setSuccess(null);
    try {
      await apiService.createQuote(quoteData);
      setSuccess("Devis enregistré !");
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de création devis.");
    }
  };

  const handleApproveQuote = async (id: number) => {
    setError(null);
    setSuccess(null);
    try {
      await apiService.approveQuote(id);
      setSuccess("Devis approuvé par le manager !");
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message);
    }
  };

  const handleCreateContract = async (quoteId: number) => {
    setError(null);
    setSuccess(null);
    try {
      await apiService.createContract({ quoteId, dateEffet: "2026-07-01" });
      setSuccess("Contrat actif généré !");
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Digitalisation de Souscription d'Assurance
          </h1>
          <p className="mt-2 text-sm text-gray-600">Portail Pro - Barid Media</p>
        </div>

        {/* Alerts */}
        {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-sm"><strong>Erreur : </strong>{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-sm">{success}</div>}

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <ClientForm onSuccess={handleCreateClient} />
          <QuoteForm clients={clients} onSuccess={handleCreateQuote} />
        </div>

        {/* Devis Table */}
        <QuoteTable 
          quotes={quotes} 
          contractedQuoteIds={contracts.map(c => c.quote?.id).filter(Boolean) as number[]}
          currentPage={quotePage} 
          totalPages={quoteTotalPages} 
          onPageChange={(page) => setQuotePage(page)} 
          onApprove={handleApproveQuote} 
          onEmitContract={handleCreateContract} 
        />

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ClientList 
            clients={clients} 
            currentPage={clientPage}
            totalPages={clientTotalPages}
            onPageChange={(page) => setClientPage(page)}
          />
          <ContractList contracts={contracts} />
        </div>

      </div>
    </div>
  );
}