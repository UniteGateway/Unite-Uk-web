import {
  FranchiseTerritory,
  FranchiseCrmLead,
  FranchiseCrmProject,
  FranchiseProfitShareRecord
} from '../types';

/**
 * 1. UK TERRITORY DATABASE (Section 5 & 20 of Prompt 5)
 * Structured with verified status:
 * 'AVAILABLE' | 'ENQUIRY' | 'RESERVED' | 'ACTIVE' | 'NOT_AVAILABLE'
 */
export const UK_FRANCHISE_TERRITORIES: FranchiseTerritory[] = [
  // ENGLAND - SOUTH WEST
  {
    territory_id: 'ENG-SW-DEVON',
    country: 'England',
    region: 'South West',
    county: 'Devon & Cornwall',
    city: 'Exeter & Plymouth',
    status: 'ENQUIRY',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Exceptional solar irradiation (~1,120 kWh/kWp). High demand for agrivoltaics, dairy farm solar, and battery storage.',
    nextStep: 'Submit franchise discovery enquiry for Devon & Cornwall territory allocation.',
    indicativeMarketPotential: 'High (Agricultural & Commercial)',
    solarRating: 'Exceptional',
    windRating: 'High',
    coordinates: { x: 28, y: 78 }
  },
  {
    territory_id: 'ENG-SW-BRISTOL',
    country: 'England',
    region: 'South West',
    county: 'Bristol & Somerset',
    city: 'Bristol & Bath',
    status: 'ENQUIRY',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Urban commercial rooftop solar, logistics hubs along M4/M5 corridors, corporate PPA demand.',
    nextStep: 'Request territory reservation & commercial discovery briefing.',
    indicativeMarketPotential: 'Very High (Logistics & Tech)',
    solarRating: 'Very High',
    windRating: 'Moderate',
    coordinates: { x: 38, y: 70 }
  },

  // ENGLAND - SOUTH EAST & LONDON
  {
    territory_id: 'ENG-SE-SURREY',
    country: 'England',
    region: 'South East & London',
    county: 'Surrey & Sussex',
    city: 'Guildford & Brighton',
    status: 'ENQUIRY',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Affluent residential, private estates, commercial rooftops, private school campus decarbonisation.',
    nextStep: 'Territory qualification and discovery call with Unite Greentek franchise team.',
    indicativeMarketPotential: 'High (Premium Residential & SME)',
    solarRating: 'Very High',
    windRating: 'Moderate',
    coordinates: { x: 58, y: 74 }
  },
  {
    territory_id: 'ENG-LON-GREATER',
    country: 'England',
    region: 'South East & London',
    county: 'Greater London',
    city: 'London Metropolitan',
    status: 'RESERVED',
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-08-10T00:00:00Z',
    businessOpportunity: 'Dense corporate headquarters, municipal councils, zero-capex rooftop solar and micro-BESS.',
    nextStep: 'Territory currently reserved. Enquire to join co-development waitlist.',
    indicativeMarketPotential: 'Highest (Corporate Headquarters & C&I)',
    solarRating: 'High',
    windRating: 'Low',
    coordinates: { x: 60, y: 68 }
  },
  {
    territory_id: 'ENG-SE-KENT',
    country: 'England',
    region: 'South East & London',
    county: 'Kent & Medway',
    city: 'Maidstone & Canterbury',
    status: 'ENQUIRY',
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Fruit farms, logistics warehouses near Thames gateway, coastal BESS opportunities.',
    nextStep: 'Request territory discussion pack.',
    indicativeMarketPotential: 'High (Logistics & Agriculture)',
    solarRating: 'Exceptional',
    windRating: 'Moderate',
    coordinates: { x: 68, y: 72 }
  },

  // ENGLAND - EAST ANGLIA & MIDLANDS
  {
    territory_id: 'ENG-EA-CAMBS',
    country: 'England',
    region: 'East of England',
    county: 'Cambridgeshire & Norfolk',
    city: 'Cambridge & Norwich',
    status: 'AVAILABLE',
    created_at: '2026-02-10T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Science parks, cold-storage warehouses, agri-business solar and battery arbitrage.',
    nextStep: 'Immediate territory onboarding and franchise agreement review available.',
    indicativeMarketPotential: 'Very High (Agri-Tech & Logistics)',
    solarRating: 'Very High',
    windRating: 'High',
    coordinates: { x: 64, y: 58 }
  },
  {
    territory_id: 'ENG-WM-BIRMINGHAM',
    country: 'England',
    region: 'West Midlands',
    county: 'West Midlands County',
    city: 'Birmingham & Coventry',
    status: 'ENQUIRY',
    created_at: '2026-01-20T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Manufacturing plants, automotive tier suppliers, high daytime electricity consumption.',
    nextStep: 'Commercial discovery discussion on industrial PPA pipelines.',
    indicativeMarketPotential: 'Exceptional (Industrial & C&I)',
    solarRating: 'Moderate',
    windRating: 'Moderate',
    coordinates: { x: 46, y: 56 }
  },
  {
    territory_id: 'ENG-EM-NOTTS',
    country: 'England',
    region: 'East Midlands',
    county: 'Nottinghamshire & Derbyshire',
    city: 'Nottingham & Derby',
    status: 'AVAILABLE',
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Heavy industrial parks, former colliery regeneration, commercial distribution hubs.',
    nextStep: 'Request territory allocation pack.',
    indicativeMarketPotential: 'High (Industrial & Distribution)',
    solarRating: 'Moderate',
    windRating: 'High',
    coordinates: { x: 52, y: 50 }
  },

  // ENGLAND - NORTH
  {
    territory_id: 'ENG-NW-MANCHESTER',
    country: 'England',
    region: 'North West',
    county: 'Greater Manchester & Cheshire',
    city: 'Manchester & Warrington',
    status: 'ENQUIRY',
    created_at: '2026-01-18T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Chemical manufacturing, logistics, airport freight hubs, C&I private wire solar.',
    nextStep: 'Explore territory reservation and business model alignment.',
    indicativeMarketPotential: 'Very High (Commercial & Freight)',
    solarRating: 'Moderate',
    windRating: 'High',
    coordinates: { x: 42, y: 44 }
  },
  {
    territory_id: 'ENG-YH-LEEDS',
    country: 'England',
    region: 'Yorkshire & Humber',
    county: 'West & South Yorkshire',
    city: 'Leeds & Sheffield',
    status: 'AVAILABLE',
    created_at: '2026-02-18T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Steel fabrication, advanced engineering, regional EPC partnerships, rooftop solar.',
    nextStep: 'Direct onboarding pathway open.',
    indicativeMarketPotential: 'High (Heavy Manufacturing)',
    solarRating: 'Moderate',
    windRating: 'High',
    coordinates: { x: 50, y: 40 }
  },
  {
    territory_id: 'ENG-NE-NEWCASTLE',
    country: 'England',
    region: 'North East',
    county: 'Tyne & Wear & Teesside',
    city: 'Newcastle & Middlesbrough',
    status: 'AVAILABLE',
    created_at: '2026-02-20T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Freeport industrial zones, offshore wind supply chain sites, high-voltage battery storage.',
    nextStep: 'Initiate franchise discovery for North East territory.',
    indicativeMarketPotential: 'Very High (Industrial Freeport & BESS)',
    solarRating: 'Moderate',
    windRating: 'Exceptional',
    coordinates: { x: 52, y: 28 }
  },

  // SCOTLAND
  {
    territory_id: 'SCO-CENTRAL-BELT',
    country: 'Scotland',
    region: 'Scotland Central Belt & Borders',
    county: 'Glasgow & Edinburgh Corridor',
    city: 'Glasgow & Edinburgh',
    status: 'ENQUIRY',
    created_at: '2026-01-25T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Commercial rooftops, data centres, corporate ESG offtakers, onshore wind co-development.',
    nextStep: 'Territory discussion with Scottish regional director.',
    indicativeMarketPotential: 'Very High (Corporate & Technology)',
    solarRating: 'Moderate',
    windRating: 'Exceptional',
    coordinates: { x: 40, y: 22 }
  },
  {
    territory_id: 'SCO-HIGHLANDS',
    country: 'Scotland',
    region: 'Scotland Highlands & Islands',
    county: 'Highlands & Aberdeenshire',
    city: 'Inverness & Aberdeen',
    status: 'AVAILABLE',
    created_at: '2026-02-22T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Large-scale onshore wind, energy transition engineering, distillery solar + thermal microgrids.',
    nextStep: 'Franchise application and territory planning review.',
    indicativeMarketPotential: 'Exceptional (Wind & Microgrid)',
    solarRating: 'Moderate',
    windRating: 'Exceptional',
    coordinates: { x: 42, y: 12 }
  },

  // WALES
  {
    territory_id: 'WAL-SOUTH-CARDIFF',
    country: 'Wales',
    region: 'Wales',
    county: 'South Wales & Glamorgan',
    city: 'Cardiff & Swansea',
    status: 'AVAILABLE',
    created_at: '2026-02-05T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Port logistics, steel and manufacturing decarbonisation, hillside solar, Welsh government grant programs.',
    nextStep: 'Schedule territory onboarding consultation.',
    indicativeMarketPotential: 'High (Industrial & Ports)',
    solarRating: 'Very High',
    windRating: 'Exceptional',
    coordinates: { x: 34, y: 64 }
  },
  {
    territory_id: 'WAL-NORTH-WREXHAM',
    country: 'Wales',
    region: 'Wales',
    county: 'North Wales',
    city: 'Wrexham & Deeside',
    status: 'AVAILABLE',
    created_at: '2026-02-12T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Industrial estates, aerospace manufacturing supply chain, commercial rooftop solar.',
    nextStep: 'Submit franchise enquiry.',
    indicativeMarketPotential: 'Moderate–High (Industrial)',
    solarRating: 'High',
    windRating: 'High',
    coordinates: { x: 38, y: 52 }
  },

  // NORTHERN IRELAND
  {
    territory_id: 'NI-BELFAST-METRO',
    country: 'Northern Ireland',
    region: 'Northern Ireland',
    county: 'County Antrim & Down',
    city: 'Belfast & Lisburn',
    status: 'AVAILABLE',
    created_at: '2026-02-25T00:00:00Z',
    updated_at: '2026-08-01T00:00:00Z',
    businessOpportunity: 'Agri-food processing, harbour marine solar, commercial energy efficiency and battery integration.',
    nextStep: 'Request Northern Ireland franchise prospectus.',
    indicativeMarketPotential: 'High (Agri-Food & Commercial)',
    solarRating: 'Moderate',
    windRating: 'Exceptional',
    coordinates: { x: 22, y: 38 }
  }
];

