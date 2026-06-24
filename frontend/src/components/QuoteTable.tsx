
import React, { useState } from 'react';
import type { Quote } from '../types';

interface Props {
  quotes: Quote[];
  contractedQuoteIds: number[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onApprove: (id: number) => Promise<void> | void;
  onEmitContract: (quoteId: number) => Promise<void> | void;
}

export default function QuoteTable({ quotes, contractedQuoteIds, currentPage, totalPages, onPageChange, onApprove, onEmitContract }: Props) {
  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      await onApprove(id);
    } finally {
      setProcessingId(null);
    }
  };

  const handleEmitContract = async (id: number) => {
    setProcessingId(id);
    try {
      await onEmitContract(id);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">APPROVED</span>;
      case 'PENDING_MANAGER':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">PENDING_MANAGER</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">{status}</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tableau de Suivi des Devis</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Devis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes?.map((q) => (
              <tr key={q.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{q.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.client?.nom} (ID: {q.client?.id})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.produit?.libelle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{q.montant} €</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(q.statut)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {q.statut === 'PENDING_MANAGER' && (
                    <button 
                      onClick={() => handleApprove(q.id)} 
                      disabled={processingId === q.id}
                      className="mr-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded text-xs transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingId === q.id ? 'Chargement...' : 'Approuver'}
                    </button>
                  )}
                  {q.statut === 'APPROVED' && !contractedQuoteIds.includes(q.id) && (
                    <button 
                      onClick={() => handleEmitContract(q.id)} 
                      disabled={processingId === q.id}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded text-xs transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingId === q.id ? 'Chargement...' : 'Émettre Contrat'}
                    </button>
                  )}
                  {q.statut === 'APPROVED' && contractedQuoteIds.includes(q.id) && (
                    <span className="px-3 py-1 bg-gray-200 text-gray-500 font-medium rounded text-xs">
                      Contrat Émis
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION BUTTONS UI */}
        <div className="flex justify-between items-center py-3 border-t">
          <span className="text-xs text-gray-500">Page {currentPage + 1} de {totalPages}</span>
          <div className="space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50 font-medium transition"
            >
              Précédent
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage + 1 >= totalPages}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50 font-medium transition"
            >
              Suivant
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}