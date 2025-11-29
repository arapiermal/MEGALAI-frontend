import React from 'react';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const organizations = [
  { id: 'org-1', name: 'University of Tirana', users: 1200 },
  { id: 'org-2', name: 'Pristina Tech', users: 800 },
];

const PlatformAdminPage: React.FC = () => {
  const role = useAuthStore((state) => state.user?.role);
  const { t } = useI18n();

  if (role !== 'platformAdmin') {
    return (
      <div className="alert">
        Access denied. <a href="/">{t('nav.dashboard')}</a>
      </div>
    );
  }

  return (
    <div>
      <h1>{t('nav.platformAdmin')}</h1>
      <Card title="Organizations">
        <ul>
          {organizations.map((org) => (
            <li key={org.id}>
              {org.name} - {org.users} users
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Usage stats">Total requests this month: 42k tokens.</Card>
      <Card title="Global AI settings">Central provider controls placeholder.</Card>
    </div>
  );
};

export default PlatformAdminPage;