/**
 * 2. DEMO CRM PIPELINE DATA (Section 6 & 7 of Prompt 5)
 * Clearly marked as DEMO DATA for CRM UI simulation
 */
export const DEMO_CRM_KPIS = {
  totalLeads: 148,
  newEnquiries: 24,
  siteSurveysBooked: 12,
  activeQuotations: 19,
  liveProjects: 8,
  activeCustomers: 43,
  grossPipelineValueGbp: 4850000,
  estimatedProfitShareGbp: 121250, // 25% of illustrative net margin
  averageProjectKw: 285
};

export const DEMO_CRM_LEADS: FranchiseCrmLead[] = [
  {
    leadId: 'LEAD-8841',
    customerName: 'AeroTech Manufacturing Ltd',
    companyName: 'AeroTech UK',
    email: 'facilities@aerotech-uk.com',
    phone: '+44 121 496 0831',
    territory: 'West Midlands',
    technology: 'COMMERCIAL',
    stage: 'SITE SURVEY',
    estimatedValueGbp: 340000,
    leadSource: 'Unite Greentek Web Inbound',
    createdDate: '2026-08-12'
  },
  {
    leadId: 'LEAD-8839',
    customerName: 'Cotswold Dairy Estates',
    companyName: 'Cotswold Organics',
    email: 'estates@cotswold-dairy.co.uk',
    phone: '+44 1452 780 119',
    territory: 'South West',
    technology: 'HYBRID',
    stage: 'PROPOSAL',
    estimatedValueGbp: 620000,
    leadSource: 'Territory Field Outreach',
    createdDate: '2026-08-10'
  },
  {
    leadId: 'LEAD-8835',
    customerName: 'Nexus Logistics Hub 4',
    companyName: 'Nexus Property Trust',
    email: 'energy@nexuslogistics.co.uk',
    phone: '+44 161 820 4491',
    territory: 'North West',
    technology: 'ROOFTOP',
    stage: 'NEGOTIATION',
    estimatedValueGbp: 890000,
    leadSource: 'Corporate PPA Inbound',
    createdDate: '2026-08-04'
  },
  {
    leadId: 'LEAD-8828',
    customerName: 'Dr. Alistair Macleod',
    companyName: 'Macleod BioMed Research',
    email: 'operations@macleodbiomed.ac.uk',
    phone: '+44 131 662 9010',
    territory: 'Scotland Central Belt',
    technology: 'BESS',
    stage: 'CONTRACT',
    estimatedValueGbp: 450000,
    leadSource: 'Partner Referral',
    createdDate: '2026-07-28'
  },
  {
    leadId: 'LEAD-8819',
    customerName: 'Highland Glen Distillery',
    companyName: 'Glen Spey Spirits Ltd',
    email: 'directors@highlandglen.co.uk',
    phone: '+44 1463 992 018',
    territory: 'Scotland Highlands',
    technology: 'WIND',
    stage: 'QUALIFICATION',
    estimatedValueGbp: 1250000,
    leadSource: 'Landowner Network',
    createdDate: '2026-08-14'
  }
];

