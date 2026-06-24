import type { Contract } from '../types';

interface Props {
  contracts: Contract[];
}

export default function ContractList({ contracts }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contrats Actifs</h2>
      <ul className="divide-y divide-gray-100">
        {contracts?.map(ct => (
          <li key={ct.id} className="py-3 flex justify-between text-sm">
            <span className="text-gray-800 font-medium">N°: {ct.numeroContrat}</span>
            <span className="text-blue-600 font-semibold">Effet : {ct.dateEffet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}