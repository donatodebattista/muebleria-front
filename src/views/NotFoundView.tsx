import { SearchX, ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center mx-auto">
      <div className="bg-white/10 p-6 rounded-full mb-6 animate-pulse">
        <SearchX className="text-white w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">
        Cliente no encontrado
      </h2>
      
      <p className="text-gray-300 text-lg max-w-md mb-10 font-medium">
        Lo sentimos, no pudimos hallar el registro que estás buscando. Puede que haya sido eliminado o el ID sea incorrecto.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
        <Link 
          to="/clientes" 
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95"
        >
          <ArrowLeft size={20} />
          Volver a la lista
        </Link>

        <Link 
          to="/clientes/nuevo" 
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#F17300] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#cb6200] transition-all shadow-lg active:scale-95"
        >
          <UserPlus size={20} />
          Crear nuevo cliente
        </Link>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F17300]/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  )
}