import React, { useEffect, useState, useRef, useCallback } from 'react';
import { posAxios } from '@/infrastructure/http/posAxios';
import { useAuthStore } from './store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface PosBootstrapProps {
  children: React.ReactNode;
}

export function PosBootstrap({ children }: PosBootstrapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authAttempted = useRef(false);
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    try {
      await posAxios.post('/auth/logout');
    } catch (e) {
      console.error('Error invalidating POS session', e);
    } finally {
      useAuthStore.getState().clearSession();
      window.localStorage.removeItem('pos_jwt_access_token');
      window.localStorage.removeItem('pos_tenant_url');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // Derive the ERP origin from the stored tenant URL (set during SSO launch)
    const storedTenantUrl = window.localStorage.getItem('pos_tenant_url');
    const erpOrigin = storedTenantUrl
      ? new URL(storedTenantUrl).origin
      : (window.location.hostname === 'localhost' ? 'http://localhost:3000' : `https://app.${window.location.hostname.replace('pos.', '')}`);

    const handleMessage = (event: MessageEvent) => {
      // Security: only accept messages from the known ERP origin
      if (event.origin !== erpOrigin) return;
      if (event.data?.type === 'LOGOUT_EVENT') {
        handleSignOut();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleSignOut]);

  useEffect(() => {
    if (authAttempted.current) return;

    const initializeAuth = async () => {
      authAttempted.current = true;
      try {
        // 1. Verificar si hay un launch token (lt) en la URL
        const params = new URLSearchParams(window.location.search);
        const launchToken = params.get('lt');
        const encodedTenantUrl = params.get('tu');

        if (encodedTenantUrl) {
          try {
            const tenantUrl = atob(encodedTenantUrl);
            window.localStorage.setItem('pos_tenant_url', tenantUrl);
          } catch (e) {
            console.error('Error decoding tenant url', e);
          }
        }

        if (launchToken) {
          // 2. Canjear el token de lanzamiento por el token real de sesión Sanctum
          const { data } = await posAxios.post('/pos/auth/authenticate', {
            launch_token: launchToken,
          });

          console.log('POS Authenticated:', data?.auth?.user?.full_name);

          // 3. Guardar el nuevo token 
          const access_token = data.auth?.token;
          const auth_user = data.auth?.user;

          if (access_token && auth_user) {
            useAuthStore.getState().setSession(auth_user, access_token);
            window.localStorage.setItem('pos_jwt_access_token', access_token); // fallback para otros scripts
          } else {
            throw new Error('No se recibió un token válido en la respuesta.');
          }

          // 4. Limpiar la URL para no dejar el token expuesto
          window.history.replaceState({}, document.title, window.location.pathname);
          setIsLoading(false);
          return;
        }

        // Si no hay lt en la URL, verificamos si hay sesión en Zustand
        const { isAuthenticated, token: storedToken } = useAuthStore.getState();
        if (isAuthenticated && storedToken) {
          setIsLoading(false);
          return;
        }

        // Fallback por si acaso falló la hidratación pero existe en localStorage crudo (safety net)
        const rawToken = window.localStorage.getItem('pos_jwt_access_token');
        if (rawToken) {
          setIsLoading(false);
          return;
        }

        // Si llegamos a este punto y no hay un token guardado ni un lt provisto,
        // habilitamos el login directo redirigiendo a la pantalla de login
        navigate('/login', { replace: true });
        setIsLoading(false);

      } catch (err: any) {
        console.error('Failed to authenticate POS session:', err);
        setError(err.response?.data?.message || 'Error de conexión con el servidor.');
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="flex flex-col items-center">
          {/* Un spinner o logo básico estilo SAP */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005483] mb-4"></div>
          <p className="text-slate-600 font-medium">Inicializando Punto de Venta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 px-4">
        <div className="bg-white border-l-4 border-red-600 p-6 rounded-md shadow-md max-w-lg w-full">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Error de Sesión</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.close()}
            className="w-full bg-[#005483] text-white py-2 px-4 rounded hover:bg-[#004266] transition-colors"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
