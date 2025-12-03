import { Outlet } from "react-router-dom"
import { Toaster } from 'sonner'

export default function AppLayout() {
  return (

  <>
      <div className="bg-[#0E103D] min-h-screen flex flex-col pt-10 px-10">

        <div className="bg-transparent flex-1 flex">
          <Outlet />
        </div>
        
        <footer className="text-white text-sm my-6 text-center">
          <p>Gestion de clientes</p>
          <a className="rounded px-1 font-bold" href="https://donatodebattista.vercel.app/">donidevツ</a>
        </footer>

      </div>
      
      <Toaster position="top-right"/>
  </>
)
}