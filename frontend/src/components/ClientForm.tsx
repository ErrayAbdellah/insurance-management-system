import React, { useState } from 'react';
import type { Client } from '../types';

interface Props {
  onSuccess: (client: Client) => void;
}

export default function ClientForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(form);
    setForm({ nom: '', email: '', telephone: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Saisie Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom complet"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.nom}
          onChange={e => setForm({ ...form, nom: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.telephone}
          onChange={e => setForm({ ...form, telephone: e.target.value })}
          required
        />
        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200">
          Créer Client
        </button>
      </form>
    </div>
  );
}