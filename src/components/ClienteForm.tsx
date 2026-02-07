import type { Client } from "../types"
import { useForm } from 'react-hook-form'
import ErrorMessage from "./ErrorMessage"
import { Undo2, Trash2 } from 'lucide-react'
import { Link } from "react-router-dom"

type ClienteFormProps = {
    initialData?: Client
    onSubmit: (data: Client) => Promise<void>
    onDelete?: () => Promise<void>
}

export default function ClienteForm({ initialData, onSubmit, onDelete } : ClienteFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Client>({
        defaultValues: initialData ?? {
            name: '', email: '', product: '', fechaInicio: '',
            facturado: false, plan: '', telefono: '', dni: '', clientAddress: '',
        }
    })

  return (
    <div className="m-auto p-5 w-[95%] sm:w-[85%] md:max-w-2xl lg:max-w-3xl bg-white rounded-lg shadow-xl my-10">
        <div className="flex flex-row justify-between items-center mb-4"> 
            <Link to="/clientes">
                <div className="flex items-center gap-1 text-gray-600 hover:text-black transition">
                    <Undo2 className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase">Volver</span>
                </div>
            </Link>
            
            {initialData?._id && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                    <span className="text-sm font-bold uppercase">Eliminar</span>
                    <Trash2 className="w-6 h-6" />
                </button>
            )}
        </div>
        
        <h1 className="text-black text-2xl md:text-3xl font-black mb-6 text-center uppercase border-b-2 border-[#F17300] pb-2">
            {initialData ? "Editar Cliente" : "Nuevo Cliente"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <p className="text-left text-[#F17300] font-black uppercase text-sm mt-2">Datos personales</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor='name' className="text-black font-bold text-sm mb-1">Nombre</label>
                    <input
                        type="text"
                        className="bg-gray-100 p-2.5 w-full text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none"
                        placeholder="Ej: Juan Pérez"
                        {...register('name', { required: "El nombre es obligatorio" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor='email' className="text-black font-bold text-sm mb-1">Email</label>
                    <input
                        type="email"
                        className="bg-gray-100 p-2.5 w-full text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none"
                        placeholder="correo@ejemplo.com"
                        {...register('email')}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor='telefono' className="text-black font-bold text-sm mb-1">Teléfono</label>
                    <input
                        type="text"
                        className="bg-gray-100 p-2.5 w-full text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none"
                        placeholder="Mínimo 8 dígitos"
                        {...register('telefono', { required: "El telefono es obligatorio" })}
                    />
                    {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor='dni' className="text-black font-bold text-sm mb-1">DNI / Documento</label>
                    <input
                        type="text"
                        className="bg-gray-100 p-2.5 w-full text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none"
                        placeholder="Ingrese DNI"
                        {...register('dni')}
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor='clientAddress' className="text-black font-bold text-sm mb-1">Dirección</label>
                <input
                    type="text"
                    className="bg-gray-100 p-2.5 w-full text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none"
                    placeholder="Calle, Número, Localidad"
                    {...register('clientAddress')}
                />
            </div>
            
            <hr className="border-gray-200 my-4"/>
            <p className="text-left text-[#F17300] font-black uppercase text-sm">Datos del plan y producto</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label htmlFor='product' className="text-black font-bold text-sm mb-1">Producto</label>
                    <input
                        type="text"
                        className="bg-gray-100 p-2.5 w-full text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none"
                        placeholder="Nombre del producto"
                        {...register('product', { required: "El producto es obligatorio" })}
                    />
                    {errors.product && <ErrorMessage>{errors.product.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor='fechaInicio' className="text-black font-bold text-sm mb-1">Fecha de inicio</label>
                    <input
                        type="date"
                        className="bg-gray-100 p-2.5 text-gray-700 font-medium rounded border-none focus:ring-2 focus:ring-[#F17300] outline-none w-full"
                        defaultValue={initialData?.fechaInicio?.slice(0, 10)}
                        {...register('fechaInicio', { required: "La fecha de inicio es obligatoria" })}
                    />
                    {errors.fechaInicio && <ErrorMessage>{errors.fechaInicio.message}</ErrorMessage>}
                </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <input
                    type="checkbox"
                    id="facturado"
                    defaultChecked={initialData?.facturado}
                    className="h-5 w-5 rounded border-gray-300 text-[#F17300] focus:ring-[#F17300]"
                    {...register('facturado')}
                />
                <label htmlFor='facturado' className="text-black font-bold text-sm cursor-pointer select-none">¿Ya fue facturado?</label>
            </div>

            <div className="flex flex-col">
                <label htmlFor='plan' className="text-black font-bold text-sm mb-1">Detalles o Notas del Plan</label>
                <textarea
                    className="bg-gray-100 rounded p-3 h-32 w-full text-gray-700 font-medium border-none focus:ring-2 focus:ring-[#F17300] outline-none resize-none"
                    placeholder="Información adicional relevante..."
                    {...register('plan')}
                />
            </div>

            <input
                type="submit"
                className="bg-[#F17300] hover:bg-[#cb6200] p-4 text-base w-full uppercase text-white rounded-lg font-black cursor-pointer shadow-md transition-all mt-4 active:scale-[0.98]"
                value={initialData ? "Actualizar Cliente" : "Crear Cliente"}
            />
        </form>
    </div>
  )
}