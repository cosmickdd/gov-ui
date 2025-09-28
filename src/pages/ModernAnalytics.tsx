import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Button,
  Select,
  DatePicker,
  Space,
  Typography,
  Progress,
  Table,
  Tag,


  Dropdown
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  TrophyOutlined,

  CaretUpOutlined,
  CaretDownOutlined,
  DownloadOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  ShareAltOutlined,

  GlobalOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,

  AreaChartOutlined
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  Area,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,

} from 'recharts';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const { RangePicker } = DatePicker;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
  
  .ant-card-head-title {
    font-weight: 600;
    font-size: 16px;
  }
`;

const MetricCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
  }
  
  .metric-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    
    &.carbon {
      background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
      color: white;
    }
    
    &.projects {
      background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
      color: white;
    }
    
    &.compliance {
      background: linear-gradient(135deg, #722ed1 0%, #9254de 100%);
      color: white;
    }
    
    &.revenue {
      background: linear-gradient(135deg, #fa8c16 0%, #ffa940 100%);
      color: white;
    }
  }
`;

// Mock data
const overviewStats = {
  totalCarbonCredits: 2847569,
  totalProjects: 248,
  complianceRate: 94.7,
  totalRevenue: 18950000,
  monthlyGrowth: 12.3,
  avgCreditPrice: 89.75
};

const carbonTrendsData = [
  { month: 'Jan', credits: 235000, sequestration: 189000, trading: 46000 },
  { month: 'Feb', credits: 267000, sequestration: 215000, trading: 52000 },
  { month: 'Mar', credits: 298000, sequestration: 241000, trading: 57000 },
  { month: 'Apr', credits: 324000, sequestration: 267000, trading: 57000 },
  { month: 'May', credits: 356000, sequestration: 289000, trading: 67000 },
  { month: 'Jun', credits: 389000, sequestration: 312000, trading: 77000 },
  { month: 'Jul', credits: 425000, sequestration: 338000, trading: 87000 },
  { month: 'Aug', credits: 467000, sequestration: 367000, trading: 100000 }
];

const projectDistribution = [
  { name: 'Mangrove Restoration', value: 85, color: '#52c41a' },
  { name: 'Seagrass Conservation', value: 72, color: '#1890ff' },
  { name: 'Coral Reef Protection', value: 48, color: '#722ed1' },
  { name: 'Salt Marsh Recovery', value: 31, color: '#fa8c16' },
  { name: 'Other Marine Projects', value: 12, color: '#13c2c2' }
];

const performanceData = [
  { metric: 'Carbon Sequestration Rate', current: 94.2, target: 85.0, unit: '%' },
  { metric: 'Project Completion Rate', current: 78.5, target: 80.0, unit: '%' },
  { metric: 'Compliance Score', current: 96.8, target: 95.0, unit: '%' },
  { metric: 'Stakeholder Satisfaction', current: 88.9, target: 85.0, unit: '%' },
  { metric: 'Cost Efficiency', current: 76.3, target: 75.0, unit: '%' }
];

const topPerformingProjects = [
  {
    id: 1,
    name: 'Sundarbans Mangrove Initiative',
    location: 'West Bengal, India',
    credits: 125000,
    growth: 18.5,
    status: 'active',
    completion: 87
  },
  {
    id: 2,
    name: 'Tamil Nadu Seagrass Project',
    location: 'Tamil Nadu, India',
    credits: 98500,
    growth: 15.2,
    status: 'active',
    completion: 92
  },
  {
    id: 3,
    name: 'Kerala Backwater Conservation',
    location: 'Kerala, India',
    credits: 87300,
    growth: 12.8,
    status: 'active',
    completion: 78
  },
  {
    id: 4,
    name: 'Gujarat Salt Marsh Recovery',
    location: 'Gujarat, India',
    credits: 76200,
    growth: -2.1,
    status: 'review',
    completion: 65
  },
  {
    id: 5,
    name: 'Odisha Coastal Restoration',
    location: 'Odisha, India',
    credits: 69800,
    growth: 9.4,
    status: 'active',
    completion: 71
  }
];

