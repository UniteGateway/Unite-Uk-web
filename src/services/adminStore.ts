import {
  AdminUser,
  AdminRole,
  RolePermissions,
  AdminLead,
  AdminCustomer,
  AdminProject,
  SiteSurvey,
  AdminQuote,
  PpaAgreement,
  LandOpportunity,
  InvestorRecord,
  PartnerEpcRecord,
  TechnologyProduct,
  DocumentRecord,
  TaskRecord,
  CommunicationLogItem,
  AuditLogEntry,
  NotificationItem,
  LeadStatus,
  ProjectStage
} from '../types/adminTypes';
import { FranchiseApplication, FranchiseTerritory } from '../types';
import { FRANCHISE_TERRITORIES_DETAILED } from '../data/franchiseData';

// Storage Keys
const STORAGE_KEYS = {
  CURRENT_USER: 'unite_admin_current_user',
  USERS: 'unite_admin_users',
  LEADS: 'unite_admin_leads',
  CUSTOMERS: 'unite_admin_customers',
  PROJECTS: 'unite_admin_projects',
  SURVEYS: 'unite_admin_surveys',
  QUOTES: 'unite_admin_quotes',
  PPA: 'unite_admin_ppa',
  LAND: 'unite_admin_land',
  INVESTORS: 'unite_admin_investors',
  FRANCHISE: 'unite_admin_franchise',
  TERRITORIES: 'unite_admin_territories',
  PARTNERS: 'unite_admin_partners',
  TECH: 'unite_admin_tech',
  DOCS: 'unite_admin_docs',
  TASKS: 'unite_admin_tasks',
  COMM: 'unite_admin_comm',
  AUDIT: 'unite_admin_audit',
  NOTIFS: 'unite_admin_notifs',
};

export const ROLE_PERMISSIONS: Record<AdminRole, RolePermissions> = {
  SUPER_ADMIN: {
    canViewLeads: true,
    canEditLeads: true,
    canDeleteLeads: true,
    canViewProjects: true,
    canEditProjects: true,
    canApproveProjects: true,
    canCreateQuotes: true,
    canApproveQuotes: true,
    canViewFinancials: true,
    canManageFranchise: true,
    canManageTerritories: true,
    canManageUsers: true,
    canExportData: true,
    canViewAuditLogs: true,
  },
  ADMIN: {
    canViewLeads: true,
    canEditLeads: true,
    canDeleteLeads: true,
    canViewProjects: true,
    canEditProjects: true,
    canApproveProjects: true,
    canCreateQuotes: true,
    canApproveQuotes: true,
    canViewFinancials: true,
    canManageFranchise: true,
    canManageTerritories: true,
    canManageUsers: false,
    canExportData: true,
    canViewAuditLogs: true,
  },
  SALES: {
    canViewLeads: true,
    canEditLeads: true,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: false,
    canApproveProjects: false,
    canCreateQuotes: true,
    canApproveQuotes: false,
    canViewFinancials: false,
    canManageFranchise: true,
    canManageTerritories: false,
    canManageUsers: false,
    canExportData: true,
    canViewAuditLogs: false,
  },
  PROJECT_MANAGER: {
    canViewLeads: true,
    canEditLeads: false,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: true,
    canApproveProjects: true,
    canCreateQuotes: false,
    canApproveQuotes: false,
    canViewFinancials: false,
    canManageFranchise: false,
    canManageTerritories: false,
    canManageUsers: false,
    canExportData: true,
    canViewAuditLogs: false,
  },
  ENGINEERING: {
    canViewLeads: true,
    canEditLeads: false,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: true,
    canApproveProjects: false,
    canCreateQuotes: false,
    canApproveQuotes: false,
    canViewFinancials: false,
    canManageFranchise: false,
    canManageTerritories: false,
    canManageUsers: false,
    canExportData: false,
    canViewAuditLogs: false,
  },
  FINANCE: {
    canViewLeads: false,
    canEditLeads: false,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: false,
    canApproveProjects: false,
    canCreateQuotes: true,
    canApproveQuotes: true,
    canViewFinancials: true,
    canManageFranchise: true,
    canManageTerritories: false,
    canManageUsers: false,
    canExportData: true,
    canViewAuditLogs: true,
  },
  FRANCHISE_MANAGER: {
    canViewLeads: true,
    canEditLeads: true,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: false,
    canApproveProjects: false,
    canCreateQuotes: false,
    canApproveQuotes: false,
    canViewFinancials: false,
    canManageFranchise: true,
    canManageTerritories: true,
    canManageUsers: false,
    canExportData: true,
    canViewAuditLogs: false,
  },
  PARTNER: {
    canViewLeads: true,
    canEditLeads: true,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: false,
    canApproveProjects: false,
    canCreateQuotes: false,
    canApproveQuotes: false,
    canViewFinancials: false,
    canManageFranchise: false,
    canManageTerritories: false,
    canManageUsers: false,
    canExportData: false,
    canViewAuditLogs: false,
  },
  VIEW_ONLY: {
    canViewLeads: true,
    canEditLeads: false,
    canDeleteLeads: false,
    canViewProjects: true,
    canEditProjects: false,
    canApproveProjects: false,
    canCreateQuotes: false,
    canApproveQuotes: false,
    canViewFinancials: false,
    canManageFranchise: false,
    canManageTerritories: false,
    canManageUsers: false,
    canExportData: false,
    canViewAuditLogs: false,
  },
};

// Seed Admin Users
export const SEED_USERS: AdminUser[] = [
  {
    id: 'USR-001',
    name: 'Alistair Montgomery',
    email: 'alistair.montgomery@unitegreentech.com',
    role: 'SUPER_ADMIN',
    department: 'Executive Leadership',
    lastLogin: '2026-08-18 13:45:10',
    isActive: true,
    phone: '+44 203 034 1066',
    mfaEnabled: true,
  },
  {
    id: 'USR-002',
    name: 'Dr. Helen Vance',
    email: 'helen.vance@unitegreentech.com',
    role: 'ENGINEERING',
    department: 'Grid & High Voltage Engineering',
    lastLogin: '2026-08-18 11:20:00',
    isActive: true,
    phone: '+44 7700 900144',
    mfaEnabled: true,
  },
  {
    id: 'USR-003',
    name: 'Oliver St. John',
    email: 'oliver.stjohn@unitegreentech.com',
    role: 'SALES',
    department: 'Commercial PPA Origination',
    lastLogin: '2026-08-18 14:02:45',
    isActive: true,
    phone: '+44 7700 900188',
    mfaEnabled: false,
  },
  {
    id: 'USR-004',
    name: 'Fiona Macintyre',
    email: 'fiona.m@unitegreentech.com',
    role: 'PROJECT_MANAGER',
    department: 'Renewable EPC Delivery',
    lastLogin: '2026-08-18 09:15:30',
    isActive: true,
    phone: '+44 7700 900211',
    mfaEnabled: true,
  },
  {
    id: 'USR-005',
    name: 'David Sterling',
    email: 'david.sterling@unitegreentech.com',
    role: 'FRANCHISE_MANAGER',
    department: 'UK Territory & Network Expansion',
    lastLogin: '2026-08-18 12:50:18',
    isActive: true,
    phone: '+44 7700 900330',
    mfaEnabled: true,
  },
];

