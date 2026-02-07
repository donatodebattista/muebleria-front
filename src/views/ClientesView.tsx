import Spinner from '../components/Spinner';
import { ClientesList } from '../components/ClientesList';
import { getClients } from '../api/clientesAPI';
import type { Client } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Search } from "lucide-react";
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

  if (isLoading) return <div className="flex justify-center py-10 mx-auto"><Spinner/></div>
  if (isError) return <div className="flex justify-center py-10"><Link to="/auth" className="text-red-500 font-bold hover:underline">Error al cargar los clientes (Click para reintentar login)</Link></div>;

  const filteredClients = clientes?.filter((cliente) =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      
      <h1 className="text-3xl md:text-4xl uppercase text-white font-black mb-8 md:mb-12 text-center tracking-wide">
        Muebleria Don Pepe
      </h1>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        
        <div className="relative w-full md:w-96 order-2 md:order-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="order-1 md:order-2">
            <Link to="/clientes/nuevo" className='w-full md:w-auto block'>
                <button className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer'>
                    <span className="text-xl leading-none">+</span> Nuevo Cliente
                </button>
            </Link>
        </div>

      </div>

      <div className="w-full mt-4">
        {filteredClients && filteredClients.length > 0 ? (
            <ClientesList clientes={filteredClients} />
          ) : (
            <div className="text-center py-10 bg-white/5 rounded-lg border border-white/10">
                <p className="text-gray-300 text-lg">No se encontraron clientes</p>
            </div>
          )}
      </div>
  </div>
  );
}