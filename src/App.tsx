import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layout/MainLayout';
import { useAuthStore } from './store/useAuthStore';

const ProtectedLayout: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const App: React.FC = () => {
  return <AppRoutes layout={<ProtectedLayout />} />;
};

export default App;