// Seed Leads
export const SEED_LEADS: AdminLead[] = [
  {
    id: 'LEAD-2026-089',
    createdAt: '2026-08-18 10:14:00',
    updatedAt: '2026-08-18 11:30:00',
    name: 'Arthur Pendelton',
    company: 'Northampton Cold Storage Logistics Ltd',
    email: 'a.pendelton@northcoldlogistics.co.uk',
    phone: '+44 1604 883920',
    location: 'Daventry International Rail Freight Terminal',
    region: 'East Midlands',
    leadType: 'Industrial',
    technology: 'solar-pv',
    estimatedCapacityKw: 2400,
    businessModel: 'Zero-CAPEX Corporate PPA',
    status: 'PROPOSAL',
    assignedTo: 'Oliver St. John',
    source: 'Website Solar Sizing Calculator',
    propertyType: 'Cold Storage Distribution Warehouse',
    energyRequirementAnnualKwh: 3100000,
    monthlyBillGbp: 68000,
    notes: 'Urgent requirement to hedge against summer refrigeration peak demand. 18,000m² curved trapezoidal metal deck.',
    activities: [
      {
        id: 'ACT-01',
        type: 'CREATED',
        title: 'Lead Originated Online',
        description: 'Client completed Web Solar Feasibility Assessment requesting 2.4 MWp PPA.',
        timestamp: '2026-08-18 10:14:00',
        user: 'System'
      },
      {
        id: 'ACT-02',
        type: 'CALL',
        title: 'Initial Discovery Call',
        description: 'Discussed G99 export limitation vs behind-the-meter 100% self-consumption.',
        timestamp: '2026-08-18 11:30:00',
        user: 'Oliver St. John'
      }
    ]
  },
  {
    id: 'LEAD-2026-088',
    createdAt: '2026-08-17 15:42:00',
    updatedAt: '2026-08-18 09:20:00',
    name: 'Sarah Jenkins',
    company: 'Avon Precision Engineering Works',
    email: 's.jenkins@avonprecision.co.uk',
    phone: '+44 117 496 0883',
    location: 'Avonmouth Industrial Estate, Bristol',
    region: 'South West',
    leadType: 'Commercial',
    technology: 'solar-pv',
    estimatedCapacityKw: 850,
    businessModel: 'CAPEX Turnkey with Asset Finance',
    status: 'SITE_SURVEY',
    assignedTo: 'Fiona Macintyre',
    source: 'Franchise Partner Referral (Bristol & Bath)',
    propertyType: 'Heavy CNC Machine Shop',
    energyRequirementAnnualKwh: 1250000,
    monthlyBillGbp: 28500,
    notes: 'Requires 400 kVA battery storage integration to eliminate night-shift maximum demand surcharges.',
    activities: [
      {
        id: 'ACT-03',
        type: 'CREATED',
        title: 'Partner Referral Received',
        description: 'Logged by Bristol Franchise Partner.',
        timestamp: '2026-08-17 15:42:00',
        user: 'David Sterling'
      },
      {
        id: 'ACT-04',
        type: 'SITE_SURVEY',
        title: 'Site Survey Dispatched',
        description: 'Surveyor assigned to inspect 11kV transformer and asbestos-free roof claddings.',
        timestamp: '2026-08-18 09:20:00',
        user: 'Fiona Macintyre'
      }
    ]
  },
  {
    id: 'LEAD-2026-087',
    createdAt: '2026-08-16 11:10:00',
    updatedAt: '2026-08-17 14:00:00',
    name: 'Sir Charles Hetherton',
    company: 'Wessex Land & Estate Trust',
    email: 'estate.office@hethertontrust.co.uk',
    phone: '+44 1962 840912',
    location: 'Romsey, Hampshire',
    region: 'South East & London',
    leadType: 'Landowner',
    technology: 'solar-pv',
    estimatedCapacityKw: 15000,
    businessModel: 'Utility Land Lease Option (£1,250/acre/yr)',
    status: 'QUALIFIED',
    assignedTo: 'Oliver St. John',
    source: 'Direct Landowner Submission',
    propertyType: 'Grade 3B Agricultural Land (65 Acres)',
    notes: 'Land borders SSEN 33kV overhead circuit with 18 MVA headroom verified informally.',
    activities: [
      {
        id: 'ACT-05',
        type: 'CREATED',
        title: 'Land Submission Received',
        description: '65-acre site submitted for utility solar & storage.',
        timestamp: '2026-08-16 11:10:00',
        user: 'System'
      }
    ]
  },
  {
    id: 'LEAD-2026-086',
    createdAt: '2026-08-15 08:30:00',
    updatedAt: '2026-08-18 13:00:00',
    name: 'Michael Chang',
    company: 'Apex Data Centre Campus',
    email: 'mchang@apexdatacentres.eu',
    phone: '+44 207 946 0992',
    location: 'Slough Trading Estate, Berkshire',
    region: 'South East & London',
    leadType: 'Corporate',
    technology: 'bess',
    estimatedCapacityKw: 10000,
    businessModel: 'Zero-CAPEX Corporate PPA + Microgrid',
    status: 'NEGOTIATION',
    assignedTo: 'Alistair Montgomery',
    source: 'Direct Enterprise Enquiries',
    propertyType: 'Tier-3 Data Centre Facility',
    energyRequirementAnnualKwh: 45000000,
    monthlyBillGbp: 640000,
    notes: '20 MWh BESS peak shaving system combined with offsite virtual PPA matching.',
    activities: []
  },
  {
    id: 'LEAD-2026-085',
    createdAt: '2026-08-14 16:45:00',
    updatedAt: '2026-08-15 10:10:00',
    name: 'Rupert Davies',
    company: 'Severnside Agro-Food Packaging',
    email: 'rdavies@severnsideagro.com',
    phone: '+44 1452 720811',
    location: 'Gloucester Business Park',
    region: 'South West',
    leadType: 'Commercial',
    technology: 'solar-pv',
    estimatedCapacityKw: 620,
    businessModel: 'CAPEX Turnkey',
    status: 'NEW',
    assignedTo: 'Oliver St. John',
    source: 'Website Contact Form',
    propertyType: 'Food Processing Plant',
    monthlyBillGbp: 19500,
    notes: 'Planning to submit G99 Fast Track for 620 kWp rooftop installation.',
    activities: []
  }
];

