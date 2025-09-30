export interface Company {
  id: string;
  name: string;
  regId: string;
  type: 'NGO' | 'Corporate' | 'Government' | 'Research' | 'Private Limited' | 'Corporation';
  location: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'pending_documents';
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  documents: string[];
  // Additional fields for the company approval system
  contactPerson?: string;
  projectType?: string;
  estimatedCredits?: number;
  priority?: 'high' | 'medium' | 'low';
  submissionDate?: string;
  registrationNumber?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface CarbonCredit {
  id: string;
  creditId: string;
  organization: string;
  verifiedCarbon: number;
  blockchainHash: string;
  status: 'active' | 'retired' | 'pending';
  issuanceDate: string;
  projectType: string;
  location: string;
}

export interface MRVReport {
  id: string;
  projectId: string;
  organization: string;
  location: string;
  submissionDate: string;
  geoTaggedImages: string[];
  duplicacyCheck: 'pass' | 'fail';
  anomalyDetected: boolean;
  speciesVerification: 'verified' | 'pending' | 'failed';
  plantationDensity: number;
  carbonSequestration: number;
  status: 'verified' | 'pending' | 'rejected';
}

export interface AuditLog {
  id: string;
  date: string;
  user: string;
  action: string;
  status: 'success' | 'failed' | 'pending';
  notes: string;
  targetId?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  status: 'pending' | 'cleared';
  priority: 'high' | 'medium' | 'low';
  createdDate: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  organization: string;
  type: 'Mangrove Restoration' | 'Seagrass Conservation' | 'Salt Marsh Protection';
  location: {
    lat: number;
    lng: number;
    state: string;
    district: string;
  };
  verifiedCarbon: number;
  status: 'active' | 'completed' | 'monitoring';
  startDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Reviewer' | 'Observer';
  department: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}