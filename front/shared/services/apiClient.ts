import axios, { AxiosError } from "axios";
import { BaseURL } from "../constants/urls";

const apiClient = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar tokens de autenticación
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const requestUrl = error.config?.url ?? "";
    const isAuthEndpoint =
      requestUrl.includes("/login") || requestUrl.includes("/signup");

    // Si el token expiró o es inválido en una ruta protegida, limpiar sesión
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
