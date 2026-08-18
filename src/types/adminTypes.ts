import { TechnologyType, UkMajorCountry, TerritoryStatus } from '../types';

export type AdminRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'SALES'
  | 'PROJECT_MANAGER'
  | 'ENGINEERING'
  | 'FINANCE'
  | 'FRANCHISE_MANAGER'
  | 'PARTNER'
  | 'VIEW_ONLY';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  department: string;
  lastLogin: string;
  isActive: boolean;
  phone?: string;
  mfaEnabled?: boolean;
}

export interface RolePermissions {
  canViewLeads: boolean;
  canEditLeads: boolean;
  canDeleteLeads: boolean;
  canViewProjects: boolean;
  canEditProjects: boolean;
  canApproveProjects: boolean;
  canCreateQuotes: boolean;
  canApproveQuotes: boolean;
  canViewFinancials: boolean;
  canManageFranchise: boolean;
  canManageTerritories: boolean;
  canManageUsers: boolean;
  canExportData: boolean;
  canViewAuditLogs: boolean;
}

export type LeadType =
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Landowner'
  | 'Investor'
  | 'Partner'
  | 'Franchise';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'SITE_SURVEY'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST';

export interface LeadActivityItem {
  id: string;
  type: 'CREATED' | 'CONTACTED' | 'CALL' | 'EMAIL' | 'MEETING' | 'SITE_SURVEY' | 'PROPOSAL' | 'NEGOTIATION' | 'CONTRACT' | 'NOTE' | 'STATUS_CHANGE';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  metadata?: Record<string, any>;
}

export interface AdminLead {
  id: string; // e.g. LEAD-2026-089
  createdAt: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  location: string;
  region: string;
  leadType: LeadType;
  technology: TechnologyType;
  estimatedCapacityKw: number;
  businessModel: string; // CAPEX, PPA, Lease, RESCO
  status: LeadStatus;
  assignedTo: string;
  source: string;
  propertyType?: string;
  energyRequirementAnnualKwh?: number;
  monthlyBillGbp?: number;
  notes?: string;
  activities: LeadActivityItem[];
  associatedProjectId?: string;
  updatedAt: string;
}

export type CustomerCategory =
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Institution'
  | 'Corporate';

export interface AdminCustomer {
  id: string; // CUST-001
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  category: CustomerCategory;
  billingAddress: string;
  sitesCount: number;
  activeProjectsCount: number;
  totalCapacityKw: number;
  contractsCount: number;
  invoicesCount: number;
  omStatus: 'ACTIVE' | 'PENDING' | 'EXPIRING_SOON' | 'NONE';
  accountManager: string;
  createdAt: string;
  notes?: string;
}

export type ProjectStage =
  | 'OPPORTUNITY'
  | 'FEASIBILITY'
  | 'SITE_ASSESSMENT'
  | 'DESIGN'
  | 'DNO_GRID'
  | 'PLANNING'
  | 'FINANCE'
  | 'PROCUREMENT'
  | 'INSTALLATION'
  | 'COMMISSIONING'
  | 'OM';

export type MilestoneTimelineState = 'COMPLETE' | 'CURRENT' | 'PENDING' | 'BLOCKED';

export interface ProjectMilestone {
  stage: ProjectStage;
  label: string;
  state: MilestoneTimelineState;
  completedAt?: string;
  targetDate?: string;
  notes?: string;
}

export interface AdminProject {
  id: string; // PROJ-UK-2026-014
  name: string;
  customerId: string;
  customerName: string;
  location: string;
  region: string;
  technology: TechnologyType;
  capacityKw: number;
  developmentStage: ProjectStage;
  commercialModel: 'CAPEX' | 'PPA' | 'RESCO' | 'BOOT' | 'BOO' | 'LEASING';
  projectManager: string;
  status: 'ON_TRACK' | 'AT_RISK' | 'BLOCKED' | 'COMPLETED' | 'ON_HOLD';
  estimatedCompletionDate: string;
  contractValueGbp: number;
  annualYieldMwh?: number;
  co2OffsetTonnesAnnual?: number;
  timeline: ProjectMilestone[];
  dnoStatus?: {
    dnoName: string;
    applicationType: 'G99' | 'G100' | 'G98';
    exportCapacityKw: number;
    importCapacityKw: number;
    quoteReceived: boolean;
    quoteValueGbp?: number;
    gridStatus: 'APPLICATION_SUBMITTED' | 'FEASIBILITY_OFFER' | 'FORMAL_OFFER_ACCEPTED' | 'CONNECTED';
  };
  planningStatus?: {
    type: 'PERMITTED_DEVELOPMENT' | 'FULL_PLANNING_REQUIRED' | 'PRIOR_APPROVAL';
    authority: string;
    applicationRef?: string;
    status: 'NOT_REQUIRED' | 'IN_PREPARATION' | 'SUBMITTED' | 'APPROVED' | 'CONDITIONAL';
  };
  createdAt: string;
  updatedAt: string;
}

