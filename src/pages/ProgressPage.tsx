import React from 'react';
import Card from '../components/ui/Card';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const ProgressPage: React.FC = () => {
  const role = useAuthStore((state) => state.user?.role || 'student');
  const { t } = useI18n();

  return (
    <div>
      <h1>{t('nav.progress')}</h1>
      {role === 'student' && <Card title="Your progress">You have completed 6/10 lessons.</Card>}
      {role === 'professor' && <Card title="Class progress">Average score: 82%.</Card>}
      {role === 'orgAdmin' && <Card title="Course-level stats">Completion rate: 76%.</Card>}
      {role === 'platformAdmin' && <Card title="Global usage summary">24 universities connected.</Card>}
    </div>
  );
};

export default ProgressPage;