// Seed Customers
export const SEED_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'CUST-001',
    companyName: 'Northampton Cold Storage Logistics Ltd',
    contactName: 'Arthur Pendelton',
    email: 'a.pendelton@northcoldlogistics.co.uk',
    phone: '+44 1604 883920',
    category: 'Industrial',
    billingAddress: 'DIRFT Phase II, Crick, Northamptonshire NN6 7GZ',
    sitesCount: 2,
    activeProjectsCount: 1,
    totalCapacityKw: 2400,
    contractsCount: 1,
    invoicesCount: 0,
    omStatus: 'PENDING',
    accountManager: 'Oliver St. John',
    createdAt: '2026-07-10',
    notes: 'Tier-1 temperature-controlled UK supply chain hub.'
  },
  {
    id: 'CUST-002',
    companyName: 'Midlands Automotive Precision Components',
    contactName: 'Trevor Braithwaite',
    email: 't.braithwaite@midlands-auto.co.uk',
    phone: '+44 121 788 4000',
    category: 'Corporate',
    billingAddress: 'Tyseley Energy Park, Birmingham B11 2FE',
    sitesCount: 3,
    activeProjectsCount: 2,
    totalCapacityKw: 4100,
    contractsCount: 2,
    invoicesCount: 14,
    omStatus: 'ACTIVE',
    accountManager: 'Fiona Macintyre',
    createdAt: '2025-11-20',
    notes: 'High-voltage connected Tier-1 EV battery stamping plant.'
  },
  {
    id: 'CUST-003',
    companyName: 'St. Jude Health & NHS Foundation Trust Hospital',
    contactName: 'Claire Redknapp',
    email: 'claire.redknapp@stjude-nhs.gov.uk',
    phone: '+44 208 900 3411',
    category: 'Institution',
    billingAddress: 'Parkside Way, Southall, Middlesex UB1 3QJ',
    sitesCount: 1,
    activeProjectsCount: 1,
    totalCapacityKw: 1200,
    contractsCount: 1,
    invoicesCount: 6,
    omStatus: 'ACTIVE',
    accountManager: 'Oliver St. John',
    createdAt: '2026-02-14',
    notes: 'NHS Public Sector Decarbonisation Scheme (PSDS) co-funded project.'
  }
];

// Seed Projects
export const SEED_PROJECTS: AdminProject[] = [
  {
    id: 'PROJ-UK-2026-014',
    name: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    customerId: 'CUST-001',
    customerName: 'Northampton Cold Storage Logistics Ltd',
    location: 'Daventry DIRFT Logistics Park, Northamptonshire',
    region: 'East Midlands',
    technology: 'solar-pv',
    capacityKw: 2400,
    developmentStage: 'DESIGN',
    commercialModel: 'PPA',
    projectManager: 'Fiona Macintyre',
    status: 'ON_TRACK',
    estimatedCompletionDate: '2026-11-30',
    contractValueGbp: 1860000,
    annualYieldMwh: 2280,
    co2OffsetTonnesAnnual: 480,
    timeline: [
      { stage: 'OPPORTUNITY', label: 'Commercial Origination', state: 'COMPLETE', completedAt: '2026-06-15' },
      { stage: 'FEASIBILITY', label: 'Yield & Structural Audit', state: 'COMPLETE', completedAt: '2026-07-02' },
      { stage: 'SITE_ASSESSMENT', label: 'Detailed 3D LiDAR Survey', state: 'COMPLETE', completedAt: '2026-07-28' },
      { stage: 'DESIGN', label: 'SLD & Electrical Engineering', state: 'CURRENT', targetDate: '2026-08-30' },
      { stage: 'DNO_GRID', label: 'National Grid G99 Formal Offer', state: 'PENDING', targetDate: '2026-09-20' },
      { stage: 'PLANNING', label: 'Permitted Development Notice', state: 'PENDING', targetDate: '2026-09-15' },
      { stage: 'FINANCE', label: 'PPA SPV Financial Close', state: 'PENDING', targetDate: '2026-09-30' },
      { stage: 'PROCUREMENT', label: 'Module & Inverter Batch Order', state: 'PENDING', targetDate: '2026-10-05' },
      { stage: 'INSTALLATION', label: 'Mechanical & DC/AC Build', state: 'PENDING', targetDate: '2026-11-15' },
      { stage: 'COMMISSIONING', label: 'G99 Witness Testing & COD', state: 'PENDING', targetDate: '2026-11-30' },
      { stage: 'OM', label: '25-Yr Performance Guarantee', state: 'PENDING', targetDate: '2026-12-01' }
    ],
    dnoStatus: {
      dnoName: 'National Grid Electricity Distribution (East Midlands)',
      applicationType: 'G99',
      exportCapacityKw: 1500,
      importCapacityKw: 3200,
      quoteReceived: true,
      quoteValueGbp: 24500,
      gridStatus: 'FEASIBILITY_OFFER'
    },
    planningStatus: {
      type: 'PERMITTED_DEVELOPMENT',
      authority: 'West Northamptonshire Council',
      applicationRef: 'WNC/2026/SOL/0912',
      status: 'SUBMITTED'
    },
    createdAt: '2026-06-15',
    updatedAt: '2026-08-18'
  },
  {
    id: 'PROJ-UK-2026-008',
    name: 'Tyseley Advanced Manufacturing Solar + Storage Microgrid',
    customerId: 'CUST-002',
    customerName: 'Midlands Automotive Precision Components',
    location: 'Tyseley Energy Park, Birmingham',
    region: 'West Midlands',
    technology: 'solar-pv',
    capacityKw: 1750,
    developmentStage: 'INSTALLATION',
    commercialModel: 'CAPEX',
    projectManager: 'Fiona Macintyre',
    status: 'ON_TRACK',
    estimatedCompletionDate: '2026-09-25',
    contractValueGbp: 1420000,
    annualYieldMwh: 1690,
    co2OffsetTonnesAnnual: 355,
    timeline: [
      { stage: 'OPPORTUNITY', label: 'Commercial Origination', state: 'COMPLETE', completedAt: '2025-11-10' },
      { stage: 'FEASIBILITY', label: 'Feasibility Assessment', state: 'COMPLETE', completedAt: '2025-12-05' },
      { stage: 'SITE_ASSESSMENT', label: 'Structural Inspection', state: 'COMPLETE', completedAt: '2026-01-18' },
      { stage: 'DESIGN', label: 'Full Detailed Engineering', state: 'COMPLETE', completedAt: '2026-02-28' },
      { stage: 'DNO_GRID', label: 'G99 Export Agreement Signed', state: 'COMPLETE', completedAt: '2026-04-10' },
      { stage: 'FINANCE', label: 'CAPEX Milestone Tranche 1', state: 'COMPLETE', completedAt: '2026-05-15' },
      { stage: 'PROCUREMENT', label: 'TOPCon Panels On-Site', state: 'COMPLETE', completedAt: '2026-06-20' },
      { stage: 'INSTALLATION', label: 'Rooftop Mounting & Cabling', state: 'CURRENT', targetDate: '2026-09-10' },
      { stage: 'COMMISSIONING', label: 'Final DNO Energisation', state: 'PENDING', targetDate: '2026-09-25' },
      { stage: 'OM', label: 'Continuous Telemetry', state: 'PENDING', targetDate: '2026-10-01' }
    ],
    createdAt: '2025-11-10',
    updatedAt: '2026-08-18'
  },
  {
    id: 'PROJ-UK-2026-003',
    name: 'St. Jude Hospital Net Zero Solar Canopy & Rooftop',
    customerId: 'CUST-003',
    customerName: 'St. Jude Health & NHS Foundation Trust Hospital',
    location: 'Southall, Greater London',
    region: 'South East & London',
    technology: 'solar-pv',
    capacityKw: 1200,
    developmentStage: 'OM',
    commercialModel: 'RESCO',
    projectManager: 'Fiona Macintyre',
    status: 'COMPLETED',
    estimatedCompletionDate: '2026-06-30',
    contractValueGbp: 980000,
    annualYieldMwh: 1140,
    co2OffsetTonnesAnnual: 240,
    timeline: [
      { stage: 'OPPORTUNITY', label: 'NHS PSDS Bid', state: 'COMPLETE' },
      { stage: 'FEASIBILITY', label: 'Feasibility Confirmed', state: 'COMPLETE' },
      { stage: 'SITE_ASSESSMENT', label: 'Survey Complete', state: 'COMPLETE' },
      { stage: 'DESIGN', label: 'Design Approved', state: 'COMPLETE' },
      { stage: 'DNO_GRID', label: 'UKPN G99 Approved', state: 'COMPLETE' },
      { stage: 'PLANNING', label: 'Hospital Estates Consent', state: 'COMPLETE' },
      { stage: 'FINANCE', label: 'Grant Funded', state: 'COMPLETE' },
      { stage: 'PROCUREMENT', label: 'Tier-1 Hardware Delivered', state: 'COMPLETE' },
      { stage: 'INSTALLATION', label: 'Mechanical & Electrical', state: 'COMPLETE' },
      { stage: 'COMMISSIONING', label: 'Energised & Handed Over', state: 'COMPLETE', completedAt: '2026-06-30' },
      { stage: 'OM', label: 'Live SCADA Telemetry', state: 'CURRENT', completedAt: '2026-07-01' }
    ],
    createdAt: '2026-01-15',
    updatedAt: '2026-08-18'
  }
];

