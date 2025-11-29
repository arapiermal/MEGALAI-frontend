import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useI18n } from '../i18n/i18n';

const Sidebar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { t } = useI18n();
  const role = user?.role;

  return (
    <aside className="sidebar">
      <h2>{t('app.name')}</h2>
      <NavLink to="/" end>
        {t('nav.dashboard')}
      </NavLink>
      <NavLink to="/topics">{t('nav.topics')}</NavLink>
      <NavLink to="/lesson-generator">{t('nav.lessonGenerator')}</NavLink>
      <NavLink to="/quiz-generator">{t('nav.quizGenerator')}</NavLink>
      <NavLink to="/worksheet">{t('nav.worksheet')}</NavLink>
      <NavLink to="/rubric">{t('nav.rubric')}</NavLink>
      <NavLink to="/text-tools">{t('nav.textTools')}</NavLink>
      <NavLink to="/progress">{t('nav.progress')}</NavLink>
      {(role === 'professor' || role === 'orgAdmin' || role === 'platformAdmin') && (
        <NavLink to="/admin">{t('nav.admin')}</NavLink>
      )}
      {role === 'platformAdmin' && <NavLink to="/platform-admin">{t('nav.platformAdmin')}</NavLink>}
      <NavLink to="/settings">{t('nav.settings')}</NavLink>
    </aside>
  );
};

export default Sidebar;
