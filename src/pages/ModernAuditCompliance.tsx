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
  Progress,
  Select,
  Input,
  DatePicker,
  Timeline,
  Avatar,
  Tooltip,
  Alert,
  Steps,
  Descriptions,
  Modal,
  Drawer,
  Upload,
  Form,
  Radio
} from 'antd';
import {
  SafetyCertificateOutlined,
  FileProtectOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  DownloadOutlined,
  FileTextOutlined,
  AuditOutlined,
  CalendarOutlined,
  UserOutlined,
  UploadOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  
  &.stat-card .ant-card-body {
    padding: 16px;
    
    @media (min-width: 768px) {
      padding: 20px;
    }
  }

  /* Mobile responsiveness */
  @media (max-width: 767px) {
    margin-bottom: 12px;
    
    .ant-card-body {
      padding: 12px !important;
    }
    
    .ant-card-head {
      padding: 0 12px;
      min-height: 48px;
    }
    
    .ant-card-head-title {
      font-size: 16px;
      padding: 8px 0;
    }
  }
  
  &.audit-card {
    border-left: 4px solid #1890ff;
    
    &.critical {
      border-left-color: #ff4d4f;
    }
    
    &.warning {
      border-left-color: #faad14;
    }
    
    &.success {
      border-left-color: #52c41a;
    }
  }
`;

const FilterSection = styled.div`
  background: #fafafa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;
`;

const ComplianceCard = styled(Card)`
  .compliance-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .score-circle {
    text-align: center;
    
    .score {
      font-size: 32px;
      font-weight: 700;
      margin: 8px 0;
    }
    
    &.excellent .score { color: #52c41a; }
    &.good .score { color: #1890ff; }
    &.warning .score { color: #faad14; }
    &.critical .score { color: #ff4d4f; }
  }
`;

// Mock data
const mockAudits = [
  {
    id: 1,
    title: 'Q4 2023 Blue Carbon Compliance Audit',
    auditId: 'AUD-2024-001',
    type: 'Compliance',
    status: 'completed',
    priority: 'high',
    auditor: 'Maria Santos',
    startDate: '2024-01-15',
    endDate: '2024-01-25',
    complianceScore: 92,
    findings: 3,
    criticalIssues: 0,
    recommendations: 5,
    location: 'Sundarbans Project',
    standard: 'VCS v4.0'
  },
  {
    id: 2,
    title: 'Environmental Impact Assessment',
    auditId: 'AUD-2024-002',
    type: 'Environmental',
    status: 'in-progress',
    priority: 'medium',
    auditor: 'Dr. Raj Patel',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    complianceScore: null,
    findings: null,
    criticalIssues: null,
    recommendations: null,
    location: 'Tamil Nadu Seagrass',
    standard: 'Gold Standard'
  },
  {
    id: 3,
    title: 'Financial Audit - Carbon Credits',
    auditId: 'AUD-2024-003',
    type: 'Financial',
    status: 'scheduled',
    priority: 'low',
    auditor: 'Alex Johnson',
    startDate: '2024-02-20',
    endDate: '2024-03-05',
    complianceScore: null,
    findings: null,
    criticalIssues: null,
    recommendations: null,
    location: 'Gujarat Salt Marsh',
    standard: 'VCS v4.0'
  }
];

const complianceData = [
  { month: 'Jan', score: 88, target: 90 },
  { month: 'Feb', score: 91, target: 90 },
  { month: 'Mar', score: 89, target: 90 },
  { month: 'Apr', score: 93, target: 90 },
  { month: 'May', score: 95, target: 90 },
  { month: 'Jun', score: 92, target: 90 }
];

const auditTypeDistribution = [
  { name: 'Compliance', value: 45, color: '#1890ff' },
  { name: 'Environmental', value: 30, color: '#52c41a' },
  { name: 'Financial', value: 15, color: '#faad14' },
  { name: 'Technical', value: 10, color: '#722ed1' }
];

const timelineData = [
  {
    title: 'Compliance Audit Completed',
    description: 'Q4 2023 Blue Carbon Compliance Audit successfully completed with 92% score',
    time: '2024-01-25',
    status: 'success',
    auditor: 'Maria Santos'
  },
  {
    title: 'Environmental Assessment Started',
    description: 'Environmental Impact Assessment initiated for Tamil Nadu Seagrass project',
    time: '2024-02-01',
    status: 'processing',
    auditor: 'Dr. Raj Patel'
  },
  {
    title: 'Financial Audit Scheduled',
    description: 'Financial audit for carbon credits scheduled for Gujarat Salt Marsh project',
    time: '2024-02-20',
    status: 'default',
    auditor: 'Alex Johnson'
  }
];

const AuditCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filteredAudits, setFilteredAudits] = useState(mockAudits);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return <Tag color="success" icon={<CheckCircleOutlined />}>Completed</Tag>;
      case 'in-progress':
        return <Tag color="processing" icon={<ClockCircleOutlined />}>In Progress</Tag>;
      case 'scheduled':
        return <Tag color="default" icon={<CalendarOutlined />}>Scheduled</Tag>;
      case 'overdue':
        return <Tag color="error" icon={<ExclamationCircleOutlined />}>Overdue</Tag>;
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

  const getComplianceLevel = (score: number | null) => {
    if (score === null) return { level: 'pending', color: '#d9d9d9', text: 'Pending' };
    if (score >= 95) return { level: 'excellent', color: '#52c41a', text: 'Excellent' };
    if (score >= 85) return { level: 'good', color: '#1890ff', text: 'Good' };
    if (score >= 70) return { level: 'warning', color: '#faad14', text: 'Needs Improvement' };
    return { level: 'critical', color: '#ff4d4f', text: 'Critical' };
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterAudits(value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    filterAudits(searchText, value);
  };

  const filterAudits = (search: string, status: string) => {
    let filtered = mockAudits;

    if (search) {
      filtered = filtered.filter(audit =>
        audit.title.toLowerCase().includes(search.toLowerCase()) ||
        audit.auditId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(audit => audit.status === status);
    }

    setFilteredAudits(filtered);
  };

  const getStats = () => {
    const completed = mockAudits.filter(a => a.status === 'completed');
    const avgScore = completed.length > 0 
      ? completed.reduce((sum, a) => sum + (a.complianceScore || 0), 0) / completed.length 
      : 0;
    
    return {
      totalAudits: mockAudits.length,
      completedAudits: completed.length,
      inProgress: mockAudits.filter(a => a.status === 'in-progress').length,
      averageScore: avgScore.toFixed(1),
      criticalIssues: mockAudits.reduce((sum, a) => sum + (a.criticalIssues || 0), 0),
      totalFindings: mockAudits.reduce((sum, a) => sum + (a.findings || 0), 0)
    };
  };

  const stats = getStats();

  const columns = [
    {
      title: 'Audit Details',
      key: 'audit',
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AuditOutlined />} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{record.title}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.auditId} • {record.type} Audit
            </div>
          </div>
        </div>
      ),
      width: 300
    },
    {
      title: 'Status & Priority',
      key: 'status',
      render: (record: any) => (
        <div>
          {getStatusTag(record.status)}
          <div style={{ marginTop: '4px' }}>
            {getPriorityTag(record.priority)}
          </div>
        </div>
      )
    },
    {
      title: 'Auditor',
      key: 'auditor',
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <span>{record.auditor}</span>
        </div>
      )
    },
    {
      title: 'Compliance Score',
      key: 'score',
      render: (record: any) => {
        const level = getComplianceLevel(record.complianceScore);
        return record.complianceScore ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: level.color }}>
              {record.complianceScore}%
            </div>
            <div style={{ fontSize: '12px', color: level.color }}>
              {level.text}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#999' }}>
            <ClockCircleOutlined />
            <div style={{ fontSize: '12px' }}>Pending</div>
          </div>
        );
      }
    },
    {
      title: 'Timeline',
      key: 'timeline',
      render: (record: any) => (
        <div>
          <div style={{ fontSize: '12px', color: '#666' }}>Start: {record.startDate}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>End: {record.endDate}</div>
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
                setSelectedAudit(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Download Report">
            <Button type="text" icon={<DownloadOutlined />} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Audit & Compliance
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Comprehensive audit tracking and compliance monitoring system
        </Paragraph>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" size="large">
        <TabPane tab="Overview" key="overview">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Total Audits"
                    value={stats.totalAudits}
                    prefix={<AuditOutlined style={{ color: '#1890ff' }} />}
                    valueStyle={{ color: '#1890ff', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Completed"
                    value={stats.completedAudits}
                    prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    valueStyle={{ color: '#52c41a', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Average Score"
                    value={stats.averageScore}
                    suffix="%"
                    prefix={<SafetyCertificateOutlined style={{ color: '#722ed1' }} />}
                    valueStyle={{ color: '#722ed1', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Critical Issues"
                    value={stats.criticalIssues}
                    prefix={<AlertOutlined style={{ color: '#ff4d4f' }} />}
                    valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
          </Row>

          {/* Compliance Trend and Distribution */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} lg={16}>
              <StyledCard title="Compliance Score Trend">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="score" stroke="#1890ff" strokeWidth={3} />
                    <Line type="monotone" dataKey="target" stroke="#ff4d4f" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </StyledCard>
            </Col>
            <Col xs={24} lg={8}>
              <StyledCard title="Audit Type Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={auditTypeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {auditTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </StyledCard>
            </Col>
          </Row>

          {/* Recent Activity Timeline */}
          <StyledCard title="Recent Audit Activity">
            <Timeline>
              {timelineData.map((item, index) => (
                <Timeline.Item 
                  key={index}
                  color={
                    item.status === 'success' ? 'green' : 
                    item.status === 'processing' ? 'blue' : 'gray'
                  }
                >
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>{item.title}</Text>
                    <Text style={{ float: 'right', color: '#666', fontSize: '12px' }}>
                      {item.time}
                    </Text>
                  </div>
                  <div style={{ marginBottom: '4px', color: '#666' }}>
                    {item.description}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    Auditor: {item.auditor}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </StyledCard>
        </TabPane>

        <TabPane tab="Audit Management" key="audits">
          {/* Filters */}
          <FilterSection>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8} lg={6}>
                <Input
                  placeholder="Search audits..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={8} lg={4}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Status"
                  value={statusFilter}
                  onChange={handleStatusFilter}
                >
                  <Select.Option value="all">All Status</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                  <Select.Option value="in-progress">In Progress</Select.Option>
                  <Select.Option value="scheduled">Scheduled</Select.Option>
                </Select>
              </Col>
              <Col xs={24} sm={8} lg={6}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
              <Col xs={24} sm={24} lg={8}>
                <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
                  <Button icon={<FilterOutlined />}>Advanced Filters</Button>
                  <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
                    Refresh
                  </Button>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDrawerVisible(true)}>
                    Schedule Audit
                  </Button>
                </Space>
              </Col>
            </Row>
          </FilterSection>

          <StyledCard>
            <Table
              dataSource={filteredAudits}
              columns={columns}
              rowKey="id"
              scroll={{ x: 800 }}
              pagination={{
                total: filteredAudits.length,
                pageSize: 10,
                showSizeChanger: false,
                showQuickJumper: true,
                responsive: true,
                showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} audits`
              }}
            />
          </StyledCard>
        </TabPane>

        <TabPane tab="Compliance Dashboard" key="compliance">
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={8}>
              <ComplianceCard>
                <div className="compliance-header">
                  <Title level={4}>Overall Compliance</Title>
                  <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                </div>
                <div className="score-circle excellent">
                  <div className="score">92%</div>
                  <Text>Excellent</Text>
                </div>
                <Progress percent={92} strokeColor="#52c41a" />
              </ComplianceCard>
            </Col>
            <Col xs={24} sm={8}>
              <ComplianceCard>
                <div className="compliance-header">
                  <Title level={4}>Environmental</Title>
                  <FileProtectOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                </div>
                <div className="score-circle good">
                  <div className="score">89%</div>
                  <Text>Good</Text>
                </div>
                <Progress percent={89} strokeColor="#1890ff" />
              </ComplianceCard>
            </Col>
            <Col xs={24} sm={8}>
              <ComplianceCard>
                <div className="compliance-header">
                  <Title level={4}>Financial</Title>
                  <FileTextOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                </div>
                <div className="score-circle warning">
                  <div className="score">78%</div>
                  <Text>Needs Improvement</Text>
                </div>
                <Progress percent={78} strokeColor="#faad14" />
              </ComplianceCard>
            </Col>
          </Row>

          <Alert
            message="Compliance Status"
            description="All projects are meeting regulatory requirements. Regular monitoring continues."
            type="success"
            showIcon
            style={{ marginBottom: '20px' }}
          />

          <StyledCard title="Compliance Requirements Checklist">
            <Steps direction="vertical" current={3}>
              <Step
                status="finish"
                title="Environmental Impact Assessment"
                description="All environmental requirements documented and approved"
                icon={<CheckCircleOutlined />}
              />
              <Step
                status="finish"
                title="Carbon Credit Verification"
                description="Credits verified according to VCS v4.0 standards"
                icon={<CheckCircleOutlined />}
              />
              <Step
                status="finish"
                title="Financial Audit"
                description="Financial records audited and compliance confirmed"
                icon={<CheckCircleOutlined />}
              />
              <Step
                status="process"
                title="Annual Review"
                description="Annual compliance review in progress"
                icon={<ClockCircleOutlined />}
              />
            </Steps>
          </StyledCard>
        </TabPane>
      </Tabs>

      {/* Audit Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AuditOutlined />} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedAudit?.title}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{selectedAudit?.auditId}</div>
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
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            Download Report
          </Button>
        ]}
      >
        {selectedAudit && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Audit Type">{selectedAudit.type}</Descriptions.Item>
            <Descriptions.Item label="Status">{getStatusTag(selectedAudit.status)}</Descriptions.Item>
            <Descriptions.Item label="Priority">{getPriorityTag(selectedAudit.priority)}</Descriptions.Item>
            <Descriptions.Item label="Auditor">{selectedAudit.auditor}</Descriptions.Item>
            <Descriptions.Item label="Start Date">{selectedAudit.startDate}</Descriptions.Item>
            <Descriptions.Item label="End Date">{selectedAudit.endDate}</Descriptions.Item>
            <Descriptions.Item label="Location">{selectedAudit.location}</Descriptions.Item>
            <Descriptions.Item label="Standard">{selectedAudit.standard}</Descriptions.Item>
            {selectedAudit.complianceScore && (
              <>
                <Descriptions.Item label="Compliance Score">{selectedAudit.complianceScore}%</Descriptions.Item>
                <Descriptions.Item label="Findings">{selectedAudit.findings}</Descriptions.Item>
                <Descriptions.Item label="Critical Issues">{selectedAudit.criticalIssues}</Descriptions.Item>
                <Descriptions.Item label="Recommendations">{selectedAudit.recommendations}</Descriptions.Item>
              </>
            )}
          </Descriptions>
        )}
      </Modal>

      {/* Schedule Audit Drawer */}
      <Drawer
        title="Schedule New Audit"
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        width={480}
      >
        <Form layout="vertical">
          <Form.Item label="Audit Title" required>
            <Input placeholder="Enter audit title" />
          </Form.Item>
          <Form.Item label="Audit Type" required>
            <Select placeholder="Select audit type">
              <Select.Option value="compliance">Compliance</Select.Option>
              <Select.Option value="environmental">Environmental</Select.Option>
              <Select.Option value="financial">Financial</Select.Option>
              <Select.Option value="technical">Technical</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Priority" required>
            <Radio.Group>
              <Radio value="high">High</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="low">Low</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Auditor" required>
            <Select placeholder="Select auditor">
              <Select.Option value="maria">Maria Santos</Select.Option>
              <Select.Option value="raj">Dr. Raj Patel</Select.Option>
              <Select.Option value="alex">Alex Johnson</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date Range" required>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Location" required>
            <Select placeholder="Select project location">
              <Select.Option value="sundarbans">Sundarbans Project</Select.Option>
              <Select.Option value="tamilnadu">Tamil Nadu Seagrass</Select.Option>
              <Select.Option value="gujarat">Gujarat Salt Marsh</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Documents">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Documents</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
              <Button type="primary">Schedule Audit</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AuditCompliance;