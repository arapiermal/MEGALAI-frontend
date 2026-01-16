import axios from 'axios';
import { apiClient } from './apiClient';
import type { Token, UserRead } from './types';
import type { User } from '../store/useAuthStore';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  name?: string;
  organization_id?: string | null;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (Array.isArray(detail)) {
      return detail.map((item) => item?.msg ?? item).join(', ');
    }
    if (typeof detail === 'string') {
      return detail;
    }
  }
  return error instanceof Error ? error.message : fallback;
};

export const authApi = {
  async login({ email, password }: LoginPayload): Promise<{ token: string; user: User }> {
    try {
      const { data } = await apiClient.post<Token>('/auth/login', { email, password });
      return { token: data.access_token, user: data.user };
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to sign in. Please try again.'));
    }
  },

  async register({ email, password, name, organization_id }: RegisterPayload): Promise<UserRead> {
    try {
      const resolvedName = name || email.split('@')[0] || 'User';
      const { data } = await apiClient.post<UserRead>('/auth/register', {
        email,
        password,
        name: resolvedName,
        organization_id,
      });
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to register. Please try again.'));
    }
  },

  async getMe(): Promise<UserRead> {
    try {
      const { data } = await apiClient.get<UserRead>('/auth/me');
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to fetch user profile.'));
    }
  },

  async resendVerification(email: string): Promise<{ ok: true }> {
    try {
      await apiClient.post('/auth/resend-verification', { email });
      return { ok: true };
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to resend verification email.'));
    }
  },

  async checkEmailVerified(email: string): Promise<{ verified: boolean }> {
    try {
      const { data } = await apiClient.get<{ verified: boolean }>('/auth/check-email-verified', {
        params: { email },
      });
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Unable to check verification status.'));
    }
  },
};
