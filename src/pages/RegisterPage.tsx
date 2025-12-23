import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { authApi } from '../lib/authApi';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors: { email?: string; password?: string; confirmPassword?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await authApi.register({ email, password });
      navigate(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to register. Please try again.';
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
      <h1 className="login-title">Create your account</h1>
      <p className="login-subtitle">Get started with MEGALAI in a few steps.</p>
      <div className="form-hint">
        Tip: use an email containing <strong>verified</strong> to simulate verification success.
      </div>
      {formError && <div className="alert alert-error">{formError}</div>}
      <form onSubmit={handleRegister}>
        <Input
          label="Email"
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
          autoComplete="new-password"
        />
        {fieldErrors.password && <div className="form-error">{fieldErrors.password}</div>}
        <Input
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
        />
        {fieldErrors.confirmPassword && (
          <div className="form-error">{fieldErrors.confirmPassword}</div>
        )}
        <Button type="submit" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <div className="form-footer">
        <span>Already have an account?</span> <Link to="/auth/login">Sign in</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
