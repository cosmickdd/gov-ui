import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Button, Table, Tag, Progress, Space, Typography, Avatar, Divider, List } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  TrophyOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  EnvironmentOutlined,
  BankOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const { Title, Text, Paragraph } = Typography;

const DashboardContainer = styled.div`
  .ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    border: 1px solid #f0f0f0;
    
    @media (min-width: 768px) {
      border-radius: 12px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.04);
    }
    
    &.stat-card {
      background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        @media (min-width: 768px) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }
      }
    }
    
    &.chart-card {
      height: 300px;
      
      @media (min-width: 768px) {
        height: 400px;
      }
      
      .ant-card-body {
        height: 100%;
        padding: 16px;
        
        @media (min-width: 768px) {
          padding: 24px;
        }
      }
    }
  }
  
  .metric-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 12px;
    
    @media (min-width: 768px) {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      font-size: 20px;
      margin-bottom: 16px;
    }
  }
  
  .activity-item {
    padding: 12px;
    border-radius: 6px;
    background: #fafafa;
    margin-bottom: 8px;
    border-left: 3px solid #1890ff;
    
    @media (min-width: 768px) {
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 12px;
      border-left: 4px solid #1890ff;
    }
    
    &:hover {
      background: #f0f2f5;
      transform: translateX(2px);
      transition: all 0.2s ease;
      
      @media (min-width: 768px) {
        transform: translateX(4px);
      }
    }
  }
`;

const stateData = [
  { state: 'Tamil Nadu', projects: 45, credits: 12500, value: '₹2.1Cr' },
  { state: 'Kerala', projects: 38, credits: 9800, value: '₹1.8Cr' },
  { state: 'Odisha', projects: 32, credits: 8200, value: '₹1.5Cr' },
  { state: 'West Bengal', projects: 28, credits: 7100, value: '₹1.3Cr' },
  { state: 'Gujarat', projects: 25, credits: 6500, value: '₹1.2Cr' },
  { state: 'Maharashtra', projects: 22, credits: 5800, value: '₹1.0Cr' },
];

const creditDistribution = [
  { name: 'Mangrove Restoration', value: 35, color: '#52c41a' },
  { name: 'Seagrass Conservation', value: 28, color: '#1890ff' },
  { name: 'Salt Marsh Protection', value: 22, color: '#722ed1' },
  { name: 'Coastal Wetlands', value: 15, color: '#fa8c16' },
];

const monthlyTrends = [
  { month: 'Jan', credits: 2800, projects: 12, companies: 45 },
  { month: 'Feb', credits: 3200, projects: 18, companies: 52 },
  { month: 'Mar', credits: 2950, projects: 15, companies: 48 },
  { month: 'Apr', credits: 3800, projects: 22, companies: 61 },
  { month: 'May', credits: 4200, projects: 28, companies: 69 },
  { month: 'Jun', credits: 3900, projects: 25, companies: 64 },
];

const recentActivities = [
  {
    id: 1,
    type: 'approval',
    title: 'Green Coast Ltd. - Registration Approved',
    description: 'Mangrove restoration project in Sundarbans',
    time: '2 hours ago',
    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    status: 'success'
  },
  {
    id: 2,
    type: 'verification',
    title: 'MRV Report Submitted',
    description: 'Quarterly verification for Tamil Nadu coastal project',
    time: '4 hours ago',
    icon: <FileTextOutlined style={{ color: '#1890ff' }} />,
    status: 'info'
  },
  {
    id: 3,
    type: 'credit',
    title: 'Carbon Credits Issued',
    description: '2,500 tCO2e credits minted for seagrass project',
    time: '6 hours ago',
    icon: <TrophyOutlined style={{ color: '#fa8c16' }} />,
    status: 'warning'
  },
  {
    id: 4,
    type: 'alert',
    title: 'Compliance Review Required',
    description: 'Annual audit due for 3 registered companies',
    time: '1 day ago',
    icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
    status: 'error'
  }
];

const topPerformers = [
  {
    id: 1,
    name: 'Coastal Dynamics Pvt Ltd',
    credits: 8500,
    projects: 12,
    compliance: 98,
    avatar: 'CD'
  },
  {
    id: 2,
    name: 'Blue Ocean Technologies',
    credits: 7200,
    projects: 9,
    compliance: 96,
    avatar: 'BO'
  },
  {
    id: 3,
    name: 'Marine Conservation Corp',
    credits: 6800,
    projects: 8,
    compliance: 94,
    avatar: 'MC'
  }
];

const ModernDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }> = ({ title, value, change, icon, color, subtitle }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="stat-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div className="metric-icon" style={{ backgroundColor: color }}>
              {icon}
            </div>
            <Statistic
              title={<Text style={{ fontSize: '14px', color: '#666' }}>{title}</Text>}
              value={value}
              valueStyle={{ 
                fontSize: '32px', 
                fontWeight: 700,
                color: '#1a1a1a'
              }}
              suffix={
                <span style={{ 
                  fontSize: '14px', 
                  color: change >= 0 ? '#52c41a' : '#ff4d4f',
                  fontWeight: 600,
                  marginLeft: '8px'
                }}>
                  {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {Math.abs(change)}%
                </span>
              }
            />
            {subtitle && (
              <Text style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                {subtitle}
              </Text>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <DashboardContainer>
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ margin: 0, color: '#1a1a1a', fontWeight: 700 }}>
          Dashboard Overview
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666', fontSize: '16px' }}>
          Real-time insights into India's Blue Carbon Registry ecosystem
        </Paragraph>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Companies"
            value="342"
            change={12.5}
            icon={<TeamOutlined />}
            color="#1890ff"
            subtitle="Active registrations"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Active Projects"
            value="168"
            change={8.3}
            icon={<EnvironmentOutlined />}
            color="#52c41a"
            subtitle="Across 6 states"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Carbon Credits"
            value="44.2K"
            change={15.7}
            icon={<TrophyOutlined />}
            color="#722ed1"
            subtitle="tCO2e issued"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Value"
            value="₹8.9Cr"
            change={22.1}
            icon={<BankOutlined />}
            color="#fa8c16"
            subtitle="Market valuation"
          />
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={16}>
          <Card 
            className="chart-card"
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Monthly Trends</span>
                <Space>
                  <Button 
                    size="small" 
                    type={selectedPeriod === 'month' ? 'primary' : 'default'}
                    onClick={() => setSelectedPeriod('month')}
                  >
                    Month
                  </Button>
                  <Button 
                    size="small" 
                    type={selectedPeriod === 'quarter' ? 'primary' : 'default'}
                    onClick={() => setSelectedPeriod('quarter')}
                  >
                    Quarter
                  </Button>
                </Space>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={monthlyTrends}>
                <defs>
                  <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1890ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="credits" 
                  stroke="#1890ff" 
                  strokeWidth={3}
                  fill="url(#creditGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            className="chart-card"
            title={
              <span style={{ fontSize: '18px', fontWeight: 600 }}>Credit Distribution</span>
            }
          >
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={creditDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {creditDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* State Performance and Activities */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card 
            title={
              <span style={{ fontSize: '18px', fontWeight: 600 }}>State-wise Performance</span>
            }
            extra={<Button type="text" icon={<EyeOutlined />}>View All</Button>}
          >
            <Table
              dataSource={stateData}
              pagination={false}
              size="middle"
              columns={[
                {
                  title: 'State',
                  dataIndex: 'state',
                  key: 'state',
                  render: (text) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                        {text.charAt(0)}
                      </Avatar>
                      <span style={{ fontWeight: 500 }}>{text}</span>
                    </div>
                  )
                },
                {
                  title: 'Projects',
                  dataIndex: 'projects',
                  key: 'projects',
                  align: 'center',
                  render: (value) => (
                    <Tag color="blue" style={{ fontWeight: 500 }}>{value}</Tag>
                  )
                },
                {
                  title: 'Credits (tCO2e)',
                  dataIndex: 'credits',
                  key: 'credits',
                  align: 'right',
                  render: (value) => (
                    <span style={{ fontWeight: 600, color: '#52c41a' }}>
                      {value.toLocaleString()}
                    </span>
                  )
                },
                {
                  title: 'Value',
                  dataIndex: 'value',
                  key: 'value',
                  align: 'right',
                  render: (value) => (
                    <span style={{ fontWeight: 600, color: '#fa8c16' }}>{value}</span>
                  )
                }
              ]}
              rowClassName="hover:bg-gray-50"
            />
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card 
            title={
              <span style={{ fontSize: '18px', fontWeight: 600 }}>Recent Activities</span>
            }
            extra={<Button type="text" icon={<MoreOutlined />} />}
            style={{ height: '100%' }}
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <List.Item style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <List.Item.Meta
                      avatar={
                        <div style={{ 
                          width: '40px', 
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}>
                          {item.icon}
                        </div>
                      }
                      title={
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a1a1a' }}>
                          {item.title}
                        </div>
                      }
                      description={
                        <div>
                          <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                            {item.description}
                          </div>
                          <div style={{ fontSize: '12px', color: '#999', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ClockCircleOutlined />
                            {item.time}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                </motion.div>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Additional Insights Row */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <span style={{ fontSize: '18px', fontWeight: 600 }}>Top Performing Companies</span>
            }
          >
            {topPerformers.map((company, index) => (
              <div key={company.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px 0',
                borderBottom: index < topPerformers.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <Avatar size={40} style={{ backgroundColor: '#1890ff', fontWeight: 600 }}>
                    {company.avatar}
                  </Avatar>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{company.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {company.credits.toLocaleString()} credits • {company.projects} projects
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Compliance</div>
                  <Progress 
                    percent={company.compliance} 
                    size="small" 
                    strokeColor="#52c41a"
                    style={{ width: '80px' }}
                  />
                </div>
              </div>
            ))}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={
              <span style={{ fontSize: '18px', fontWeight: 600 }}>System Health</span>
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Progress 
                    type="circle" 
                    percent={97} 
                    strokeColor="#52c41a"
                    size={80}
                  />
                  <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600 }}>
                    System Uptime
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Progress 
                    type="circle" 
                    percent={94} 
                    strokeColor="#1890ff"
                    size={80}
                  />
                  <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600 }}>
                    Compliance Rate
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>Last Updated</div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>2 minutes ago</div>
              </div>
              <Button type="primary" ghost size="small">
                View Details
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

export default ModernDashboard;