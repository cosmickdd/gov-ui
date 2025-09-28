import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white border-b border-secondary-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>
          {subtitle && <p className="text-secondary-600 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-secondary-900">Dr. Rajesh Kumar</p>
              <p className="text-xs text-secondary-600">Senior Administrator</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-lg transition-colors">
                <User size={20} />
              </button>
              <button className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;