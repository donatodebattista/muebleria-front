import type { Client } from '../types';
import { ClienteItem } from './ClienteItem';

type ClienteListProps = {
  clientes: Client[];
};

export function ClientesList({ clientes }: ClienteListProps) {
  if (!clientes.length) {
    return <p className="text-slate-500 p-4">No hay clientes registrados.</p>;
  }

  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Cliente
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Producto / Plan
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Fecha de Inicio
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {clientes.map((cliente) => (
          <ClienteItem key={cliente._id} cliente={cliente} />
        ))}
      </tbody>
    </table>
  );
}