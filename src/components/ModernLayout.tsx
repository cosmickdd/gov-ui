import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Typography, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  FileTextOutlined,
  CrownOutlined,
  SafetyOutlined,
  BellOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #f0f2f5;
  position: relative;
`;

const StyledHeader = styled(Header)`
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%) !important;
  padding: 0 16px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1000;
  height: 64px !important;
  line-height: 64px !important;

  @media (min-width: 768px) {
    padding: 0 32px !important;
    height: 80px !important;
    line-height: 80px !important;
  }
`;

const StyledSider = styled(Sider)`
  .ant-layout-sider-trigger {
    background: rgba(0, 0, 0, 0.2) !important;
    color: white !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(0, 0, 0, 0.3) !important;
    }
  }

  .ant-layout-sider-children {
    background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      pointer-events: none;
    }
  }

  /* Mobile overlay behavior */
  @media (max-width: 767px) {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
    z-index: 1001 !important;
    height: 100vh !important;
    
    &.ant-layout-sider-collapsed {
      left: -100% !important;
      transition: left 0.3s ease !important;
    }
    
    &:not(.ant-layout-sider-collapsed) {
      left: 0 !important;
      transition: left 0.3s ease !important;
    }
  }
  
  .ant-menu {
    background: transparent !important;
    border: none !important;
    
    .ant-menu-item {
      margin: 2px 4px !important;
      border-radius: 8px !important;
      min-height: 48px !important;
      height: auto !important;
      display: flex !important;
      align-items: center !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      padding: 8px 12px !important;
      
      @media (min-width: 768px) {
        margin: 4px 8px !important;
        min-height: 56px !important;
        padding: 12px 16px !important;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
        transform: translateX(2px);
        
        @media (min-width: 768px) {
          transform: translateX(4px);
        }
      }
      
      &.ant-menu-item-selected {
        background: rgba(255, 255, 255, 0.15) !important;
        color: #ffffff !important;
        font-weight: 600;
        
        &::after {
          display: none;
        }
      }
      
      .ant-menu-item-icon {
        font-size: 16px;
        margin-right: 8px;
        flex-shrink: 0;
        display: flex;
        align-items: flex-start;
        margin-top: 2px;
        
        @media (min-width: 768px) {
          margin-right: 12px;
        }
      }
      
      .ant-menu-title-content {
        flex: 1;
        overflow: hidden;
        font-size: 14px;
        
        @media (min-width: 768px) {
          font-size: 16px;
        }
      }
    }
  }
`;

const LogoSection = styled.div`
  padding: 16px 12px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(8px);
  border-radius: 8px 8px 0 0;
  
  @media (min-width: 768px) {
    padding: 24px 16px;
    margin-bottom: 16px;
  }
  
  .logo-full {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4)) brightness(1.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)) brightness(1.15);
    }
  }
  
  .logo-small {
    width: 40px;
    height: auto;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4)) brightness(1.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5)) brightness(1.15);
    }
  }
`;

const FooterSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 16px;
  }
  
  .footer-text {
    color: rgba(255, 255, 255, 0.6);
    font-size: 9px;
    line-height: 1.3;
    
    @media (min-width: 768px) {
      font-size: 10px;
      line-height: 1.4;
    }
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 64px;
  
  @media (min-width: 768px) {
    gap: 24px;
    height: 80px;
  }
`;

const BreadcrumbSection = styled.div`
  background: #ffffff;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  
  @media (min-width: 768px) {
    padding: 20px 32px;
  }
`;

const MobileOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.visible ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledContent = styled(Content)`
  margin: 0;
  padding: 12px;
  background: #f0f2f5;
  min-height: calc(100vh - 120px);
  
  @media (min-width: 768px) {
    padding: 32px;
    min-height: calc(100vh - 140px);
  }
  
  .content-wrapper {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
    overflow: hidden;
    
    @media (min-width: 768px) {
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }
  }
`;

