import React, { useState } from 'react';
import { Card, Button, Badge, Table } from '../components/UI';
import { 
  Coins, 
  Download, 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar,
  Building2,
  MapPin,
  Hash,
  Sparkles
} from 'lucide-react';
import { mockCarbonCredits } from '../data/mockData';
import { CarbonCredit } from '../types';

const CarbonCreditRegistry: React.FC = () => {
  const [credits] = useState<CarbonCredit[]>(mockCarbonCredits);
  const [filteredCredits, setFilteredCredits] = useState<CarbonCredit[]>(mockCarbonCredits);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter credits based on search and filters
  React.useEffect(() => {
    let filtered = credits;

    if (searchTerm) {
      filtered = filtered.filter(credit => 
        credit.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.creditId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        credit.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(credit => credit.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(now.getDate() - 90);
          break;
        case '1year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(credit => new Date(credit.issuanceDate) >= filterDate);
    }

    setFilteredCredits(filtered);
  }, [credits, searchTerm, statusFilter, dateFilter]);

  const getStatusBadge = (status: CarbonCredit['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'retired':
        return <Badge variant="info">Retired</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="info">Unknown</Badge>;
    }
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'Mangrove Restoration':
        return 'text-green-600 bg-green-50';
      case 'Seagrass Conservation':
        return 'text-blue-600 bg-blue-50';
      case 'Salt Marsh Protection':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleViewCredit = (credit: CarbonCredit) => {
    setSelectedCredit(credit);
    setShowModal(true);
  };

  const totalCredits = filteredCredits.reduce((sum, credit) => sum + credit.verifiedCarbon, 0);
  const activeCredits = filteredCredits.filter(credit => credit.status === 'active').length;
  const retiredCredits = filteredCredits.filter(credit => credit.status === 'retired').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Carbon Credit Registry</h2>
          <p className="text-secondary-600">Tokenized blue carbon credits on blockchain</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export Registry
          </Button>
          <Button variant="primary">
            <Coins size={16} className="mr-2" />
            Issue New Credits
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Coins className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Total Credits</p>
              <p className="text-2xl font-bold text-secondary-900">{totalCredits.toFixed(1)}</p>
              <p className="text-xs text-secondary-500">tons CO2 equivalent</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Sparkles className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Active Credits</p>
              <p className="text-2xl font-bold text-secondary-900">{activeCredits}</p>
              <p className="text-xs text-secondary-500">available for trading</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Hash className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Retired Credits</p>
              <p className="text-2xl font-bold text-secondary-900">{retiredCredits}</p>
              <p className="text-xs text-secondary-500">permanently retired</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Building2 className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600">Organizations</p>
              <p className="text-2xl font-bold text-secondary-900">
                {new Set(filteredCredits.map(c => c.organization)).size}
              </p>
              <p className="text-xs text-secondary-500">issuing credits</p>
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
                placeholder="Search by organization, credit ID, or location..."
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
              <option value="active">Active</option>
              <option value="retired">Retired</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-secondary-600" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-secondary-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Time</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Credits Table */}
      <Card>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-secondary-900">Issued Carbon Credits</h3>
          <p className="text-secondary-600">Showing {filteredCredits.length} of {credits.length} credits</p>
        </div>

        <Table headers={['Credit ID', 'Organization', 'Verified Carbon', 'Project Type', 'Location', 'Issuance Date', 'Status', 'Actions']}>
          {filteredCredits.map((credit) => (
            <tr key={credit.id} className="hover:bg-secondary-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-secondary-400" />
                  <span className="font-mono text-sm text-primary-600">{credit.creditId}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-secondary-400" />
                  <span className="font-medium text-secondary-900">{credit.organization}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-center">
                  <span className="text-lg font-bold text-green-600">{credit.verifiedCarbon}</span>
                  <p className="text-xs text-secondary-500">tons CO2</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProjectTypeColor(credit.projectType)}`}>
                  {credit.projectType}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm text-secondary-600">
                  <MapPin size={14} />
                  {credit.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                {new Date(credit.issuanceDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(credit.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewCredit(credit)}
                >
                  <ExternalLink size={14} className="mr-1" />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </Table>

        {filteredCredits.length === 0 && (
          <div className="text-center py-12">
            <Coins className="mx-auto text-secondary-400 mb-4" size={48} />
            <h4 className="text-lg font-medium text-secondary-900">No Credits Found</h4>
            <p className="text-secondary-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </Card>

      {/* Credit Detail Modal */}
      {showModal && selectedCredit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-secondary-900">Carbon Credit Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-3">Credit Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Credit ID:</span>
                      <span className="font-mono text-primary-600">{selectedCredit.creditId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Carbon Amount:</span>
                      <span className="font-bold text-green-600">{selectedCredit.verifiedCarbon} tons CO2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Project Type:</span>
                      <span>{selectedCredit.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Status:</span>
                      {getStatusBadge(selectedCredit.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-secondary-900 mb-3">Organization Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Organization:</span>
                      <span className="font-medium">{selectedCredit.organization}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Location:</span>
                      <span>{selectedCredit.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Issuance Date:</span>
                      <span>{new Date(selectedCredit.issuanceDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blockchain Info */}
              <div>
                <h4 className="font-semibold text-secondary-900 mb-3">Blockchain Details</h4>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash size={16} className="text-secondary-600" />
                    <span className="font-medium text-secondary-900">Transaction Hash</span>
                  </div>
                  <p className="font-mono text-sm text-secondary-700 break-all bg-white p-2 rounded border">
                    {selectedCredit.blockchainHash}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-secondary-600">
                    <span>✓ Verified on Blockchain</span>
                    <span>✓ Immutable Record</span>
                    <span>✓ Transparent Tracking</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Download size={16} className="mr-2" />
                  Download Certificate
                </Button>
                <Button variant="primary">
                  <ExternalLink size={16} className="mr-2" />
                  View on Blockchain
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonCreditRegistry;