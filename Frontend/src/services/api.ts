import axios from "axios";

// 1. Cria a instância base do Axios
export const api = axios.create({
  baseURL: "http://localhost:3001/api/lib",
});

// 2. Configura o Interceptor de Requisição (Request Interceptor)
api.interceptors.request.use(
  (config) => {
    // Busca o token salvo no navegador
    const token = localStorage.getItem("token");

    // Se o token existir, adiciona o cabeçalho de Autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração modificada para a requisição seguir
    return config;
  },
  (error) => {
    // Repassa o erro caso algo dê errado antes mesmo de enviar
    return Promise.reject(error);
  },
);

// Interceptor de Resposta (Response Interceptor)
api.interceptors.response.use(
  (response) => {
    // Se a resposta deu sucesso (2xx), apenas repassa os dados
    return response;
  },
  (error) => {
    // Se o erro for 401 (Não autorizado), significa que o token venceu ou é inválido
    if (error.response && error.response.status === 401) {
      console.warn("Sessão expirada. Redirecionando para o login...");

      localStorage.removeItem("token"); // Apaga o token inválido

      // Força o redirecionamento para a tela de login (usando a API nativa do navegador)
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