interface ModernLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    description: 'Overview & Analytics'
  },
  {
    key: 'companies',
    icon: <TeamOutlined />,
    label: 'Company Approvals',
    description: 'Registration Management'
  },
  {
    key: 'mrv',
    icon: <FileTextOutlined />,
    label: 'MRV Reports',
    description: 'Monitoring & Verification'
  },
  {
    key: 'credits',
    icon: <CrownOutlined />,
    label: 'Carbon Credits',
    description: 'Blockchain Registry'
  },
  {
    key: 'audit',
    icon: <SafetyOutlined />,
    label: 'Audit & Compliance',
    description: 'System Integrity'
  },
  {
    key: 'alerts',
    icon: <BellOutlined />,
    label: 'Alerts',
    description: 'Notifications'
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: 'Analytics & Insights',
    description: 'Advanced Reports'
  },
  {
    key: 'map',
    icon: <EnvironmentOutlined />,
    label: 'Project Map',
    description: 'Geographic View'
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'User Management',
    description: 'Access Control'
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    description: 'System Configuration'
  },
];

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  activeItem, 
  onNavigate 
}) => {
  // Better mobile-first responsive behavior
  const [collapsed, setCollapsed] = useState(true); // Always start collapsed
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { logout } = useAuth();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true); // Always collapse on mobile
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUserMenuClick = async (key: string) => {
    if (key === 'logout') {
      try {
        await logout();
        // Redirect will happen automatically via AuthContext
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    // Handle other menu items here if needed
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Account Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      danger: true,
    },
  ];

  const getBreadcrumbItems = () => {
    const currentItem = menuItems.find(item => item.key === activeItem);
    return [
      {
        title: 'NCCR Admin Portal'
      },
      {
        title: currentItem?.label || 'Dashboard'
      }
    ];
  };

  return (
    <StyledLayout>
      {/* Mobile overlay */}
      <MobileOverlay 
        visible={isMobile && !collapsed} 
        onClick={() => setCollapsed(true)}
      />
      
      <StyledSider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={isMobile ? 260 : 280}
        collapsedWidth={isMobile ? 0 : 80} // Hide completely on mobile
        theme="dark"
        breakpoint="md"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
      >
        <LogoSection>
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/logo-gov.svg" 
                  alt="NCCR Admin - Blue Carbon Registry"
                  className="logo-full"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/logo-gov-small.svg" 
                  alt="NCCR"
                  className="logo-small"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </LogoSection>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeItem]}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: (
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: '100%' }}
              >
                {!collapsed ? (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    width: '100%',
                    lineHeight: 1.2
                  }}>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      color: '#ffffff',
                      marginBottom: '2px'
                    }}>
                      {item.label}
                    </span>
                    <span style={{ 
                      fontSize: '11px', 
                      opacity: 0.7, 
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.1
                    }}>
                      {item.description}
                    </span>
                  </div>
                ) : (
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 500,
                    color: '#ffffff'
                  }}>
                    {item.label}
                  </span>
                )}
              </motion.div>
            ),
            onClick: () => {
              onNavigate(item.key);
              // Close mobile sidebar after navigation
              if (isMobile) {
                setCollapsed(true);
              }
            }
          }))}
          style={{ border: 'none' }}
        />

        {!collapsed && (
          <FooterSection>
            <div className="footer-text">
              Ministry of Earth Sciences<br />
              Government of India
            </div>
          </FooterSection>
        )}
      </StyledSider>

      <Layout>
        <StyledHeader>
          <HeaderContent>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: isMobile ? '20px' : '18px',
                width: isMobile ? 44 : 48,
                height: isMobile ? 44 : 48,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: 0 }}>
              <Title 
                level={window.innerWidth < 768 ? 4 : 3} 
                style={{ 
                  margin: 0, 
                  color: '#ffffff', 
                  fontWeight: 700, 
                  lineHeight: '1.2',
                  fontSize: window.innerWidth < 768 ? '16px' : '20px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {title}
              </Title>
              {subtitle && (
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.85)', 
                  fontSize: window.innerWidth < 768 ? '12px' : '14px', 
                  lineHeight: '1.2', 
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {subtitle}
                </Text>
              )}
            </div>
          </HeaderContent>

          <HeaderContent>
            {window.innerWidth >= 768 && (
              <Badge count={3} size="small" offset={[-2, 2]}>
                <Button
                  type="text"
                  icon={<NotificationOutlined />}
                  style={{
                    color: '#ffffff',
                    fontSize: '18px',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
              </Badge>
            )}

            <Dropdown
              menu={{ 
                items: userMenuItems,
                onClick: ({ key }) => handleUserMenuClick(key)
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: window.innerWidth < 768 ? '8px' : '16px', 
                cursor: 'pointer',
                padding: window.innerWidth < 768 ? '8px 12px' : '12px 16px',
                borderRadius: window.innerWidth < 768 ? '8px' : '12px',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {window.innerWidth >= 768 && (
                  <div style={{ textAlign: 'right', color: '#ffffff' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: '1.2' }}>Dr. Rajesh Kumar</div>
                    <div style={{ fontSize: '12px', opacity: 0.85, lineHeight: '1.2', marginTop: '2px' }}>Senior Administrator</div>
                  </div>
                )}
                <Avatar 
                  size={window.innerWidth < 768 ? 36 : 44} 
                  style={{ 
                    backgroundColor: '#52c41a',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    fontWeight: 600,
                    fontSize: window.innerWidth < 768 ? '14px' : '16px'
                  }}
                >
                  RK
                </Avatar>
              </div>
            </Dropdown>
          </HeaderContent>
        </StyledHeader>

        <BreadcrumbSection>
          <Breadcrumb 
            items={getBreadcrumbItems()}
            style={{ fontSize: window.innerWidth < 768 ? '12px' : '14px', fontWeight: 500 }}
          />
        </BreadcrumbSection>

        <StyledContent>
          <motion.div
            className="content-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div style={{ padding: '32px' }}>
              {children}
            </div>
          </motion.div>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default ModernLayout;