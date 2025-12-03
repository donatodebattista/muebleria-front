import { isAxiosError } from "axios";
import ClienteForm from "../components/ClienteForm";
import api from "../config/axios";
import type { Client } from "../types";
import { toast } from 'sonner'

export default function ClienteNuevoView() {

  const handleCreate = async (data: Client) => {
    try {
      await api.post("/clientes/nuevoCliente", data);
      toast.success("Cliente creado correctamente");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || error.response?.data?.msg || "Error al crear cliente");
      } else {
        toast.error("Error al crear cliente");
      }
    }
  };

  return <ClienteForm onSubmit={handleCreate} />;
}