// Seed Site Surveys
export const SEED_SURVEYS: SiteSurvey[] = [
  {
    id: 'SURV-2026-042',
    projectId: 'PROJ-UK-2026-014',
    projectName: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    customerName: 'Northampton Cold Storage Logistics Ltd',
    surveyor: 'Gareth Evans, CEng MIET',
    date: '2026-07-28',
    propertyType: 'High-Bay Distribution Warehouse',
    roofType: 'Trapezoidal Metal Profile (0.7mm Steel)',
    roofAreaSqMeters: 18500,
    orientation: 'South-South-West (195°)',
    pitchDegrees: 6,
    shadingAnalysis: 'NONE',
    electricalSystem: '3-Phase 11kV Substation On-Site (2x 1.5 MVA TX)',
    transformerRatingKva: 3000,
    mainSwitchboardCondition: 'EXCELLENT',
    meterMpan: '12 0001 2345 678',
    dnoSubstationName: 'DIRFT Central Substation 33/11kV',
    structuralNotes: 'Structural purlins spaced at 1.8m intervals. Tested load capacity 16.5 kg/m² exceeds module + mounting dead load (11.8 kg/m²). No reinforcement required.',
    generalNotes: 'Roof ladder access installed with permanent fall-arrest safety line. High clearance for DC cabling tray to central switchroom.',
    photos: [
      {
        id: 'PHT-01',
        category: 'ROOF',
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        caption: 'Wide expanse of southern pitch on Bay 4',
        uploadedAt: '2026-07-28'
      },
      {
        id: 'PHT-02',
        category: 'ELECTRICAL',
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        caption: 'Main LV switchroom board and spare breaker compartment',
        uploadedAt: '2026-07-28'
      }
    ],
    status: 'COMPLETED'
  }
];

// Seed Quotes
export const SEED_QUOTES: AdminQuote[] = [
  {
    id: 'QUOTE-2026-108',
    quoteNumber: 'UG-Q-2026-0814',
    customerId: 'CUST-001',
    customerName: 'Northampton Cold Storage Logistics Ltd',
    customerEmail: 'a.pendelton@northcoldlogistics.co.uk',
    projectId: 'PROJ-UK-2026-014',
    projectName: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    location: 'Daventry DIRFT Logistics Park, Northamptonshire',
    systemSizeKw: 2400,
    technology: 'solar-pv',
    commercialModel: 'PPA',
    items: [
      { id: 'QI-01', category: 'MODULES', description: 'Tier-1 580W N-Type TOPCon Glass-Glass Bifacial Solar Panels (4,138 modules)', quantity: 4138, unit: 'pcs', unitPriceGbp: 135, totalGbp: 558630 },
      { id: 'QI-02', category: 'INVERTER', description: 'Tier-1 125kW High-Efficiency Commercial String Inverters (18 units)', quantity: 18, unit: 'units', unitPriceGbp: 4800, totalGbp: 86400 },
      { id: 'QI-03', category: 'MOUNTING', description: 'Non-penetrating Aerodynamic Clamp-Fix Mounting System for Trapezoidal Roof', quantity: 2400, unit: 'kWp', unitPriceGbp: 42, totalGbp: 100800 },
      { id: 'QI-04', category: 'BOS', description: 'UV-resistant DC Solar Cables, Combiner Boxes, Surge Arresters, Isolation & Trays', quantity: 1, unit: 'lot', unitPriceGbp: 64000, totalGbp: 64000 },
      { id: 'QI-05', category: 'INSTALLATION', description: 'Full Mechanical & Electrical Installation, Scaffolding, Cherry Pickers, Health & Safety CDM', quantity: 1, unit: 'project', unitPriceGbp: 185000, totalGbp: 185000 },
      { id: 'QI-06', category: 'ENGINEERING', description: 'DNO G99 Commissioning, Structural Wind/Snow Calculations, 3D BIM Modeling & As-Built SLDs', quantity: 1, unit: 'service', unitPriceGbp: 38500, totalGbp: 38500 },
      { id: 'QI-07', category: 'OM', description: '25-Year Performance Guarantee, Automated SCADA Monitoring & Scheduled Annual Clean/Servicing', quantity: 25, unit: 'years', unitPriceGbp: 14000, totalGbp: 350000 }
    ],
    subtotalGbp: 1383330,
    taxRatePct: 0, // Commercial zero-rated PPA setup
    taxAmountGbp: 0,
    totalGbp: 1383330,
    ppaRatePencePerKwh: 16.8,
    ppaTermYears: 20,
    ppaEstimatedAnnualSavingsGbp: 185000,
    validUntil: '2026-09-30',
    status: 'SENT',
    issuedBy: 'Oliver St. John',
    createdAt: '2026-08-10',
    termsAndConditions: 'Pricing valid for 45 calendar days. Commercial PPA indexed to CPI annually with a 2.0% floor and 4.0% collar.'
  }
];

// Seed PPAs
export const SEED_PPAS: PpaAgreement[] = [
  {
    id: 'PPA-UK-2026-009',
    customerName: 'Northampton Cold Storage Logistics Ltd',
    customerId: 'CUST-001',
    projectName: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    projectId: 'PROJ-UK-2026-014',
    capacityKw: 2400,
    contractTermYears: 20,
    initialTariffPencePerKwh: 16.8,
    gridImportReferenceTariffPencePerKwh: 27.5,
    escalationType: 'CPI',
    escalationValuePct: 2.5,
    startDate: '2026-12-01',
    endDate: '2046-11-30',
    estimatedAnnualGenerationKwh: 2280000,
    annualCustomerSavingsGbp: 243960,
    paymentStructure: 'MONTHLY_METERED',
    status: 'NEGOTIATION',
    assignedManager: 'Oliver St. John',
    contracts: [
      { name: 'Head of Terms — Unite Solar PPA v3.2.pdf', url: '#' },
      { name: 'Legal Lease & Airspace Easement Draft.pdf', url: '#' }
    ],
    notes: 'Zero-CAPEX structure. Client saves £240k+ in Year 1 with zero balance sheet debt.'
  }
];

