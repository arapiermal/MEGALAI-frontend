import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'student' | 'professor' | 'orgAdmin' | 'platformAdmin';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  currentOrganizationId?: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: { token: string; user: User }) => void;
  register: () => void;
  logout: () => void;
  setOrganization: (orgId: string | null) => void;
}

const getIsAuthenticated = (token: string | null, user: User | null) => Boolean(token && user);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: ({ token, user }) => set({ token, user, isAuthenticated: true }),
      register: () => set({ token: null, user: null, isAuthenticated: false }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      setOrganization: (orgId) =>
        set((state) => ({
          user: state.user ? { ...state.user, currentOrganizationId: orgId } : null,
        })),
    }),
    {
      name: 'megalai-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState as Partial<AuthState>) };
        return {
          ...merged,
          isAuthenticated: getIsAuthenticated(merged.token, merged.user),
        };
      },
    },
  ),
);
