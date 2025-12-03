import api from "../config/axios";
import type { Client }  from "../types";

export const getClientById = async (id: string): Promise<Client> => {
  const res = await api.get(`clientes/${id}`);
  return res.data;
};

export const getClients = async (): Promise<Client[]> => {
  const { data } = await api.get<Client[]>("/clientes");
  return data ?? []
};


export const updateClient = async (id: string, client: Client): Promise<Client> => {
  const res = await api.patch(`clientes/${id}`, client);
  return res.data;
};

export const deleteClient = async (id: string): Promise<{ msg: string }> => {
  const res = await api.delete(`/clientes/${id}`);
  return res.data;
};