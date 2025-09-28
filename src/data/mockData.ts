import { Company, CarbonCredit, MRVReport, AuditLog, Alert, Project, User } from '../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Coastal Conservation Foundation',
    regId: 'CCF-2024-001',
    type: 'NGO',
    location: 'Chennai, Tamil Nadu',
    status: 'pending',
    email: 'info@ccf.org',
    phone: '+91-9876543210',
    address: '123 Marina Beach Road, Chennai - 600001',
    registrationDate: '2024-09-15',
    documents: ['reg_certificate.pdf', 'tax_exemption.pdf', 'project_proposal.pdf']
  },
  {
    id: '2',
    name: 'BlueTech Industries Pvt Ltd',
    regId: 'BTI-2024-002',
    type: 'Corporate',
    location: 'Mumbai, Maharashtra',
    status: 'pending',
    email: 'sustainability@bluetech.com',
    phone: '+91-9876543211',
    address: 'BlueTech Tower, Bandra Kurla Complex, Mumbai - 400051',
    registrationDate: '2024-09-20',
    documents: ['incorporation_cert.pdf', 'environmental_policy.pdf', 'csr_report.pdf']
  },
  {
    id: '3',
    name: 'Gujarat Maritime Research Institute',
    regId: 'GMR-2024-003',
    type: 'Research',
    location: 'Gandhinagar, Gujarat',
    status: 'approved',
    email: 'research@gmri.edu.in',
    phone: '+91-9876543212',
    address: 'GMRI Campus, Sector 15, Gandhinagar - 382015',
    registrationDate: '2024-08-10',
    documents: ['research_license.pdf', 'methodology_report.pdf']
  }
];

export const mockCarbonCredits: CarbonCredit[] = [
  {
    id: '1',
    creditId: 'NCCR-CC-001',
    organization: 'Coastal Conservation Foundation',
    verifiedCarbon: 125.5,
    blockchainHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    status: 'active',
    issuanceDate: '2024-09-01',
    projectType: 'Mangrove Restoration',
    location: 'Pichavaram, Tamil Nadu'
  },
  {
    id: '2',
    creditId: 'NCCR-CC-002',
    organization: 'Gujarat Maritime Research Institute',
    verifiedCarbon: 89.2,
    blockchainHash: '0x3c9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91234',
    status: 'active',
    issuanceDate: '2024-08-15',
    projectType: 'Salt Marsh Protection',
    location: 'Kutch, Gujarat'
  },
  {
    id: '3',
    creditId: 'NCCR-CC-003',
    organization: 'Marine Conservation Society',
    verifiedCarbon: 203.8,
    blockchainHash: '0x1a9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91567',
    status: 'retired',
    issuanceDate: '2024-07-20',
    projectType: 'Seagrass Conservation',
    location: 'Lakshadweep Islands'
  }
];

