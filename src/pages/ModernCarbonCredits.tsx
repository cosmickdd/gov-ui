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
  Modal,
  Badge,
  Avatar,
  Tooltip,
  Alert
} from 'antd';
import {
  GoldOutlined,
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  TransactionOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
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
  
  &.credit-card {
    border-left: 4px solid #1890ff;
    
    &.premium {
      border-left-color: #722ed1;
    }
    
    &.gold {
      border-left-color: #faad14;
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

const PriceCard = styled(Card)`
  text-align: center;
  border-radius: 12px;
  
  .price {
    font-size: 24px;
    font-weight: 700;
    color: #1890ff;
    margin: 8px 0;
  }
  
  .change {
    font-size: 14px;
    font-weight: 500;
    
    &.positive {
      color: #52c41a;
    }
    
    &.negative {
      color: #ff4d4f;
    }
  }
`;

// Mock data
const mockCarbonCredits = [
  {
    id: 1,
    projectName: 'Sundarbans Mangrove Restoration',
    creditId: 'CC-2024-001',
    totalCredits: 12500,
    availableCredits: 8500,
    pricePerCredit: 45.50,
    projectType: 'Mangrove Restoration',
    location: 'West Bengal, India',
    vintage: 2023,
    standard: 'VCS',
    status: 'active',
    rating: 'AA+',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15'
  },
  {
    id: 2,
    projectName: 'Tamil Nadu Seagrass Conservation',
    creditId: 'CC-2024-002',
    totalCredits: 9200,
    availableCredits: 9200,
    pricePerCredit: 52.75,
    projectType: 'Seagrass Conservation',
    location: 'Tamil Nadu, India',
    vintage: 2023,
    standard: 'Gold Standard',
    status: 'active',
    rating: 'AAA',
    issueDate: '2024-01-18',
    expiryDate: '2026-01-18'
  },
  {
    id: 3,
    projectName: 'Gujarat Salt Marsh Protection',
    creditId: 'CC-2024-003',
    totalCredits: 15600,
    availableCredits: 12800,
    pricePerCredit: 38.25,
    projectType: 'Salt Marsh Protection',
    location: 'Gujarat, India',
    vintage: 2023,
    standard: 'VCS',
    status: 'active',
    rating: 'A+',
    issueDate: '2024-01-20',
    expiryDate: '2026-01-20'
  }
];

const priceHistoryData = [
  { month: 'Jan', price: 42.50, volume: 1250 },
  { month: 'Feb', price: 45.80, volume: 1450 },
  { month: 'Mar', price: 48.20, volume: 1680 },
  { month: 'Apr', price: 46.90, volume: 1520 },
  { month: 'May', price: 50.30, volume: 1890 },
  { month: 'Jun', price: 52.75, volume: 2150 }
];

const marketDistribution = [
  { name: 'Mangrove', value: 45, color: '#1890ff' },
  { name: 'Seagrass', value: 30, color: '#52c41a' },
  { name: 'Salt Marsh', value: 20, color: '#faad14' },
  { name: 'Other', value: 5, color: '#722ed1' }
];

const CarbonCreditRegistry: React.FC = () => {
  const [activeTab, setActiveTab] = useState('registry');
  const [filteredCredits, setFilteredCredits] = useState(mockCarbonCredits);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCredit, setSelectedCredit] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'active':
        return <Tag color="success">Active</Tag>;
      case 'pending':
        return <Tag color="processing">Pending</Tag>;
      case 'retired':
        return <Tag color="default">Retired</Tag>;
      case 'expired':
        return <Tag color="error">Expired</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const getRatingBadge = (rating: string) => {
    const color = rating.includes('AAA') ? '#722ed1' : rating.includes('AA') ? '#1890ff' : '#52c41a';
    return <Badge color={color} text={rating} />;
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterCredits(value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    filterCredits(searchText, value);
  };

  const filterCredits = (search: string, status: string) => {
    let filtered = mockCarbonCredits;

    if (search) {
      filtered = filtered.filter(credit =>
        credit.projectName.toLowerCase().includes(search.toLowerCase()) ||
        credit.creditId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(credit => credit.status === status);
    }

    setFilteredCredits(filtered);
  };

  const getStats = () => {
    return {
      totalCredits: mockCarbonCredits.reduce((sum, c) => sum + c.totalCredits, 0),
      availableCredits: mockCarbonCredits.reduce((sum, c) => sum + c.availableCredits, 0),
      averagePrice: (mockCarbonCredits.reduce((sum, c) => sum + c.pricePerCredit, 0) / mockCarbonCredits.length).toFixed(2),
      totalValue: mockCarbonCredits.reduce((sum, c) => sum + (c.availableCredits * c.pricePerCredit), 0),
      activeProjects: mockCarbonCredits.filter(c => c.status === 'active').length
    };
  };

  const stats = getStats();

  const columns = [
    {
      title: 'Project Details',
      key: 'project',
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar style={{ backgroundColor: '#1890ff' }}>
            {record.projectName.substring(0, 2).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>{record.projectName}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.creditId} • {record.location}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Credits Available',
      key: 'credits',
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.availableCredits.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            of {record.totalCredits.toLocaleString()} total
          </div>
          <Progress 
            percent={Math.round((record.availableCredits / record.totalCredits) * 100)} 
            size="small" 
            strokeColor="#52c41a"
            style={{ marginTop: '4px' }}
          />
        </div>
      )
    },
    {
      title: 'Price per Credit',
      key: 'price',
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1890ff' }}>
            ${record.pricePerCredit.toFixed(2)}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            USD/tCO2e
          </div>
        </div>
      )
    },
    {
      title: 'Standard & Rating',
      key: 'standard',
      render: (record: any) => (
        <div>
          <Tag color="blue">{record.standard}</Tag>
          <div style={{ marginTop: '4px' }}>
            {getRatingBadge(record.rating)}
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => getStatusTag(record.status)
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
                setSelectedCredit(record);
                setIsModalVisible(true);
              }}
            />
          </Tooltip>
          <Button type="primary" size="small" icon={<ShoppingCartOutlined />}>
            Purchase
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Carbon Credit Registry
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Verified blue carbon credits marketplace and trading platform
        </Paragraph>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" size="large">
        <TabPane tab="Registry" key="registry">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Total Credits"
                    value={stats.totalCredits}
                    suffix="tCO2e"
                    prefix={<GoldOutlined style={{ color: '#faad14' }} />}
                    valueStyle={{ color: '#faad14', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Available Credits"
                    value={stats.availableCredits}
                    suffix="tCO2e"
                    prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
                    valueStyle={{ color: '#52c41a', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Average Price"
                    value={stats.averagePrice}
                    prefix={<DollarOutlined style={{ color: '#1890ff' }} />}
                    suffix="/tCO2e"
                    valueStyle={{ color: '#1890ff', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <StyledCard className="stat-card">
                  <Statistic
                    title="Market Value"
                    value={stats.totalValue}
                    prefix={<RiseOutlined style={{ color: '#722ed1' }} />}
                    precision={0}
                    valueStyle={{ color: '#722ed1', fontWeight: 600 }}
                  />
                </StyledCard>
              </motion.div>
            </Col>
          </Row>

          {/* Quick Market Overview */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} lg={6}>
              <PriceCard title="Mangrove Credits">
                <div className="price">$48.50</div>
                <div className="change positive">
                  <RiseOutlined /> +5.2%
                </div>
              </PriceCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <PriceCard title="Seagrass Credits">
                <div className="price">$52.75</div>
                <div className="change positive">
                  <RiseOutlined /> +2.8%
                </div>
              </PriceCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <PriceCard title="Salt Marsh Credits">
                <div className="price">$38.25</div>
                <div className="change negative">
                  <FallOutlined /> -1.5%
                </div>
              </PriceCard>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <PriceCard title="Market Index">
                <div className="price">$46.17</div>
                <div className="change positive">
                  <RiseOutlined /> +3.1%
                </div>
              </PriceCard>
            </Col>
          </Row>

          {/* Filters */}
          <FilterSection>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={8} lg={6}>
                <Input
                  placeholder="Search credits..."
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
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="retired">Retired</Select.Option>
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
                  <Button type="primary" icon={<TransactionOutlined />}>
                    New Transaction
                  </Button>
                </Space>
              </Col>
            </Row>
          </FilterSection>

          <StyledCard>
            <Table
              dataSource={filteredCredits}
              columns={columns}
              rowKey="id"
              pagination={{
                total: filteredCredits.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} credits`
              }}
            />
          </StyledCard>
        </TabPane>

        <TabPane tab="Market Analytics" key="analytics">
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} lg={16}>
              <StyledCard title="Price History & Trading Volume">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={priceHistoryData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#1890ff" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </StyledCard>
            </Col>
            <Col xs={24} lg={8}>
              <StyledCard title="Market Distribution">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={marketDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {marketDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </StyledCard>
            </Col>
          </Row>

          <StyledCard title="Trading Volume by Month">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </StyledCard>
        </TabPane>

        <TabPane tab="Portfolio" key="portfolio">
          <Alert
            message="Portfolio Management"
            description="Track your carbon credit investments and trading history."
            type="info"
            showIcon
            style={{ marginBottom: '20px' }}
          />
          
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <StyledCard title="My Holdings">
                <Statistic
                  title="Total Credits Owned"
                  value={5280}
                  suffix="tCO2e"
                  valueStyle={{ color: '#52c41a' }}
                />
                <Statistic
                  title="Portfolio Value"
                  value={242350}
                  prefix="$"
                  valueStyle={{ color: '#1890ff' }}
                  style={{ marginTop: '16px' }}
                />
                <Statistic
                  title="Unrealized Gain"
                  value={18750}
                  prefix="$"
                  valueStyle={{ color: '#722ed1' }}
                  style={{ marginTop: '16px' }}
                />
              </StyledCard>
            </Col>
            <Col xs={24} lg={16}>
              <StyledCard title="Recent Transactions">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <TransactionOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
                  <Title level={4} style={{ color: '#999' }}>No Recent Transactions</Title>
                  <Text type="secondary">Your trading history will appear here.</Text>
                </div>
              </StyledCard>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Credit Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar style={{ backgroundColor: '#1890ff' }}>
              {selectedCredit?.projectName?.substring(0, 2).toUpperCase()}
            </Avatar>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedCredit?.projectName}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{selectedCredit?.creditId}</div>
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
          <Button key="purchase" type="primary" icon={<ShoppingCartOutlined />}>
            Purchase Credits
          </Button>
        ]}
      >
        {selectedCredit && (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Project Type:</Text>
                <div>{selectedCredit.projectType}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Location:</Text>
                <div>{selectedCredit.location}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Vintage Year:</Text>
                <div>{selectedCredit.vintage}</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Standard:</Text>
                <div>{selectedCredit.standard}</div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Total Credits:</Text>
                <div>{selectedCredit.totalCredits?.toLocaleString()} tCO2e</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Available Credits:</Text>
                <div>{selectedCredit.availableCredits?.toLocaleString()} tCO2e</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Price per Credit:</Text>
                <div>${selectedCredit.pricePerCredit?.toFixed(2)} USD</div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Rating:</Text>
                <div>{getRatingBadge(selectedCredit.rating)}</div>
              </div>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default CarbonCreditRegistry;