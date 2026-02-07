import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { deleteClient, getClientById } from "../api/clientesAPI";
import Spinner from '../components/Spinner';
import ClienteForm from '../components/ClienteForm';
import api from "../config/axios";
import type { Client } from "../types";
import { toast } from 'sonner'
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import NotFoundView from "./NotFoundView";


export default function ClienteDetalleView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const queryClient = useQueryClient();


  const { data: client, isLoading, isError } = useQuery<Client>({
    queryKey: ['client', id],
    queryFn: () => getClientById(id!),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <NotFoundView />;
  if (!client) return null;


  const handleDelete = async () => {
    const confirmar = await new Promise<boolean>((resolve) => {
      toast("¿Eliminar cliente?", {
        description: "Esta acción no se puede deshacer.",
        action: {
          label: "Eliminar",
          onClick: () => resolve(true),
        },
        cancel: {
          label: "Cancelar",
          onClick: () => resolve(false),
        },
      });
    });

    if (!confirmar) return;

    try {
      await deleteClient(id!);
      toast.success("Cliente eliminado correctamente");

      queryClient.invalidateQueries({ queryKey: ["clients"] });
      navigate("/clientes");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "Error al eliminar cliente");
      } else {
        toast.error("Error desconocido");
      }
    }
  };


  const handleUpdate = async (data: Client) => {
    try {
      await api.patch(`/clientes/updateClient/${id}`, data);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast.success("Cliente actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      if (isAxiosError(error)) {
        const msg = error.response?.data?.message || error.response?.data?.msg || "Error al actualizar cliente";
        toast.error(msg);
      } else {
        toast.error("Error desconocido al actualizar cliente");
      }
    }
  };

  return <ClienteForm initialData={client} onSubmit={handleUpdate} onDelete={handleDelete} />;
}