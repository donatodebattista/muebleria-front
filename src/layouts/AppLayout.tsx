import { Outlet, Link, useLocation } from "react-router-dom"
import { Toaster } from 'sonner'
import { Users, UserCircle } from 'lucide-react'

export default function AppLayout() {
  const location = useLocation();

  return (
    <>
      <div className="bg-slate-50 min-h-screen flex font-['Inter',sans-serif]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm">
          <div className="h-16 flex items-center px-6 border-b border-slate-200">
            <Link to="/clientes" className="text-xl font-black text-indigo-600 tracking-tight uppercase">Don Pepe</Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              to="/clientes"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${location.pathname.startsWith('/clientes') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <Users size={20} />
              Clientes
            </Link>
          </nav>
          <div className="p-4 border-t border-slate-200 text-xs text-center text-slate-500">
            <p>Gestion de clientes</p>
            <a className="font-semibold text-indigo-600 hover:underline" href="https://donatodebattista.vercel.app/" target="_blank" rel="noreferrer">donidevツ</a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
            <div className="flex items-center md:hidden">
              <h1 className="text-xl font-black text-indigo-600 tracking-tight uppercase">Don Pepe</h1>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
              <UserCircle className="text-slate-400" size={24} />
              <div className="hidden sm:block text-sm">
                <p className="font-semibold text-slate-700 leading-none">Administrador</p>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </>
  )
}