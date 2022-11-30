import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003/",
});

const apiService = {
  async getClients(pararms) {
    const response = await api.get("/clients", { params: pararms });
    return response;
  },
};

export default apiService;
