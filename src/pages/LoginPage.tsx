import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { Role, useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('student');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleLogin = () => {
    login(email || 'demo@university.edu', role);
    navigate('/');
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
      <Input label={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Select
        label={t('auth.role')}
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        options={[
          { value: 'student', label: t('role.student') },
          { value: 'professor', label: t('role.professor') },
          { value: 'orgAdmin', label: t('role.orgAdmin') },
          { value: 'platformAdmin', label: t('role.platformAdmin') },
        ]}
      />
      <Button onClick={handleLogin} style={{ width: '100%' }}>
        {t('auth.login')}
      </Button>
    </div>
  );
};

export default LoginPage;
