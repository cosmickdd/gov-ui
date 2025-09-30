import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Avatar,
  Row,
  Col,
  Statistic,
  Modal,
  message,
  Typography,
  Badge,
  Tabs,
  Alert,
  Input
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { confirm } = Modal;

const PageContainer = styled.div`
  .ant-card {
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
    border: 1px solid #f0f0f0;
    
    &:hover {
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
    }
  }
  
  .pending-card {
    border-left: 4px solid #fa8c16;
    background: linear-gradient(135deg, #fff7e6 0%, #ffffff 100%);
  }
  
  .high-priority {
    border-left: 4px solid #ff4d4f;
    background: linear-gradient(135deg, #fff1f0 0%, #ffffff 100%);
  }

  @media (max-width: 768px) {
    .ant-card {
      margin-bottom: 16px;
    }
    
    .ant-statistic-title {
      font-size: 12px;
    }
    
    .ant-statistic-content-value {
      font-size: 20px !important;
    }
    
    .ant-table-wrapper {
      overflow-x: auto;
    }
  }
`;

const ActionButton = styled(Button)`
  &.approve-btn {
    background: #52c41a;
    border-color: #52c41a;
    color: white;
    
    &:hover {
      background: #73d13d;
      border-color: #73d13d;
    }
  }
  
  &.reject-btn {
    background: #ff4d4f;
    border-color: #ff4d4f;
    color: white;
    
    &:hover {
      background: #ff7875;
      border-color: #ff7875;
    }
  }
`;

// Mock data for pending requests
const pendingRequests = [
  {
    id: 1,
    name: 'Coastal Dynamics Pvt Ltd',
    registrationNumber: 'REG001',
    applicantName: 'Dr. Priya Sharma',
    email: 'priya.sharma@coastaldynamics.com',
    phone: '+91 9876543210',
    submissionDate: '2024-01-15',
    status: 'under_review',
    projectType: 'Mangrove Restoration',
    location: 'Sundarbans, West Bengal',
    projectArea: '2,500 hectares',
    estimatedCredits: 12500,
    documents: ['incorporation_cert.pdf', 'project_proposal.pdf', 'environmental_clearance.pdf'],
    complianceScore: 85,
    priority: 'high',
    daysWaiting: 5
  },
  {
    id: 2,
    name: 'Marine Conservation Corp',
    registrationNumber: 'REG002',
    applicantName: 'Mr. Rajesh Kumar',
    email: 'rajesh@marineconservation.org',
    phone: '+91 8765432109',
    submissionDate: '2024-01-18',
    status: 'pending_documents',
    projectType: 'Seagrass Conservation',
    location: 'Lakshadweep Islands',
    projectArea: '1,800 hectares',
    estimatedCredits: 9500,
    documents: ['company_profile.pdf', 'technical_proposal.pdf'],
    complianceScore: 78,
    priority: 'medium',
    daysWaiting: 2
  },
  {
    id: 3,
    name: 'Blue Ocean Technologies',
    registrationNumber: 'REG003',
    applicantName: 'Dr. Meera Nair',
    email: 'meera@blueocean.tech',
    phone: '+91 7654321098',
    submissionDate: '2024-01-20',
    status: 'under_review',
    projectType: 'Salt Marsh Protection',
    location: 'Gujarat Coast',
    projectArea: '3,200 hectares',
    estimatedCredits: 15800,
    documents: ['registration_cert.pdf', 'project_plan.pdf', 'funding_proof.pdf'],
    complianceScore: 92,
    priority: 'high',
    daysWaiting: 1
  }
];

