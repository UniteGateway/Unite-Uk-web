export interface EnergySolution {
  id: string;
  number: string;
  title: string;
  shortTag: string;
  subtitle: string;
  description: string;
  image: string;
  keyBenefits: string[];
  specs: { label: string; value: string }[];
  applications: string[];
}

export interface BusinessModel {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  ownership: string;
  upfrontCost: string;
  maintenance: string;
  bestFor: string;
  keyPoints: string[];
  badge?: string;
  whoItMaySuit?: string;
  howItWorks?: string;
  capitalRequirement?: string;
  contractStructure?: string;
  typicalProjectType?: string;
}

export interface UkRegionOpportunity {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // SVG percentage
  solarPotential: 'Exceptional' | 'Very High' | 'High' | 'Moderate' | 'Excellent';
  windPotential: 'High' | 'Very High' | 'Exceptional' | 'Moderate';
  bessOpportunity: 'Critical Grid Node' | 'High Demand' | 'Strategic Storage' | 'Industrial Cluster';
  typicalProject: string;
  customerSegment: string;
  relevantTech: string[];
  installedPipelineMw: number;
  highlight: string;
}

export interface OemPartnerCategory {
  category: string;
  description: string;
  brands: {
    name: string;
    origin: string;
    specialty: string;
    tier: string;
  }[];
}

export interface JourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface LegacyFranchiseRegion {
  region: string;
  code: string;
  status: 'Available' | 'Under Review' | 'Reserved';
  industrialDensity: string;
  annualSolarIrradiance: string;
  targetMrrPotential: string;
}

// ----------------------------------------------------
// PLATFORM & ASSESSMENT CALCULATOR TYPES
// ----------------------------------------------------

export type PropertyCategory = 'residential' | 'commercial' | 'industrial' | 'agricultural' | 'public';

export type PropertyType =
  | 'HOME'
  | 'APARTMENT'
  | 'OFFICE'
  | 'SHOP'
  | 'WAREHOUSE'
  | 'FACTORY'
  | 'HOTEL'
  | 'SCHOOL'
  | 'HOSPITAL'
  | 'FARM'
  | 'OTHER';

export type SpaceOption = 'Small' | 'Medium' | 'Large' | 'Very Large';

export type EnergyInputMode = 'MONTHLY_BILL' | 'ANNUAL_KWH';

export type BatteryChoice = 'YES' | 'NO' | 'NOT_SURE';

export interface SolarAssessmentInput {
  propertyType: PropertyType;
  postcode: string;
  city: string;
  region: string;
  energyInputMode: EnergyInputMode;
  monthlyBillGbp?: number;
  annualKwh?: number;
  spaceSize: SpaceOption;
  exactRoofAreaM2?: number;
  availableLandAcres?: number;
  wantsBattery: BatteryChoice;
  selectedBatteryKwh?: number;
  // Commercial mode extras
  isCommercialMode?: boolean;
  peakDemandKw?: number;
  currentTariffPencePerKwh?: number;
  operatingHours?: 'Standard Business (9-5)' | 'Extended (7am-9pm)' | '24/7 Continuous' | 'Shift-based';
  transformerCapacityKva?: number;
  preferredBusinessModel?: 'CAPEX' | 'PPA' | 'RESCO' | 'BOOT' | 'BOO' | 'LEASING';
}

export interface SolarAssessmentResult {
  estimatedSystemSizeKw: number;
  estimatedPanelsCount: number;
  estimatedAnnualGenerationKwh: number;
  estimatedSolarCoveragePercent: number;
  estimatedCo2AvoidanceKgPerYear: number;
  indicativeBatteryCapacityKwh: number;
  batteryAdded: boolean;
  estimatedAnnualEnergyValueGbp: {
    min: number;
    max: number;
  };
  estimatedProjectCostRangeGbp: {
    min: number;
    max: number;
  };
  indicativePaybackYears: {
    min: number;
    max: number;
  };
  recommendedBusinessModel: string;
  isCommercialScale: boolean;
  assessmentReferenceId: string;
  timestamp: string;
}

export interface BatteryAssessmentInput {
  peakDemandKw: number;
  operatingHours: string;
  solarCapacityKwp: number;
  desiredBackupHours: number;
  peakTariffPeriod: string;
  criticalLoads: string[];
}

export interface BessUseCaseItem {
  title: string;
  description: string;
  relevanceScore: 'High' | 'Medium' | 'Essential';
  benefit: string;
}

export interface BessAssessmentResult {
  recommendedCapacityKwh: number;
  recommendedCrate: string;
  useCases: BessUseCaseItem[];
  fireSuppressionSpec: string;
  gridAncillaryReadiness: string;
}

