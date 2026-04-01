import axios from 'axios';
import { useAuthStore } from '../../features/pos-auth/store/useAuthStore';

// La URL de la API puede venir de variables de entorno, por defecto a localhost:8000
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const posAxios = axios.create({
  baseURL: apiUrl,
});

// Interceptor para inyectar token de Sanctum del POS
posAxios.interceptors.request.use((config) => {
  try {
    const token = useAuthStore.getState().token;
    const tenantUrl = window.localStorage.getItem('pos_tenant_url');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (tenantUrl) {
      config.headers['X-Frontend-Url'] = tenantUrl;
    }
  } catch (error) {
    console.error('Error getting POS token from localStorage:', error);
  }

  // Identificador opcional para el backend para saber que viene del POS
  config.headers['X-Source-App'] = 'vitePos';

  return config;
});

// Interceptor opcional para manejar expiraciones (401) globalmente
posAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Si recibimos 401, el token Sanctum expiró o fue revocado
      // Limpiamos la caché global del store
      useAuthStore.getState().clearSession();
      window.localStorage.removeItem('pos_tenant_url');
      
      // Podríamos redirigir aquí o simplemente emitir un evento
      console.warn('POS Session expired or invalid');
    }
    return Promise.reject(error);
  }
);