// Seed Land Opportunities
export const SEED_LAND: LandOpportunity[] = [
  {
    id: 'LAND-2026-018',
    ownerName: 'Wessex Land & Estate Trust (Sir Charles Hetherton)',
    ownerContact: '+44 1962 840912 / estate.office@hethertontrust.co.uk',
    location: 'Romsey, Hampshire',
    postcode: 'SO51 0GH',
    region: 'South East & London',
    areaHectares: 26.3,
    areaAcres: 65,
    technology: 'SOLAR',
    targetCapacityMw: 15,
    gridProximityKm: 1.2,
    gridStatus: 'SUBSTATION_IDENTIFIED',
    planningStatus: 'PRE_APP_SUBMITTED',
    landStatus: 'OPTION_TO_LEASE_SIGNED',
    developmentStage: 'GRID',
    indicativeLeaseGbpPerAcreAnnual: 1250,
    notes: 'G99 connection application lodged with Scottish & Southern Electricity Networks (SSEN). Topography flat, low agricultural quality Grade 3b.',
    createdAt: '2026-08-16'
  },
  {
    id: 'LAND-2026-017',
    ownerName: 'Cairngorm Farming Holdings Ltd',
    ownerContact: 'ian.fraser@cairngormfarming.scot',
    location: 'Aberdeenshire Coastal Corridor, Scotland',
    postcode: 'AB42 3JN',
    region: 'Scotland',
    areaHectares: 80,
    areaAcres: 197.6,
    technology: 'HYBRID',
    targetCapacityMw: 35,
    gridProximityKm: 3.5,
    gridStatus: 'ACCEPTED_CONNECTION',
    planningStatus: 'FULL_PLANNING_GRANTED',
    landStatus: 'OPTION_TO_LEASE_SIGNED',
    developmentStage: 'DEVELOPMENT',
    indicativeLeaseGbpPerAcreAnnual: 1400,
    notes: 'Combined 20 MW Solar PV + 15 MW Wind turbine farm with 10 MW BESS smoothing.',
    createdAt: '2026-05-12'
  }
];

// Seed Investors
export const SEED_INVESTORS: InvestorRecord[] = [
  {
    id: 'INV-2026-004',
    investorName: 'Lord Marcus Sterling',
    companyName: 'Albion Clean Energy Infrastructure Fund',
    email: 'investments@albioncleanenergy.co.uk',
    phone: '+44 207 183 9044',
    investmentRangeGbp: '£20M–£50M',
    preferredTechnology: ['SOLAR', 'BESS', 'HYBRID'],
    preferredRegions: ['South East & London', 'East Midlands', 'South West'],
    investmentType: 'EQUITY',
    status: 'ACTIVE_PORTFOLIO',
    activeDeploymentsCount: 3,
    totalDeployedGbp: 28500000,
    accountManager: 'Alistair Montgomery',
    notes: 'Institutional ESG fund focused on long-term corporate PPA cashflow yields.'
  }
];

// Seed Partners & EPCs
export const SEED_PARTNERS: PartnerEpcRecord[] = [
  {
    id: 'PART-2026-012',
    companyName: 'Highland & Border Renewable Engineering EPC',
    contactName: 'Callum MacLeod',
    email: 'callum@highlandrenewables.co.uk',
    phone: '+44 141 552 9011',
    partnerType: 'EPC',
    region: 'Scotland',
    capabilities: ['HV Substation Build', 'Ground-Mount Civil Engineering', 'G99 Certified Testing'],
    technology: ['solar-pv', 'bess', 'onshore-wind'],
    status: 'ACTIVE',
    accreditations: ['NICEIC Approved Contractor', 'MCS Accredited', 'ISO 9001:2015', 'Achilles UVDB'],
    insuranceValidUntil: '2027-04-30',
    agreementStatus: 'SIGNED_MSA',
    notes: 'Prime Scottish regional construction partner for 5MW+ installations.'
  },
  {
    id: 'PART-2026-011',
    companyName: 'Severnside Solar & Electrical Ltd',
    contactName: 'Brian Davies',
    email: 'brian@severnsidesolar.com',
    phone: '+44 117 382 1000',
    partnerType: 'Installer',
    region: 'South West',
    capabilities: ['Commercial Rooftop PV', 'Battery Retrofit', 'DC Safety Auditing'],
    technology: ['solar-pv', 'bess'],
    status: 'ACTIVE',
    accreditations: ['MCS Certified', 'CHAS Premium Plus', 'SafeContractor'],
    insuranceValidUntil: '2026-12-31',
    agreementStatus: 'SIGNED_MSA',
    notes: 'Specialist commercial installer for Avon, Somerset and Devon sites.'
  }
];

// Seed Technology Products
export const SEED_TECH: TechnologyProduct[] = [
  {
    id: 'TECH-MOD-001',
    manufacturer: 'Tier-1 Global PV Manufacturer',
    productName: 'Ultra-Black 585W N-Type TOPCon Glass-Glass Bifacial',
    category: 'Solar Modules',
    specification: '585Wp Output | 22.7% Module Efficiency | Bifaciality up to 80% | 144 Half-cut cells',
    efficiencyOrRating: '22.7%',
    warrantyYears: 30,
    certifications: ['IEC 61215', 'IEC 61730', 'MCS 005', 'TUV Rheinland', 'Class A Fire'],
    datasheetUrl: '#',
    originCountry: 'Germany / Tier-1 Global Hub',
    regionAvailability: ['UK Nationwide', 'Europe'],
    status: 'APPROVED'
  },
  {
    id: 'TECH-INV-001',
    manufacturer: 'Tier-1 String Inverter Specialist',
    productName: '125kW High-Power Three-Phase Commercial Inverter',
    category: 'Inverters',
    specification: '125kW Rated Output | 9 MPPTs | 99.0% Max Efficiency | Built-in AFCI & Smart IV Curve',
    efficiencyOrRating: '99.0%',
    warrantyYears: 10,
    certifications: ['ENA G99 Type Tested', 'EN 50549-1', 'IEC 62109-1/2', 'CE'],
    datasheetUrl: '#',
    originCountry: 'Europe / Global',
    regionAvailability: ['UK Nationwide'],
    status: 'APPROVED'
  },
  {
    id: 'TECH-BES-001',
    manufacturer: 'Tier-1 Industrial BESS Provider',
    productName: '2.0 MWh Liquid-Cooled C&I Lithium Iron Phosphate Container',
    category: 'BESS',
    specification: '2,000 kWh Capacity | 1,000 kW Power | LFP Chemistry | Integrated Aerosol Fire Suppression',
    efficiencyOrRating: '91% Round-Trip',
    warrantyYears: 15,
    certifications: ['UL 9540A', 'IEC 62619', 'UN 38.3', 'G99 Grid Code Compliant'],
    datasheetUrl: '#',
    originCountry: 'Tier-1 Global',
    regionAvailability: ['UK Nationwide'],
    status: 'APPROVED'
  }
];

