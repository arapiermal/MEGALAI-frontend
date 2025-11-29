import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const TopicsPage: React.FC = () => {
  const [topics] = useState(['Algebra Basics', 'World History', 'Biology Lab Safety']);
  const role = useAuthStore((state) => state.user?.role);
  const { t } = useI18n();

  return (
    <div>
      <h1>{t('nav.topics')}</h1>
      <div className="card-grid">
        {topics.map((topic) => (
          <Card key={topic} title={topic}>
            Brief description for {topic}.
          </Card>
        ))}
      </div>
      {(role === 'professor' || role === 'orgAdmin') && (
        <div style={{ marginTop: 16 }}>
          <Button>{t('action.add')} topic</Button>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;
