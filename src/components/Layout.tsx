import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle, activeItem, onNavigate }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleItemClick = (item: string) => {
    onNavigate(item);
  };

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;