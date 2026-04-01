import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types/AuthUser';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Acciones
  setSession: (user: AuthUser, token: string) => void;
  clearSession: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setSession: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      clearSession: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
        
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: 'pos-auth-storage', // Nombre para la clave en localStorage
      // partialize permite elegir qué partes del estado persistir si quisiéramos excluir algo,
      // pero por defecto guarda todo.
    }
  )
);
