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

  if (isLoading) return <Spinner/>
  if (isError) return <h1 className="text-xl text-red-600">Error al cargar los clientes</h1>;

  const filteredClients = clientes?.filter((cliente) =>
    cliente.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-full'>
      <h1 className="text-3xl uppercase text-white font-black mb-16 text-center">Muebleria don pepe</h1>
      
      <Link to="/clientes/nuevo">
        <button className='mb-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer'>+ Nuevo Cliente</button>
      </Link>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white pl-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full mx-auto mt-6">
        {filteredClients && filteredClients.length > 0 ? (
            <ClientesList clientes={filteredClients} />
          ) : (
            <p className="text-gray-300">No se encontraron clientes</p>
          )}
      </div>
  </div>
  );
}