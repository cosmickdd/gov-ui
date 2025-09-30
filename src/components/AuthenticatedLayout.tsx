import React from 'react';
import { Layout, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import { LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #1890ff;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => {
        // Navigate to profile page
        console.log('Navigate to profile');
      },
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => {
        // Navigate to settings page
        console.log('Navigate to settings');
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledHeader>
        <Logo>
          <span>🏛️</span>
          <span>Government Portal</span>
        </Logo>
        
        <UserInfo>
          <Space>
            <Text type="secondary">Welcome,</Text>
            <Text strong>{user?.userId || 'User'}</Text>
          </Space>
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button
              type="text"
              icon={<Avatar size="small" icon={<UserOutlined />} />}
              style={{ height: 'auto', padding: '8px' }}
            >
              <span style={{ marginLeft: 8 }}>{user?.userId}</span>
            </Button>
          </Dropdown>
        </UserInfo>
      </StyledHeader>
      
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default AuthenticatedLayout;