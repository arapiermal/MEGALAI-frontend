import type { User } from '../store/useAuthStore';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createUser = (email: string): User => ({
  id: Math.random().toString(36).slice(2, 10),
  email,
  name: email.split('@')[0] || 'User',
  role: 'student',
  currentOrganizationId: null,
});

const throwAuthError = (message: string) => {
  throw new Error(message);
};

export const authApi = {
  async login({ email, password }: LoginPayload): Promise<{ token: string; user: User }> {
    await delay(700);

    if (!email || !password) {
      throwAuthError('Email and password are required.');
    }

    if (email.toLowerCase() === 'demo@megalai.app' && password === 'DemoPass123!') {
      return {
        token: `demo-token-${Math.random().toString(36).slice(2, 10)}`,
        user: createUser(email),
      };
    }

    if (email.includes('error') || password === 'password') {
      throwAuthError('Invalid email or password.');
    }

    return {
      token: `demo-token-${Math.random().toString(36).slice(2, 10)}`,
      user: createUser(email),
    };
  },

  async register({ email, password }: RegisterPayload): Promise<{ ok: true; emailSent: true }> {
    await delay(800);

    if (!email || !password) {
      throwAuthError('Email and password are required.');
    }

    if (email.includes('taken')) {
      throwAuthError('This email is already registered.');
    }

    return { ok: true, emailSent: true };
  },

  async resendVerification(email: string): Promise<{ ok: true }> {
    await delay(600);

    if (!email) {
      throwAuthError('Email is required to resend verification.');
    }

    return { ok: true };
  },

  async checkEmailVerified(email: string): Promise<{ verified: boolean }> {
    await delay(600);

    if (!email) {
      throwAuthError('Email is required to check verification status.');
    }

    const verified = email.includes('verified');

    return { verified };
  },
};
