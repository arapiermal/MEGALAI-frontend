import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { authApi } from '../lib/authApi';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useI18n();
  const successMessage = useMemo(() => {
    if (searchParams.get('verified')) {
      return 'Your email is verified. Please log in to continue.';
    }

    return null;
  }, [searchParams]);

  const redirectPath =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname || '/';

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      login(response);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in. Please try again.';
      setFormError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img
        className="login-banner"
        src="https://www.erimali.com/assets/MEGALAI_banner.png"
        alt="MEGALAI banner"
      />
      <h1 className="login-title">{t('login.title')}</h1>
      <p className="login-subtitle">{t('login.description')}</p>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {formError && <div className="alert alert-error">{formError}</div>}
      <form onSubmit={handleLogin}>
        <Input
          label={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
        />
        {fieldErrors.email && <div className="form-error">{fieldErrors.email}</div>}
        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
        />
        {fieldErrors.password && <div className="form-error">{fieldErrors.password}</div>}
        <Button type="submit" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Signing in...' : t('auth.login')}
        </Button>
      </form>
      <div className="form-footer">
        <span>New here?</span> <Link to="/auth/register">Create an account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
