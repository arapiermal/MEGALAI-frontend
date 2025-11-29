import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useUiStore } from '../store/useUiStore';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  return (
    <div className="app-layout">
      {sidebarOpen && <Sidebar />}
      <div className="content">
        <Navbar />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
