import type { Client } from "../types"
import { useForm } from 'react-hook-form'
import ErrorMessage from "./ErrorMessage"
import { ArrowLeft, Trash2, Save, User, FileText, Briefcase } from 'lucide-react'
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link to="/clientes" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Volver a clientes
            </Link>
            
            {initialData?._id && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full sm:w-auto cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar Cliente
                </button>
            )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                <h1 className="text-xl font-bold text-slate-900">
                    {initialData ? "Editar Cliente" : "Nuevo Cliente"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    {initialData ? "Actualice la información del cliente y sus productos." : "Ingrese los datos básicos para registrar un nuevo cliente."}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
                
                {/* Section 1: Personal Info */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-base font-semibold text-slate-900">Datos Personales</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label htmlFor='name' className="block text-sm font-medium text-slate-700">Nombre completo</label>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                placeholder="Ej: Juan Pérez"
                                {...register('name', { required: "El nombre es obligatorio" })}
                            />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor='email' className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                            <input
                                type="email"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                placeholder="correo@ejemplo.com"
                                {...register('email')}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor='telefono' className="block text-sm font-medium text-slate-700">Teléfono</label>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                placeholder="+54 11 1234 5678"
                                {...register('telefono')}
                            />
                            {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor='dni' className="block text-sm font-medium text-slate-700">DNI / Documento</label>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                placeholder="Ingrese DNI"
                                {...register('dni')}
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label htmlFor='clientAddress' className="block text-sm font-medium text-slate-700">Dirección</label>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                placeholder="Calle, Número, Localidad"
                                {...register('clientAddress')}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-slate-200" />

                {/* Section 2: Product & Plan */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-base font-semibold text-slate-900">Producto y Facturación</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label htmlFor='product' className="block text-sm font-medium text-slate-700">Producto asociado</label>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                placeholder="Nombre del producto o servicio"
                                {...register('product', { required: "El producto es obligatorio" })}
                            />
                            {errors.product && <ErrorMessage>{errors.product.message}</ErrorMessage>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor='fechaInicio' className="block text-sm font-medium text-slate-700">Fecha de inicio</label>
                            <input
                                type="date"
                                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm"
                                defaultValue={initialData?.fechaInicio?.slice(0, 10)}
                                {...register('fechaInicio', { required: "La fecha de inicio es obligatoria" })}
                            />
                            {errors.fechaInicio && <ErrorMessage>{errors.fechaInicio.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="flex bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <div className="flex h-6 items-center">
                            <input
                                type="checkbox"
                                id="facturado"
                                defaultChecked={initialData?.facturado}
                                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                                {...register('facturado')}
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor="facturado" className="font-medium text-slate-900 cursor-pointer">Estado de facturación</label>
                            <p className="text-slate-500">Marque esta casilla si el cliente ya ha sido facturado en el sistema.</p>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor='plan' className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            Detalles del Plan / Notas
                        </label>
                        <textarea
                            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors shadow-sm resize-none h-32"
                            placeholder="Información adicional del plan contratado..."
                            {...register('plan')}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex items-center justify-end border-t border-slate-200 mt-8">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-[0.98] w-full sm:w-auto cursor-pointer"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {initialData ? "Guardar Cambios" : "Registrar Cliente"}
                    </button>
                </div>

            </form>
        </div>
    </div>
  )
}