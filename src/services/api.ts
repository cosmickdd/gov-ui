import { Company } from '../types';
import { mockCompanies } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // GET companies - fetch list of companies pending approval
  async getCompanies(): Promise<Company[]> {
    await delay(500); // Simulate network delay
    
    // Filter only pending companies for the approval system
    return mockCompanies.filter(company => company.status === 'pending');
  },

  // POST approval - approve or reject company registration
  async updateCompanyStatus(companyId: string, status: 'approved' | 'rejected', notes?: string): Promise<{ success: boolean; message: string }> {
    await delay(300); // Simulate network delay
    
    const company = mockCompanies.find(c => c.id === companyId);
    if (!company) {
      return { success: false, message: 'Company not found' };
    }

    // Update the company status in mock data
    company.status = status;
    
    // In a real implementation, this would make an API call
    console.log(`Company ${companyId} status updated to ${status}`, { notes });
    
    return { 
      success: true, 
      message: `Company ${status === 'approved' ? 'approved' : 'rejected'} successfully` 
    };
  },

  // Helper method to get all companies (for display purposes)
  async getAllCompanies(): Promise<Company[]> {
    await delay(300);
    return [...mockCompanies];
  }
};