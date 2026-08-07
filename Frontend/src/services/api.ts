import axios from "axios";

// 1. Criamos a instância centralizada do Axios
const api = axios.create({
  // Ajuste para a porta real do seu backend (ex: 3001)
  baseURL: "http://localhost:3001/api/lib",
});

// 2. Interceptor: Antes de QUALQUER requisição sair, ele adiciona o token no cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token_biblioteca");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