export interface HybridAssessmentInput {
  location: string;
  landAreaAcres: number;
  solarCapacityMw: number;
  windOpportunityRating: 'High' | 'Medium' | 'Exceptional';
  gridConnectionStatus: 'Secured' | 'Application Pending' | 'Feasibility Stage';
  storageRequirementMwh: number;
}

export interface HybridAssessmentResult {
  solarGenerationGwhYear: number;
  windGenerationGwhYear: number;
  totalGenerationGwhYear: number;
  bessArbitrageCapacityMwh: number;
  combinedCapacityFactorPercent: number;
  co2AbatementTonnesYear: number;
  recommendedArchitecture: string;
}

// ----------------------------------------------------
// CRM & LEAD MANAGEMENT SCHEMA
// ----------------------------------------------------

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'SITE ASSESSMENT'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST';

export type UserRole =
  | 'Homeowner'
  | 'Business'
  | 'Industrial Customer'
  | 'Landowner'
  | 'Investor'
  | 'EPC Partner'
  | 'Technology Supplier'
  | 'Franchise Applicant'
  | 'Other';

export type InterestType =
  | 'Solar'
  | 'BESS'
  | 'Wind'
  | 'Hybrid'
  | 'PPA'
  | 'RESCO'
  | 'BOOT'
  | 'BOO'
  | 'CAPEX'
  | 'Project Leasing'
  | 'Franchise';

export type ProjectSizeBracket =
  | 'Under 10 kW'
  | '10–50 kW'
  | '50–250 kW'
  | '250 kW–1 MW'
  | '1–5 MW'
  | '5–50 MW'
  | '50 MW+';

export interface LeadRecord {
  leadId: string;
  referenceNumber: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  userRole?: UserRole;
  interests?: InterestType[];
  propertyType?: PropertyType | string;
  location: {
    postcode: string;
    city: string;
    region: string;
  };
  projectType?: string;
  projectSizeBracket?: ProjectSizeBracket;
  estimatedSizeKw?: number;
  energyConsumptionKwh?: number;
  businessModel?: string;
  batteryRequirement?: string;
  windRequirement?: string;
  leadSource: string;
  createdDate: string;
  status: LeadStatus;
  notes?: string;
  privacyConsent: boolean;
}

export interface BookingRequest {
  bookingId: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  projectType: string;
  notes?: string;
  createdDate: string;
}

export interface AdminCalculationConfig {
  solarYieldFactorDefault: number; // kWh/kWp/year
  regionalYieldMultipliers: Record<string, number>;
  panelPowerWatts: number;
  usableRoofAreaRatio: number;
  m2PerKwp: number;
  batteryUsableCapacityRatio: number;
  ukGridEmissionFactorKgPerKwh: number; // Defensible UK DESNZ factor ~0.193
  defaultElectricityTariffGbpPerKwh: number;
  capexPerKwpResidentialGbp: number;
  capexPerKwpCommercialGbp: number;
  bessCostPerKwhGbp: number;
}

// ----------------------------------------------------
// UK RENEWABLE ENERGY OPPORTUNITY & PROJECT DEV TYPES (PROMPT 4)
// ----------------------------------------------------

export type TechnologyType =
  | 'SOLAR'
  | 'WIND'
  | 'BESS'
  | 'HYBRID'
  | 'ROOFTOP'
  | 'COMMERCIAL'
  | 'UTILITY';

export type UkMajorCountry = 'England' | 'Scotland' | 'Wales' | 'Northern Ireland';

export type UkRegionName =
  | 'South West'
  | 'South East & London'
  | 'East of England'
  | 'East Midlands'
  | 'West Midlands'
  | 'Yorkshire & Humber'
  | 'North West'
  | 'North East'
  | 'Scotland Highlands & Islands'
  | 'Scotland Central Belt & Borders'
  | 'Wales'
  | 'Northern Ireland';

export type ProjectDevelopmentStage =
  | 'OPPORTUNITY'
  | 'FEASIBILITY'
  | 'LAND'
  | 'GRID'
  | 'PLANNING'
  | 'FINANCE'
  | 'EPC'
  | 'CONSTRUCTION'
  | 'COMMISSIONING'
  | 'OPERATIONS'
  | 'DEVELOPMENT'
  | 'UNDER CONSTRUCTION'
  | 'OPERATIONAL'
  | 'READY FOR INVESTMENT';

export type GridConnectionStatus =
  | 'Preliminary Assessment'
  | 'Application Pending'
  | 'Technical Study'
  | 'Formal Offer'
  | 'Secured G99/Transmission'
  | 'Grid Feasibility Stage';

