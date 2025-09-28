import React, { useState } from 'react';
import { Card, Button, Badge, Table } from '../components/UI';
import { 
  Shield, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  Activity
} from 'lucide-react';
import { mockAuditLogs } from '../data/mockData';
import { AuditLog } from '../types';

const AuditCompliance: React.FC = () => {
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7days');

  // Filter logs based on search and filters
  React.useEffect(() => {
    let filtered = auditLogs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.targetId && log.targetId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(actionFilter.toLowerCase())
      );
    }

    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case '7days':
          filterDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(now.getDate() - 90);
          break;
      }
      
      filtered = filtered.filter(log => new Date(log.date) >= filterDate);
    }

    setFilteredLogs(filtered);
  }, [auditLogs, searchTerm, statusFilter, actionFilter, dateRange]);

  const getStatusBadge = (status: AuditLog['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="info">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: AuditLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'failed':
        return <XCircle className="text-red-600" size={16} />;
      case 'pending':
        return <Clock className="text-yellow-600" size={16} />;
      default:
        return <AlertTriangle className="text-gray-600" size={16} />;
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('Approved')) return 'text-green-600 bg-green-50';
    if (action.includes('Rejected')) return 'text-red-600 bg-red-50';
    if (action.includes('Issued')) return 'text-blue-600 bg-blue-50';
    if (action.includes('Alert')) return 'text-yellow-600 bg-yellow-50';
    return 'text-purple-600 bg-purple-50';
  };

  const successCount = filteredLogs.filter(log => log.status === 'success').length;
  const failedCount = filteredLogs.filter(log => log.status === 'failed').length;
  const pendingCount = filteredLogs.filter(log => log.status === 'pending').length;
  const uniqueUsers = new Set(filteredLogs.map(log => log.user)).size;

  // Mock compliance metrics
  const complianceMetrics = {
    totalChecks: 142,
    passedChecks: 138,
    failedChecks: 4,
    complianceRate: 97.2,
    lastAuditDate: '2024-09-20',
    nextAuditDate: '2024-12-20'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Audit & Compliance</h2>
          <p className="text-secondary-600">Immutable audit trail and compliance monitoring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Audit Log
          </Button>
          <Button variant="primary">
            <Shield size={16} className="mr-2" />
            Generate Compliance Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Successful Actions</p>
              <p className="text-2xl font-bold text-secondary-900">{successCount}</p>
              <p className="text-xs text-secondary-500">completed successfully</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Failed Actions</p>
              <p className="text-2xl font-bold text-secondary-900">{failedCount}</p>
              <p className="text-xs text-secondary-500">require attention</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Pending Actions</p>
              <p className="text-2xl font-bold text-secondary-900">{pendingCount}</p>
              <p className="text-xs text-secondary-500">awaiting completion</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Active Users</p>
              <p className="text-2xl font-bold text-secondary-900">{uniqueUsers}</p>
              <p className="text-xs text-secondary-500">in selected period</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary-900">Compliance Status</h3>
            <Badge variant="success">Compliant</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={16} />
                <span className="font-medium text-green-900">Overall Compliance Rate</span>
              </div>
              <span className="text-xl font-bold text-green-900">{complianceMetrics.complianceRate}%</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <p className="text-lg font-bold text-secondary-900">{complianceMetrics.totalChecks}</p>
                <p className="text-xs text-secondary-600">Total Checks</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-900">{complianceMetrics.passedChecks}</p>
                <p className="text-xs text-green-600">Passed</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-lg font-bold text-red-900">{complianceMetrics.failedChecks}</p>
                <p className="text-xs text-red-600">Failed</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Audit Schedule</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-blue-900">Last Compliance Audit</p>
                <p className="text-sm text-blue-700">{new Date(complianceMetrics.lastAuditDate).toLocaleDateString()}</p>
              </div>
              <CheckCircle className="text-blue-600" size={20} />
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-900">Next Scheduled Audit</p>
                <p className="text-sm text-yellow-700">{new Date(complianceMetrics.nextAuditDate).toLocaleDateString()}</p>
              </div>
              <Calendar className="text-yellow-600" size={20} />
            </div>

            <div className="p-3 bg-secondary-50 rounded-lg">
              <h4 className="font-medium text-secondary-900 mb-2">Compliance Areas</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Data Security & Privacy</span>
                  <Badge variant="success">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Environmental Regulations</span>
                  <Badge variant="success">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Financial Reporting</span>
                  <Badge variant="success">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>International Standards</span>
                  <Badge variant="warning">Under Review</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={16} />
              <input
                type="text"
                placeholder="Search audit logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-secondary-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Activity size={16} className="text-secondary-600" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Actions</option>
              <option value="approval">Approvals</option>
              <option value="verification">Verifications</option>
              <option value="issuance">Credit Issuance</option>
              <option value="alert">Alerts</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-secondary-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Audit Trail */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary-900">Immutable Audit Trail</h3>
          <p className="text-secondary-600">Showing {filteredLogs.length} of {auditLogs.length} audit entries</p>
        </div>

        <Table headers={['Date & Time', 'User', 'Action', 'Status', 'Target ID', 'Notes']}>
          {filteredLogs.map((log) => (
            <tr key={log.id} className="hover:bg-secondary-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-secondary-400" />
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      {new Date(log.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-secondary-500">
                      {new Date(log.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-secondary-400" />
                  <span className="font-medium text-secondary-900">{log.user}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getStatusIcon(log.status)}
                  {getStatusBadge(log.status)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {log.targetId ? (
                  <span className="font-mono text-sm text-primary-600">{log.targetId}</span>
                ) : (
                  <span className="text-secondary-400">—</span>
                )}
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-secondary-700 max-w-xs truncate" title={log.notes}>
                  {log.notes}
                </p>
              </td>
            </tr>
          ))}
        </Table>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-secondary-400 mb-4" size={48} />
            <h4 className="text-lg font-medium text-secondary-900">No Audit Entries Found</h4>
            <p className="text-secondary-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </Card>

      {/* Recent System Events */}
      <Card>
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent System Events</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="text-green-600 mt-0.5" size={16} />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">System backup completed successfully</p>
              <p className="text-xs text-green-700">All data backed up to secure cloud storage</p>
              <p className="text-xs text-green-600 mt-1">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Activity className="text-blue-600 mt-0.5" size={16} />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Security scan completed</p>
              <p className="text-xs text-blue-700">No vulnerabilities detected in system infrastructure</p>
              <p className="text-xs text-blue-600 mt-1">6 hours ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-900">Compliance review scheduled</p>
              <p className="text-xs text-yellow-700">Quarterly compliance audit scheduled for next month</p>
              <p className="text-xs text-yellow-600 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuditCompliance;