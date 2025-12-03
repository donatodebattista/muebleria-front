import type { Client } from '../types';
import { ClienteItem } from './ClienteItem';

type ClienteListProps = {
  clientes: Client[];
};

export function ClientesList({ clientes }: ClienteListProps) {
  if (!clientes.length) {
    return <p className="text-white">No hay clientes registrados.</p>;
  }

  return (
    <ul className="shadow-sm rounded-md mt-10">
      {clientes.map((cliente) => (
        <ClienteItem key={cliente._id} cliente={cliente} />
      ))}
    </ul>
  );
}