// Seed Documents
export const SEED_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-2026-099',
    title: 'Daventry DIRFT Solar PV Single Line Diagram (SLD) Rev E',
    filename: 'DIRFT_Phase1_Solar_SLD_RevE.pdf',
    fileSizeBytes: 3450000,
    fileType: 'PDF',
    category: 'Engineering',
    relatedEntityId: 'PROJ-UK-2026-014',
    relatedEntityName: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    uploadedBy: 'Dr. Helen Vance',
    uploadedAt: '2026-08-15 16:30:00',
    version: 'v5.0',
    isPrivate: true,
    downloadUrl: '#'
  },
  {
    id: 'DOC-2026-098',
    title: 'National Grid G99 Feasibility Letter & Connection Terms',
    filename: 'NationalGrid_G99_EastMidlands_DIRFT.pdf',
    fileSizeBytes: 1820000,
    fileType: 'PDF',
    category: 'Grid',
    relatedEntityId: 'PROJ-UK-2026-014',
    relatedEntityName: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    uploadedBy: 'Dr. Helen Vance',
    uploadedAt: '2026-08-12 11:20:00',
    version: 'v1.0',
    isPrivate: true,
    downloadUrl: '#'
  }
];

// Seed Tasks
export const SEED_TASKS: TaskRecord[] = [
  {
    id: 'TASK-001',
    title: 'Submit G99 formal connection acceptance for Daventry 2.4MWp',
    description: 'Sign and return National Grid stage 2 connection deed with payment voucher.',
    relatedEntityType: 'PROJECT',
    relatedEntityId: 'PROJ-UK-2026-014',
    relatedEntityName: 'Northampton Mega-Hub Solar Rooftop Phase 1',
    assignedTo: 'Dr. Helen Vance',
    priority: 'URGENT',
    dueDate: '2026-08-22',
    status: 'IN_PROGRESS',
    createdAt: '2026-08-16'
  },
  {
    id: 'TASK-002',
    title: 'Issue formal PPA proposal and yield simulation to Arthur Pendelton',
    description: 'Send revised 20-year PPA tariff document reflecting TOPCon 585W modules.',
    relatedEntityType: 'LEAD',
    relatedEntityId: 'LEAD-2026-089',
    relatedEntityName: 'Northampton Cold Storage Logistics Ltd',
    assignedTo: 'Oliver St. John',
    priority: 'HIGH',
    dueDate: '2026-08-20',
    status: 'TODO',
    createdAt: '2026-08-18'
  },
  {
    id: 'TASK-003',
    title: 'Review Bristol Franchise Partner application (Ref: UG-FR-77182)',
    description: 'Conduct Stage 02 commercial interview with applicant regarding South West territory.',
    relatedEntityType: 'FRANCHISE',
    relatedEntityId: 'UG-FR-77182',
    relatedEntityName: 'Vance Energy Holdings Ltd',
    assignedTo: 'David Sterling',
    priority: 'MEDIUM',
    dueDate: '2026-08-25',
    status: 'TODO',
    createdAt: '2026-08-17'
  }
];

// Seed Communications
export const SEED_COMMS: CommunicationLogItem[] = [
  {
    id: 'COMM-048',
    date: '2026-08-18 11:30:00',
    user: 'Oliver St. John',
    contactName: 'Arthur Pendelton',
    contactCompany: 'Northampton Cold Storage Logistics Ltd',
    channel: 'Meeting',
    summary: 'Executive presentation on Zero-CAPEX PPA terms. Client agreed in principle to 16.8p/kWh indexation structure.',
    nextAction: 'Send binding PPA term sheet before Friday.',
    nextActionDate: '2026-08-22',
    relatedEntityId: 'LEAD-2026-089'
  }
];

// Seed Audit Logs
export const SEED_AUDIT: AuditLogEntry[] = [
  {
    id: 'AUDIT-0091',
    timestamp: '2026-08-18 11:35:12',
    user: 'Oliver St. John',
    userEmail: 'oliver.stjohn@unitegreentech.com',
    action: 'STATUS_CHANGE',
    entityType: 'LEAD',
    entityId: 'LEAD-2026-089',
    entityName: 'Northampton Cold Storage Logistics Ltd',
    previousValue: 'QUALIFIED',
    newValue: 'PROPOSAL',
    ipAddress: '185.86.151.22'
  },
  {
    id: 'AUDIT-0090',
    timestamp: '2026-08-18 10:14:00',
    user: 'System Webhook',
    userEmail: 'platform-crm@unitegreentech.com',
    action: 'CREATE',
    entityType: 'LEAD',
    entityId: 'LEAD-2026-089',
    entityName: 'Northampton Cold Storage Logistics Ltd',
    newValue: 'Lead Created via Solar Calculator',
    ipAddress: '82.165.197.10'
  }
];

// Seed Notifications
export const SEED_NOTIFS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    type: 'NEW_LEAD',
    title: 'New High-Value Industrial Lead (2.4 MWp)',
    message: 'Northampton Cold Storage Logistics requested a Zero-CAPEX PPA proposal.',
    timestamp: '2026-08-18 10:14:00',
    isRead: false,
    targetView: 'leads',
    targetId: 'LEAD-2026-089'
  },
  {
    id: 'NOTIF-02',
    type: 'FRANCHISE_APP',
    title: 'New Franchise Application Received',
    message: 'South West & Bristol territory application logged (Ref: UG-FR-77182).',
    timestamp: '2026-08-17 16:20:00',
    isRead: false,
    targetView: 'franchise',
    targetId: 'UG-FR-77182'
  },
  {
    id: 'NOTIF-03',
    type: 'TASK_DUE',
    title: 'Urgent Task Due Soon',
    message: 'Submit G99 formal connection acceptance for Daventry due in 4 days.',
    timestamp: '2026-08-18 09:00:00',
    isRead: true,
    targetView: 'tasks',
    targetId: 'TASK-001'
  }
];

/**
 * Enterprise Admin Reactive Store & In-Memory Persistence Engine
 */
class AdminStore {
  private currentUser: AdminUser | null = null;
  private leads: AdminLead[] = [];
  private customers: AdminCustomer[] = [];
  private projects: AdminProject[] = [];
  private surveys: SiteSurvey[] = [];
  private quotes: AdminQuote[] = [];
  private ppas: PpaAgreement[] = [];
  private land: LandOpportunity[] = [];
  private investors: InvestorRecord[] = [];
  private partners: PartnerEpcRecord[] = [];
  private tech: TechnologyProduct[] = [];
  private documents: DocumentRecord[] = [];
  private tasks: TaskRecord[] = [];
  private comms: CommunicationLogItem[] = [];
  private auditLogs: AuditLogEntry[] = [];
  private notifications: NotificationItem[] = [];
  private territories: FranchiseTerritory[] = [];

  constructor() {
    this.initStore();
  }

