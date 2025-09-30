import { Company } from '../types';
import { authService } from './authService';

// Base API URLs
const API_BASE_URL = 'https://blue-carbon-server-production.up.railway.app/api/gov';
const LOCAL_API_BASE_URL = 'http://localhost:5000/api/gov';

// Use production URL by default, fallback to local if needed
const BASE_URL = API_BASE_URL;

// Helper function to get authenticated headers
const getAuthHeaders = (): HeadersInit => {
  const token = authService.getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to handle API responses with auth errors
const handleResponse = async (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    // Token is invalid or expired
    await authService.logout();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const apiService = {
  // GET companies - fetch list of companies pending approval
  async getPendingCompanies(): Promise<Company[]> {
    try {
      const response = await fetch(`${BASE_URL}/pending`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await handleResponse(response);
      
      // Transform the API response to match our Company interface if needed
      return this.transformApiCompanies(data);
    } catch (error) {
      console.error('Error fetching pending companies:', error);
      throw new Error('Failed to fetch pending companies. Please try again later.');
    }
  },

  // POST approval - approve company registration
  async approveCompany(companyId: string, notes?: string): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await fetch(`${BASE_URL}/approve/${companyId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          notes: notes || '',
          approvedAt: new Date().toISOString(),
        }),
      });

      const data = await handleResponse(response);
      
      return { 
        success: true, 
        message: 'Company approved successfully',
        data: data
      };
    } catch (error) {
      console.error('Error approving company:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to approve company. Please try again later.'
      };
    }
  },

  // POST rejection - reject company registration (if needed)
  async rejectCompany(companyId: string, reason?: string): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      // Note: You may need to implement a reject endpoint on the backend
      const response = await fetch(`${BASE_URL}/reject/${companyId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          reason: reason || '',
          rejectedAt: new Date().toISOString(),
        }),
      });

      const data = await handleResponse(response);
      
      return { 
        success: true, 
        message: 'Company rejected successfully',
        data: data
      };
    } catch (error) {
      console.error('Error rejecting company:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to reject company. Please try again later.'
      };
    }
  },

  // Helper method to transform API response to match our interface
  transformApiCompanies(apiData: any[]): Company[] {
    if (!Array.isArray(apiData)) {
      console.warn('API response is not an array:', apiData);
      return [];
    }

    return apiData.map((item: any) => ({
      id: item._id || item.id || '',
      name: item.name || item.companyName || '',
      regId: item.regId || item.registrationNumber || '',
      type: item.type || 'Corporate',
      location: item.location || item.address || '',
      status: item.status || 'pending',
      email: item.email || '',
      phone: item.phone || '',
      address: item.address || item.location || '',
      registrationDate: item.registrationDate || item.createdAt || new Date().toISOString(),
      documents: item.documents || [],
      // Additional fields that might come from API
      contactPerson: item.contactPerson || '',
      projectType: item.projectType || '',
      estimatedCredits: item.estimatedCredits || 0,
      priority: item.priority || 'medium',
      submissionDate: item.submissionDate || item.createdAt || new Date().toISOString(),
    }));
  },

  // Helper method to get all companies (might be needed for other views)
  async getAllCompanies(): Promise<Company[]> {
    // Get pending companies first
    const companies = await this.getPendingCompanies();
    // Note: The backend only provides pending companies endpoint
    // If you need approved companies, you might need to request a new endpoint
    return companies;
  },

  // GET approved companies - filter from all companies or call separate endpoint
  async getApprovedCompanies(): Promise<Company[]> {
    try {
      // Try to get approved companies from a separate endpoint first
      const response = await fetch(`${BASE_URL}/approved`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await handleResponse(response);
        return this.transformApiCompanies(data);
      }
    } catch (error) {
      console.log('Approved endpoint not available, filtering from pending companies');
    }

    // Fallback: Get all companies and filter for approved ones
    try {
      const allCompanies = await this.getPendingCompanies();
      // Filter for approved companies if the API returns mixed statuses
      return allCompanies.filter(company => company.status === 'approved');
    } catch (error) {
      console.error('Error fetching approved companies:', error);
      throw new Error('Failed to fetch approved companies. Please try again later.');
    }
  },

  // GET all companies with status filtering
  async getCompaniesByStatus(status?: string): Promise<Company[]> {
    try {
      // If no specific status requested, get all available
      if (!status) {
        return this.getPendingCompanies();
      }

      // For specific status, try to filter
      const companies = await this.getPendingCompanies();
      return companies.filter(company => company.status === status);
    } catch (error) {
      console.error(`Error fetching companies with status ${status}:`, error);
      throw new Error(`Failed to fetch ${status} companies. Please try again later.`);
    }
  }
};