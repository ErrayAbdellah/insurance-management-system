import React, { useState } from 'react';
import type { Client } from '../types';

interface Props {
  clients: Client[];
  onSuccess: (quote: { clientId: number; produitId: number; montant: number }) => void;
}

export default function QuoteForm({ clients, onSuccess }: Props) {
  const [clientId, setClientId] = useState('');
  const [produitId, setProduitId] = useState('');
  const [montant, setMontant] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Filtre search dial les clients

  // Filtrer les clients en temps réel
  const filteredClients = clients.filter(c => 
    c.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      clientId: Number(clientId),
      produitId: Number(produitId),
      montant: Number(montant)
    });
    setClientId('');
    setProduitId('');
    setMontant('');
    setSearchQuery('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nouveau Devis</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Search Input pour filtrer le select */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Rechercher Client</label>
          <input
            type="text"
            placeholder="Écrire pour chercher un client..."
            className="w-full px-4 py-1.5 border text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          
          {/* Select de Client */}
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
            required
          >
            <option value="">-- Sélectionner le Client --</option>
            {filteredClients.map(c => (
              <option key={c.id} value={c.id}>
                ID: {c.id} | {c.nom} ({c.email})
              </option>
            ))}
          </select>
        </div>

        {/* Select de Produit */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Produit d'Assurance</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={produitId}
            onChange={e => setProduitId(e.target.value)}
            required
          >
            <option value="">-- Sélectionner le Produit --</option>
            <option value="1">ID: 1 | Assurance Auto Tiers (AUTO)</option>
            <option value="2">ID: 2 | Assurance Auto Tous Risques (AUTO)</option>
            <option value="3">ID: 3 | Multirisque Habitation (HABITATION)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Montant (€)</label>
          <input
            type="number"
            placeholder="Montant (€)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={montant}
            onChange={e => setMontant(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200">
          Simuler le Devis
        </button>
      </form>
    </div>
  );
}