  private initStore() {
    // Current User
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    this.currentUser = savedUser ? JSON.parse(savedUser) : SEED_USERS[0];

    // Leads
    const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
    this.leads = savedLeads ? JSON.parse(savedLeads) : SEED_LEADS;

    // Customers
    const savedCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    this.customers = savedCustomers ? JSON.parse(savedCustomers) : SEED_CUSTOMERS;

    // Projects
    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    this.projects = savedProjects ? JSON.parse(savedProjects) : SEED_PROJECTS;

    // Surveys
    const savedSurveys = localStorage.getItem(STORAGE_KEYS.SURVEYS);
    this.surveys = savedSurveys ? JSON.parse(savedSurveys) : SEED_SURVEYS;

    // Quotes
    const savedQuotes = localStorage.getItem(STORAGE_KEYS.QUOTES);
    this.quotes = savedQuotes ? JSON.parse(savedQuotes) : SEED_QUOTES;

    // PPA
    const savedPpa = localStorage.getItem(STORAGE_KEYS.PPA);
    this.ppas = savedPpa ? JSON.parse(savedPpa) : SEED_PPAS;

    // Land
    const savedLand = localStorage.getItem(STORAGE_KEYS.LAND);
    this.land = savedLand ? JSON.parse(savedLand) : SEED_LAND;

    // Investors
    const savedInvestors = localStorage.getItem(STORAGE_KEYS.INVESTORS);
    this.investors = savedInvestors ? JSON.parse(savedInvestors) : SEED_INVESTORS;

    // Partners
    const savedPartners = localStorage.getItem(STORAGE_KEYS.PARTNERS);
    this.partners = savedPartners ? JSON.parse(savedPartners) : SEED_PARTNERS;

    // Tech
    const savedTech = localStorage.getItem(STORAGE_KEYS.TECH);
    this.tech = savedTech ? JSON.parse(savedTech) : SEED_TECH;

    // Documents
    const savedDocs = localStorage.getItem(STORAGE_KEYS.DOCS);
    this.documents = savedDocs ? JSON.parse(savedDocs) : SEED_DOCUMENTS;

    // Tasks
    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    this.tasks = savedTasks ? JSON.parse(savedTasks) : SEED_TASKS;

    // Comms
    const savedComms = localStorage.getItem(STORAGE_KEYS.COMM);
    this.comms = savedComms ? JSON.parse(savedComms) : SEED_COMMS;

    // Audit
    const savedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT);
    this.auditLogs = savedAudit ? JSON.parse(savedAudit) : SEED_AUDIT;

    // Notifications
    const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    this.notifications = savedNotifs ? JSON.parse(savedNotifs) : SEED_NOTIFS;

