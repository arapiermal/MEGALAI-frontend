import React from 'react';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const AdminPage: React.FC = () => {
  const role = useAuthStore((state) => state.user?.role);
  const { t } = useI18n();

  if (!role || (role !== 'professor' && role !== 'orgAdmin' && role !== 'platformAdmin')) {
    return (
      <div className="alert">
        Access denied. <a href="/">{t('nav.dashboard')}</a>
      </div>
    );
  }

  return (
    <div>
      <h1>{t('nav.admin')}</h1>
      {role === 'professor' && <Card title="Manage your courses">Course tools coming soon.</Card>}
      {role === 'orgAdmin' && <Card title="Manage teachers & topics">Admin tools placeholder.</Card>}
      {role === 'platformAdmin' && (
        <Card title="Note">Use Platform Admin for system-level controls.</Card>
      )}
    </div>
  );
};

export default AdminPage;
