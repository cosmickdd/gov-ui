import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { SimpleLogin } from './components/SimpleLogin';
import AuthDebug from './components/AuthDebug';
import ModernLayout from './components/ModernLayout';
import ModernDashboard from './components/ModernDashboard';
import ModernCompanyApprovals from './components/ModernCompanyApprovals';
import PendingRequests from './components/PendingRequests';
import ModernMRVReports from './pages/ModernMRVReports';
import ModernCarbonCredits from './pages/ModernCarbonCredits';
import ModernAuditCompliance from './pages/ModernAuditCompliance';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          colorSuccess: '#52c41a',
          colorWarning: '#fa8c16',
          colorError: '#ff4d4f',
          borderRadius: 8,
          fontSize: 14,
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Card: {
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          },
          Button: {
            borderRadius: 8,
          },
          Input: {
            borderRadius: 8,
          },
          Select: {
            borderRadius: 8,
          },
          Table: {
            borderRadius: 12,
          },
        },
      }}
    >
      <AuthProvider>
        <Router>
          <Routes>
            {/* Debug route */}
            <Route 
              path="/auth-debug" 
              element={<AuthDebug />} 
            />
            
            {/* Simple login test */}
            <Route 
              path="/simple-login" 
              element={<SimpleLogin />} 
            />
            
            {/* Public route for login */}
            <Route 
              path="/login" 
              element={<Login />} 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <AuthenticatedMainApp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/companies" 
              element={
                <ProtectedRoute>
                  <AuthenticatedMainApp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pending-requests" 
              element={
                <ProtectedRoute>
                  <AuthenticatedMainApp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/mrv" 
              element={
                <ProtectedRoute>
                  <AuthenticatedMainApp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/credits" 
              element={
                <ProtectedRoute>
                  <AuthenticatedMainApp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/audit" 
              element={
                <ProtectedRoute>
                  <AuthenticatedMainApp />
                </ProtectedRoute>
              } 
            />
            
            {/* Root route - redirect to login by default */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />
            
            {/* Catch all - redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
};

// Separate component for the main authenticated app
const AuthenticatedMainApp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active item from URL path
  const getActiveItemFromPath = (path: string) => {
    if (path.includes('/companies')) return 'companies';
    if (path.includes('/pending-requests')) return 'pending-requests';
    if (path.includes('/mrv')) return 'mrv';
    if (path.includes('/credits')) return 'credits';
    if (path.includes('/audit')) return 'audit';
    return 'dashboard'; // default
  };

  const [activeItem, setActiveItem] = React.useState(getActiveItemFromPath(location.pathname));

  const handleNavigation = React.useCallback((item: string) => {
    setActiveItem(item);
    // Update URL based on navigation
    const paths = {
      'dashboard': '/dashboard',
      'companies': '/companies',
      'pending-requests': '/pending-requests',
      'mrv': '/mrv',
      'credits': '/credits',
      'audit': '/audit'
    };
    navigate(paths[item as keyof typeof paths] || '/dashboard');
  }, [navigate]);

  const getPageTitle = (item: string) => {
    const titles = {
      dashboard: 'Dashboard Overview',
      companies: 'Company Approvals',
      'pending-requests': 'Pending Requests',
      mrv: 'MRV Reports',
      credits: 'Carbon Credit Registry',
      audit: 'Audit & Compliance',
      alerts: 'System Alerts',
      analytics: 'Analytics & Insights',
      map: 'Project Map',
      users: 'User Management',
      settings: 'System Settings'
    };
    return titles[item as keyof typeof titles] || 'Dashboard Overview';
  };

  const getPageSubtitle = (item: string) => {
    const subtitles = {
      dashboard: 'Real-time insights and system metrics',
      companies: 'Manage company registrations and approvals',
      'pending-requests': 'Review and approve pending applications',
      mrv: 'Monitoring, reporting, and verification workflows',
      credits: 'Blockchain-based carbon credit management',
      audit: 'Compliance monitoring and audit trails',
      alerts: 'System notifications and alerts',
      analytics: 'Advanced analytics and reporting',
      map: 'Geographic visualization of projects',
      users: 'User access and role management',
      settings: 'System configuration and preferences'
    };
    return subtitles[item as keyof typeof subtitles] || '';
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <ModernDashboard />;
      case 'companies':
        return <ModernCompanyApprovals />;
      case 'pending-requests':
        return <PendingRequests />;
      case 'mrv':
        return <ModernMRVReports />;
      case 'credits':
        return <ModernCarbonCredits />;
      case 'audit':
        return <ModernAuditCompliance />;
      case 'alerts':
        return (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>System Alerts</h2>
            <p>Alert management interface coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>Analytics & Insights</h2>
            <p>Advanced analytics dashboard coming soon...</p>
          </div>
        );
      case 'map':
        return (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>Project Map</h2>
            <p>Interactive project map coming soon...</p>
          </div>
        );
      case 'users':
        return (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>User Management</h2>
            <p>User management interface coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2>System Settings</h2>
            <p>System configuration interface coming soon...</p>
          </div>
        );
      default:
        return <ModernDashboard />;
    }
  };

  return (
    <ModernLayout
      title={getPageTitle(activeItem)}
      subtitle={getPageSubtitle(activeItem)}
      activeItem={activeItem}
      onNavigate={handleNavigation}
    >
      {renderContent()}
    </ModernLayout>
  );
};

export default App;
