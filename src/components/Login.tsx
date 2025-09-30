import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../services/authService';

const { Title, Text } = Typography;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: none;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding: 0 24px;
`;

const GovLogo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const StyledInput = styled(Input)`
  height: 48px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  
  &:focus, &:hover {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  height: 48px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  
  &:focus, &:hover {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

const LoginButton = styled(Button)`
  height: 48px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #1890ff, #096dd9);
  border: none;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #096dd9, #0050b3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecurityInfo = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
  text-align: center;
`;

interface LoginProps {
  onLoginSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      console.log('User already authenticated, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (values: unknown) => {
    setErrorMessage('');
    
    const credentials = values as LoginCredentials;
    
    try {
      console.log('Login form submitting with credentials:', credentials);
      const success = await login(credentials);
      
      if (success) {
        console.log('Login successful, clearing form and redirecting');
        form.resetFields();
        onLoginSuccess?.();
        // Navigate to dashboard after successful login
        navigate('/dashboard', { replace: true });
      } else {
        console.log('Login failed - success was false');
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error in component:', error);
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };

  const handleFormFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
    setErrorMessage('Please fill in all required fields correctly.');
  };

  return (
    <LoginContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginCard>
          <LogoContainer>
            <GovLogo>🏛️</GovLogo>
            <Title level={2} style={{ margin: 0, color: '#262626' }}>
              Government Portal
            </Title>
            <Text type="secondary">Blue Carbon Management System</Text>
          </LogoContainer>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ marginBottom: 20 }}
            >
              <Alert
                message={errorMessage}
                type="error"
                showIcon
                style={{ borderRadius: 8 }}
              />
            </motion.div>
          )}

          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            onFinishFailed={handleFormFailed}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="userId"
              rules={[
                { required: true, message: 'Please input your User ID!' },
                { min: 3, message: 'User ID must be at least 3 characters!' }
              ]}
            >
              <StyledInput
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="User ID"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <StyledPasswordInput
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <LoginButton
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                icon={<LoginOutlined />}
              >
                {isLoading ? 'Signing In...' : 'Sign In to Portal'}
              </LoginButton>
            </Form.Item>
          </Form>

          <SecurityInfo>
            <Space direction="vertical" size="small">
              <Text type="secondary" style={{ fontSize: '12px' }}>
                🔒 Secure Government Access
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                This is a restricted system for authorized personnel only
              </Text>
            </Space>
          </SecurityInfo>
        </LoginCard>
      </motion.div>
    </LoginContainer>
  );
};

export default Login;