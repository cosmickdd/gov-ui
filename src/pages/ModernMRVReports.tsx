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
  Alert,
  Select,
  Input,
  DatePicker
} from 'antd';
import {
  FileTextOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  BarChartOutlined,
  GlobalOutlined,
  SafetyOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  
  &.stat-card .ant-card-body {
    padding: 20px;
  }
`;

const FilterSection = styled.div`
  background: #fafafa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #f0f0f0;
`;

// Mock data
const mockMRVReports = [
  {
    id: 1,
    projectName: 'Sundarbans Mangrove Restoration',
    reportId: 'MRV-2024-001',
    submissionDate: '2024-01-15',
    reportingPeriod: 'Q4 2023',
    status: 'verified',
    carbonSequestered: 2547.5,
    projectArea: 450.2,
    monitoringMethod: 'Satellite + Field Survey',
    verifier: 'Green Verify International',
    complianceScore: 94
  },
  {
    id: 2,
    projectName: 'Tamil Nadu Seagrass Conservation',
    reportId: 'MRV-2024-002',
    submissionDate: '2024-01-18',
    reportingPeriod: 'Q4 2023',
    status: 'pending',
    carbonSequestered: 1823.7,
    projectArea: 320.5,
    monitoringMethod: 'Field Survey + Drone',
    verifier: 'EcoVerify Solutions',
    complianceScore: 87
  },
  {
    id: 3,
    projectName: 'Gujarat Salt Marsh Protection',
    reportId: 'MRV-2024-003',
    submissionDate: '2024-01-20',
    reportingPeriod: 'Q4 2023',
    status: 'rejected',
    carbonSequestered: 0,
    projectArea: 275.8,
    monitoringMethod: 'Satellite Monitoring',
    verifier: 'Carbon Check Ltd',
    complianceScore: 65
  }
];

const anomalyData = [
  { month: 'Jan', expected: 45, actual: 42, threshold: 40 },
  { month: 'Feb', expected: 52, actual: 48, threshold: 45 },
  { month: 'Mar', expected: 48, actual: 35, threshold: 40 },
  { month: 'Apr', expected: 55, actual: 52, threshold: 45 },
  { month: 'May', expected: 58, actual: 61, threshold: 50 },
  { month: 'Jun', expected: 62, actual: 59, threshold: 55 }
];

const carbonTrendsData = [
  { month: 'Jan', sequestered: 2450, target: 2300 },
  { month: 'Feb', sequestered: 2680, target: 2500 },
  { month: 'Mar', sequestered: 2120, target: 2400 },
  { month: 'Apr', sequestered: 2890, target: 2600 },
  { month: 'May', sequestered: 3150, target: 2800 },
  { month: 'Jun', sequestered: 3420, target: 3000 }
];

const statusDistribution = [
  { name: 'Verified', value: 65, color: '#52c41a' },
  { name: 'Pending', value: 25, color: '#fa8c16' },
  { name: 'Rejected', value: 10, color: '#ff4d4f' }
];

const MRVReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState(mockMRVReports[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [filteredReports, setFilteredReports] = useState(mockMRVReports);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'verified':
        return <Tag color="success" icon={<CheckCircleOutlined />}>Verified</Tag>;
      case 'pending':
        return <Tag color="processing" icon={<ExclamationCircleOutlined />}>Pending Review</Tag>;
      case 'rejected':
        return <Tag color="error" icon={<CloseCircleOutlined />}>Rejected</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterReports(value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    filterReports(searchText, value);
  };

  const filterReports = (search: string, status: string) => {
    let filtered = mockMRVReports;

    if (search) {
      filtered = filtered.filter(report =>
        report.projectName.toLowerCase().includes(search.toLowerCase()) ||
        report.reportId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(report => report.status === status);
    }

    setFilteredReports(filtered);
  };

  const getStats = () => {
    return {
      total: mockMRVReports.length,
      verified: mockMRVReports.filter(r => r.status === 'verified').length,
      pending: mockMRVReports.filter(r => r.status === 'pending').length,
      totalCarbon: mockMRVReports.reduce((sum, r) => sum + r.carbonSequestered, 0),
      averageCompliance: Math.round(mockMRVReports.reduce((sum, r) => sum + r.complianceScore, 0) / mockMRVReports.length)
    };
  };

  const stats = getStats();

  const columns = [
    {
      title: 'Project Details',
      key: 'project',
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{record.projectName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.reportId} • {record.reportingPeriod}
          </div>
        </div>
      )
    },
    {
      title: 'Carbon Sequestered',
      key: 'carbon',
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.carbonSequestered.toLocaleString()} tCO2e</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.projectArea} hectares</div>
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => getStatusTag(record.status)
    },
    {
      title: 'Compliance Score',
      key: 'compliance',
      render: (record: any) => (
        <div style={{ width: '100px' }}>
          <Progress 
            percent={record.complianceScore} 
            size="small"
            strokeColor={record.complianceScore > 80 ? '#52c41a' : record.complianceScore > 60 ? '#fa8c16' : '#ff4d4f'}
          />
          <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '4px' }}>
            {record.complianceScore}%
          </div>
        </div>
      )
    },
    {
      title: 'Verifier',
      dataIndex: 'verifier',
      key: 'verifier',
      render: (verifier: string) => (
        <div style={{ fontSize: '12px' }}>{verifier}</div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} onClick={() => setSelectedReport(record)} />
          <Button type="text" icon={<DownloadOutlined />} />
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          MRV Reports
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Measurement, Reporting & Verification of blue carbon projects
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
                    title="Total Reports"
                    value={stats.total}
                    prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
                    valueStyle={{ color: '#1890ff', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Verified Reports"
                    value={stats.verified}
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
                    title="Total Carbon Sequestered"
                    value={stats.totalCarbon}
                    suffix="tCO2e"
                    prefix={<GlobalOutlined style={{ color: '#13c2c2' }} />}
                    valueStyle={{ color: '#13c2c2', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Avg Compliance"
                    value={stats.averageCompliance}
                    suffix="%"
                    prefix={<SafetyOutlined style={{ color: '#722ed1' }} />}
                    valueStyle={{ color: '#722ed1', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} lg={16}>
              <StyledCard title="Carbon Sequestration Trends">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={carbonTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sequestered" stroke="#1890ff" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#52c41a" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </StyledCard>
            </Col>
            <Col xs={24} lg={8}>
              <StyledCard title="Report Status Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </StyledCard>
            </Col>
          </Row>

          <StyledCard title="Anomaly Detection">
            <Alert
              message="2 anomalies detected in recent monitoring data"
              description="March readings show significant deviation from expected values. Investigation recommended."
              type="warning"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="expected" fill="#1890ff" name="Expected" />
                <Bar dataKey="actual" fill="#fa8c16" name="Actual" />
                <Bar dataKey="threshold" fill="#ff4d4f" name="Threshold" />
              </BarChart>
            </ResponsiveContainer>
          </StyledCard>
        </TabPane>

        <TabPane tab="Reports List" key="reports">
          {/* Filters */}
          <FilterSection>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8} lg={6}>
                <Input
                  placeholder="Search reports..."
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
                  <Select.Option value="verified">Verified</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="rejected">Rejected</Select.Option>
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
                  <Button type="primary" icon={<FileTextOutlined />}>
                    Generate Report
                  </Button>
                </Space>
              </Col>
            </Row>
          </FilterSection>

          <StyledCard>
            <Table
              dataSource={filteredReports}
              columns={columns}
              rowKey="id"
              pagination={{
                total: filteredReports.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} reports`
              }}
            />
          </StyledCard>
        </TabPane>

        <TabPane tab="Report Details" key="details">
          {selectedReport && (
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <StyledCard title={`Report Details - ${selectedReport.reportId}`}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Project Name:</Text>
                        <div>{selectedReport.projectName}</div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Report ID:</Text>
                        <div>{selectedReport.reportId}</div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Reporting Period:</Text>
                        <div>{selectedReport.reportingPeriod}</div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Submission Date:</Text>
                        <div>{selectedReport.submissionDate}</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Status:</Text>
                        <div style={{ marginTop: '4px' }}>{getStatusTag(selectedReport.status)}</div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Carbon Sequestered:</Text>
                        <div>{selectedReport.carbonSequestered.toLocaleString()} tCO2e</div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Project Area:</Text>
                        <div>{selectedReport.projectArea} hectares</div>
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <Text strong>Monitoring Method:</Text>
                        <div>{selectedReport.monitoringMethod}</div>
                      </div>
                    </Col>
                  </Row>
                </StyledCard>
              </Col>
              <Col xs={24} lg={8}>
                <StyledCard title="Actions">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="primary" icon={<DownloadOutlined />} block>
                      Download Full Report
                    </Button>
                    <Button icon={<EyeOutlined />} block>
                      View Satellite Data
                    </Button>
                    <Button icon={<CameraOutlined />} block>
                      Field Photos
                    </Button>
                    <Button icon={<BarChartOutlined />} block>
                      Analytics Dashboard
                    </Button>
                  </Space>
                </StyledCard>
              </Col>
            </Row>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MRVReports;