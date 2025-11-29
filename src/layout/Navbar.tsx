import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useUiStore } from '../store/useUiStore';
import { useI18n } from '../i18n/i18n';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const { lang, setLang, t } = useI18n();

  return (
    <nav className="navbar">
      <div className="flex space-between" style={{ width: '100%', alignItems: 'center' }}>
        <div className="flex" style={{ alignItems: 'center' }}>
          <button className="button secondary" onClick={toggleSidebar} style={{ padding: '6px 10px' }}>
            ☰
          </button>
          <strong style={{ marginLeft: 12 }}>{t('app.name')}</strong>
        </div>
        <div className="flex" style={{ alignItems: 'center', gap: 8 }}>
          <select
            className="select"
            value={lang}
            onChange={(e) => setLang(e.target.value as 'en' | 'sq')}
            style={{ width: 120 }}
          >
            <option value="en">EN</option>
            <option value="sq">SQ</option>
          </select>
          {user ? (
            <div className="flex" style={{ alignItems: 'center', gap: 12 }}>
              <div className="nav-user">
                <div>{user.email}</div>
                <div style={{ fontSize: 12 }}>{t(`role.${user.role}`)}</div>
              </div>
              <button className="button secondary" onClick={logout}>
                {t('auth.logout') || 'Logout'}
              </button>
            </div>
          ) : (
            <div>{t('auth.guest') || 'Guest'}</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