    // Territories
    const savedTerritories = localStorage.getItem(STORAGE_KEYS.TERRITORIES);
    this.territories = savedTerritories ? JSON.parse(savedTerritories) : FRANCHISE_TERRITORIES_DETAILED;
  }

  // --- Auth & Session ---
  public getCurrentUser(): AdminUser {
    return this.currentUser || SEED_USERS[0];
  }

  public setCurrentUser(user: AdminUser) {
    this.currentUser = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    this.addAudit('LOGIN', 'AUTH', user.id, user.name, undefined, `Switched role/logged in as ${user.role}`);
  }

  public getPermissions(role?: AdminRole): RolePermissions {
    const r = role || this.currentUser?.role || 'SUPER_ADMIN';
    return ROLE_PERMISSIONS[r] || ROLE_PERMISSIONS.VIEW_ONLY;
  }

  // --- Audit Logger ---
  public addAudit(
    action: AuditLogEntry['action'],
    entityType: AuditLogEntry['entityType'],
    entityId: string,
    entityName?: string,
    previousValue?: string,
    newValue?: string
  ) {
    const entry: AuditLogEntry = {
      id: `AUDIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: this.currentUser?.name || 'System Admin',
      userEmail: this.currentUser?.email || 'admin@unitegreentech.com',
      action,
      entityType,
      entityId,
      entityName,
      previousValue,
      newValue,
      ipAddress: '192.168.1.1'
    };
    this.auditLogs.unshift(entry);
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(this.auditLogs.slice(0, 200)));
  }

  public getAuditLogs(): AuditLogEntry[] {
    return this.auditLogs;
  }

  // --- Notifications ---
  public getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  public markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(this.notifications));
  }

  public markAllNotificationsAsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(this.notifications));
  }

  // --- Leads ---
  public getLeads(): AdminLead[] {
    return this.leads;
  }

  public getLeadById(id: string): AdminLead | undefined {
    return this.leads.find((l) => l.id === id);
  }

  public addLead(lead: Omit<AdminLead, 'id' | 'createdAt' | 'updatedAt' | 'activities'>): AdminLead {
    const newLead: AdminLead = {
      ...lead,
      id: `LEAD-2026-${String(this.leads.length + 90).padStart(3, '0')}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      activities: [
        {
          id: `ACT-${Date.now()}`,
          type: 'CREATED',
          title: 'Lead Created Manually in CRM',
          description: `Logged by ${this.currentUser?.name || 'Admin'}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user: this.currentUser?.name || 'Admin'
        }
      ]
    };
    this.leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));
    this.addAudit('CREATE', 'LEAD', newLead.id, newLead.name, undefined, `Status: ${newLead.status}`);
    return newLead;
  }

  public updateLeadStatus(id: string, newStatus: LeadStatus): AdminLead | undefined {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) return undefined;

    const prevStatus = lead.status;
    lead.status = newStatus;
    lead.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    lead.activities.unshift({
      id: `ACT-${Date.now()}`,
      type: 'STATUS_CHANGE',
      title: `Status updated to ${newStatus}`,
      description: `Changed from ${prevStatus} to ${newStatus}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: this.currentUser?.name || 'Admin'
    });

    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));
    this.addAudit('STATUS_CHANGE', 'LEAD', lead.id, lead.name, prevStatus, newStatus);
    return lead;
  }

  public addLeadActivity(id: string, activity: Omit<LeadActivityItem, 'id' | 'timestamp' | 'user'>) {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) return;

    lead.activities.unshift({
      ...activity,
      id: `ACT-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: this.currentUser?.name || 'Admin'
    });
    lead.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(this.leads));
    this.addAudit('UPDATE', 'LEAD', lead.id, lead.name, undefined, `Added activity: ${activity.title}`);
  }

  // --- Customers ---
  public getCustomers(): AdminCustomer[] {
    return this.customers;
  }

  // --- Projects ---
  public getProjects(): AdminProject[] {
    return this.projects;
  }

  public getProjectById(id: string): AdminProject | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public updateProjectStage(id: string, newStage: ProjectStage): AdminProject | undefined {
    const project = this.projects.find((p) => p.id === id);
    if (!project) return undefined;

    const prevStage = project.developmentStage;
    project.developmentStage = newStage;
    project.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // Update milestone state
    project.timeline = project.timeline.map((m) => {
      if (m.stage === newStage) {
        return { ...m, state: 'CURRENT' };
      }
      return m;
    });

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(this.projects));
    this.addAudit('STATUS_CHANGE', 'PROJECT', project.id, project.name, prevStage, newStage);
    return project;
  }

  // --- Surveys ---
  public getSurveys(): SiteSurvey[] {
    return this.surveys;
  }

  public addSurvey(survey: Omit<SiteSurvey, 'id'>): SiteSurvey {
    const newSurvey: SiteSurvey = {
      ...survey,
      id: `SURV-2026-${String(this.surveys.length + 43).padStart(3, '0')}`
    };
    this.surveys.unshift(newSurvey);
    localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify(this.surveys));
    return newSurvey;
  }

  // --- Quotes ---
  public getQuotes(): AdminQuote[] {
    return this.quotes;
  }

  public addQuote(quote: Omit<AdminQuote, 'id' | 'quoteNumber' | 'createdAt'>): AdminQuote {
    const newQuote: AdminQuote = {
      ...quote,
      id: `QUOTE-2026-${String(this.quotes.length + 109).padStart(3, '0')}`,
      quoteNumber: `UG-Q-2026-${String(this.quotes.length + 815).padStart(4, '0')}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 10)
    };
    this.quotes.unshift(newQuote);
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(this.quotes));
    this.addAudit('CREATE', 'QUOTE', newQuote.id, newQuote.projectName, undefined, `Total: £${newQuote.totalGbp}`);
    return newQuote;
  }

  // --- PPA ---
  public getPpas(): PpaAgreement[] {
    return this.ppas;
  }

  // --- Land ---
  public getLand(): LandOpportunity[] {
    return this.land;
  }

  public addLand(landItem: Omit<LandOpportunity, 'id' | 'createdAt'>): LandOpportunity {
    const newLand: LandOpportunity = {
      ...landItem,
      id: `LAND-2026-${String(this.land.length + 19).padStart(3, '0')}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 10)
    };
    this.land.unshift(newLand);
    localStorage.setItem(STORAGE_KEYS.LAND, JSON.stringify(this.land));
    this.addAudit('CREATE', 'LEAD', newLand.id, newLand.location, undefined, `${newLand.areaAcres} Acres`);
    return newLand;
  }

  // --- Investors ---
  public getInvestors(): InvestorRecord[] {
    return this.investors;
  }

  // --- Territories ---
  public getTerritories(): FranchiseTerritory[] {
    return this.territories;
  }

  public updateTerritoryStatus(territoryId: string, status: FranchiseTerritory['status'], partnerId?: string) {
    this.territories = this.territories.map((t) =>
      t.territory_id === territoryId
        ? {
            ...t,
            status,
            partner_id: partnerId || t.partner_id,
            updated_at: new Date().toISOString().replace('T', ' ').substring(0, 10)
          }
        : t
    );
    localStorage.setItem(STORAGE_KEYS.TERRITORIES, JSON.stringify(this.territories));
    this.addAudit('STATUS_CHANGE', 'TERRITORY', territoryId, undefined, undefined, `Status: ${status}`);
  }

  // --- Partners ---
  public getPartners(): PartnerEpcRecord[] {
    return this.partners;
  }

  // --- Technology ---
  public getTechnology(): TechnologyProduct[] {
    return this.tech;
  }

  // --- Documents ---
  public getDocuments(): DocumentRecord[] {
    return this.documents;
  }

  public addDocument(doc: Omit<DocumentRecord, 'id' | 'uploadedAt'>): DocumentRecord {
    const newDoc: DocumentRecord = {
      ...doc,
      id: `DOC-2026-${String(this.documents.length + 100).padStart(3, '0')}`,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    this.documents.unshift(newDoc);
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(this.documents));
    this.addAudit('CREATE', 'DOCUMENT', newDoc.id, newDoc.title, undefined, newDoc.category);
    return newDoc;
  }

  // --- Tasks ---
  public getTasks(): TaskRecord[] {
    return this.tasks;
  }

  public addTask(task: Omit<TaskRecord, 'id' | 'createdAt'>): TaskRecord {
    const newTask: TaskRecord = {
      ...task,
      id: `TASK-${String(this.tasks.length + 4).padStart(3, '0')}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 10)
    };
    this.tasks.unshift(newTask);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
    return newTask;
  }

  public toggleTaskStatus(taskId: string, newStatus: TaskRecord['status']) {
    this.tasks = this.tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'COMPLETED' ? new Date().toISOString().substring(0, 10) : undefined
          }
        : t
    );
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
  }

  // --- Communications ---
  public getCommunications(): CommunicationLogItem[] {
    return this.comms;
  }

  public addCommunication(comm: Omit<CommunicationLogItem, 'id' | 'date'>): CommunicationLogItem {
    const newComm: CommunicationLogItem = {
      ...comm,
      id: `COMM-${String(this.comms.length + 49).padStart(3, '0')}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    this.comms.unshift(newComm);
    localStorage.setItem(STORAGE_KEYS.COMM, JSON.stringify(this.comms));
    return newComm;
  }

  // --- Global Universal Search ---
  public globalSearch(query: string) {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();

    const results: {
      type: string;
      id: string;
      title: string;
      subtitle: string;
      view: string;
      badge?: string;
    }[] = [];

    // Search Leads
    this.leads.forEach((l) => {
      if (
        l.name.toLowerCase().includes(q) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        l.id.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Lead',
          id: l.id,
          title: l.company ? `${l.name} (${l.company})` : l.name,
          subtitle: `${l.location} • ${l.estimatedCapacityKw} kWp • Status: ${l.status}`,
          view: 'leads',
          badge: l.status
        });
      }
    });

    // Search Projects
    this.projects.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Project',
          id: p.id,
          title: p.name,
          subtitle: `${p.location} • ${p.capacityKw} kWp • Stage: ${p.developmentStage}`,
          view: 'projects',
          badge: p.developmentStage
        });
      }
    });

    // Search Customers
    this.customers.forEach((c) => {
      if (
        c.companyName.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Customer',
          id: c.id,
          title: c.companyName,
          subtitle: `Contact: ${c.contactName} • ${c.category} • Sites: ${c.sitesCount}`,
          view: 'customers',
          badge: c.category
        });
      }
    });

    // Search Quotes
    this.quotes.forEach((qu) => {
      if (
        qu.quoteNumber.toLowerCase().includes(q) ||
        qu.customerName.toLowerCase().includes(q) ||
        qu.projectName.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Quote',
          id: qu.id,
          title: `${qu.quoteNumber} — ${qu.projectName}`,
          subtitle: `Customer: ${qu.customerName} • Total: £${qu.totalGbp.toLocaleString()}`,
          view: 'quotes',
          badge: qu.status
        });
      }
    });

    // Search Land
    this.land.forEach((la) => {
      if (
        la.location.toLowerCase().includes(q) ||
        la.ownerName.toLowerCase().includes(q) ||
        la.id.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Land Opportunity',
          id: la.id,
          title: `${la.location} (${la.areaAcres} Acres)`,
          subtitle: `Owner: ${la.ownerName} • Tech: ${la.technology} • Stage: ${la.developmentStage}`,
          view: 'land',
          badge: la.developmentStage
        });
      }
    });

    // Search Territories
    this.territories.forEach((t) => {
      if (
        t.city.toLowerCase().includes(q) ||
        t.county.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.territory_id.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'Territory',
          id: t.territory_id,
          title: `${t.city}, ${t.county} (${t.region})`,
          subtitle: `Territory ID: ${t.territory_id} • Status: ${t.status}`,
          view: 'territories',
          badge: t.status
        });
      }
    });

    return results.slice(0, 12);
  }

  // --- CSV Export Helper ---
  public exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
    const csvContent = [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map((r) =>
        r.map((val) => `"${String(val ?? '').replace(/"/g, '""')}"`).join(',')
      )
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().substring(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.addAudit('EXPORT', 'USER', 'CSV', filename, undefined, `Exported ${rows.length} rows to ${filename}.csv`);
  }
}

export const adminStore = new AdminStore();