export interface SiteSurvey {
  id: string; // SURV-2026-042
  projectId?: string;
  projectName?: string;
  customerName: string;
  surveyor: string;
  date: string;
  propertyType: string;
  roofType: string; // Trapezoidal Sheet, Standing Seam, Concrete, Flat Membrane, Tile
  roofAreaSqMeters: number;
  orientation: string; // South, South-West, East-West
  pitchDegrees: number;
  shadingAnalysis: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH';
  electricalSystem: string; // 3-Phase 400V, Single-Phase 230V, HV Substation
  transformerRatingKva: number;
  mainSwitchboardCondition: 'EXCELLENT' | 'GOOD' | 'UPGRADE_REQUIRED';
  meterMpan: string;
  dnoSubstationName?: string;
  photos: {
    id: string;
    category: 'ROOF' | 'ELECTRICAL' | 'METER' | 'DRONE' | 'PLAN' | 'OTHER';
    url: string;
    caption: string;
    uploadedAt: string;
  }[];
  structuralNotes: string;
  generalNotes: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'REQUIRES_REVISIT';
}

export interface QuoteLineItem {
  id: string;
  category: 'MODULES' | 'INVERTER' | 'BESS' | 'MOUNTING' | 'BOS' | 'INSTALLATION' | 'ENGINEERING' | 'OM' | 'OTHER';
  description: string;
  quantity: number;
  unit: string;
  unitPriceGbp: number;
  totalGbp: number;
}

export interface AdminQuote {
  id: string; // QUOTE-2026-108
  quoteNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  projectId?: string;
  projectName: string;
  location: string;
  systemSizeKw: number;
  technology: TechnologyType;
  commercialModel: 'CAPEX' | 'PPA' | 'RESCO' | 'BOOT' | 'BOO' | 'LEASING';
  items: QuoteLineItem[];
  subtotalGbp: number;
  taxRatePct: number; // 20% standard UK VAT or 0% for zero-rated commercial
  taxAmountGbp: number;
  totalGbp: number;
  ppaRatePencePerKwh?: number;
  ppaTermYears?: number;
  ppaEstimatedAnnualSavingsGbp?: number;
  validUntil: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  issuedBy: string;
  createdAt: string;
  termsAndConditions: string;
}

export interface PpaAgreement {
  id: string; // PPA-UK-2026-009
  customerName: string;
  customerId: string;
  projectName: string;
  projectId: string;
  capacityKw: number;
  contractTermYears: number; // 15–25 years
  initialTariffPencePerKwh: number; // e.g. 17.5p
  gridImportReferenceTariffPencePerKwh: number; // e.g. 26.8p
  escalationType: 'FIXED_PERCENT' | 'CPI' | 'RPI' | 'HYBRID';
  escalationValuePct: number; // e.g. 2.5%
  startDate: string;
  endDate: string;
  estimatedAnnualGenerationKwh: number;
  annualCustomerSavingsGbp: number;
  paymentStructure: 'MONTHLY_METERED' | 'QUARTERLY_RECONCILED';
  status: 'DRAFT' | 'PROPOSED' | 'NEGOTIATION' | 'SIGNED' | 'ACTIVE' | 'EXPIRED';
  contracts: { name: string; url: string; signedDate?: string }[];
  assignedManager: string;
  notes?: string;
}

export interface LandOpportunity {
  id: string; // LAND-2026-018
  ownerName: string;
  ownerContact: string;
  location: string;
  postcode: string;
  region: string;
  areaHectares: number;
  areaAcres: number;
  technology: 'SOLAR' | 'WIND' | 'BESS' | 'HYBRID';
  targetCapacityMw: number;
  gridProximityKm: number;
  gridStatus: 'INITIAL_SCREENING' | 'SUBSTATION_IDENTIFIED' | 'GRID_OFFER_RECEIVED' | 'ACCEPTED_CONNECTION';
  planningStatus: 'SCREENING' | 'PRE_APP_SUBMITTED' | 'EIA_UNDERWAY' | 'FULL_PLANNING_GRANTED';
  landStatus: 'FREEHOLD_OFFERED' | 'OPTION_TO_LEASE_SIGNED' | 'EXCLUSIVITY_AGREED';
  developmentStage: 'NEW' | 'ASSESSMENT' | 'DUE_DILIGENCE' | 'GRID' | 'PLANNING' | 'DEVELOPMENT' | 'REJECTED' | 'ACTIVE';
  indicativeLeaseGbpPerAcreAnnual: number;
  notes?: string;
  createdAt: string;
}

