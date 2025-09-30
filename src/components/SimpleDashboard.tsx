import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Space, Alert } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

export const SimpleDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [authData, setAuthData] = useState<any>(null);

  useEffect(() => {
    // Check localStorage directly
    const token = localStorage.getItem('gov_auth_token');
    const userData = localStorage.getItem('gov_auth_user');
    
    setAuthData({
      token: token ? 'Present' : 'Missing',
      user: userData ? JSON.parse(userData) : 'Missing',
      contextUser: user,
    });
  }, [user]);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div style={{ 
      padding: '40px',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title level={2}>🎉 Dashboard Working!</Title>
        
        <Alert
          message="Success"
          description="If you can see this, the authentication and routing are working correctly!"
          type="success"
          showIcon
          style={{ marginBottom: '24px' }}
        />
        
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Title level={4}>Authentication Data:</Title>
            <pre style={{ 
              background: '#f6f8fa', 
              padding: '16px', 
              borderRadius: '8px',
              fontSize: '12px'
            }}>
              {JSON.stringify(authData, null, 2)}
            </pre>
          </div>
          
          <Space>
            <Button type="primary" onClick={() => window.location.href = '/companies'}>
              Go to Companies
            </Button>
            <Button onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};