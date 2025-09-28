import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Space,
  Typography,
  Tag,
  Drawer,
  Descriptions,
  Progress,
  Statistic,
  Tooltip
} from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FullscreenOutlined,
  FilterOutlined,
  MenuOutlined,
  InfoCircleOutlined,
  EyeOutlined,
  EditOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  ReloadOutlined,
  CompassOutlined,
  GlobalOutlined,
  AimOutlined,
  ThunderboltOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { CheckableTag } = Tag;

const MapContainer = styled.div`
  position: relative;
  height: 600px;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 50%, #e6f4ea 100%);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(24, 144, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(82, 196, 26, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(114, 46, 209, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ProjectMarker = styled.div<{ x: number; y: number; status: string; size?: string }>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%);
  width: ${props => props.size === 'large' ? '16px' : props.size === 'small' ? '8px' : '12px'};
  height: ${props => props.size === 'large' ? '16px' : props.size === 'small' ? '8px' : '12px'};
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  
  background-color: ${props => {
    switch (props.status) {
      case 'active': return '#52c41a';
      case 'planned': return '#1890ff';
      case 'completed': return '#722ed1';
      case 'review': return '#fa8c16';
      case 'suspended': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  }};
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.3);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    z-index: 20;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border: 2px solid currentColor;
    border-radius: 50%;
    opacity: 0;
    animation: ${props => props.status === 'active' ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0.7;
    }
    70% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  
  &:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegendContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 50;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

// Mock project data with coordinates
const mockProjects = [
  {
    id: 1,
    name: 'Sundarbans Mangrove Initiative',
    location: 'West Bengal, India',
    coordinates: { x: 72, y: 45 },
    status: 'active',
    type: 'Mangrove Restoration',
    area: '15,000 hectares',
    carbonCredits: 125000,
    startDate: '2023-03-15',
    completion: 87,
    stakeholders: 12,
    investment: 2500000,
    description: 'Large-scale mangrove restoration project in the Sundarbans delta region.',
    keyMetrics: {
      biodiversityIndex: 0.87,
      waterQuality: 'Excellent',
      communityImpact: 'High',
      carbonSequestration: '450 tCO₂/ha/year'
    }
  },
  {
    id: 2,
    name: 'Tamil Nadu Seagrass Project',
    location: 'Tamil Nadu, India',
    coordinates: { x: 65, y: 70 },
    status: 'active',
    type: 'Seagrass Conservation',
    area: '8,500 hectares',
    carbonCredits: 98500,
    startDate: '2023-01-10',
    completion: 92,
    stakeholders: 8,
    investment: 1800000,
    description: 'Seagrass meadow conservation and restoration along Tamil Nadu coast.',
    keyMetrics: {
      biodiversityIndex: 0.92,
      waterQuality: 'Good',
      communityImpact: 'Medium',
      carbonSequestration: '380 tCO₂/ha/year'
    }
  },
  {
    id: 3,
    name: 'Kerala Backwater Conservation',
    location: 'Kerala, India',
    coordinates: { x: 58, y: 75 },
    status: 'active',
    type: 'Salt Marsh Recovery',
    area: '12,200 hectares',
    carbonCredits: 87300,
    startDate: '2023-05-20',
    completion: 78,
    stakeholders: 15,
    investment: 3200000,
    description: 'Comprehensive backwater ecosystem restoration and conservation.',
    keyMetrics: {
      biodiversityIndex: 0.79,
      waterQuality: 'Good',
      communityImpact: 'High',
      carbonSequestration: '320 tCO₂/ha/year'
    }
  },
  {
    id: 4,
    name: 'Gujarat Salt Marsh Recovery',
    location: 'Gujarat, India',
    coordinates: { x: 45, y: 40 },
    status: 'review',
    type: 'Salt Marsh Recovery',
    area: '6,800 hectares',
    carbonCredits: 76200,
    startDate: '2023-02-08',
    completion: 65,
    stakeholders: 6,
    investment: 1500000,
    description: 'Salt marsh ecosystem restoration in Gujarat coastal areas.',
    keyMetrics: {
      biodiversityIndex: 0.68,
      waterQuality: 'Fair',
      communityImpact: 'Medium',
      carbonSequestration: '280 tCO₂/ha/year'
    }
  },
  {
    id: 5,
    name: 'Odisha Coastal Restoration',
    location: 'Odisha, India',
    coordinates: { x: 68, y: 55 },
    status: 'active',
    type: 'Coral Reef Protection',
    area: '9,400 hectares',
    carbonCredits: 69800,
    startDate: '2023-04-12',
    completion: 71,
    stakeholders: 10,
    investment: 2100000,
    description: 'Coastal ecosystem restoration including coral reef protection.',
    keyMetrics: {
      biodiversityIndex: 0.85,
      waterQuality: 'Excellent',
      communityImpact: 'High',
      carbonSequestration: '350 tCO₂/ha/year'
    }
  },
  {
    id: 6,
    name: 'Mumbai Marine Sanctuary',
    location: 'Maharashtra, India',
    coordinates: { x: 52, y: 58 },
    status: 'planned',
    type: 'Marine Protected Area',
    area: '5,200 hectares',
    carbonCredits: 45000,
    startDate: '2024-01-15',
    completion: 15,
    stakeholders: 4,
    investment: 1200000,
    description: 'Planned marine sanctuary development near Mumbai coast.',
    keyMetrics: {
      biodiversityIndex: 0.72,
      waterQuality: 'Good',
      communityImpact: 'Medium',
      carbonSequestration: '250 tCO₂/ha/year'
    }
  },
  {
    id: 7,
    name: 'Goa Estuary Project',
    location: 'Goa, India',
    coordinates: { x: 55, y: 68 },
    status: 'completed',
    type: 'Estuary Restoration',
    area: '3,800 hectares',
    carbonCredits: 52000,
    startDate: '2022-08-20',
    completion: 100,
    stakeholders: 7,
    investment: 950000,
    description: 'Completed estuary restoration project in Goa.',
    keyMetrics: {
      biodiversityIndex: 0.89,
      waterQuality: 'Excellent',
      communityImpact: 'High',
      carbonSequestration: '420 tCO₂/ha/year'
    }
  },
  {
    id: 8,
    name: 'Andhra Pradesh Coastal Shield',
    location: 'Andhra Pradesh, India',
    coordinates: { x: 62, y: 65 },
    status: 'suspended',
    type: 'Coastal Protection',
    area: '11,500 hectares',
    carbonCredits: 0,
    startDate: '2023-06-10',
    completion: 25,
    stakeholders: 5,
    investment: 1800000,
    description: 'Coastal protection project currently under review.',
    keyMetrics: {
      biodiversityIndex: 0.45,
      waterQuality: 'Fair',
      communityImpact: 'Low',
      carbonSequestration: '200 tCO₂/ha/year'
    }
  }
];

const projectTypes = ['All Types', 'Mangrove Restoration', 'Seagrass Conservation', 'Salt Marsh Recovery', 'Coral Reef Protection', 'Marine Protected Area', 'Estuary Restoration', 'Coastal Protection'];
const statusTypes = ['All Status', 'active', 'planned', 'completed', 'review', 'suspended'];

const ProjectMap: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [mapZoom, setMapZoom] = useState(1);


  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setDrawerVisible(true);
  };

  const getFilteredProjects = () => {
    return mockProjects.filter(project => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(project.type);
      const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(project.status);
      const searchMatch = searchText === '' || 
        project.name.toLowerCase().includes(searchText.toLowerCase()) ||
        project.location.toLowerCase().includes(searchText.toLowerCase());
      
      return typeMatch && statusMatch && searchMatch;
    });
  };

  const getStatusStats = () => {
    const stats = {
      active: mockProjects.filter(p => p.status === 'active').length,
      planned: mockProjects.filter(p => p.status === 'planned').length,
      completed: mockProjects.filter(p => p.status === 'completed').length,
      review: mockProjects.filter(p => p.status === 'review').length,
      suspended: mockProjects.filter(p => p.status === 'suspended').length
    };
    return stats;
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (type === 'All Types') {
      setSelectedTypes(checked ? [] : projectTypes.slice(1));
    } else {
      setSelectedTypes(checked 
        ? [...selectedTypes, type]
        : selectedTypes.filter(t => t !== type)
      );
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (status === 'All Status') {
      setSelectedStatuses(checked ? [] : statusTypes.slice(1));
    } else {
      setSelectedStatuses(checked 
        ? [...selectedStatuses, status]
        : selectedStatuses.filter(s => s !== status)
      );
    }
  };

  const statusStats = getStatusStats();
  const filteredProjects = getFilteredProjects();

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
          Project Map
        </Title>
        <Paragraph style={{ margin: '8px 0 0 0', color: '#666' }}>
          Interactive geographical visualization of blue carbon projects across India
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={8} lg={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Active Projects"
                value={statusStats.active}
                prefix={<EnvironmentOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={8} lg={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Planned"
                value={statusStats.planned}
                prefix={<AimOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={8} lg={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Completed"
                value={statusStats.completed}
                prefix={<SafetyOutlined style={{ color: '#722ed1' }} />}
                valueStyle={{ color: '#722ed1', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={8} lg={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Under Review"
                value={statusStats.review}
                prefix={<InfoCircleOutlined style={{ color: '#fa8c16' }} />}
                valueStyle={{ color: '#fa8c16', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={8} lg={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Suspended"
                value={statusStats.suspended}
                prefix={<ThunderboltOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
        <Col xs={24} sm={8} lg={4}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <StyledCard>
              <Statistic
                title="Total Area"
                value="71.7"
                suffix="k ha"
                prefix={<GlobalOutlined style={{ color: '#13c2c2' }} />}
                valueStyle={{ color: '#13c2c2', fontWeight: 600 }}
              />
            </StyledCard>
          </motion.div>
        </Col>
      </Row>

      {/* Controls */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={8}>
          <Input
            placeholder="Search projects by name or location..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} lg={16}>
          <Space style={{ float: 'right' }}>
            <Button icon={<FilterOutlined />}>Advanced Filters</Button>
            <Button icon={<MenuOutlined />}>Map Layers</Button>
            <Button icon={<DownloadOutlined />}>Export Data</Button>
            <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Filter Tags */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <div style={{ marginBottom: '12px' }}>
            <Text strong style={{ marginRight: '12px' }}>Project Types:</Text>
            {projectTypes.map(type => (
              <CheckableTag
                key={type}
                checked={type === 'All Types' ? selectedTypes.length === 0 : selectedTypes.includes(type)}
                onChange={(checked) => handleTypeChange(type, checked)}
                style={{ marginBottom: '4px' }}
              >
                {type}
              </CheckableTag>
            ))}
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div style={{ marginBottom: '12px' }}>
            <Text strong style={{ marginRight: '12px' }}>Status:</Text>
            {statusTypes.map(status => (
              <CheckableTag
                key={status}
                checked={status === 'All Status' ? selectedStatuses.length === 0 : selectedStatuses.includes(status)}
                onChange={(checked) => handleStatusChange(status, checked)}
                style={{ marginBottom: '4px' }}
              >
                {status === 'All Status' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
              </CheckableTag>
            ))}
          </div>
        </Col>
      </Row>

      {/* Interactive Map */}
      <StyledCard style={{ marginBottom: '24px' }}>
        <MapContainer style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center' }}>
          {/* Project Markers */}
          {filteredProjects.map(project => (
            <Tooltip
              key={project.id}
              title={
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>{project.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{project.location}</div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    <Tag color={project.status === 'active' ? 'green' : 
                               project.status === 'planned' ? 'blue' :
                               project.status === 'completed' ? 'purple' :
                               project.status === 'review' ? 'orange' : 'red'}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Tag>
                  </div>
                </div>
              }
              placement="top"
            >
              <ProjectMarker
                x={project.coordinates.x}
                y={project.coordinates.y}
                status={project.status}
                size={project.carbonCredits > 100000 ? 'large' : project.carbonCredits > 50000 ? 'medium' : 'small'}
                onClick={() => handleProjectClick(project)}
              />
            </Tooltip>
          ))}

          {/* Map Controls */}
          <ControlPanel>
            <Button 
              type="primary" 
              icon={<ZoomInOutlined />} 
              size="small"
              onClick={() => setMapZoom(Math.min(mapZoom + 0.2, 2))}
            />
            <Button 
              icon={<ZoomOutOutlined />} 
              size="small"
              onClick={() => setMapZoom(Math.max(mapZoom - 0.2, 0.5))}
            />
            <Button icon={<FullscreenOutlined />} size="small" />
            <Button icon={<CompassOutlined />} size="small" />
          </ControlPanel>

          {/* Legend */}
          <LegendContainer>
            <div style={{ marginBottom: '8px', fontWeight: 600, fontSize: '12px' }}>Project Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#52c41a', border: '2px solid white' }}></div>
                <span>Active ({statusStats.active})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#1890ff', border: '2px solid white' }}></div>
                <span>Planned ({statusStats.planned})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#722ed1', border: '2px solid white' }}></div>
                <span>Completed ({statusStats.completed})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fa8c16', border: '2px solid white' }}></div>
                <span>Review ({statusStats.review})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff4d4f', border: '2px solid white' }}></div>
                <span>Suspended ({statusStats.suspended})</span>
              </div>
            </div>
          </LegendContainer>
        </MapContainer>
      </StyledCard>

      {/* Project Details Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: selectedProject?.status === 'active' ? '#52c41a' : 
                             selectedProject?.status === 'planned' ? '#1890ff' :
                             selectedProject?.status === 'completed' ? '#722ed1' :
                             selectedProject?.status === 'review' ? '#fa8c16' : '#ff4d4f',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}></div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedProject?.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{selectedProject?.location}</div>
            </div>
          </div>
        }
        placement="right"
        width={480}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        extra={
          <Space>
            <Button type="text" icon={<EditOutlined />} size="small">Edit</Button>
            <Button type="text" icon={<ShareAltOutlined />} size="small">Share</Button>
            <Button type="text" icon={<DownloadOutlined />} size="small">Export</Button>
          </Space>
        }
      >
        {selectedProject && (
          <div>
            {/* Status and Type */}
            <div style={{ marginBottom: '24px' }}>
              <Space>
                <Tag 
                  color={selectedProject.status === 'active' ? 'green' : 
                        selectedProject.status === 'planned' ? 'blue' :
                        selectedProject.status === 'completed' ? 'purple' :
                        selectedProject.status === 'review' ? 'orange' : 'red'}
                >
                  {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                </Tag>
                <Tag color="blue">{selectedProject.type}</Tag>
              </Space>
            </div>

            {/* Key Metrics */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Carbon Credits"
                    value={selectedProject.carbonCredits}
                    suffix="tCO₂"
                    precision={0}
                    valueStyle={{ fontSize: '16px', fontWeight: 600 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Project Area"
                    value={selectedProject.area}
                    valueStyle={{ fontSize: '16px', fontWeight: 600 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Investment"
                    value={selectedProject.investment}
                    prefix="₹"
                    precision={0}
                    valueStyle={{ fontSize: '16px', fontWeight: 600 }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small">
                  <Statistic
                    title="Stakeholders"
                    value={selectedProject.stakeholders}
                    valueStyle={{ fontSize: '16px', fontWeight: 600 }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Project Progress */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Text strong>Project Completion</Text>
                <Text>{selectedProject.completion}%</Text>
              </div>
              <Progress 
                percent={selectedProject.completion} 
                strokeColor={selectedProject.completion >= 80 ? '#52c41a' : selectedProject.completion >= 50 ? '#1890ff' : '#fa8c16'}
              />
            </div>

            {/* Project Details */}
            <Descriptions title="Project Information" column={1} size="small" style={{ marginBottom: '24px' }}>
              <Descriptions.Item label="Start Date">{selectedProject.startDate}</Descriptions.Item>
              <Descriptions.Item label="Project Type">{selectedProject.type}</Descriptions.Item>
              <Descriptions.Item label="Location">{selectedProject.location}</Descriptions.Item>
              <Descriptions.Item label="Total Area">{selectedProject.area}</Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedProject.description}
              </Descriptions.Item>
            </Descriptions>

            {/* Key Performance Metrics */}
            <div style={{ marginBottom: '24px' }}>
              <Title level={5} style={{ marginBottom: '16px' }}>Environmental Metrics</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Biodiversity Index</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Progress 
                      percent={selectedProject.keyMetrics.biodiversityIndex * 100} 
                      size="small" 
                      style={{ width: '80px' }}
                      strokeColor="#52c41a"
                      showInfo={false}
                    />
                    <Text strong>{selectedProject.keyMetrics.biodiversityIndex}</Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Water Quality</Text>
                  <Tag color={selectedProject.keyMetrics.waterQuality === 'Excellent' ? 'green' : 
                              selectedProject.keyMetrics.waterQuality === 'Good' ? 'blue' : 'orange'}>
                    {selectedProject.keyMetrics.waterQuality}
                  </Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Community Impact</Text>
                  <Tag color={selectedProject.keyMetrics.communityImpact === 'High' ? 'green' : 
                              selectedProject.keyMetrics.communityImpact === 'Medium' ? 'blue' : 'orange'}>
                    {selectedProject.keyMetrics.communityImpact}
                  </Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Carbon Sequestration</Text>
                  <Text strong style={{ color: '#52c41a' }}>{selectedProject.keyMetrics.carbonSequestration}</Text>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '24px' }}>
              <Space style={{ width: '100%' }} direction="vertical">
                <Button type="primary" block icon={<EyeOutlined />}>
                  View Detailed Report
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Download Project Data
                </Button>
                <Button block icon={<ShareAltOutlined />}>
                  Share Project
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ProjectMap;