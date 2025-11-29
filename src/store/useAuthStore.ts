import { create } from 'zustand';

export type Role = 'student' | 'professor' | 'orgAdmin' | 'platformAdmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  currentOrganizationId: string | null;
}

interface AuthState {
  user: User | null;
  login: (email: string, role: Role) => void;
  logout: () => void;
  setOrganization: (orgId: string | null) => void;
}

const createUser = (email: string, role: Role): User => {
  const name = email.split('@')[0] || 'User';
  return {
    id: Math.random().toString(36).substring(2, 10),
    name,
    email,
    role,
    currentOrganizationId: null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email, role) => set({ user: createUser(email, role) }),
  logout: () => set({ user: null }),
  setOrganization: (orgId) => set((state) => ({ user: state.user ? { ...state.user, currentOrganizationId: orgId } : null })),
}));
