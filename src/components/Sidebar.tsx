import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Coins, 
  Shield, 
  Bell, 
  BarChart3, 
  Map, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'companies', label: 'Company Approvals', icon: Building2 },
  { id: 'mrv', label: 'MRV Reports', icon: FileText },
  { id: 'credits', label: 'Carbon Credits', icon: Coins },
  { id: 'audit', label: 'Audit & Compliance', icon: Shield },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
  { id: 'map', label: 'Project Map', icon: Map },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, activeItem, onItemClick }) => {
  return (
    <div className={`bg-primary-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-primary-800">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">NCCR Admin</h1>
              <p className="text-xs text-primary-300">Blue Carbon Registry</p>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-primary-800 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary-800 transition-colors ${
                    activeItem === item.id ? 'bg-primary-800 border-r-2 border-blue-400' : ''
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-800">
        {!collapsed && (
          <div className="text-xs text-primary-300">
            <p>Ministry of Earth Sciences</p>
            <p>Government of India</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;