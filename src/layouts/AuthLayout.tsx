import { Outlet } from "react-router-dom"
import { Toaster } from 'sonner'

export default function AuthLayout() {
  return (

  <>
      <div className="bg-[#0E103D] min-h-screen flex flex-col items-center">

        <div className="bg-transparent flex-1 flex flex-col items-center w-full justify-center">
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