export const DEMO_CRM_PROJECTS: FranchiseCrmProject[] = [
  {
    projectId: 'PRJ-2026-014',
    projectName: 'Bristol Port Logistics Solar Array',
    customerName: 'Avon Freight Services',
    territory: 'Bristol & Somerset',
    technology: 'ROOFTOP',
    systemSizeKw: 650,
    stage: 'INSTALLATION',
    contractValueGbp: 495000,
    estimatedNetProfitShareGbp: 18500,
    startDate: '2026-07-01',
    completionDateEstimated: '2026-09-15'
  },
  {
    projectId: 'PRJ-2026-011',
    projectName: 'Exeter Agri-Storage BESS System',
    customerName: 'South West Farms Consortium',
    territory: 'Devon & Cornwall',
    technology: 'BESS',
    systemSizeKw: 1000,
    stage: 'CONTRACT',
    contractValueGbp: 780000,
    estimatedNetProfitShareGbp: 29200,
    startDate: '2026-08-01',
    completionDateEstimated: '2026-11-30'
  },
  {
    projectId: 'PRJ-2026-008',
    projectName: 'Cambridge Innovation Campus PV',
    customerName: 'BioTech Park Ltd',
    territory: 'Cambridgeshire & Norfolk',
    technology: 'SOLAR',
    systemSizeKw: 420,
    stage: 'O&M',
    contractValueGbp: 315000,
    estimatedNetProfitShareGbp: 11800,
    startDate: '2026-03-10',
    completionDateEstimated: '2026-05-20'
  }
];

