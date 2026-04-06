import { useNavigate } from 'react-router-dom';
import type { Client } from '../types';
import { Calendar, Package } from 'lucide-react';

type ClienteItemProps = {
  cliente: Client;
};

export function ClienteItem({ cliente }: ClienteItemProps) {
  const navigate = useNavigate();

  return (
    <tr 
      onClick={() => navigate(`/clientes/${cliente._id}`)}
      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {cliente.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{cliente.name}</div>
            <div className="text-sm text-slate-500">{cliente.email || 'Sin email registrado'}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-slate-700">
          <Package size={16} className="text-slate-400 mr-2 shrink-0" />
          <span className="truncate max-w-[200px] md:max-w-xs block" title={cliente.product}>{cliente.product}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">
        <div className="flex items-center justify-end font-medium">
          <Calendar size={14} className="mr-1.5 text-slate-400" />
          {cliente.fechaInicio}
        </div>
      </td>
    </tr>
  );
}