const revenueData = [
  { month: 'Jan', revenue: 1850000, credits: 21500, avgPrice: 86.05 },
  { month: 'Feb', revenue: 2120000, credits: 24800, avgPrice: 85.48 },
  { month: 'Mar', revenue: 2380000, credits: 27200, avgPrice: 87.50 },
  { month: 'Apr', revenue: 2650000, credits: 29800, avgPrice: 88.93 },
  { month: 'May', revenue: 2920000, credits: 32100, avgPrice: 90.97 },
  { month: 'Jun', revenue: 3180000, credits: 35400, avgPrice: 89.83 },
  { month: 'Jul', revenue: 3480000, credits: 38700, avgPrice: 89.92 },
  { month: 'Aug', revenue: 3750000, credits: 41800, avgPrice: 89.71 }
];

const Analytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [dateRange, setDateRange] = useState<any>([dayjs().subtract(30, 'days'), dayjs()]);

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? 
      <CaretUpOutlined style={{ color: '#52c41a' }} /> : 
      <CaretDownOutlined style={{ color: '#ff4d4f' }} />;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? '#52c41a' : '#ff4d4f';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'review': return 'orange';
      case 'completed': return 'blue';
      default: return 'default';
    }
  };

  const projectColumns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{text}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.location}</Text>
        </div>
      ),
    },
    {
      title: 'Credits Generated',
      dataIndex: 'credits',
      key: 'credits',
      render: (credits: number) => (
        <Text strong>{credits.toLocaleString()}</Text>
      ),
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth: number) => (
        <span style={{ color: getGrowthColor(growth), fontWeight: 600 }}>
          {getGrowthIcon(growth)} {Math.abs(growth)}%
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Completion',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion: number) => (
        <Progress percent={completion} size="small" />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small">
            View
          </Button>
          <Dropdown
            menu={{
              items: [
                { key: 'details', label: 'View Details', icon: <EyeOutlined /> },
                { key: 'export', label: 'Export Data', icon: <DownloadOutlined /> },
                { key: 'share', label: 'Share Report', icon: <ShareAltOutlined /> }
              ]
            }}
          >
            <Button type="text" size="small">More</Button>
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
          Analytics Dashboard
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Comprehensive insights and performance metrics for blue carbon projects
        </Paragraph>
      </div>

      {/* Controls */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8}>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
          />
        </Col>
        <Col xs={24} sm={4}>
          <Select
            value={selectedTimeRange}
            onChange={setSelectedTimeRange}
            style={{ width: '100%' }}
            options={[
              { value: 'week', label: 'Last 7 days' },
              { value: 'month', label: 'Last 30 days' },
              { value: 'quarter', label: 'Last 3 months' },
              { value: 'year', label: 'Last 12 months' }
            ]}
          />
        </Col>
        <Col xs={24} sm={4}>
          <Select
            value={selectedMetric}
            onChange={setSelectedMetric}
            style={{ width: '100%' }}
            options={[
              { value: 'overview', label: 'Overview' },
              { value: 'projects', label: 'Projects' },
              { value: 'financial', label: 'Financial' },
              { value: 'environmental', label: 'Environmental' }
            ]}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Space style={{ float: 'right' }}>
            <Button icon={<FilterOutlined />}>Advanced Filters</Button>
            <Button icon={<DownloadOutlined />}>Export Report</Button>
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <MetricCard>
              <div className="metric-icon carbon">
                <EnvironmentOutlined style={{ fontSize: '24px' }} />
              </div>
              <Statistic
                title="Total Carbon Credits"
                value={overviewStats.totalCarbonCredits}
                precision={0}
                suffix="tCO₂"
                valueStyle={{ fontWeight: 700, fontSize: '20px' }}
              />
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                <CaretUpOutlined style={{ color: '#52c41a', marginRight: '4px' }} />
                <Text style={{ color: '#52c41a', fontSize: '12px' }}>+{overviewStats.monthlyGrowth}% this month</Text>
              </div>
            </MetricCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <MetricCard>
              <div className="metric-icon projects">
                <GlobalOutlined style={{ fontSize: '24px' }} />
              </div>
              <Statistic
                title="Active Projects"
                value={overviewStats.totalProjects}
                precision={0}
                valueStyle={{ fontWeight: 700, fontSize: '20px' }}
              />
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutlined style={{ color: '#1890ff', marginRight: '4px' }} />
                <Text style={{ color: '#1890ff', fontSize: '12px' }}>12 new this quarter</Text>
              </div>
            </MetricCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <MetricCard>
              <div className="metric-icon compliance">
                <ThunderboltOutlined style={{ fontSize: '24px' }} />
              </div>
              <Statistic
                title="Compliance Rate"
                value={overviewStats.complianceRate}
                precision={1}
                suffix="%"
                valueStyle={{ fontWeight: 700, fontSize: '20px' }}
              />
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                <CaretUpOutlined style={{ color: '#52c41a', marginRight: '4px' }} />
                <Text style={{ color: '#52c41a', fontSize: '12px' }}>+2.1% improvement</Text>
              </div>
            </MetricCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <MetricCard>
              <div className="metric-icon revenue">
                <TrophyOutlined style={{ fontSize: '24px' }} />
              </div>
              <Statistic
                title="Total Revenue"
                value={overviewStats.totalRevenue}
                precision={0}
                prefix="₹"
                valueStyle={{ fontWeight: 700, fontSize: '20px' }}
              />
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                <CaretUpOutlined style={{ color: '#52c41a', marginRight: '4px' }} />
                <Text style={{ color: '#52c41a', fontSize: '12px' }}>+18.5% YoY growth</Text>
              </div>
            </MetricCard>
          </motion.div>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <StyledCard title="Carbon Credits Trend Analysis" extra={<Button type="link" icon={<AreaChartOutlined />}>View Details</Button>}>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={carbonTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="credits" 
                  fill="url(#colorGradient)" 
                  stroke="#1890ff" 
                  strokeWidth={2}
                  name="Total Credits"
                />
                <Bar dataKey="sequestration" fill="#52c41a" name="Sequestration" />
                <Bar dataKey="trading" fill="#fa8c16" name="Trading" />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1890ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </StyledCard>
        </Col>
        <Col xs={24} lg={8}>
          <StyledCard title="Project Distribution" extra={<Button type="link" icon={<PieChartOutlined />}>View All</Button>}>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={projectDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </StyledCard>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <StyledCard title="Performance vs Targets" extra={<Button type="link">View KPIs</Button>}>
            <div style={{ padding: '20px 0' }}>
              {performanceData.map((item, index) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text strong>{item.metric}</Text>
                    <Text style={{ color: item.current >= item.target ? '#52c41a' : '#fa8c16' }}>
                      {item.current}{item.unit} / {item.target}{item.unit}
                    </Text>
                  </div>
                  <Progress 
                    percent={(item.current / item.target) * 100} 
                    strokeColor={item.current >= item.target ? '#52c41a' : '#fa8c16'}
                    showInfo={false}
                  />
                </div>
              ))}
            </div>
          </StyledCard>
        </Col>
        <Col xs={24} lg={12}>
          <StyledCard title="Revenue Analysis" extra={<Button type="link" icon={<LineChartOutlined />}>Financial Report</Button>}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #d9d9d9', 
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#fa8c16" 
                  strokeWidth={3}
                  dot={{ fill: '#fa8c16', strokeWidth: 2, r: 4 }}
                  name="Revenue (₹)"
                />
                <Line 
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="#722ed1" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Avg Price (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </StyledCard>
        </Col>
      </Row>

      {/* Top Performing Projects */}
      <StyledCard 
        title="Top Performing Projects" 
        extra={
          <Space>
            <Button type="link" icon={<BarChartOutlined />}>View All Projects</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </Space>
        }
      >
        <Table
          columns={projectColumns}
          dataSource={topPerformingProjects}
          pagination={false}
          size="middle"
          rowKey="id"
        />
      </StyledCard>
    </div>
  );
};

export default Analytics;