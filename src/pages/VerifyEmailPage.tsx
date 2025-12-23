import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { authApi } from '../lib/authApi';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = useMemo(() => searchParams.get('email') || '', [searchParams]);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Please provide a valid email.' });
      return;
    }

    setStatus(null);
    setLoadingResend(true);
    try {
      await authApi.resendVerification(email);
      setStatus({ type: 'success', message: 'Verification email resent successfully.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to resend verification email.';
      setStatus({ type: 'error', message });
    } finally {
      setLoadingResend(false);
    }
  };

  const handleCheck = async () => {
    if (!email) {
      setStatus({ type: 'error', message: 'Please provide a valid email.' });
      return;
    }

    setStatus(null);
    setLoadingCheck(true);
    try {
      const response = await authApi.checkEmailVerified(email);
      if (response.verified) {
        navigate(`/auth/login?verified=1&email=${encodeURIComponent(email)}`);
        return;
      }
      setStatus({ type: 'error', message: 'Not verified yet. Please check your inbox.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to check verification status.';
      setStatus({ type: 'error', message });
    } finally {
      setLoadingCheck(false);
    }
  };

  return (
    <div className="login-container">
      <img
        className="login-banner"
        src="https://www.erimali.com/assets/MEGALAI_banner.png"
        alt="MEGALAI banner"
      />
      <h1 className="login-title">Verify your email</h1>
      <p className="login-subtitle">
        We sent a verification email to <strong>{email || 'your email address'}</strong>.
      </p>
      <div className="verification-guidance">
        Check your inbox and spam folder, then click the link in the email to verify your account.
      </div>
      {status && (
        <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {status.message}
        </div>
      )}
      <div className="verification-actions">
        <Button type="button" variant="secondary" onClick={handleResend} disabled={loadingResend}>
          {loadingResend ? 'Resending...' : 'Resend verification email'}
        </Button>
        <Button type="button" onClick={handleCheck} disabled={loadingCheck}>
          {loadingCheck ? 'Checking...' : 'I have verified'}
        </Button>
      </div>
      <div className="form-footer">
        <span>Need to sign in?</span> <Link to="/auth/login">Back to login</Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