/**
 * 3. VALUE PROPOSITION CARDS (Section 2 of Prompt 5)
 */
export const FRANCHISE_VALUE_PROPS = [
  {
    number: '01',
    title: 'TERRITORY OPPORTUNITY',
    description: 'Develop commercial, industrial and residential clean-energy business within an agreed geographic territory.',
    icon: 'MapPin'
  },
  {
    number: '02',
    title: 'COMPLETE CRM',
    description: 'Manage leads, customers, quotations, site surveys and project pipelines through a central digital platform.',
    icon: 'LayoutDashboard'
  },
  {
    number: '03',
    title: 'MARKETING SUPPORT',
    description: 'Access branded corporate marketing materials, regional digital campaigns, and qualified inbound lead generation.',
    icon: 'Megaphone'
  },
  {
    number: '04',
    title: 'TECHNICAL SUPPORT',
    description: 'Access complete engineering, PVsyst yield simulations, single-line diagrams, and ENA G99 grid connection assistance.',
    icon: 'Wrench'
  },
  {
    number: '05',
    title: 'TRAINING',
    description: 'Structured training across solar sales, BESS architecture, commercial PPA structuring, and CRM workflows.',
    icon: 'GraduationCap'
  },
  {
    number: '06',
    title: 'TRANSPARENCY',
    description: 'Clear project visibility, milestone tracking, verified stage gates, and transparent commercial accounting.',
    icon: 'ShieldCheck'
  }
];

/**
 * 4. £20,000 PACKAGE BREAKDOWN (Section 4 of Prompt 5)
 */
export const FRANCHISE_INVESTMENT_BREAKDOWN = [
  {
    category: 'FRANCHISE SETUP',
    detail: 'Territory allocation rights, operating licence under Unite Solar brand, digital onboarding dossier.',
    highlight: 'Brand Lineage'
  },
  {
    category: 'MARKETING ASSETS',
    detail: 'Corporate brand collateral, regional digital marketing kickstart, presentation decks, case study library.',
    highlight: 'Turnkey Collateral'
  },
  {
    category: 'CRM PLATFORM',
    detail: 'Dedicated territory CRM licence, lead dispatch engine, pipeline analytics, quotation builder.',
    highlight: 'Central Cloud Software'
  },
  {
    category: 'TRAINING PROGRAMME',
    detail: 'Intensive commercial training covering PV, BESS, zero-capex PPAs, client qualification, and compliance.',
    highlight: 'Comprehensive Modules'
  },
  {
    category: 'BUSINESS & TECH SUPPORT',
    detail: 'Direct access to senior engineering desk, project yield modeling, EPC coordination, and legal templates.',
    highlight: 'Full Ecosystem Access'
  }
];

/**
 * 5. WHO CAN BECOME A PARTNER (Section 10 of Prompt 5)
 */
