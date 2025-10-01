import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Typography,
  Input,
  Select,
  Modal,
  Form,
  Avatar,
  Drawer,
  Descriptions,
  Dropdown,
  Alert,
  Checkbox,
  Tabs,
  Statistic,
  message
} from 'antd';
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CrownOutlined,
  SafetyOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  AuditOutlined,
  LockOutlined,
  UnlockOutlined,
  EyeOutlined,
  MoreOutlined,
  UserAddOutlined,
  SecurityScanOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { confirm } = Modal;
const { TabPane } = Tabs;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
`;



// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'Dr. Raj Patel',
    email: 'raj.patel@bluecarbon.gov.in',
    phone: '+91 98765 43210',
    role: 'System Administrator',
    department: 'IT Administration',
    status: 'active',
    lastLogin: '2024-02-28 09:30:00',
    createdAt: '2023-01-15',
    avatar: null,
    permissions: ['read', 'write', 'delete', 'admin'],
    projects: ['Sundarbans Initiative', 'Tamil Nadu Seagrass'],
    location: 'New Delhi, India',
    loginCount: 247,
    failedAttempts: 0
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@bluecarbon.gov.in',
    phone: '+91 98765 43211',
    role: 'Project Manager',
    department: 'Project Management',
    status: 'active',
    lastLogin: '2024-02-28 08:15:00',
    createdAt: '2023-02-20',
    avatar: null,
    permissions: ['read', 'write'],
    projects: ['Kerala Backwater', 'Gujarat Salt Marsh'],
    location: 'Mumbai, India',
    loginCount: 189,
    failedAttempts: 0
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john.smith@bluecarbon.gov.in',
    phone: '+91 98765 43212',
    role: 'Environmental Scientist',
    department: 'Research & Development',
    status: 'active',
    lastLogin: '2024-02-27 16:45:00',
    createdAt: '2023-03-10',
    avatar: null,
    permissions: ['read', 'write'],
    projects: ['Odisha Coastal Restoration'],
    location: 'Bhubaneswar, India',
    loginCount: 156,
    failedAttempts: 1
  },
  {
    id: 4,
    name: 'Priya Sharma',
    email: 'priya.sharma@bluecarbon.gov.in',
    phone: '+91 98765 43213',
    role: 'Data Analyst',
    department: 'Analytics',
    status: 'inactive',
    lastLogin: '2024-02-25 14:20:00',
    createdAt: '2023-04-05',
    avatar: null,
    permissions: ['read'],
    projects: ['Analytics Dashboard'],
    location: 'Bengaluru, India',
    loginCount: 98,
    failedAttempts: 0
  },
  {
    id: 5,
    name: 'David Chen',
    email: 'david.chen@bluecarbon.gov.in',
    phone: '+91 98765 43214',
    role: 'Compliance Officer',
    department: 'Compliance',
    status: 'pending',
    lastLogin: null,
    createdAt: '2024-02-20',
    avatar: null,
    permissions: ['read'],
    projects: [],
    location: 'Chennai, India',
    loginCount: 0,
    failedAttempts: 0
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@bluecarbon.gov.in',
    phone: '+91 98765 43215',
    role: 'Auditor',
    department: 'Audit',
    status: 'suspended',
    lastLogin: '2024-02-20 11:30:00',
    createdAt: '2023-05-15',
    avatar: null,
    permissions: [],
    projects: [],
    location: 'Kolkata, India',
    loginCount: 67,
    failedAttempts: 3
  }
];

const roles = [
  'System Administrator',
  'Project Manager',
  'Environmental Scientist',
  'Data Analyst',
  'Compliance Officer',
  'Auditor',
  'Field Coordinator',
  'Research Assistant'
];

const departments = [
  'IT Administration',
  'Project Management',
  'Research & Development',
  'Analytics',
  'Compliance',
  'Audit',
  'Field Operations',
  'Finance'
];

const permissions = [
  { key: 'read', label: 'View Data' },
  { key: 'write', label: 'Edit Data' },
  { key: 'delete', label: 'Delete Data' },
  { key: 'admin', label: 'Admin Access' },
  { key: 'export', label: 'Export Data' },
  { key: 'import', label: 'Import Data' },
  { key: 'approve', label: 'Approve Actions' },
  { key: 'audit', label: 'Audit Access' }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'permissions'>('add');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'default';
      case 'pending': return 'blue';
      case 'suspended': return 'red';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleOutlined />;
      case 'inactive': return <ClockCircleOutlined />;
      case 'pending': return <ExclamationCircleOutlined />;
      case 'suspended': return <LockOutlined />;
      default: return <UserOutlined />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'System Administrator': return <CrownOutlined style={{ color: '#722ed1' }} />;
      case 'Project Manager': return <TeamOutlined style={{ color: '#1890ff' }} />;
      case 'Environmental Scientist': return <SafetyOutlined style={{ color: '#52c41a' }} />;
      case 'Data Analyst': return <AuditOutlined style={{ color: '#fa8c16' }} />;
      case 'Compliance Officer': return <SafetyCertificateOutlined style={{ color: '#13c2c2' }} />;
      case 'Auditor': return <SecurityScanOutlined style={{ color: '#eb2f96' }} />;
      default: return <UserOutlined style={{ color: '#666' }} />;
    }
  };

  const handleAddUser = () => {
    setModalType('add');
    setSelectedUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditUser = (user: any) => {
    setModalType('edit');
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsDrawerVisible(true);
  };

  const handleDeleteUser = (userId: number) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setUsers(users.filter(user => user.id !== userId));
      },
    });
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleFormSubmit = (values: any) => {
    if (modalType === 'add') {
      const newUser = {
        ...values,
        id: users.length + 1,
        createdAt: dayjs().format('YYYY-MM-DD'),
        lastLogin: null,
        loginCount: 0,
        failedAttempts: 0,
        projects: []
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...values } : user
      ));
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = searchText === '' || 
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.department.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  };

  const getUserStats = () => {
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      pending: users.filter(u => u.status === 'pending').length,
      suspended: users.filter(u => u.status === 'suspended').length
    };
  };

  const stats = getUserStats();
  const filteredUsers = getFilteredUsers();

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            size={40} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#1890ff' }}
          />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '2px' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role & Department',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: any) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {getRoleIcon(role)}
            <Text strong>{role}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.department}</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin: string) => (
        <div>
          {lastLogin ? (
            <>
              <div style={{ fontSize: '13px' }}>{dayjs(lastLogin).format('MMM DD, YYYY')}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>{dayjs(lastLogin).format('HH:mm')}</div>
            </>
          ) : (
            <Text type="secondary">Never</Text>
          )}
        </div>
      ),
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      key: 'projects',
      render: (projects: string[]) => (
        <div>
          <Text strong>{projects.length}</Text>
          <Text type="secondary" style={{ fontSize: '11px', marginLeft: '4px' }}>projects</Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => handleViewUser(record)}
          >
            View
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'edit',
                  label: 'Edit User',
                  icon: <EditOutlined />,
                  onClick: () => handleEditUser(record)
                },
                {
                  key: 'permissions',
                  label: 'Manage Permissions',
                  icon: <KeyOutlined />,
                  onClick: () => {
                    setModalType('permissions');
                    setSelectedUser(record);
                    setIsModalVisible(true);
                  }
                },
                { type: 'divider' },
                {
                  key: 'activate',
                  label: record.status === 'active' ? 'Deactivate' : 'Activate',
                  icon: record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />,
                  onClick: () => handleStatusChange(record.id, record.status === 'active' ? 'inactive' : 'active')
                },
                {
                  key: 'delete',
                  label: 'Delete User',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => handleDeleteUser(record.id)
                }
              ]
            }}
          >
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          User Management
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Manage user accounts, roles, permissions, and access control
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Total Users"
                value={stats.total}
                prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Active Users"
                value={stats.active}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Pending"
                value={stats.pending}
                prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />}
                valueStyle={{ color: '#fa8c16', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Suspended"
                value={stats.suspended}
                prefix={<LockOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
      </Row>

      {/* Controls */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Input
            placeholder="Search users by name, email, or department..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={4}>
          <Select
            placeholder="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="pending">Pending</Option>
            <Option value="suspended">Suspended</Option>
          </Select>
        </Col>
        <Col xs={24} sm={4}>
          <Select
            placeholder="Role"
            value={roleFilter}
            onChange={setRoleFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">All Roles</Option>
            {roles.map(role => (
              <Option key={role} value={role}>{role}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <Space style={{ float: 'right' }}>
            <Button 
              icon={<FilterOutlined />}
              onClick={() => {
                Modal.info({
                  title: 'Advanced Filters',
                  content: 'Advanced filtering options including department, location, last login date, permission level, and creation date would be available here.',
                  width: 600
                });
              }}
            >
              Advanced Filters
            </Button>
            <Button icon={<UserAddOutlined />} onClick={handleAddUser}>
              Add User
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
              Create New User
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Users Table */}
      <StyledCard>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          }}
        />
      </StyledCard>

      {/* Add/Edit User Modal */}
      <Modal
        title={
          modalType === 'add' ? 'Add New User' : 
          modalType === 'edit' ? 'Edit User' : 'Manage Permissions'
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {modalType === 'permissions' ? (
          <div style={{ padding: '20px 0' }}>
            <Alert
              message="Permission Management"
              description={`Configure permissions for ${selectedUser?.name}`}
              type="info"
              style={{ marginBottom: '20px' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {permissions.map(permission => (
                <Checkbox
                  key={permission.key}
                  defaultChecked={selectedUser?.permissions?.includes(permission.key)}
                >
                  {permission.label}
                </Checkbox>
              ))}
            </div>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                <Button 
                  type="primary"
                  onClick={() => {
                    message.success(`Permissions updated successfully for ${selectedUser?.name}`);
                    setIsModalVisible(false);
                  }}
                >
                  Save Permissions
                </Button>
              </Space>
            </div>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            style={{ padding: '20px 0' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: 'Please enter full name' }]}
                >
                  <Input placeholder="Enter full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true, message: 'Please enter location' }]}
                >
                  <Input placeholder="Enter location" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: 'Please select role' }]}
                >
                  <Select placeholder="Select role">
                    {roles.map(role => (
                      <Option key={role} value={role}>{role}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[{ required: true, message: 'Please select department' }]}
                >
                  <Select placeholder="Select department">
                    {departments.map(dept => (
                      <Option key={dept} value={dept}>{dept}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  {modalType === 'add' ? 'Create User' : 'Update User'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* User Details Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedUser?.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{selectedUser?.role}</div>
            </div>
          </div>
        }
        placement="right"
        width={520}
        open={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        extra={
          <Space>
            <Button type="text" icon={<EditOutlined />} size="small">Edit</Button>
            <Button type="text" icon={<KeyOutlined />} size="small">Permissions</Button>
          </Space>
        }
      >
        {selectedUser && (
          <div>
            <Tabs defaultActiveKey="profile">
              <TabPane tab="Profile" key="profile">
                <div style={{ padding: '20px 0' }}>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label="Status">
                      <Tag color={getStatusColor(selectedUser.status)} icon={getStatusIcon(selectedUser.status)}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      <Text copyable>{selectedUser.email}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      <Text copyable>{selectedUser.phone}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Department">{selectedUser.department}</Descriptions.Item>
                    <Descriptions.Item label="Location">{selectedUser.location}</Descriptions.Item>
                    <Descriptions.Item label="Created">
                      {dayjs(selectedUser.createdAt).format('MMM DD, YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Login">
                      {selectedUser.lastLogin ? 
                        dayjs(selectedUser.lastLogin).format('MMM DD, YYYY HH:mm') : 
                        'Never'
                      }
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </TabPane>
              <TabPane tab="Activity" key="activity">
                <div style={{ padding: '20px 0' }}>
                  <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                    <Col span={8}>
                      <Statistic
                        title="Login Count"
                        value={selectedUser.loginCount}
                        prefix={<HistoryOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Failed Attempts"
                        value={selectedUser.failedAttempts}
                        prefix={<ExclamationCircleOutlined />}
                        valueStyle={{ color: selectedUser.failedAttempts > 2 ? '#ff4d4f' : '#52c41a' }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Projects"
                        value={selectedUser.projects.length}
                        prefix={<TeamOutlined />}
                      />
                    </Col>
                  </Row>
                  {selectedUser.projects.length > 0 && (
                    <div>
                      <Title level={5}>Assigned Projects</Title>
                      {selectedUser.projects.map((project: string, index: number) => (
                        <Tag key={index} style={{ marginBottom: '8px' }}>{project}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              </TabPane>
              <TabPane tab="Permissions" key="permissions">
                <div style={{ padding: '20px 0' }}>
                  <Alert
                    message="User Permissions"
                    description="Current permissions assigned to this user"
                    type="info"
                    style={{ marginBottom: '20px' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {permissions.map(permission => (
                      <div key={permission.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Checkbox 
                          checked={selectedUser.permissions.includes(permission.key)}
                          disabled
                        />
                        <Text>{permission.label}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default UserManagement;