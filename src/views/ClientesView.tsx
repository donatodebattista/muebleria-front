import Spinner from '../components/Spinner';
import { ClientesList } from '../components/ClientesList';
import { getClients } from '../api/clientesAPI';
import type { Client } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Search, Plus } from "lucide-react";
import { Link } from 'react-router-dom';

export default function ClientesView() {
  const [search, setSearch] = useState("");

  const {
    data: clientes,
    isLoading,
    isError,
  } = useQuery<Client[]>({
    queryKey: ['clientes'],
    queryFn: async () => {
      const res = await getClients();
      return res ?? [];
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (isLoading) return <Spinner />
  if (isError) return <div className="flex justify-center py-20"><Link to="/auth" className="text-red-500 font-bold hover:underline">Error al cargar los clientes (Click para reintentar login)</Link></div>;

  const filteredClients = clientes?.filter((cliente) =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-full'>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Clientes
          </h1>
          <p className="text-sm text-slate-500 mt-1">Gestione su cartera de clientes y productos activos.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          <Link to="/clientes/nuevo" className='whitespace-nowrap'>
            <button className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm'>
              <Plus size={18} /> Nuevo Cliente
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {filteredClients && filteredClients.length > 0 ? (
          <div className="overflow-x-auto">
            <ClientesList clientes={filteredClients} />
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <p className="text-slate-500 text-sm">No se encontraron clientes que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}