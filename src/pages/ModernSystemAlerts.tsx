import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Statistic,
  Typography,
  Tabs,
  Input,
  Select,
  Modal,
  Badge,
  Alert,
  Dropdown,
  Divider,
  Empty
} from 'antd';
import {
  AlertOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  SettingOutlined,
  BellOutlined,
  DeleteOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  
  &.alert-card {
    border-left: 4px solid #1890ff;
    
    &.critical {
      border-left-color: #ff4d4f;
    }
    
    &.warning {
      border-left-color: #faad14;
    }
    
    &.info {
      border-left-color: #1890ff;
    }
    
    &.success {
      border-left-color: #52c41a;
    }
  }
`;

const AlertCard = styled(Card)`
  margin-bottom: 12px;
  border-radius: 8px;
  
  &.critical {
    border-left: 4px solid #ff4d4f;
    background: linear-gradient(90deg, #fff2f0 0%, #ffffff 100%);
  }
  
  &.warning {
    border-left: 4px solid #faad14;
    background: linear-gradient(90deg, #fffbe6 0%, #ffffff 100%);
  }
  
  &.info {
    border-left: 4px solid #1890ff;
    background: linear-gradient(90deg, #e6f7ff 0%, #ffffff 100%);
  }
  
  &.success {
    border-left: 4px solid #52c41a;
    background: linear-gradient(90deg, #f6ffed 0%, #ffffff 100%);
  }
`;

// Mock data
const mockAlerts = [
  {
    id: 1,
    title: 'High CO2 Sequestration Detected',
    message: 'Sundarbans project showing 25% higher carbon sequestration than projected',
    type: 'success',
    priority: 'medium',
    category: 'Environmental',
    timestamp: '2024-02-28 14:30:00',
    source: 'Monitoring System',
    location: 'Sundarbans, West Bengal',
    isRead: false,
    isResolved: false,
    assignedTo: 'Dr. Raj Patel'
  },
  {
    id: 2,
    title: 'Unauthorized Access Attempt',
    message: 'Multiple failed login attempts detected from IP 192.168.1.100',
    type: 'critical',
    priority: 'high',
    category: 'Security',
    timestamp: '2024-02-28 13:45:00',
    source: 'Security System',
    location: 'System Wide',
    isRead: false,
    isResolved: false,
    assignedTo: 'Security Team'
  },
  {
    id: 3,
    title: 'Satellite Data Sync Delayed',
    message: 'Satellite imagery sync for Tamil Nadu project delayed by 2 hours',
    type: 'warning',
    priority: 'medium',
    category: 'Technical',
    timestamp: '2024-02-28 12:15:00',
    source: 'Data Pipeline',
    location: 'Tamil Nadu Seagrass',
    isRead: true,
    isResolved: false,
    assignedTo: 'Tech Support'
  },
  {
    id: 4,
    title: 'New Company Registration',
    message: 'New company "Ocean Blue Solutions" registered for carbon credit program',
    type: 'info',
    priority: 'low',
    category: 'Administrative',
    timestamp: '2024-02-28 11:00:00',
    source: 'Registration System',
    location: 'Kerala, India',
    isRead: true,
    isResolved: true,
    assignedTo: 'Admin Team'
  },
  {
    id: 5,
    title: 'Compliance Audit Due',
    message: 'Annual compliance audit for Gujarat Salt Marsh project due in 5 days',
    type: 'warning',
    priority: 'high',
    category: 'Compliance',
    timestamp: '2024-02-28 09:30:00',
    source: 'Audit System',
    location: 'Gujarat Salt Marsh',
    isRead: false,
    isResolved: false,
    assignedTo: 'Maria Santos'
  }
];

const SystemAlerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning':
        return <WarningOutlined style={{ color: '#faad14' }} />;
      case 'info':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <AlertOutlined style={{ color: '#666' }} />;
    }
  };

  const getAlertTag = (type: string) => {
    switch (type) {
      case 'critical':
        return <Tag color="error">Critical</Tag>;
      case 'warning':
        return <Tag color="warning">Warning</Tag>;
      case 'info':
        return <Tag color="blue">Info</Tag>;
      case 'success':
        return <Tag color="success">Success</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Tag color="red">High Priority</Tag>;
      case 'medium':
        return <Tag color="orange">Medium Priority</Tag>;
      case 'low':
        return <Tag color="green">Low Priority</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const getStats = () => {
    return {
      total: alerts.length,
      unread: alerts.filter(a => !a.isRead).length,
      critical: alerts.filter(a => a.type === 'critical').length,
      resolved: alerts.filter(a => a.isResolved).length,
      pending: alerts.filter(a => !a.isResolved).length
    };
  };

  const handleMarkAsRead = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleResolve = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isResolved: true } : alert
    ));
  };

  const handleDelete = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getFilteredAlerts = (tabKey: string) => {
    let filtered = alerts;

    // Filter by tab
    switch (tabKey) {
      case 'unread':
        filtered = alerts.filter(a => !a.isRead);
        break;
      case 'critical':
        filtered = alerts.filter(a => a.type === 'critical');
        break;
      case 'resolved':
        filtered = alerts.filter(a => a.isResolved);
        break;
      case 'all':
      default:
        break;
    }

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(searchText.toLowerCase()) ||
        alert.message.toLowerCase().includes(searchText.toLowerCase()) ||
        alert.category.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type === typeFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.priority === priorityFilter);
    }

    return filtered;
  };

  const stats = getStats();

  const actionMenuItems = (alert: any) => [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: () => {
        setSelectedAlert(alert);
        setIsModalVisible(true);
      }
    },
    {
      key: 'read',
      label: alert.isRead ? 'Mark as Unread' : 'Mark as Read',
      icon: <CheckCircleOutlined />,
      onClick: () => handleMarkAsRead(alert.id),
      disabled: alert.isRead
    },
    {
      key: 'resolve',
      label: 'Resolve Alert',
      icon: <CheckCircleOutlined />,
      onClick: () => handleResolve(alert.id),
      disabled: alert.isResolved
    },
    {
      key: 'delete',
      label: 'Delete Alert',
      icon: <DeleteOutlined />,
      onClick: () => handleDelete(alert.id),
      danger: true
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          System Alerts
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Real-time system notifications and alert management
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard className="alert-card">
              <Statistic
                title="Total Alerts"
                value={stats.total}
                prefix={<BellOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard className="alert-card warning">
              <Statistic
                title="Unread"
                value={stats.unread}
                prefix={<ExclamationCircleOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard className="alert-card critical">
              <Statistic
                title="Critical"
                value={stats.critical}
                prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard className="alert-card success">
              <Statistic
                title="Resolved"
                value={stats.resolved}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
      </Row>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Input
            placeholder="Search alerts..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={4}>
          <Select
            style={{ width: '100%' }}
            placeholder="Type"
            value={typeFilter}
            onChange={setTypeFilter}
          >
            <Select.Option value="all">All Types</Select.Option>
            <Select.Option value="critical">Critical</Select.Option>
            <Select.Option value="warning">Warning</Select.Option>
            <Select.Option value="info">Info</Select.Option>
            <Select.Option value="success">Success</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={4}>
          <Select
            style={{ width: '100%' }}
            placeholder="Priority"
            value={priorityFilter}
            onChange={setPriorityFilter}
          >
            <Select.Option value="all">All Priority</Select.Option>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <Space style={{ float: 'right' }}>
            <Button icon={<FilterOutlined />}>Advanced Filters</Button>
            <Button icon={<SettingOutlined />}>Alert Settings</Button>
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Alerts Tabs */}
      <StyledCard>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'all',
              label: `All Alerts (${alerts.length})`,
              children: (
                <div>
                  {getFilteredAlerts('all').length === 0 ? (
                    <Empty description="No alerts found" />
                  ) : (
                    getFilteredAlerts('all').map((alert) => (
                      <AlertCard key={alert.id} className={alert.type} size="small">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              {getAlertIcon(alert.type)}
                              <Text strong style={{ fontSize: '16px' }}>{alert.title}</Text>
                              {!alert.isRead && <Badge dot />}
                            </div>
                            <Paragraph style={{ margin: '0 0 8px 0', color: '#666' }}>
                              {alert.message}
                            </Paragraph>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                              {getAlertTag(alert.type)}
                              {getPriorityTag(alert.priority)}
                              <Tag>{alert.category}</Tag>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#999' }}>
                                <ClockCircleOutlined />
                                {alert.timestamp}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#999' }}>
                                <EnvironmentOutlined />
                                {alert.location}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#999' }}>
                                <UserOutlined />
                                {alert.assignedTo}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginLeft: '16px' }}>
                            <Space>
                              {alert.isResolved && <Tag color="green">Resolved</Tag>}
                              <Dropdown
                                menu={{ items: actionMenuItems(alert) }}
                                trigger={['click']}
                              >
                                <Button type="text" icon={<MoreOutlined />} />
                              </Dropdown>
                            </Space>
                          </div>
                        </div>
                      </AlertCard>
                    ))
                  )}
                </div>
              )
            },
            {
              key: 'unread',
              label: (
                <span style={{ color: stats.unread > 0 ? '#faad14' : undefined }}>
                  <ExclamationCircleOutlined /> Unread ({stats.unread})
                </span>
              ),
              children: (
                <div>
                  {getFilteredAlerts('unread').length === 0 ? (
                    <Empty description="No unread alerts" />
                  ) : (
                    getFilteredAlerts('unread').map((alert) => (
                      <AlertCard key={alert.id} className={alert.type} size="small">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              {getAlertIcon(alert.type)}
                              <Text strong style={{ fontSize: '16px' }}>{alert.title}</Text>
                              <Badge dot />
                            </div>
                            <Paragraph style={{ margin: '0 0 8px 0', color: '#666' }}>
                              {alert.message}
                            </Paragraph>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                              {getAlertTag(alert.type)}
                              {getPriorityTag(alert.priority)}
                              <Tag>{alert.category}</Tag>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#999' }}>
                                <ClockCircleOutlined />
                                {alert.timestamp}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginLeft: '16px' }}>
                            <Space>
                              <Button type="primary" size="small" onClick={() => handleMarkAsRead(alert.id)}>
                                Mark as Read
                              </Button>
                              <Dropdown
                                menu={{ items: actionMenuItems(alert) }}
                                trigger={['click']}
                              >
                                <Button type="text" icon={<MoreOutlined />} />
                              </Dropdown>
                            </Space>
                          </div>
                        </div>
                      </AlertCard>
                    ))
                  )}
                </div>
              )
            },
            {
              key: 'critical',
              label: (
                <span style={{ color: stats.critical > 0 ? '#ff4d4f' : undefined }}>
                  <CloseCircleOutlined /> Critical ({stats.critical})
                </span>
              ),
              children: (
                <div>
                  {getFilteredAlerts('critical').length === 0 ? (
                    <Empty description="No critical alerts" />
                  ) : (
                    <Alert
                      message="Critical Alerts Require Immediate Attention"
                      description="These alerts indicate serious issues that need to be addressed immediately."
                      type="error"
                      showIcon
                      style={{ marginBottom: '16px' }}
                    />
                  )}
                  {getFilteredAlerts('critical').map((alert) => (
                    <AlertCard key={alert.id} className="critical" size="small">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                            <Text strong style={{ fontSize: '16px', color: '#ff4d4f' }}>{alert.title}</Text>
                            {!alert.isRead && <Badge dot />}
                          </div>
                          <Paragraph style={{ margin: '0 0 8px 0', color: '#666' }}>
                            {alert.message}
                          </Paragraph>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <Tag color="error">Critical</Tag>
                            {getPriorityTag(alert.priority)}
                            <Tag>{alert.category}</Tag>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#999' }}>
                              <ClockCircleOutlined />
                              {alert.timestamp}
                            </div>
                          </div>
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                          <Space>
                            <Button type="primary" danger size="small">
                              Take Action
                            </Button>
                            <Dropdown
                              menu={{ items: actionMenuItems(alert) }}
                              trigger={['click']}
                            >
                              <Button type="text" icon={<MoreOutlined />} />
                            </Dropdown>
                          </Space>
                        </div>
                      </div>
                    </AlertCard>
                  ))}
                </div>
              )
            }
          ]}
        />
      </StyledCard>

      {/* Alert Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {selectedAlert && getAlertIcon(selectedAlert.type)}
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedAlert?.title}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{selectedAlert?.category} Alert</div>
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          selectedAlert && !selectedAlert.isResolved && (
            <Button 
              key="resolve" 
              type="primary" 
              icon={<CheckCircleOutlined />}
              onClick={() => {
                handleResolve(selectedAlert.id);
                setIsModalVisible(false);
              }}
            >
              Resolve Alert
            </Button>
          )
        ].filter(Boolean)}
      >
        {selectedAlert && (
          <div style={{ padding: '20px 0' }}>
            <div style={{ marginBottom: '20px' }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Alert Type:</Text>
                    <div>{getAlertTag(selectedAlert.type)}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Priority:</Text>
                    <div>{getPriorityTag(selectedAlert.priority)}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Category:</Text>
                    <div><Tag>{selectedAlert.category}</Tag></div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Source:</Text>
                    <div>{selectedAlert.source}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Location:</Text>
                    <div>{selectedAlert.location}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>Assigned To:</Text>
                    <div>{selectedAlert.assignedTo}</div>
                  </div>
                </Col>
              </Row>
            </div>
            
            <Divider />
            
            <div style={{ marginBottom: '20px' }}>
              <Text strong>Alert Message:</Text>
              <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fafafa', borderRadius: '6px' }}>
                {selectedAlert.message}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <Text strong>Timestamp:</Text>
              <div>{selectedAlert.timestamp}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Text strong>Status:</Text>
              {selectedAlert.isResolved ? (
                <Tag color="green">Resolved</Tag>
              ) : (
                <Tag color="orange">Active</Tag>
              )}
              {selectedAlert.isRead ? (
                <Tag color="blue">Read</Tag>
              ) : (
                <Tag color="red">Unread</Tag>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SystemAlerts;