export const mockMRVReports: MRVReport[] = [
  {
    id: '1',
    projectId: 'PRJ-001',
    organization: 'Coastal Conservation Foundation',
    location: 'Pichavaram, Tamil Nadu',
    submissionDate: '2024-09-25',
    geoTaggedImages: ['site1_image1.jpg', 'site1_image2.jpg', 'site1_drone_view.jpg'],
    duplicacyCheck: 'pass',
    anomalyDetected: false,
    speciesVerification: 'verified',
    plantationDensity: 85.5,
    carbonSequestration: 125.5,
    status: 'verified'
  },
  {
    id: '2',
    projectId: 'PRJ-002',
    organization: 'BlueTech Industries Pvt Ltd',
    location: 'Mandvi, Gujarat',
    submissionDate: '2024-09-22',
    geoTaggedImages: ['site2_image1.jpg', 'site2_satellite.jpg'],
    duplicacyCheck: 'fail',
    anomalyDetected: true,
    speciesVerification: 'pending',
    plantationDensity: 45.2,
    carbonSequestration: 0,
    status: 'pending'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    date: '2024-09-25 14:30:00',
    user: 'Dr. Rajesh Kumar',
    action: 'Company Registration Approved',
    status: 'success',
    notes: 'Gujarat Maritime Research Institute approved after document verification',
    targetId: 'GMR-2024-003'
  },
  {
    id: '2',
    date: '2024-09-25 13:15:00',
    user: 'Dr. Priya Sharma',
    action: 'MRV Report Verified',
    status: 'success',
    notes: 'Pichavaram mangrove project verification completed',
    targetId: 'PRJ-001'
  },
  {
    id: '3',
    date: '2024-09-25 11:45:00',
    user: 'System',
    action: 'Carbon Credit Issued',
    status: 'success',
    notes: 'NCCR-CC-001 issued for 125.5 tons CO2 equivalent',
    targetId: 'NCCR-CC-001'
  },
  {
    id: '4',
    date: '2024-09-25 10:20:00',
    user: 'Dr. Amit Patel',
    action: 'Anomaly Detection Alert',
    status: 'pending',
    notes: 'Possible duplicate site detected in Gujarat submission',
    targetId: 'PRJ-002'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Possible duplicate site detected',
    description: 'Satellite analysis shows potential overlap with existing registered site in Odisha coastal region.',
    status: 'pending',
    priority: 'high',
    createdDate: '2024-09-25',
    location: 'Chilika Lake, Odisha'
  },
  {
    id: '2',
    type: 'error',
    title: 'Canopy loss detected',
    description: 'Satellite imagery indicates 15% canopy reduction in previously verified plantation zone.',
    status: 'pending',
    priority: 'high',
    createdDate: '2024-09-24',
    location: 'Sundarbans, West Bengal'
  },
  {
    id: '3',
    type: 'info',
    title: 'Seasonal monitoring due',
    description: 'Quarterly monitoring reports pending for 3 active projects.',
    status: 'cleared',
    priority: 'medium',
    createdDate: '2024-09-20',
    location: 'Multiple locations'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Pichavaram Mangrove Restoration',
    organization: 'Coastal Conservation Foundation',
    type: 'Mangrove Restoration',
    location: {
      lat: 11.4916,
      lng: 79.7734,
      state: 'Tamil Nadu',
      district: 'Cuddalore'
    },
    verifiedCarbon: 125.5,
    status: 'active',
    startDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Kutch Salt Marsh Conservation',
    organization: 'Gujarat Maritime Research Institute',
    type: 'Salt Marsh Protection',
    location: {
      lat: 23.7337,
      lng: 68.7372,
      state: 'Gujarat',
      district: 'Kutch'
    },
    verifiedCarbon: 89.2,
    status: 'monitoring',
    startDate: '2024-02-01'
  },
  {
    id: '3',
    name: 'Sundarbans Mangrove Protection',
    organization: 'West Bengal Forest Department',
    type: 'Mangrove Restoration',
    location: {
      lat: 21.9497,
      lng: 88.4297,
      state: 'West Bengal',
      district: '24 Parganas South'
    },
    verifiedCarbon: 312.8,
    status: 'active',
    startDate: '2023-11-10'
  },
  {
    id: '4',
    name: 'Chilika Seagrass Conservation',
    organization: 'Odisha Biodiversity Board',
    type: 'Seagrass Conservation',
    location: {
      lat: 19.7216,
      lng: 85.3214,
      state: 'Odisha',
      district: 'Puri'
    },
    verifiedCarbon: 76.3,
    status: 'completed',
    startDate: '2023-08-15'
  },
  {
    id: '5',
    name: 'Lakshadweep Coral Restoration',
    organization: 'Marine Conservation Society',
    type: 'Seagrass Conservation',
    location: {
      lat: 10.5626,
      lng: 72.1771,
      state: 'Lakshadweep',
      district: 'Lakshadweep'
    },
    verifiedCarbon: 203.8,
    status: 'active',
    startDate: '2024-03-01'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@nccr.gov.in',
    role: 'Admin',
    department: 'NCCR - Administration',
    lastLogin: '2024-09-25 09:30:00',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@nccr.gov.in',
    role: 'Reviewer',
    department: 'Coastal Research Wing',
    lastLogin: '2024-09-25 08:45:00',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    email: 'amit.patel@nccr.gov.in',
    role: 'Reviewer',
    department: 'Remote Sensing Division',
    lastLogin: '2024-09-24 16:20:00',
    status: 'active'
  },
  {
    id: '4',
    name: 'Ms. Kavitha Nair',
    email: 'kavitha.nair@nccr.gov.in',
    role: 'Observer',
    department: 'Data Analytics',
    lastLogin: '2024-09-23 14:15:00',
    status: 'inactive'
  }
];

// Dashboard metrics
export const mockDashboardMetrics = {
  totalOrganizations: 24,
  pendingApprovals: 7,
  totalProjects: 156,
  carbonCreditsIssued: 2847.6,
  satelliteVerificationRate: 94.2,
  monthlyTrends: [
    { month: 'Jan', carbonSequestration: 245.3, projects: 12 },
    { month: 'Feb', carbonSequestration: 312.8, projects: 15 },
    { month: 'Mar', carbonSequestration: 289.1, projects: 18 },
    { month: 'Apr', carbonSequestration: 356.7, projects: 22 },
    { month: 'May', carbonSequestration: 423.2, projects: 26 },
    { month: 'Jun', carbonSequestration: 398.5, projects: 29 },
    { month: 'Jul', carbonSequestration: 467.9, projects: 34 },
    { month: 'Aug', carbonSequestration: 512.4, projects: 38 },
    { month: 'Sep', carbonSequestration: 489.6, projects: 42 }
  ],
  stateWiseData: [
    { state: 'Tamil Nadu', projects: 28, carbon: 654.2 },
    { state: 'Gujarat', projects: 24, carbon: 567.8 },
    { state: 'West Bengal', projects: 22, carbon: 523.1 },
    { state: 'Odisha', projects: 18, carbon: 445.6 },
    { state: 'Kerala', projects: 16, carbon: 398.7 },
    { state: 'Karnataka', projects: 14, carbon: 356.9 },
    { state: 'Andhra Pradesh', projects: 12, carbon: 312.4 },
    { state: 'Maharashtra', projects: 10, carbon: 287.3 },
    { state: 'Goa', projects: 8, carbon: 234.1 },
    { state: 'Lakshadweep', projects: 4, carbon: 167.5 }
  ]
};