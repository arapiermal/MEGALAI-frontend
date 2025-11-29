import React from 'react';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { t } = useI18n();
  const role = user?.role || 'student';

  return (
    <div>
      <h1>{t('dashboard.welcome')}</h1>
      <div className="card-grid">
        {role === 'student' && (
          <>
            <Card title="Continue learning">AI suggests next lesson.</Card>
            <Card title="Your recent quizzes">Quiz results preview.</Card>
          </>
        )}
        {role === 'professor' && (
          <>
            <Card title="Your courses">Course list overview.</Card>
            <Card title="Recent class performance">Performance charts mocked.</Card>
          </>
        )}
        {role === 'orgAdmin' && (
          <>
            <Card title="Organizations metrics">Enrollment trend summary.</Card>
            <Card title="Manage courses/teachers">Quick links to management tools.</Card>
          </>
        )}
        {role === 'platformAdmin' && (
          <>
            <Card title="Platform metrics">Usage stats across universities.</Card>
            <Card title="Org list">List of connected organizations.</Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
