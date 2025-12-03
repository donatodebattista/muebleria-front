import { Link } from 'react-router-dom';
import type { Client } from '../types';

type ClienteItemProps = {
  cliente: Client;
};

export function ClienteItem({ cliente }: ClienteItemProps) {
  return (
    <li
      key={cliente._id}
      className="border-b border-gray-300 py-2 hover:bg-gray-100 transition-colors bg-white w-full"
    >
      <Link to={`/clientes/${cliente._id}`} className="flex justify-between p-2">
        <div>
          <p className="font-bold">{cliente.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{cliente.product}</p>
          <p className="text-xs text-gray-400">{cliente.fechaInicio}</p>
        </div>
      </Link>
    </li>
  );
}