import { useForm } from 'react-hook-form'
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage'
import type { AuthCredentials } from '../types';
import { isAxiosError } from 'axios';
import { toast } from 'sonner'
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="p-10 rounded-2xl mx-auto bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 w-[90%] sm:w-auto">
            <form
                onSubmit={handleSubmit(handleAuth)}
                className="bg-white rounded-xl shadow-xl space-y-6 p-6 sm:p-8 w-full max-w-md border border-gray-200"
            >
                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-center text-[#F17300]">¡Bienvenido!</h1>
                    <p className="text-lg text-center text-zinc-600">Inicie Sesión en su cuenta</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="username" className="text-lg text-zinc-600 font-medium">
                            Usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Usuario"
                            className="w-full bg-white rounded-md border border-stone-300 placeholder-slate-400 h-12 p-3 outline-none focus:border-[#F17300] focus:ring-1 focus:ring-[#F17300] transition-colors"
                            {...register('username', {
                                required: "El nombre de usuario es obligatorio"
                            })}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="password" className="text-lg text-zinc-600 font-medium">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            className="w-full bg-white rounded-md border border-stone-300 placeholder-slate-400 h-12 p-3 outline-none focus:border-[#F17300] focus:ring-1 focus:ring-[#F17300] transition-colors"
                            {...register('password', {
                                required: "La contraseña es obligatoria"
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </div>
                </div>

                <div className='flex items-center gap-2 cursor-pointer select-none' onClick={() => setShowPassword(!showPassword)}>
                    <input 
                        type="checkbox" 
                        id="showPass"
                        checked={showPassword} 
                        onChange={() => setShowPassword(!showPassword)}
                        className="w-4 h-4 text-[#F17300] border-gray-300 rounded focus:ring-[#F17300]"
                    />
                    <label htmlFor="showPass" className="text-sm text-zinc-600 cursor-pointer">Mostrar contraseña</label>
                </div>

                <input
                    type="submit"
                    className="bg-[#F17300] hover:bg-[#cb6200] w-full p-3 text-white uppercase rounded-lg font-bold cursor-pointer transition-colors shadow-md hover:shadow-lg"
                    value="Iniciar Sesión"
                />
            </form>
        </div>
    )
}