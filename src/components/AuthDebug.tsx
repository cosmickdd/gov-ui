import React from 'react';
import { Button, Space, Typography, Card } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

const { Title, Text, Paragraph } = Typography;

const AuthDebug: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  const checkLocalStorage = () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('auth_user');
    console.log('=== LOCALSTORAGE DEBUG ===');
    console.log('Token:', token);
    console.log('User Data:', userData);
    console.log('AuthService isAuthenticated:', authService.isAuthenticated());
    console.log('AuthContext user:', user);
    console.log('AuthContext isAuthenticated:', isAuthenticated);
    console.log('AuthContext isLoading:', isLoading);
  };

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    console.log('Cleared localStorage');
    window.location.reload();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Title level={2}>Authentication Debug</Title>
      
      <Card style={{ marginBottom: '20px' }}>
        <Title level={4}>Current Auth State</Title>
        <Paragraph>
          <Text strong>User:</Text> {user ? JSON.stringify(user, null, 2) : 'No user'}
        </Paragraph>
        <Paragraph>
          <Text strong>Is Authenticated:</Text> {isAuthenticated ? 'Yes' : 'No'}
        </Paragraph>
        <Paragraph>
          <Text strong>Is Loading:</Text> {isLoading ? 'Yes' : 'No'}
        </Paragraph>
      </Card>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="primary" onClick={checkLocalStorage}>
          Check localStorage (Console)
        </Button>
        <Button danger onClick={clearAuth}>
          Clear Auth & Reload
        </Button>
        <Button onClick={() => window.location.href = '/login'}>
          Go to Login
        </Button>
        <Button onClick={() => window.location.href = '/dashboard'}>
          Go to Dashboard
        </Button>
      </Space>
    </div>
  );
};

export default AuthDebug;