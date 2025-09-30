import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Typography, Space, Divider } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;

export const TestLogin: React.FC = () => {
  const { login, logout, user, isLoading } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [autoTested, setAutoTested] = useState(false);

  const testCredentials = {
    userId: '25433067',
    password: 'Pass1234'
  };

  const performLoginTest = useCallback(async () => {
    setTestResult('Testing login...');
    console.log('Performing login test');
    
    try {
      const success = await login(testCredentials);
      if (success) {
        setTestResult('✅ Login successful!');
      } else {
        setTestResult('❌ Login failed');
      }
    } catch (error) {
      setTestResult(`❌ Login error: ${error}`);
    }
  }, [login]);

  const handleClearStorage = () => {
    console.log('Manually clearing localStorage');
    localStorage.clear();
    setTestResult('🗑️ Local storage cleared');
    window.location.reload();
  };

  const handleLogout = async () => {
    console.log('Manually triggering logout');
    await logout();
    setTestResult('🚪 Logged out');
  };

  const handleCheckStorage = () => {
    const token = localStorage.getItem('gov_auth_token');
    const user = localStorage.getItem('gov_auth_user');
    console.log('Storage check - Token:', !!token, 'User:', !!user);
    setTestResult(`Storage: Token=${!!token}, User=${!!user}`);
  };

  useEffect(() => {
    console.log('TestLogin component mounted');
    console.log('Current user:', user);
    console.log('Is loading:', isLoading);
    
    // Auto-trigger login test after a short delay (only once)
    if (!autoTested) {
      const timer = setTimeout(() => {
        console.log('Auto-triggering login test...');
        setAutoTested(true);
        performLoginTest();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoTested, performLoginTest]);

  const handleTestLogin = () => {
    console.log('Test login button clicked');
    performLoginTest();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card>
        <Title level={3}>Login Test Page</Title>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>Test Credentials:</Text>
            <Paragraph>
              User ID: {testCredentials.userId}<br/>
              Password: {testCredentials.password}
            </Paragraph>
          </div>
          
          <Space direction="horizontal" wrap>
            <Button 
              type="primary" 
              onClick={handleTestLogin}
              loading={isLoading}
              size="large"
            >
              Test Login
            </Button>
            
            <Button 
              onClick={handleLogout}
              size="large"
            >
              Logout
            </Button>
            
            <Button 
              onClick={handleClearStorage}
              danger
              size="large"
            >
              Clear Storage
            </Button>
            
            <Button 
              onClick={handleCheckStorage}
              size="large"
            >
              Check Storage
            </Button>
          </Space>
          
          {testResult && (
            <div>
              <Text>{testResult}</Text>
            </div>
          )}
          
          <Divider />
          
          <div>
            <Text strong>Current User Status:</Text>
            <Paragraph>
              User: {user ? JSON.stringify(user, null, 2) : 'Not logged in'}<br/>
              Loading: {isLoading ? 'Yes' : 'No'}
            </Paragraph>
          </div>
        </Space>
      </Card>
    </div>
  );
};