import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useUiStore } from '../store/useUiStore';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  return (
    <div className="app-layout">
      {sidebarOpen && <Sidebar />}
      <div className="content">
        <Navbar />
        <div className="main-content">{children ?? <Outlet />}</div>
      </div>
    </div>
  );
};

export default MainLayout;
