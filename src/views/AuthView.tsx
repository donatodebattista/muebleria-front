import { useForm } from 'react-hook-form'
import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage'
import type { AuthCredentials } from '../types';
import {isAxiosError} from 'axios';
import { toast } from 'sonner'
import api from '../config/axios';
import { useNavigate } from 'react-router-dom';


export default function AuthView() {
    
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const initialValues : AuthCredentials = {
     username: "",
     password: "",
    };

    const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})


    const handleAuth = async ( formData : AuthCredentials ) => {
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
        <form
            onSubmit={handleSubmit(handleAuth)}
            className="rounded-md space-y-6 p-6 md:p-8 max-w-lg w-full shadow-lg bg-white my-6"
        >
            <div>
                <h1 className="text-3xl font-black text-center text-[#F17300]">¡Bienvenido!</h1>
                <p className="text-lg text-center text-zinc-600">Inicie Sesión</p>
            </div>
            <div className="grid grid-cols-1">
                <label htmlFor="username" className="text-lg text-zinc-600">
                    Usuario
                </label>
                <input
                    id="username"
                    type="username"
                    placeholder="Usuario"
                    className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                
                {...register('username', {
                    required: "El nombre de usuario es obligatorio"
                })}
                />

            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            
            </div>

            <div className="grid grid-cols-1">
                <label htmlFor="password" className="text-lg text-zinc-600">
                    Contraseña
                </label>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                
                {...register('password', {
                    required: "La contraseña es obligatoria"
                })}

                />

            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

            </div>
            <div className='flex flex-row gap-2'>
                <p>Mostrar contraseña</p>
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)}/>
            </div>
            <input
                type="submit"
                className="bg-[#F17300] hover:bg-[#cb6200] p-3 text-sm w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                value="Iniciar Sesión"
            />
        </form>
    )
}