export const PARTNER_PROFILES = [
  {
    title: 'ENERGY PROFESSIONALS',
    desc: 'Consultants, energy brokers, and decarbonisation advisers seeking full-stack EPC delivery and bankable PPA capital.'
  },
  {
    title: 'PROPERTY PROFESSIONALS',
    desc: 'Surveyors, estate agents, and commercial landlords monetising client rooftops, industrial estates, and farmland.'
  },
  {
    title: 'SALES ENTREPRENEURS',
    desc: 'High-performing commercial sales leaders building a scalable high-ticket clean-energy enterprise.'
  },
  {
    title: 'EPC PROFESSIONALS',
    desc: 'Electrical contractors and installers looking to expand from sub-contracting into full territory project origination.'
  },
  {
    title: 'BUSINESS OWNERS',
    desc: 'Established service companies looking to add a high-margin renewable-energy division to their existing operations.'
  },
  {
    title: 'LOCAL ENTREPRENEURS',
    desc: 'Local leaders with strong business and community networks passionate about regional green energy independence.'
  },
  {
    title: 'INVESTORS',
    desc: 'Angel and private investors seeking structured operating businesses backed by tangible infrastructure assets.'
  },
  {
    title: 'RENEWABLE SPECIALISTS',
    desc: 'Solar, wind, and storage specialists wanting international brand backing and centralized procurement power.'
  }
];

/**
 * 6. FRANCHISE FAQs (Section 16 of Prompt 5)
 */
export const FRANCHISE_FAQS = [
  {
    q: 'What does the £20,000 package include?',
    a: 'The indicative £20,000* entry opportunity includes your agreed territory operating rights, corporate onboarding, central CRM software access, initial marketing collateral, technical training curriculum, and access to Unite Greentek’s engineering and supply ecosystem. Final commercial terms and exact allocations are provided during the formal onboarding stage.'
  },
  {
    q: 'How is the territory selected and allocated?',
    a: 'Territories are structured around defensible UK geographic zones (counties, metropolitan regions, or industrial hubs). During the discovery stage, we evaluate your preferred territory, local commercial density, and current status. Territory exclusivity and development milestones are codified in the applicable Franchise Agreement.'
  },
  {
    q: 'Is technical engineering experience required to become a partner?',
    a: 'No. You do not need to be a qualified electrical engineer to build a successful territory. Technical support, PVsyst engineering simulations, structural reviews, and grid connection applications (ENA G99) are provided through the central Unite Solar engineering desk, allowing you to focus on client relationships, commercial origination, and local business development.'
  },
  {
    q: 'What ongoing support does Unite Solar provide?',
    a: 'Franchise partners receive ongoing commercial, technical, and marketing support — including proposal generation, system sizing, supplier pricing advantages, legal PPA contracts, dedicated lead dispatch, and regular business reviews with our leadership team.'
  },
  {
    q: 'How does the CRM platform work for franchise partners?',
    a: 'Our dedicated CRM platform provides end-to-end visibility across your entire sales and project pipeline. You can manage incoming leads, schedule site surveys, generate quotations, track installation milestones, and view transparent profit-share accounting in real time.'
  },
  {
    q: 'How does the 25% net profit share structure work?',
    a: 'Eligible franchise partners may participate in up to a 25% net profit share* structure on completed projects generated within their agreed territory, after deducting direct equipment, EPC, grid, and installation costs. Exact percentages and disbursement schedules are defined within the applicable Franchise Agreement.'
  },
  {
    q: 'Can I operate the franchise on a part-time basis?',
    a: 'Yes. We offer flexible pathways: a Dedicated Full-Time Business, Part-Time Development alongside an existing consultancy or agency (where permitted by agreement), or Business Expansion adding solar services to an existing contracting or property firm.'
  },
  {
    q: 'Can I develop commercial, industrial and utility-scale projects?',
    a: 'Yes. While many partners begin with high-yield commercial rooftops (50 kW–1 MW), you can also originate large-scale ground-mount solar, battery storage systems (BESS), and corporate PPAs with full technical backing from Unite Greentek Limited.'
  },
  {
    q: 'Can I work with local EPC contractors and installers?',
    a: 'Yes. Where approved under Unite quality and safety standards, you can collaborate with accredited local electrical and civil contractors, or leverage Unite’s national installation framework.'
  },
  {
    q: 'What happens after I submit my franchise application?',
    a: 'Our franchise development team will review your application details, assess the requested territory availability, and schedule a confidential Discovery Call (Stage 02) to discuss commercial models, background alignment, and the formal Franchise Information Pack.'
  }
];
