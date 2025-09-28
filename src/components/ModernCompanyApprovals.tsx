import React, { useState } from 'react';
import {
  Card,
  Table,
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
  Avatar,
  Tooltip,
  Badge,
  Alert
} from 'antd';
import {
  BuildOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
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
`;

// Mock data
const mockCompanies = [
  {
    id: 1,
    name: 'Blue Carbon Ventures Ltd.',
    type: 'Private Limited',
    registrationNumber: 'BCV2024001',
    location: 'Mumbai, Maharashtra',
    projectType: 'Mangrove Restoration',
    submissionDate: '2024-01-15',
    status: 'approved',
    contactPerson: 'Rajesh Kumar',
    estimatedCredits: 15000,
    priority: 'high'
  },
  {
    id: 2,
    name: 'Coastal Restoration Co.',
    type: 'Corporation',
    registrationNumber: 'CRC2024002',
    location: 'Chennai, Tamil Nadu',
    projectType: 'Seagrass Conservation',
    submissionDate: '2024-01-20',
    status: 'under_review',
    contactPerson: 'Priya Sharma',
    estimatedCredits: 12500,
    priority: 'medium'
  },
  {
    id: 3,
    name: 'Marine Ecosystems Pvt Ltd.',
    type: 'Private Limited',
    registrationNumber: 'MEP2024003',
    location: 'Kochi, Kerala',
    projectType: 'Salt Marsh Protection',
    submissionDate: '2024-01-25',
    status: 'pending_documents',
    contactPerson: 'Arun Nair',
    estimatedCredits: 9200,
    priority: 'low'
  },
  {
    id: 4,
    name: 'Sundarbans Conservation Ltd.',
    type: 'Private Limited',
    registrationNumber: 'SCL2024004',
    location: 'Kolkata, West Bengal',
    projectType: 'Mangrove Restoration',
    submissionDate: '2024-01-28',
    status: 'under_review',
    contactPerson: 'Anita Roy',
    estimatedCredits: 18000,
    priority: 'high'
  },
  {
    id: 5,
    name: 'Gujarat Marine Protection',
    type: 'Corporation',
    registrationNumber: 'GMP2024005',
    location: 'Ahmedabad, Gujarat',
    projectType: 'Salt Marsh Protection',
    submissionDate: '2024-02-01',
    status: 'pending_documents',
    contactPerson: 'Vikram Patel',
    estimatedCredits: 8500,
    priority: 'medium'
  }
];

const ModernCompanyApprovals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [companies] = useState(mockCompanies);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'approved':
        return <Tag color="success" icon={<CheckOutlined />}>Approved</Tag>;
      case 'under_review':
        return <Tag color="processing" icon={<ClockCircleOutlined />}>Under Review</Tag>;
      case 'pending_documents':
        return <Tag color="warning" icon={<ExclamationCircleOutlined />}>Pending Documents</Tag>;
      case 'rejected':
        return <Tag color="error" icon={<CloseOutlined />}>Rejected</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: '#ff4d4f',
      medium: '#faad14',
      low: '#52c41a'
    };
    return <Badge color={colors[priority as keyof typeof colors]} text={priority.toUpperCase()} />;
  };

  const getStats = () => {
    return {
      total: companies.length,
      approved: companies.filter(c => c.status === 'approved').length,
      pending: companies.filter(c => c.status === 'under_review' || c.status === 'pending_documents').length,
      rejected: companies.filter(c => c.status === 'rejected').length
    };
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
  };

  const stats = getStats();

  const columns = [
    {
      title: 'Company Details',
      key: 'company',
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<BuildOutlined />} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.registrationNumber} • {record.type}
            </div>
          </div>
        </div>
      ),
      width: 300
    },
    {
      title: 'Project Type',
      dataIndex: 'projectType',
      key: 'projectType'
    },
    {
      title: 'Location',
      key: 'location',
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <EnvironmentOutlined style={{ color: '#666' }} />
          {record.location}
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => getStatusTag(record.status)
    },
    {
      title: 'Priority',
      key: 'priority',
      render: (record: any) => getPriorityBadge(record.priority)
    },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      render: (date: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CalendarOutlined style={{ color: '#666' }} />
          {date}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => {
                setSelectedCompany(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          {record.status === 'under_review' && (
            <>
              <Button 
                type="primary" 
                size="small" 
                icon={<CheckOutlined />}
                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                Approve
              </Button>
              <Button 
                danger 
                size="small" 
                icon={<CloseOutlined />}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      )
    }
  ];

  const getFilteredCompanies = (tabKey: string) => {
    let filtered = companies;

    // Filter by tab
    if (tabKey === 'pending') {
      filtered = companies.filter(c => c.status === 'under_review' || c.status === 'pending_documents');
    } else if (tabKey !== 'all') {
      filtered = companies.filter(c => c.status === tabKey);
    }

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchText.toLowerCase()) ||
        company.registrationNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        company.projectType.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(company => company.status === statusFilter);
    }

    return filtered;
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Company Approvals
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Manage company registrations and approval workflows with integrated pending requests
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Total Applications"
                value={stats.total}
                prefix={<BuildOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Approved"
                value={stats.approved}
                prefix={<CheckOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Pending Review"
                value={stats.pending}
                prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Rejected"
                value={stats.rejected}
                prefix={<CloseOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
      </Row>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <Input
            placeholder="Search companies, registration numbers, or project types..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={6}>
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <Select.Option value="all">All Status</Select.Option>
            <Select.Option value="approved">Approved</Select.Option>
            <Select.Option value="under_review">Under Review</Select.Option>
            <Select.Option value="pending_documents">Pending Documents</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={10}>
          <Space style={{ float: 'right' }}>
            <Button icon={<FilterOutlined />}>Advanced Filters</Button>
          </Space>
        </Col>
      </Row>

      {/* Companies Table with Tabs - INCLUDING PENDING REQUESTS TAB */}
      <StyledCard>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'all',
              label: `All Companies (${companies.length})`,
              children: (
                <Table
                  dataSource={getFilteredCompanies('all')}
                  columns={columns}
                  rowKey="id"
                  pagination={{
                    total: getFilteredCompanies('all').length,
                    pageSize: 10,
                    showQuickJumper: true,
                    showTotal: (total: number, range: number[]) => 
                      `${range[0]}-${range[1]} of ${total} companies`
                  }}
                />
              )
            },
            {
              key: 'pending',
              label: (
                <span style={{ color: stats.pending > 0 ? '#faad14' : undefined }}>
                  <ClockCircleOutlined /> Pending Requests ({stats.pending})
                </span>
              ),
              children: (
                <div>
                  <Alert
                    message="Pending Approval Requests"
                    description="These companies are awaiting review and approval for their blue carbon projects. Take action to approve or request additional documentation."
                    type="warning"
                    showIcon
                    style={{ marginBottom: '16px' }}
                    action={
                      <Button size="small" type="primary">
                        Bulk Actions
                      </Button>
                    }
                  />
                  <Table
                    dataSource={getFilteredCompanies('pending')}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                      total: getFilteredCompanies('pending').length,
                      pageSize: 10,
                      showQuickJumper: true,
                      showTotal: (total: number, range: number[]) => 
                        `${range[0]}-${range[1]} of ${total} pending requests`
                    }}
                    rowSelection={{
                      type: 'checkbox',
                      onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                      }
                    }}
                  />
                </div>
              )
            },
            {
              key: 'approved',
              label: `Approved (${stats.approved})`,
              children: (
                <Table
                  dataSource={getFilteredCompanies('approved')}
                  columns={columns}
                  rowKey="id"
                  pagination={{
                    total: getFilteredCompanies('approved').length,
                    pageSize: 10,
                    showQuickJumper: true,
                    showTotal: (total: number, range: number[]) => 
                      `${range[0]}-${range[1]} of ${total} approved companies`
                  }}
                />
              )
            }
          ]}
        />
      </StyledCard>

      {/* Company Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<BuildOutlined />} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedCompany?.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{selectedCompany?.registrationNumber}</div>
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          selectedCompany?.status === 'under_review' && (
            <Button 
              key="approve" 
              type="primary" 
              icon={<CheckOutlined />}
              style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            >
              Approve Company
            </Button>
          ),
          selectedCompany?.status === 'under_review' && (
            <Button key="reject" danger icon={<CloseOutlined />}>
              Reject Application
            </Button>
          )
        ].filter(Boolean)}
      >
        {selectedCompany && (
          <div style={{ padding: '20px 0' }}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Company Type:</Text>
                  <div>{selectedCompany.type}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Location:</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <EnvironmentOutlined />
                    {selectedCompany.location}
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Project Type:</Text>
                  <div>{selectedCompany.projectType}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Priority:</Text>
                  <div>{getPriorityBadge(selectedCompany.priority)}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Contact Person:</Text>
                  <div>{selectedCompany.contactPerson}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Estimated Credits:</Text>
                  <div>{selectedCompany.estimatedCredits?.toLocaleString()} tCO2e</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Submission Date:</Text>
                  <div>{selectedCompany.submissionDate}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Status:</Text>
                  <div>{getStatusTag(selectedCompany.status)}</div>
                </div>
              </Col>
            </Row>
            
            {selectedCompany.status === 'under_review' && (
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
                <Title level={5}>Quick Actions</Title>
                <Space>
                  <Button type="primary" icon={<CheckOutlined />} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
                    Approve Application
                  </Button>
                  <Button icon={<ExclamationCircleOutlined />}>
                    Request Documents
                  </Button>
                  <Button danger icon={<CloseOutlined />}>
                    Reject Application
                  </Button>
                </Space>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModernCompanyApprovals;
