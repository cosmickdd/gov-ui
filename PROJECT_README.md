# NCCR Admin Portal - Blue Carbon Registry & MRV System

A comprehensive, government-grade admin portal for the National Centre for Coastal Research (NCCR) to oversee, audit, and regulate India's blue carbon projects.

## 🌊 Overview

The NCCR Admin Portal serves as a central command system for managing India's blue carbon registry, featuring blockchain-based carbon credit tokenization, advanced MRV (Monitoring, Reporting & Verification) capabilities, and comprehensive audit trails.

## ✨ Features

### 🏠 Dashboard
- **High-level Metrics**: Total registered organizations, pending approvals, verified projects, carbon credits issued
- **Interactive Charts**: Monthly carbon sequestration trends, project growth analytics
- **State-wise Performance**: Visual representation of carbon capture by Indian states
- **Real-time Activity Feed**: Latest system activities and verifications

### 🏢 Company Approval System (Dynamic)
- **Real-time Company Management**: Powered by GET/POST APIs
- **Approval Workflow**: Approve/reject company registrations with detailed review
- **Document Management**: View and download submitted compliance documents
- **Approval History**: Complete audit trail of all registration decisions

### 📊 MRV Reports (Advanced Analytics)
- **Satellite Verification**: Automated satellite imagery analysis for project validation
- **Geo-tagged Submissions**: Image verification with GPS coordinates
- **Duplicacy Detection**: Advanced algorithms to prevent duplicate site registrations
- **Species Verification**: AI-powered plant species identification for mangroves, seagrass, etc.
- **Anomaly Detection**: Statistical analysis to identify unusual patterns
- **Biomass to Carbon Conversion**: Automated calculations for carbon sequestration

### 🪙 Carbon Credit Registry (Blockchain)
- **Tokenized Credits**: Blockchain-based carbon credit issuance and tracking
- **Immutable Records**: Tamper-proof transaction history
- **Smart Filtering**: Search by organization, credit ID, project type, or location
- **Status Management**: Track active, retired, and pending credits
- **Export Capabilities**: Generate reports in PDF/Excel formats

### 🛡️ Audit & Compliance
- **Immutable Audit Trail**: Complete system activity logging
- **Compliance Monitoring**: Real-time compliance rate tracking (97.2% current rate)
- **User Activity Tracking**: Monitor all user actions and system changes
- **Regulatory Compliance**: IPCC Guidelines, UNFCCC standards adherence
- **Security Monitoring**: Automated security scans and backup verification

## 🛠️ Technical Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS with custom government color scheme
- **Charts**: Recharts for interactive data visualization
- **Maps**: React Leaflet for geographic visualization
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: CRACO for enhanced Create React App configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main application layout
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Header.tsx      # Application header
│   └── UI.tsx          # UI component library
├── pages/              # Application pages
│   ├── Dashboard.tsx
│   ├── CompanyApprovals.tsx
│   ├── MRVReports.tsx
│   ├── CarbonCreditRegistry.tsx
│   └── AuditCompliance.tsx
├── services/           # API service layer
│   └── api.ts         # API integration (GET/POST)
├── data/              # Mock data and constants
│   └── mockData.ts    # Hardcoded application data
├── types/             # TypeScript type definitions
│   └── index.ts       # Interface definitions
└── App.tsx            # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Government trust and authority
- **Secondary**: Gray (#64748b) - Professional neutrality
- **Success**: Green (#10b981) - Environmental positive action
- **Warning**: Yellow (#f59e0b) - Attention and caution
- **Danger**: Red (#ef4444) - Critical issues and errors

## 🔗 API Integration

### Dynamic Endpoints
- **GET /companies**: Fetch pending company approvals
- **POST /approval**: Approve/reject company registration

### Mock Data
All other features use realistic hardcoded data including:
- Carbon credit records with blockchain hashes
- MRV verification reports with geo-tagged data
- Audit logs with comprehensive system tracking
- Project locations with GPS coordinates

## 🌍 Government Compliance

The portal adheres to Indian government standards:
- **Ministry of Earth Sciences** branding and guidelines
- **NCCR** organizational structure and protocols
- **Blue Carbon Initiative** international standards
- **IPCC Guidelines** for carbon measurement
- **UNFCCC** reporting requirements

## 📱 Navigation

The portal includes the following main sections:
- **Dashboard**: Overview and key metrics
- **Company Approvals**: Organization registration management (Dynamic API)
- **MRV Reports**: Monitoring, Reporting & Verification interface
- **Carbon Credits**: Blockchain-based credit registry
- **Audit & Compliance**: System audit trail and compliance monitoring
- **Alerts**: System notifications (Placeholder)
- **Analytics**: Advanced insights dashboard (Placeholder)
- **Project Map**: Geographic project visualization (Placeholder)
- **User Management**: Role-based access control (Placeholder)
- **Settings**: System configuration (Placeholder)

---

**Built with ❤️ for India's Blue Carbon Future**

*Current Status: Development Complete - Ready for Demo*