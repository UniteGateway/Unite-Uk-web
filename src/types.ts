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

export interface FranchiseTerritory {
  region: string;
  code: string;
  status: 'Available' | 'Under Review' | 'Reserved';
  industrialDensity: string;
  annualSolarIrradiance: string;
  targetMrrPotential: string;
}
