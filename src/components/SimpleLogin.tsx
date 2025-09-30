import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const SimpleLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing API call...');
    
    try {
      const response = await fetch('https://blue-carbon-server-production.up.railway.app/api/gov/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '25433067',
          password: 'Pass1234',
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('gov_auth_token', data.token);
        localStorage.setItem('gov_auth_user', JSON.stringify(data.user));
        setResult(`✅ SUCCESS: ${data.message}. Token stored! Redirecting...`);
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setResult(`❌ FAILED: ${data.message}`);
      }
    } catch (error) {
      setResult(`❌ ERROR: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearStorage = () => {
    localStorage.clear();
    setResult('🗑️ Storage cleared');
  };

  const checkStorage = () => {
    const token = localStorage.getItem('gov_auth_token');
    const user = localStorage.getItem('gov_auth_user');
    setResult(`Storage: Token=${!!token}, User=${!!user}`);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
          🏛️ Simple Login Test
        </Title>
        
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Text strong>Test Credentials:</Text>
            <br />
            <Text>User ID: 25433067</Text>
            <br />
            <Text>Password: Pass1234</Text>
          </div>
          
          <Button 
            type="primary" 
            onClick={testLogin}
            loading={loading}
            block
            size="large"
          >
            Test API Login
          </Button>
          
          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Button onClick={clearStorage}>Clear Storage</Button>
            <Button onClick={checkStorage}>Check Storage</Button>
          </Space>
          
          {result && (
            <Alert
              message={result}
              type={result.includes('✅') ? 'success' : result.includes('❌') ? 'error' : 'info'}
              showIcon
            />
          )}
        </Space>
      </Card>
    </div>
  );
};