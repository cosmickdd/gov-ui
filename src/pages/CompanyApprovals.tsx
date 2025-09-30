import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Table } from '../components/UI';
import { Building2, Mail, Phone, MapPin, FileText, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import { Company } from '../types';
import { apiService } from '../services/api';

const CompanyApprovals: React.FC = () => {
  const [pendingCompanies, setPendingCompanies] = useState<Company[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pending, all] = await Promise.all([
        apiService.getPendingCompanies(),
        apiService.getAllCompanies()
      ]);
      setPendingCompanies(pending);
      setAllCompanies(all);
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (company: Company, action: 'approve' | 'reject') => {
    setSelectedCompany(company);
    setActionType(action);
    setShowModal(true);
    setApprovalNotes('');
  };

  const confirmAction = async () => {
    if (!selectedCompany) return;

    try {
      let result;
      if (actionType === 'approve') {
        result = await apiService.approveCompany(selectedCompany.id, approvalNotes);
      } else {
        result = await apiService.rejectCompany(selectedCompany.id, approvalNotes);
      }

      if (result.success) {
        // Refresh data
        await loadData();
        setShowModal(false);
        setSelectedCompany(null);
        setApprovalNotes('');
      }
    } catch (error) {
      console.error('Error updating company status:', error);
    }
  };

  const getStatusBadge = (status: Company['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="info">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: Company['type']) => {
    return <Building2 size={16} className={
      type === 'NGO' ? 'text-green-600' :
      type === 'Corporate' ? 'text-blue-600' :
      type === 'Government' ? 'text-purple-600' :
      'text-orange-600'
    } />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <Card>
            <div className="h-6 bg-secondary-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-secondary-200 rounded"></div>
              <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
              <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending Approvals */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-secondary-900">Pending Company Approvals</h3>
            <p className="text-secondary-600">Organizations awaiting registration approval</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-600" size={20} />
            <span className="text-lg font-semibold text-yellow-600">{pendingCompanies.length}</span>
          </div>
        </div>

        {pendingCompanies.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
            <h4 className="text-lg font-medium text-secondary-900">No Pending Approvals</h4>
            <p className="text-secondary-600">All company registrations have been processed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingCompanies.map((company) => (
              <div key={company.id} className="border border-secondary-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {getTypeIcon(company.type)}
                      <h4 className="text-lg font-semibold text-secondary-900">{company.name}</h4>
                      <Badge variant="info">{company.type}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <Building2 size={16} />
                          <span>Registration ID: {company.regId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <MapPin size={16} />
                          <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <Mail size={16} />
                          <span>{company.email}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <Phone size={16} />
                          <span>{company.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-secondary-600">
                          <FileText size={16} />
                          <span>{company.documents.length} documents submitted</span>
                        </div>
                        <div className="text-sm text-secondary-600">
                          Applied: {new Date(company.registrationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {company.documents.map((doc, index) => (
                        <button
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm hover:bg-blue-100 transition-colors"
                        >
                          <Download size={14} />
                          {doc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAction(company, 'approve')}
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleAction(company, 'reject')}
                    >
                      <XCircle size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Approval History */}
      <Card>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-secondary-900">Approval History</h3>
          <p className="text-secondary-600">Complete record of company registration decisions</p>
        </div>

        <Table headers={['Company Name', 'Registration ID', 'Type', 'Location', 'Applied Date', 'Status']}>
          {allCompanies.map((company) => (
            <tr key={company.id} className="hover:bg-secondary-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getTypeIcon(company.type)}
                  <span className="font-medium text-secondary-900">{company.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                {company.regId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant="info">{company.type}</Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                {company.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                {new Date(company.registrationDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(company.status)}
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* Approval Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              {actionType === 'approve' ? 'Approve' : 'Reject'} Company Registration
            </h3>
            
            <div className="mb-4">
              <p className="text-secondary-600 mb-2">Company: <strong>{selectedCompany.name}</strong></p>
              <p className="text-secondary-600">Registration ID: <strong>{selectedCompany.regId}</strong></p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                {actionType === 'approve' ? 'Approval Notes' : 'Rejection Reason'}
              </label>
              <textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="w-full border border-secondary-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder={actionType === 'approve' ? 'Optional approval notes...' : 'Reason for rejection...'}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant={actionType === 'approve' ? 'success' : 'danger'}
                onClick={confirmAction}
              >
                {actionType === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyApprovals;