import type { Client } from '../types';

interface Props {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ClientList({ clients, currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Liste des Clients</h2>
      <ul className="divide-y divide-gray-100 mb-4">
        {clients?.map(client => (
          <li key={client.id} className="py-3 flex flex-col text-sm">
            <span className="text-gray-800 font-medium">{client.nom}</span>
            <span className="text-gray-500">{client.email} - {client.telephone}</span>
          </li>
        ))}
      </ul>
      
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
  );
}