export type LandStatus =
  | 'Land Identified'
  | 'Exclusivity Agreed'
  | 'Option to Lease Executed'
  | 'Freehold Acquired'
  | 'Commercial Roof Lease';

export type OfftakeStatus =
  | 'Corporate PPA Structuring'
  | 'Direct Private Wire'
  | 'Wholesale Export / SEG'
  | 'CfD / Capacity Market'
  | '100% On-Site Consumption'
  | 'Open for Offtaker';

export type InvestmentStatus =
  | 'Origination'
  | 'Seed Development'
  | 'Ready for Co-Investment'
  | 'Fully Funded'
  | 'Construction Equity Open';

export interface UkMapMarker {
  id: string;
  name: string;
  region: string;
  country: UkMajorCountry;
  coordinates: { x: number; y: number }; // SVG % (0-100)
  technology: TechnologyType;
  category: 'SOLAR' | 'WIND' | 'BESS' | 'HYBRID' | 'ROOFTOP' | 'COMMERCIAL' | 'UTILITY';
  indicativeCapacity: string;
  projectStage: ProjectDevelopmentStage;
  opportunitySummary: string;
  potentialTypes: string[];
  gridDno: string;
  highlight: string;
}

export interface UkOpportunityRegionData {
  id: string;
  name: UkRegionName;
  country: UkMajorCountry;
  mapPathId: string;
  opportunities: string[];
  potentialProjectTypes: string[];
  solarResourceRating: 'Exceptional' | 'Very High' | 'High' | 'Moderate';
  windResourceRating: 'Exceptional' | 'Very High' | 'High' | 'Moderate';
  bessOpportunityRating: 'Critical' | 'High' | 'Strategic' | 'Developing';
  keyDnoZones: string[];
  summary: string;
  indicativePipelineMw: number;
}

export interface ProjectPortfolioItem {
  id: string;
  name: string;
  code: string;
  isDemo: boolean; // Must be true for demo cards as required by prompt
  region: UkRegionName;
  country: UkMajorCountry;
  technology: TechnologyType;
  capacity: string;
  capacityMw: number;
  developmentStage: ProjectDevelopmentStage;
  commercialModel: 'PPA' | 'RESCO' | 'CAPEX' | 'BOOT' | 'BOO' | 'LEASING';
  gridStatus: GridConnectionStatus;
  landStatus: LandStatus;
  offtakeStatus: OfftakeStatus;
  investmentStatus: InvestmentStatus;
  overview: string;
  technicalSummary: {
    technologySpec: string;
    estimatedGenerationGwhYear: number;
    co2AbatedTonnesYear: number;
    substationVoltage: string;
    footprint: string;
  };
  commercialStructure: {
    offtakeMechanism: string;
    targetOperationDate: string;
    assetLifeYears: number;
    partnerEcosystem: string;
  };
  availableDocuments: string[];
}

export interface LandOpportunitySubmission {
  submissionId: string;
  location: string;
  postcode: string;
  landAreaAcres: 'Under 5 acres' | '5–25 acres' | '25–100 acres' | '100–500 acres' | '500+ acres';
  ownershipStatus: 'Freehold Owner' | 'Long Leaseholder' | 'Land Agent / Broker' | 'Tenant with Permission';
  preferredTechnology: 'SOLAR' | 'WIND' | 'BESS' | 'HYBRID' | 'NOT SURE';
  gridInformationKnown: string;
  distanceToSubstationEstimated?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName?: string;
  notes?: string;
  submissionDate: string;
}

export interface InvestorInterestSubmission {
  submissionId: string;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  investorType: 'Family Office' | 'Infrastructure Fund' | 'Private Equity' | 'Corporate' | 'High Net Worth' | 'Institutional';
  investmentInterest: ('Solar' | 'Wind' | 'BESS' | 'Hybrid' | 'Infrastructure' | 'PPA')[];
  investmentRange: 'Under £250k' | '£250k–£1m' | '£1m–£5m' | '£5m–£25m' | '£25m+';
  investmentPreference: 'Project Investment' | 'Development Partnership' | 'Equity' | 'Debt' | 'Strategic Partnership';
  targetGeographies?: string[];
  notes?: string;
  submissionDate: string;
}

export interface BusinessCommercialSubmission {
  submissionId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  postcode: string;
  industry: string;
  annualElectricityConsumptionKwh?: number;
  monthlyElectricityBillGbp?: number;
  peakDemandKva?: number;
  availableRoofAreaM2?: number;
  availableLandAcres?: number;
  currentTariffPencePerKwh?: number;
  preferredBusinessModel: 'CAPEX' | 'PPA' | 'RESCO' | 'BOOT' | 'BOO' | 'LEASING' | 'NOT SURE';
  notes?: string;
  submissionDate: string;
}

