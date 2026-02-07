import { Link } from 'react-router-dom';
import type { Client } from '../types';

type ClienteItemProps = {
  cliente: Client;
};

export function ClienteItem({ cliente }: ClienteItemProps) {
  return (
    <li
      className="border-b border-gray-300 hover:bg-gray-50 transition-colors bg-white w-full list-none"
    >
      <Link 
        to={`/clientes/${cliente._id}`} 
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 gap-2"
      >
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-lg sm:text-base truncate">
            {cliente.name}
          </p>
        </div>

        <div className="flex flex-row sm:flex-col justify-between items-baseline sm:text-right gap-2 sm:gap-0">
          <p 
            className="text-sm text-blue-600 font-medium truncate max-w-[200px] sm:max-w-[250px] md:max-w-md"
            title={cliente.product}
          >
            {cliente.product}
          </p>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {cliente.fechaInicio}
          </p>
        </div>
      </Link>
    </li>
  );
}