export interface InvestorRecord {
  id: string; // INV-2026-004
  investorName: string;
  companyName: string;
  email: string;
  phone: string;
  investmentRangeGbp: '£1M–£5M' | '£5M–£20M' | '£20M–£50M' | '£50M+';
  preferredTechnology: ('SOLAR' | 'WIND' | 'BESS' | 'HYBRID')[];
  preferredRegions: string[];
  investmentType: 'EQUITY' | 'DEBT' | 'PROJECT_INVESTMENT' | 'STRATEGIC_PARTNERSHIP';
  status: 'PROSPECT' | 'NDA_SIGNED' | 'DUE_DILIGENCE' | 'ACTIVE_PORTFOLIO' | 'INACTIVE';
  activeDeploymentsCount: number;
  totalDeployedGbp: number;
  accountManager: string;
  notes?: string;
}

export interface PartnerEpcRecord {
  id: string; // PART-2026-012
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  partnerType: 'EPC' | 'Technology' | 'Distributor' | 'Installer' | 'Consultant' | 'Finance' | 'Land' | 'Franchise' | 'OM';
  region: string;
  capabilities: string[];
  technology: string[];
  status: 'PROSPECT' | 'DISCUSSION' | 'DUE_DILIGENCE' | 'ACTIVE' | 'INACTIVE';
  accreditations: string[]; // NICEIC, MCS, ISO9001, G99 Specialist
  insuranceValidUntil: string;
  agreementStatus: 'PENDING' | 'SIGNED_MSA' | 'EXPIRED';
  notes?: string;
}

export interface TechnologyProduct {
  id: string; // TECH-MOD-001
  manufacturer: string;
  productName: string;
  category: 'Solar Modules' | 'Inverters' | 'BESS' | 'Wind' | 'Structures' | 'Electrical BOS' | 'Monitoring' | 'EV Charging';
  specification: string;
  efficiencyOrRating: string;
  warrantyYears: number;
  certifications: string[]; // IEC 61215, MCS, TUV, CE, G99
  datasheetUrl: string;
  originCountry: string;
  regionAvailability: string[];
  status: 'APPROVED' | 'EVALUATING' | 'DISCONTINUED';
}

export interface DocumentRecord {
  id: string; // DOC-2026-099
  title: string;
  filename: string;
  fileSizeBytes: number;
  fileType: string;
  category: 'Customer' | 'Project' | 'Quote' | 'PPA' | 'Land' | 'Planning' | 'Grid' | 'Engineering' | 'Supplier' | 'Franchise' | 'Legal';
  relatedEntityId?: string; // e.g. PROJ-UK-2026-014 or LEAD-2026-089
  relatedEntityName?: string;
  uploadedBy: string;
  uploadedAt: string;
  version: string;
  isPrivate: boolean;
  downloadUrl: string;
}

export interface TaskRecord {
  id: string; // TASK-012
  title: string;
  description?: string;
  relatedEntityType?: 'LEAD' | 'PROJECT' | 'CUSTOMER' | 'FRANCHISE' | 'GENERAL';
  relatedEntityId?: string;
  relatedEntityName?: string;
  assignedTo: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string;
  status: 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'COMPLETED';
  createdAt: string;
  completedAt?: string;
}

export interface CommunicationLogItem {
  id: string; // COMM-048
  date: string;
  user: string;
  contactName: string;
  contactCompany?: string;
  channel: 'Phone' | 'Email' | 'Meeting' | 'Site Visit' | 'WhatsApp' | 'Note';
  summary: string;
  nextAction?: string;
  nextActionDate?: string;
  relatedEntityId?: string;
}

export interface AuditLogEntry {
  id: string; // AUDIT-0091
  timestamp: string;
  user: string;
  userEmail: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'EXPORT' | 'APPROVE' | 'LOGIN';
  entityType: 'LEAD' | 'PROJECT' | 'QUOTE' | 'PPA' | 'TERRITORY' | 'FRANCHISE' | 'DOCUMENT' | 'USER' | 'AUTH';
  entityId: string;
  entityName?: string;
  previousValue?: string;
  newValue?: string;
  ipAddress: string;
}

export interface NotificationItem {
  id: string;
  type: 'NEW_LEAD' | 'NEW_ENQUIRY' | 'QUOTE_ACCEPTED' | 'TASK_DUE' | 'PROJECT_STATUS' | 'FRANCHISE_APP' | 'LAND_SUBMISSION' | 'DOC_UPLOADED';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  targetView: string;
  targetId?: string;
}

export type AdminActiveView =
  | 'dashboard'
  | 'leads'
  | 'lead-detail'
  | 'sales-pipeline'
  | 'customers'
  | 'projects'
  | 'project-detail'
  | 'project-pipeline'
  | 'site-surveys'
  | 'quotes'
  | 'ppa'
  | 'land'
  | 'investors'
  | 'franchise'
  | 'territories'
  | 'partners'
  | 'technology'
  | 'documents'
  | 'tasks'
  | 'communication'
  | 'reports'
  | 'executive'
  | 'users'
  | 'audit';
