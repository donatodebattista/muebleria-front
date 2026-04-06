import { Outlet } from "react-router-dom"
import { Toaster } from 'sonner'

export default function AuthLayout() {
  return (
  <>
      <div className="bg-slate-50 min-h-screen flex flex-col font-['Inter',sans-serif]">
        <div className="flex-1 flex w-full">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" richColors />
  </>
  )
}