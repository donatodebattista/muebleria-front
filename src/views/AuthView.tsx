import { useForm } from 'react-hook-form'
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage'
import type { AuthCredentials } from '../types';
import { isAxiosError } from 'axios';
import { toast } from 'sonner'
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';

export default function AuthView() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const initialValues: AuthCredentials = {
        username: "",
        password: "",
    };

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleAuth = async (formData: AuthCredentials) => {
        try {
            const response = await api.post('/auth', formData)
            localStorage.setItem('AUTH_TOKEN', response.data)
            navigate('/clientes')
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.msg)
            }
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Column - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center flex-col p-12 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center"></div>
                <div className="relative z-10 w-full max-w-md">
                    <Building2 size={64} className="mb-8 text-indigo-300" />
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-6 uppercase">Mueblería Don Pepe</h1>
                    <p className="text-lg text-indigo-100 font-medium leading-relaxed">Sistema centralizado de gestión corporativa. Controle clientes y planes desde un único panel optimizado.</p>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50">
                <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="space-y-2 text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-6">
                            <Building2 size={48} className="text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Bienvenido de nuevo</h2>
                        <p className="text-slate-500">Ingrese a su cuenta para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit(handleAuth)} className="space-y-6 mt-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-semibold text-slate-700">
                                    Usuario
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="admin"
                                    className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all"
                                    {...register('username', { required: "El nombre de usuario es obligatorio" })}
                                />
                                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all pr-12"
                                        {...register('password', { required: "La contraseña es obligatoria" })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all cursor-pointer font-bold tracking-wide"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}