export interface ProjectDeveloperSubmission {
  submissionId: string;
  developerName: string;
  companyName: string;
  email: string;
  phone: string;
  roleType: 'PROJECT DEVELOPER' | 'EPC PARTNER' | 'TECHNOLOGY PROVIDER' | 'LOCAL AUTHORITY' | 'OTHER';
  projectStage: ProjectDevelopmentStage;
  targetTechnology: TechnologyType;
  proposedCapacityMw: string;
  projectLocation: string;
  collaborationSought: 'Co-development' | 'EPC Delivery' | 'Offtake / PPA Structuring' | 'Funding & Equity' | 'O&M Partnership';
  notes?: string;
  submissionDate: string;
}

// ----------------------------------------------------
// FRANCHISE & PARTNER PLATFORM TYPES (PROMPT 5)
// ----------------------------------------------------

export type FranchiseStatus =
  | 'APPLICATION'
  | 'REVIEW'
  | 'DISCUSSION'
  | 'APPROVED'
  | 'ONBOARDING'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CLOSED';

export type TerritoryStatus =
  | 'AVAILABLE'
  | 'ENQUIRY'
  | 'RESERVED'
  | 'ACTIVE'
  | 'NOT_AVAILABLE';

export type CrmLeadStage =
  | 'LEAD'
  | 'QUALIFICATION'
  | 'SITE SURVEY'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'CONTRACT'
  | 'INSTALLATION'
  | 'O&M';

export interface FranchiseApplication {
  applicationId: string; // UG-FR-[ID]
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  location: {
    city: string;
    region: string;
    preferredTerritory: string;
  };
  businessBackground: {
    existingBusiness: boolean;
    industry?: string;
    yearsInBusiness?: string;
    teamSize?: string;
    companyName?: string;
  };
  interests: ('Residential' | 'Commercial' | 'Industrial' | 'BESS' | 'Wind' | 'PPA' | 'Project Development')[];
  investmentBracket: '£20k–£50k' | '£50k–£100k' | '£100k+' | 'Prefer to discuss';
  operatingPath?: 'FULL-TIME BUSINESS' | 'PART-TIME DEVELOPMENT' | 'BUSINESS EXPANSION';
  status: FranchiseStatus;
  createdDate: string;
  notes?: string;
  privacyConsent: boolean;
}

export interface FranchiseTerritory {
  territory_id: string;
  country: UkMajorCountry;
  region: string;
  county: string;
  city: string;
  status: TerritoryStatus;
  partner_id?: string;
  created_at: string;
  updated_at: string;
  businessOpportunity: string;
  nextStep: string;
  indicativeMarketPotential?: string;
  solarRating?: string;
  windRating?: string;
  coordinates?: { x: number; y: number };
}

export interface FranchisePartner {
  partner_id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  territory: string;
  status: FranchiseStatus;
  onboardingDate: string;
  assignedLeadsCount: number;
  activeProjectsCount: number;
  grossPipelineGbp: number;
  netProfitShareAgreedPct: number;
}

export interface FranchiseCrmLead {
  leadId: string;
  customerName: string;
  companyName?: string;
  email: string;
  phone: string;
  territory: string;
  technology: TechnologyType;
  stage: CrmLeadStage;
  estimatedValueGbp: number;
  leadSource: string;
  createdDate: string;
  assignedPartnerId?: string;
}

export interface FranchiseCrmProject {
  projectId: string;
  projectName: string;
  customerName: string;
  territory: string;
  technology: TechnologyType;
  systemSizeKw: number;
  stage: CrmLeadStage;
  contractValueGbp: number;
  estimatedNetProfitShareGbp: number;
  startDate: string;
  completionDateEstimated: string;
}

export interface FranchiseProfitShareRecord {
  recordId: string;
  projectId: string;
  partnerId: string;
  projectName: string;
  totalProjectRevenueGbp: number;
  netProjectProfitGbp: number;
  profitSharePercentage: number;
  profitShareGbp: number;
  status: 'PENDING' | 'AUDITED' | 'DISBURSED';
  disbursementDate?: string;
}

export interface FranchiseInfoPackDownloadRequest {
  requestId: string;
  name: string;
  email: string;
  phone: string;
  preferredTerritory?: string;
  requestedAt: string;
}

export interface FranchiseAdminControls {
  territoryAvailabilityOverride: Record<string, TerritoryStatus>;
  partnerApprovalsQueue: string[];
  leadAssignmentRules: {
    autoAssignByPostcode: boolean;
    maxLeadsPerPartnerWeekly: number;
  };
  commissionRatesTier: {
    standardTierPct: number;
    commercialTierPct: number;
    utilityTierPct: number;
  };
}