const PendingRequests: React.FC = () => {
  const [requests, setRequests] = useState(pendingRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#fa8c16';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      under_review: { color: 'processing', text: 'Under Review', icon: <FileTextOutlined /> },
      pending_documents: { color: 'warning', text: 'Pending Documents', icon: <ExclamationCircleOutlined /> }
    };
    return configs[status as keyof typeof configs] || { color: 'default', text: status, icon: <ClockCircleOutlined /> };
  };

  const handleApprove = (requestId: number) => {
    confirm({
      title: 'Approve Application?',
      content: 'Are you sure you want to approve this company registration? This action cannot be undone.',
      okText: 'Yes, Approve',
      okType: 'primary',
      cancelText: 'Cancel',
      onOk: async () => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setRequests(prev => prev.filter(req => req.id !== requestId));
          message.success('Application approved successfully!');
        } catch (error) {
          message.error('Failed to approve application');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleReject = (requestId: number) => {
    Modal.confirm({
      title: 'Reject Application',
      content: (
        <div>
          <p>Please provide a reason for rejection:</p>
          <TextArea
            rows={4}
            placeholder="Enter rejection reason..."
            onChange={(e) => {
              // Store reason in a variable or state
            }}
          />
        </div>
      ),
      okText: 'Reject Application',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setLoading(true);
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setRequests(prev => prev.filter(req => req.id !== requestId));
          message.success('Application rejected successfully!');
        } catch (error) {
          message.error('Failed to reject application');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Company',
      key: 'company',
      width: 250,
      fixed: 'left' as const,
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar size={40} style={{ backgroundColor: getPriorityColor(record.priority) }}>
            {record.name.substring(0, 2).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.registrationNumber}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Applicant',
      key: 'applicant',
      width: 200,
      responsive: ['md' as const],
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.applicantName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      )
    },
    {
      title: 'Project Details',
      key: 'project',
      width: 250,
      responsive: ['lg' as const],
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>{record.projectType}</div>
          <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <EnvironmentOutlined />
            {record.location}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
            {record.projectArea} • {record.estimatedCredits.toLocaleString()} credits
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (record: any) => {
        const config = getStatusConfig(record.status);
        return (
          <div>
            <Tag color={config.color} icon={config.icon}>
              {config.text}
            </Tag>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
              Waiting {record.daysWaiting} day{record.daysWaiting !== 1 ? 's' : ''}
            </div>
          </div>
        );
      }
    },
    {
      title: 'Priority',
      key: 'priority',
      width: 100,
      responsive: ['sm' as const],
      render: (record: any) => (
        <Badge
          color={getPriorityColor(record.priority)}
          text={record.priority.toUpperCase()}
        />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      fixed: 'right' as const,
      render: (record: any) => (
        <Space direction="vertical" size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setSelectedRequest(record);
              setIsDetailModalVisible(true);
            }}
          >
            View
          </Button>
          <Space size="small">
            <ActionButton
              className="approve-btn"
              size="small"
              icon={<CheckOutlined />}
              loading={loading}
              onClick={() => handleApprove(record.id)}
            />
            <ActionButton
              className="reject-btn"
              size="small"
              icon={<CloseOutlined />}
              loading={loading}
              onClick={() => handleReject(record.id)}
            />
          </Space>
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#1a1a1a' }}>
          Pending Requests
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666', fontSize: '16px' }}>
          Review and approve company registration applications
        </Paragraph>
      </div>

      {/* Summary Stats */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="pending-card">
              <Statistic
                title="Total Pending"
                value={requests.length}
                prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />}
                valueStyle={{ color: '#fa8c16', fontWeight: 700 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="high-priority">
              <Statistic
                title="High Priority"
                value={requests.filter(r => r.priority === 'high').length}
                prefix={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontWeight: 700 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card>
              <Statistic
                title="Under Review"
                value={requests.filter(r => r.status === 'under_review').length}
                prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 700 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={6}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card>
              <Statistic
                title="Avg. Wait Time"
                value={Math.round(requests.reduce((acc, r) => acc + r.daysWaiting, 0) / requests.length)}
                suffix="days"
                prefix={<CalendarOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Alert for urgent items */}
      {requests.filter(r => r.daysWaiting > 3).length > 0 && (
        <Alert
          message="Urgent Attention Required"
          description={`${requests.filter(r => r.daysWaiting > 3).length} application(s) have been waiting for more than 3 days. Please review urgently.`}
          type="warning"
          showIcon
          style={{ marginBottom: '24px' }}
        />
      )}

      {/* Pending Requests Table */}
      <Card title="Pending Applications" extra={<Badge count={requests.length} />}>
        <Table
          dataSource={requests}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            responsive: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          loading={loading}
          rowClassName={(record) => record.priority === 'high' ? 'high-priority-row' : ''}
        />
      </Card>

      {/* Detail Modal */}
      <Modal
        title="Application Details"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Close
          </Button>,
          <ActionButton
            key="approve"
            className="approve-btn"
            icon={<CheckOutlined />}
            loading={loading}
            onClick={() => {
              if (selectedRequest) {
                setIsDetailModalVisible(false);
                handleApprove(selectedRequest.id);
              }
            }}
          >
            Approve Application
          </ActionButton>,
          <ActionButton
            key="reject"
            className="reject-btn"
            icon={<CloseOutlined />}
            loading={loading}
            onClick={() => {
              if (selectedRequest) {
                setIsDetailModalVisible(false);
                handleReject(selectedRequest.id);
              }
            }}
          >
            Reject Application
          </ActionButton>
        ]}
      >
        {selectedRequest && (
          <Tabs defaultActiveKey="company">
            <TabPane tab="Company Information" key="company">
              <Row gutter={[24, 16]}>
                <Col span={24}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Avatar size={80} style={{ backgroundColor: getPriorityColor(selectedRequest.priority) }}>
                      {selectedRequest.name.substring(0, 2).toUpperCase()}
                    </Avatar>
                    <div style={{ marginTop: '12px' }}>
                      <Title level={4} style={{ margin: 0 }}>{selectedRequest.name}</Title>
                      <Text type="secondary">{selectedRequest.registrationNumber}</Text>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <Text strong><UserOutlined /> Applicant Name:</Text>
                      <br />
                      <Text>{selectedRequest.applicantName}</Text>
                    </div>
                    <div>
                      <Text strong><MailOutlined /> Email:</Text>
                      <br />
                      <Text>{selectedRequest.email}</Text>
                    </div>
                    <div>
                      <Text strong><PhoneOutlined /> Phone:</Text>
                      <br />
                      <Text>{selectedRequest.phone}</Text>
                    </div>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <Text strong><EnvironmentOutlined /> Project Type:</Text>
                      <br />
                      <Text>{selectedRequest.projectType}</Text>
                    </div>
                    <div>
                      <Text strong>Location:</Text>
                      <br />
                      <Text>{selectedRequest.location}</Text>
                    </div>
                    <div>
                      <Text strong>Project Area:</Text>
                      <br />
                      <Text>{selectedRequest.projectArea}</Text>
                    </div>
                  </Space>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Documents" key="documents">
              <div>
                <Text strong>Submitted Documents:</Text>
                <div style={{ marginTop: '16px' }}>
                  {selectedRequest.documents?.map((doc: string, index: number) => (
                    <Card key={index} size="small" style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{doc}</span>
                        <Button type="link" size="small">
                          Download
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabPane>
            <TabPane tab="Compliance" key="compliance">
              <div>
                <Text strong>Compliance Score: </Text>
                <Tag color={selectedRequest.complianceScore >= 80 ? 'green' : 'orange'}>
                  {selectedRequest.complianceScore}%
                </Tag>
                <div style={{ marginTop: '16px' }}>
                  <Text>Estimated Carbon Credits: <strong>{selectedRequest.estimatedCredits.toLocaleString()} tCO2e</strong></Text>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <Text>Submission Date: <strong>{new Date(selectedRequest.submissionDate).toLocaleDateString('en-IN')}</strong></Text>
                </div>
              </div>
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </PageContainer>
  );
};

export default PendingRequests;

export {};