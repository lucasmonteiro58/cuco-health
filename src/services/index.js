import axios from "axios";
import { convertDateToIso } from "@/utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3003",
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
  async deleteClients(clients) {
    const promises = clients.map((client) =>
      api.delete(`/clients/${client.id}`)
    );
    const response = await Promise.allSettled(promises);
    return response;
  },
};

export default apiService;
