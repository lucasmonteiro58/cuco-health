import axios from "axios";
import { convertDateToIso } from "@/utils";

const api = axios.create({
  baseURL: "http://localhost:3003/",
});

const apiService = {
  async getClients(pararms) {
    const response = await api.get("/clients", { params: pararms });
    return response;
  },
  async getClient(id) {
    const response = await api.get(`/clients/${id}`);
    return response;
  },
  async createClient(client) {
    const formatedClient = {
      ...client,
      birthdate: convertDateToIso(client.birthdate),
    };
    const response = await api.post("/clients", formatedClient);
    return response;
  },
  async updateClient(id, client) {
    const formatedClient = {
      ...client,
      birthdate: convertDateToIso(client.birthdate),
    };
    const response = await api.put(`/clients/${id}`, formatedClient);
    return response;
  },
  async deleteClient(id) {
    const response = await api.delete(`/clients/${id}`);
    return response;
  },
  async deleteClientsList(ids) {
    const response = await api.delete(`/clients`, { ...ids });
    return response;
  },
};

export default apiService;
