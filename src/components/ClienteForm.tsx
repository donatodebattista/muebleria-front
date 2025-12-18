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
            name: '',
            email: '',
            product: '',
            fechaInicio: '',
            facturado: false,
            plan: '',
            telefono: '',
            dni: ''
        }
    })


  return (
    <div className="m-auto font-black p-5 w-2/5 bg-white rounded-lg">
        <div className="flex flex-row justify-between"> 
            <Link to="/clientes">
                <Undo2 className="text-black mb-3 cursor-pointer w-6 h-6" />
            </Link>
            
        {initialData?._id && ( //para mostrar solo cuando estoy editando
        <button
            type="button"
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition cursor-pointer"
        >
            <Trash2 className="w-6 h-6" />
        </button>
        )}
        </div>
        
        <h1 className="text-black text-3xl mb-3 text-center">
            {initialData ? "Editar Cliente" : "Nuevo Cliente"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="p-2 flex flex-col gap-4">

            <p className="text-left text-black mt-6">Datos del cliente</p>

            {/* Nombre */}
            <div className="flex flex-col bg-white rounded-sm">
                <label htmlFor='name' className="mr-4 text-black font-bold">Nombre</label>
                <input
                    type="text"
                    className=" bg-gray-200 p-2 w-full text-gray-500 font-medium rounded-sm"
                    placeholder="Ingrese el nombre"
                    {...register('name', { required: "El nombre es obligatorio" })}
                />
            </div>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

            {/* Email */}
            <div className="flex flex-col bg-white rounded-sm">
                <label htmlFor='email' className="mr-4 text-black font-bold">Email</label>
                <input
                    type="email"
                    className=" bg-gray-200 p-2 w-full text-gray-500 font-medium rounded-sm"
                    placeholder="Ingrese el email"
                    {...register('email')}
                />
            </div>

            {/* Telefono */}
            <div className="flex flex-col bg-white rounded-sm">
                <label htmlFor='telefono' className="mr-4 text-black font-bold">Telefono</label>
                <input
                    type="text"
                    className=" bg-gray-200 p-2 w-full text-gray-500 font-medium rounded-sm"
                    placeholder="Ingrese el telefono"
                    {...register('telefono', { required: "El telefono es obligatorio" })}
                />
            </div>
            {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}


            {/* DNI */}
            <div className="flex flex-col bg-white rounded-sm">
                <label htmlFor='dni' className="mr-4 text-black font-bold">DNI</label>
                <input
                    type="text"
                    className=" bg-gray-200 p-2 w-full text-gray-500 font-medium rounded-sm"
                    placeholder="Ingrese el DNI"
                    {...register('dni')}
                />
            </div>

            
            
            <hr className="text-[#c2c2c2] my-6"/>
            <p className="text-left text-black">Datos del plan</p>



            {/* Producto */}
            <div className="flex flex-col bg-white rounded-sm">
                <label htmlFor='product' className="mr-4 text-black font-bold">Producto</label>
                <input
                    type="text"
                    className=" bg-gray-200 p-2 w-full text-gray-500 font-medium rounded-sm"
                    placeholder="Ingrese el Producto"
                    {...register('product', { required: "El producto es obligatorio" })}
                />
            </div>
            {errors.product && <ErrorMessage>{errors.product.message}</ErrorMessage>}            

            {/* Fecha de inicio */}
            <div className="flex flex-col bg-white rounded-sm">
                <label htmlFor='fechaInicio' className="mr-4 text-black font-bold">Fecha de inicio</label>
                <input
                    type="date"
                    className=" bg-gray-200 p-2 text-gray-500 font-medium"
                    defaultValue={initialData?.fechaInicio?.slice(0, 10)}
                    {...register('fechaInicio', { required: "La fecha de inicio es obligatoria" })}
                />
            </div>
            {errors.fechaInicio && <ErrorMessage>{errors.fechaInicio.message}</ErrorMessage>}      

            {/* Facturado */}
            <div className="flex flex-row items-center">
                <label htmlFor='facturado' className="mr-4 text-black font-bold">Facturado</label>
                <input
                    type="checkbox"
                    defaultChecked={initialData?.facturado}
                    className=" bg-gray-400 p-2 h-4 w-4"
                    {...register('facturado')}
                />
            </div>

            {/* Plan */}
            <div className="flex flex-col">
                <label htmlFor='plan' className="mr-4 text-black font-bold text-left">Detalles</label>
                <textarea
                    className=" bg-gray-200 rounded-sm p-1 h-40 w-full"
                    {...register('plan')}
                />
            </div>

            <input
                type="submit"
                className="bg-[#F17300] hover:bg-[#cb6200] p-3 text-sm w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                value="Guardar"
            />
        </form>

    </div>
  )
}