import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, MetricCard } from '../components/UI';
import { Building2, FileCheck, Coins, Satellite, TrendingUp, MapPin } from 'lucide-react';
import { mockDashboardMetrics } from '../data/mockData';

const Dashboard: React.FC = () => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const pieData = mockDashboardMetrics.stateWiseData.slice(0, 6).map((item, index) => ({
    name: item.state,
    value: item.carbon,
    color: COLORS[index]
  }));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Registered Organizations"
          value={mockDashboardMetrics.totalOrganizations}
          trend={{ value: 12.5, isPositive: true }}
          icon={<Building2 size={48} />}
        />
        <MetricCard
          title="Pending Approvals"
          value={mockDashboardMetrics.pendingApprovals}
          subtitle="Requires attention"
          icon={<FileCheck size={48} />}
        />
        <MetricCard
          title="Total Verified Projects"
          value={mockDashboardMetrics.totalProjects}
          trend={{ value: 8.3, isPositive: true }}
          icon={<MapPin size={48} />}
        />
        <MetricCard
          title="Carbon Credits Issued"
          value={`${mockDashboardMetrics.carbonCreditsIssued.toLocaleString()} tons`}
          trend={{ value: 15.7, isPositive: true }}
          icon={<Coins size={48} />}
        />
        <MetricCard
          title="Satellite Verification Rate"
          value={`${mockDashboardMetrics.satelliteVerificationRate}%`}
          subtitle="Success rate"
          trend={{ value: 2.1, isPositive: true }}
          icon={<Satellite size={48} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Carbon Sequestration Trend */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Monthly Carbon Sequestration</h3>
              <p className="text-sm text-secondary-600">Verified carbon captured (tons CO2 equivalent)</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockDashboardMetrics.monthlyTrends}>
              <defs>
                <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="carbonSequestration"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#carbonGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Project Growth Trend */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Project Registration Growth</h3>
              <p className="text-sm text-secondary-600">Cumulative verified projects</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockDashboardMetrics.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* State-wise Performance */}
        <Card className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">State-wise Carbon Sequestration</h3>
            <p className="text-sm text-secondary-600">Top performing states by verified carbon capture</p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={mockDashboardMetrics.stateWiseData.slice(0, 8)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="state" type="category" width={100} stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value} tons`, 'Carbon Sequestered']}
              />
              <Bar dataKey="carbon" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Carbon Distribution */}
        <Card>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary-900">Carbon Distribution</h3>
            <p className="text-sm text-secondary-600">By top contributing states</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} tons`, 'Carbon Sequestered']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-secondary-700">{item.name}</span>
                </div>
                <span className="font-medium text-secondary-900">{item.value} tons</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">Recent Activity</h3>
          <p className="text-sm text-secondary-600">Latest system activities and verifications</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-secondary-900">New carbon credits issued</p>
              <p className="text-xs text-secondary-600">NCCR-CC-004 issued for Coastal Conservation Foundation - 89.2 tons CO2</p>
              <p className="text-xs text-secondary-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-secondary-900">MRV verification completed</p>
              <p className="text-xs text-secondary-600">Sundarbans mangrove project verified successfully</p>
              <p className="text-xs text-secondary-500 mt-1">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-secondary-900">Company approval pending</p>
              <p className="text-xs text-secondary-600">BlueTech Industries Pvt Ltd registration requires review</p>
              <p className="text-xs text-secondary-500 mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;