import {
  UkOpportunityRegionData,
  UkMapMarker,
  ProjectPortfolioItem,
  TechnologyType,
  ProjectDevelopmentStage
} from '../types';

export const UK_OPPORTUNITY_REGIONS: UkOpportunityRegionData[] = [
  {
    id: 'south-west',
    name: 'South West',
    country: 'England',
    mapPathId: 'south-west-path',
    opportunities: ['Utility Solar', 'Agricultural Solar', 'Commercial Rooftops', 'Co-located BESS', 'Hybrid Projects'],
    potentialProjectTypes: ['Ground Mount Solar Farms (20–100 MWp)', 'Agricultural Agri-PV Clusters', 'Industrial Rooftop PPA', 'Grid Support BESS'],
    solarResourceRating: 'Exceptional',
    windResourceRating: 'High',
    bessOpportunityRating: 'Critical',
    keyDnoZones: ['National Grid Electricity Distribution (South West)'],
    summary: 'The UK premier solar irradiance corridor with high direct normal irradiation and agricultural land diversification opportunities.',
    indicativePipelineMw: 420
  },
  {
    id: 'south-east-london',
    name: 'South East & London',
    country: 'England',
    mapPathId: 'south-east-path',
    opportunities: ['Commercial Rooftops', 'Behind-the-Meter Solar', 'Urban BESS', 'Corporate PPA', 'Data Centre Energy'],
    potentialProjectTypes: ['Logistics & Warehousing Rooftops', 'Cold Storage Solar + Storage', 'Corporate Office PPAs', 'Fast EV Charging Hubs'],
    solarResourceRating: 'Very High',
    windResourceRating: 'Moderate',
    bessOpportunityRating: 'Critical',
    keyDnoZones: ['UK Power Networks (SPN & EPN)', 'UKPN London'],
    summary: 'Dense commercial and logistics real estate demanding peak shaving, zero-carbon electricity supply, and resilience storage.',
    indicativePipelineMw: 360
  },
  {
    id: 'east-of-england',
    name: 'East of England',
    country: 'England',
    mapPathId: 'east-path',
    opportunities: ['Solar Parks', 'Agricultural Solar', 'BESS Hubs', 'Offshore Wind Landfall Storage', 'Port Electrification'],
    potentialProjectTypes: ['Large-scale Solar Farms (50–250 MWp)', 'Transmission-connected BESS', 'Agri-food Processing Rooftops', 'Port Terminal Microgrids'],
    solarResourceRating: 'Exceptional',
    windResourceRating: 'Very High',
    bessOpportunityRating: 'Critical',
    keyDnoZones: ['UK Power Networks (EPN)', 'National Grid ESO 400kV'],
    summary: 'High solar insolation coupled with major offshore wind grid landing points, driving significant battery storage requirements.',
    indicativePipelineMw: 580
  },
  {
    id: 'east-midlands',
    name: 'East Midlands',
    country: 'England',
    mapPathId: 'east-midlands-path',
    opportunities: ['Industrial Rooftops', 'Logistics Hub Solar', 'Former Mining Land Redevelopment', 'Grid BESS'],
    potentialProjectTypes: ['Golden Triangle Distribution Centres (1–10 MWp)', 'Heavy Manufacturing Private Wires', 'Brownfield Energy Parks'],
    solarResourceRating: 'High',
    windResourceRating: 'High',
    bessOpportunityRating: 'High',
    keyDnoZones: ['National Grid Electricity Distribution (East Midlands)'],
    summary: 'The central distribution nerve center of Britain with millions of square meters of unexploited logistics roof surfaces.',
    indicativePipelineMw: 310
  },
  {
    id: 'west-midlands',
    name: 'West Midlands',
    country: 'England',
    mapPathId: 'west-midlands-path',
    opportunities: ['Manufacturing Solar', 'Automotive Private Wire', 'Behind-the-Meter Storage', 'RESCO Solutions'],
    potentialProjectTypes: ['Automotive & Tier-1 Supplier Facilities', 'Metals & Precision Engineering Rooftops', 'Industrial Estate Shared Microgrids'],
    solarResourceRating: 'High',
    windResourceRating: 'Moderate',
    bessOpportunityRating: 'High',
    keyDnoZones: ['National Grid Electricity Distribution (West Midlands)'],
    summary: 'Intense industrial power consumption profile seeking protection from peak electricity tariffs and mandatory ESG compliance.',
    indicativePipelineMw: 240
  },
  {
    id: 'yorkshire-humber',
    name: 'Yorkshire & Humber',
    country: 'England',
    mapPathId: 'yorkshire-path',
    opportunities: ['Industrial Decarbonisation', 'Commercial Solar', 'Onshore Wind', 'Heavy Energy Storage', 'Port Solar'],
    potentialProjectTypes: ['Chemical & Steel Plant Private Wires', 'Onshore Wind Repowering', 'Large Industrial Rooftop Arrays', 'Humber Energy Estuary BESS'],
    solarResourceRating: 'High',
    windResourceRating: 'Very High',
    bessOpportunityRating: 'Critical',
    keyDnoZones: ['Northern Powergrid (Yorkshire)'],
    summary: 'Major industrial energy cluster accelerating decarbonisation across manufacturing, chemicals, and maritime logistics.',
    indicativePipelineMw: 410
  },
  {
    id: 'north-west',
    name: 'North West',
    country: 'England',
    mapPathId: 'north-west-path',
    opportunities: ['Commercial Rooftops', 'Industrial BESS', 'Solar Parks', 'Pharmaceutical Microgrids', 'Wind Energy'],
    potentialProjectTypes: ['Aerospace & Pharma Clean Energy Hubs', 'Glass & Materials Manufacturing Private Wires', 'Landowner Ground Mount Arrays'],
    solarResourceRating: 'Moderate',
    windResourceRating: 'High',
    bessOpportunityRating: 'High',
    keyDnoZones: ['Electricity North West (ENWL)'],
    summary: 'Strong manufacturing base requiring high-resilience energy storage and direct behind-the-meter solar generation.',
    indicativePipelineMw: 270
  },
  {
    id: 'north-east',
    name: 'North East',
    country: 'England',
    mapPathId: 'north-east-path',
    opportunities: ['Clean Tech Manufacturing', 'Port & Marine Solar', 'Onshore Wind', 'Large Scale BESS', 'Green Hydrogen Power'],
    potentialProjectTypes: ['Gigafactory Supply Chain Solar', 'Port of Tyne / Tees Valley Energy Parks', 'Substation-Adjacent Storage'],
    solarResourceRating: 'Moderate',
    windResourceRating: 'Very High',
    bessOpportunityRating: 'Strategic',
    keyDnoZones: ['Northern Powergrid (Northeast)'],
    summary: 'High voltage transmission access and large coastal brownfield plots ideal for gigawatt-scale energy storage and clean tech supply.',
    indicativePipelineMw: 330
  },
  {
    id: 'scotland-highlands',
    name: 'Scotland Highlands & Islands',
    country: 'Scotland',
    mapPathId: 'scotland-highlands-path',
    opportunities: ['Onshore Wind', 'Offshore Wind Landfall', 'Grid-Scale BESS', 'Pumped & Chemical Storage', 'Remote Microgrids'],
    potentialProjectTypes: ['Utility Scale Wind Parks (50–500 MW)', 'Grid Constrained Transmission BESS', 'Island Renewable Microgrids'],
    solarResourceRating: 'Moderate',
    windResourceRating: 'Exceptional',
    bessOpportunityRating: 'Critical',
    keyDnoZones: ['SSEN Transmission / Scottish & Southern Electricity Networks'],
    summary: 'World-class wind resources and critical energy transmission hubs enabling massive green energy export into the national grid.',
    indicativePipelineMw: 890
  },
  {
    id: 'scotland-central',
    name: 'Scotland Central Belt & Borders',
    country: 'Scotland',
    mapPathId: 'scotland-central-path',
    opportunities: ['Commercial Rooftops', 'Onshore Wind', 'Solar + Wind Hybrids', 'Industrial BESS', 'Corporate PPA'],
    potentialProjectTypes: ['Manufacturing & Distilling Rooftops', 'Agricultural Solar & Wind Hybrids', 'Distribution Hub Solar Arrays'],
    solarResourceRating: 'High',
    windResourceRating: 'Exceptional',
    bessOpportunityRating: 'Strategic',
    keyDnoZones: ['SP Energy Networks (SP Transmission / SP Distribution)'],
    summary: 'Dynamic mix of heavy industry, beverage manufacturing, and agricultural land with balanced wind-solar complementary generation.',
    indicativePipelineMw: 450
  },
  {
    id: 'wales',
    name: 'Wales',
    country: 'Wales',
    mapPathId: 'wales-path',
    opportunities: ['Agricultural Solar', 'Hillside Wind', 'Industrial Private Wire', 'Tidal & Hybrid Storage', 'Public Sector Energy'],
    potentialProjectTypes: ['Rural Landowner Solar Leases', 'Industrial South Wales Private Wires', 'North Wales Clean Energy Hubs'],
    solarResourceRating: 'High',
    windResourceRating: 'Very High',
    bessOpportunityRating: 'Strategic',
    keyDnoZones: ['SP Energy Networks (North Wales)', 'National Grid Electricity Distribution (South Wales)'],
    summary: 'Supportive Welsh Government net zero mandates combined with excellent solar in the South and wind across elevated terrains.',
    indicativePipelineMw: 390
  },
  {
    id: 'northern-ireland',
    name: 'Northern Ireland',
    country: 'Northern Ireland',
    mapPathId: 'ni-path',
    opportunities: ['Agri-PV Systems', 'Onshore Wind', 'Fast-Response BESS', 'Farm Microgrids', 'Commercial PPA'],
    potentialProjectTypes: ['Dairy & Poultry Farm Solar Arrays', 'Single Turbine Wind + Solar Hybrids', 'SONI Fast Frequency Storage'],
    solarResourceRating: 'Moderate',
    windResourceRating: 'Exceptional',
    bessOpportunityRating: 'Strategic',
    keyDnoZones: ['Northern Ireland Electricity Networks (NIE Networks) / SONI'],
    summary: 'High penetration of agricultural renewable self-generation with strong demand for battery storage to navigate network constraints.',
    indicativePipelineMw: 210
  }
];

export const UK_MAP_MARKERS: UkMapMarker[] = [
  {
    id: 'sw-solar-1',
    name: 'Somerset Solar Farm Hub',
    region: 'South West',
    country: 'England',
    coordinates: { x: 38, y: 77 },
    technology: 'SOLAR',
    category: 'UTILITY',
    indicativeCapacity: '49.9 MWp',
    projectStage: 'FEASIBILITY',
    opportunitySummary: 'Utility-scale ground mount solar park with co-located battery storage.',
    potentialTypes: ['Bifacial Solar PV', 'G99 33kV Substation', 'Agricultural Grazing'],
    gridDno: 'NGED South West',
    highlight: 'High solar irradiance yield (>1,080 kWh/kWp/yr)'
  },
  {
    id: 'sw-bess-1',
    name: 'Exeter Grid Support BESS',
    region: 'South West',
    country: 'England',
    coordinates: { x: 31, y: 84 },
    technology: 'BESS',
    category: 'BESS',
    indicativeCapacity: '50 MW / 100 MWh',
    projectStage: 'GRID',
    opportunitySummary: '2-hour duration lithium-ion LFP battery storage facility adjacent to 132kV bulk supply point.',
    potentialTypes: ['Dynamic Containment', 'Triad Avoidance', 'Wholesale Arbitrage'],
    gridDno: 'NGED South West',
    highlight: 'Fast-response frequency response node'
  },
  {
    id: 'se-comm-1',
    name: 'Heathrow Logistics Rooftop Hub',
    region: 'South East & London',
    country: 'England',
    coordinates: { x: 67, y: 76 },
    technology: 'COMMERCIAL',
    category: 'ROOFTOP',
    indicativeCapacity: '3.2 MWp',
    projectStage: 'READY FOR INVESTMENT',
    opportunitySummary: 'Multi-tenant logistics distribution facility rooftop solar PPA.',
    potentialTypes: ['Zero-CAPEX Corporate PPA', 'Onsite Self-Consumption', 'EV Fleet Integration'],
    gridDno: 'UK Power Networks (SPN)',
    highlight: '78% daytime self-consumption profile'
  },
  {
    id: 'east-hybrid-1',
    name: 'Norfolk Clean Hybrid Park',
    region: 'East of England',
    country: 'England',
    coordinates: { x: 80, y: 64 },
    technology: 'HYBRID',
    category: 'HYBRID',
    indicativeCapacity: '75 MW (Solar + Wind + BESS)',
    projectStage: 'PLANNING',
    opportunitySummary: 'Co-located 40MW solar, 25MW wind, and 10MW/20MWh battery sharing a single export connection.',
    potentialTypes: ['Shared Transformer Architecture', '24/7 Green Baseload', 'Curtailment Mitigation'],
    gridDno: 'UK Power Networks (EPN)',
    highlight: 'Optimised 44% combined capacity factor'
  },
  {
    id: 'east-solar-1',
    name: 'Cambridgeshire Agri-PV Cluster',
    region: 'East of England',
    country: 'England',
    coordinates: { x: 70, y: 68 },
    technology: 'SOLAR',
    category: 'UTILITY',
    indicativeCapacity: '35 MWp',
    projectStage: 'LAND',
    opportunitySummary: 'Agricultural dual-use solar project preserving sheep grazing pasture underneath solar arrays.',
    potentialTypes: ['Elevated Single-Axis Trackers', 'Biodiversity Net Gain +20%', '30-Year Landowner Lease'],
    gridDno: 'UK Power Networks',
    highlight: 'Grade 3 agricultural land lease partnership'
  },
  {
    id: 'midlands-comm-1',
    name: 'Daventry Golden Triangle Depot',
    region: 'East Midlands',
    country: 'England',
    coordinates: { x: 57, y: 67 },
    technology: 'COMMERCIAL',
    category: 'COMMERCIAL',
    indicativeCapacity: '2.4 MWp',
    projectStage: 'FEASIBILITY',
    opportunitySummary: 'High-bay automated fulfillment centre with standing seam metal roof solar array.',
    potentialTypes: ['RESCO Energy-as-a-Service', 'G99 Export Control', 'Direct Wire'],
    gridDno: 'NGED East Midlands',
    highlight: 'Directly powers 24/7 robotic fulfillment systems'
  },
  {
    id: 'bham-ind-1',
    name: 'Black Country Precision Engineering',
    region: 'West Midlands',
    country: 'England',
    coordinates: { x: 50, y: 65 },
    technology: 'ROOFTOP',
    category: 'COMMERCIAL',
    indicativeCapacity: '1.1 MWp',
    projectStage: 'OPPORTUNITY',
    opportunitySummary: 'Heavy metal forging and machining facility rooftop solar plus 500kWh peak-shaving BESS.',
    potentialTypes: ['CAPEX with Super Deduction', 'Demand Charge Reduction', 'Backup Power'],
    gridDno: 'NGED West Midlands',
    highlight: 'Reduces peak summer electricity charges by 42%'
  },
  {
    id: 'york-wind-1',
    name: 'Humber Estuary Industrial Wind',
    region: 'Yorkshire & Humber',
    country: 'England',
    coordinates: { x: 67, y: 52 },
    technology: 'WIND',
    category: 'UTILITY',
    indicativeCapacity: '18 MW',
    projectStage: 'FEASIBILITY',
    opportunitySummary: 'Onshore 3-turbine private wire development powering port manufacturing facilities.',
    potentialTypes: ['Direct Private Wire PPA', 'High Wind Capacity Factor', 'Port Electrification'],
    gridDno: 'Northern Powergrid (Yorkshire)',
    highlight: 'Close proximity to 33kV port substation'
  },
  {
    id: 'nw-bess-1',
    name: 'Manchester Industrial BESS Hub',
    region: 'North West',
    country: 'England',
    coordinates: { x: 47, y: 54 },
    technology: 'BESS',
    category: 'BESS',
    indicativeCapacity: '30 MW / 60 MWh',
    projectStage: 'GRID',
    opportunitySummary: 'Grid resilience storage system serving critical North West manufacturing corridors.',
    potentialTypes: ['Frequency Balancing', 'Wholesale Arbitrage', 'Capacity Market'],
    gridDno: 'Electricity North West',
    highlight: 'Secured DNO point of connection assessment'
  },
  {
    id: 'ne-hybrid-1',
    name: 'Teesside Clean Tech Energy Park',
    region: 'North East',
    country: 'England',
    coordinates: { x: 61, y: 40 },
    technology: 'HYBRID',
    category: 'HYBRID',
    indicativeCapacity: '60 MW (Solar + BESS)',
    projectStage: 'OPPORTUNITY',
    opportunitySummary: 'Brownfield redevelopment project pairing industrial solar with heavy grid balancing storage.',
    potentialTypes: ['Industrial Brownfield Lease', 'Direct Supply to Green Chem', 'High Voltage Connection'],
    gridDno: 'Northern Powergrid (Northeast)',
    highlight: 'Regenerating former chemical industrial land'
  },
  {
    id: 'scot-wind-1',
    name: 'Highlands Onshore Wind Corridor',
    region: 'Scotland Highlands & Islands',
    country: 'Scotland',
    coordinates: { x: 45, y: 18 },
    technology: 'WIND',
    category: 'UTILITY',
    indicativeCapacity: '120 MW',
    projectStage: 'FEASIBILITY',
    opportunitySummary: 'High-yield hill terrain wind farm with exceptional capacity factors (>38%).',
    potentialTypes: ['Modern 6MW+ Wind Turbines', 'Long-term Land Lease Agreement', 'CfD / Corporate PPA'],
    gridDno: 'SSEN Transmission',
    highlight: 'Mean annual wind speeds exceeding 8.8 m/s at hub height'
  },
  {
    id: 'scot-hybrid-1',
    name: 'Aberdeenshire Wind + BESS Hub',
    region: 'Scotland Highlands & Islands',
    country: 'Scotland',
    coordinates: { x: 65, y: 22 },
    technology: 'HYBRID',
    category: 'HYBRID',
    indicativeCapacity: '80 MW / 160 MWh',
    projectStage: 'PLANNING',
    opportunitySummary: 'Colocating heavy battery storage alongside onshore wind to mitigate transmission constraint payments.',
    potentialTypes: ['Constraint Alleviation', 'Firm Green Power PPA', '275kV Grid Interconnection'],
    gridDno: 'SSEN Transmission',
    highlight: 'Prevents wind curtailment during peak Scottish generation'
  },
  {
    id: 'scot-comm-1',
    name: 'Central Belt Distillers Solar',
    region: 'Scotland Central Belt & Borders',
    country: 'Scotland',
    coordinates: { x: 50, y: 31 },
    technology: 'SOLAR',
    category: 'COMMERCIAL',
    indicativeCapacity: '4.5 MWp',
    projectStage: 'READY FOR INVESTMENT',
    opportunitySummary: 'Ground and warehouse rooftop solar for historic beverage production estate.',
    potentialTypes: ['Corporate BOOT Model', 'Zero Upfront Capex', 'ESG Net Zero Alignment'],
    gridDno: 'SP Energy Networks',
    highlight: 'Displaces 1,200 tonnes of grid carbon emissions annually'
  },
  {
    id: 'wales-solar-1',
    name: 'Pembrokeshire Coastal Solar',
    region: 'Wales',
    country: 'Wales',
    coordinates: { x: 26, y: 69 },
    technology: 'SOLAR',
    category: 'UTILITY',
    indicativeCapacity: '28 MWp',
    projectStage: 'FEASIBILITY',
    opportunitySummary: 'South-facing coastal agricultural land opportunity with outstanding solar irradiance index.',
    potentialTypes: ['Land Option Agreement', 'Agri-PV Compatible', 'Direct DNO Connection'],
    gridDno: 'NGED South Wales',
    highlight: 'South-facing aspect with minimal shading profile'
  },
  {
    id: 'wales-hybrid-1',
    name: 'South Wales Industrial Private Wire',
    region: 'Wales',
    country: 'Wales',
    coordinates: { x: 38, y: 71 },
    technology: 'HYBRID',
    category: 'HYBRID',
    indicativeCapacity: '35 MW (Solar + BESS)',
    projectStage: 'LAND',
    opportunitySummary: 'Behind-the-meter solar and storage supplying manufacturing facilities in Port Talbot region.',
    potentialTypes: ['Private Wire PPA (20 Years)', 'Heavy Industrial Cost Hedge', 'DNO Import Protection'],
    gridDno: 'NGED South Wales',
    highlight: 'Directly offsets high daytime electricity industrial tariffs'
  },
  {
    id: 'ni-wind-1',
    name: 'County Tyrone Wind & Storage Farm',
    region: 'Northern Ireland',
    country: 'Northern Ireland',
    coordinates: { x: 18, y: 44 },
    technology: 'WIND',
    category: 'UTILITY',
    indicativeCapacity: '24 MW',
    projectStage: 'FEASIBILITY',
    opportunitySummary: 'High wind yield cluster paired with fast-response battery frequency response.',
    potentialTypes: ['SONI DS3 System Services', 'Landowner Royalty Structure', 'Grid Export Protocol'],
    gridDno: 'NIE Networks / SONI',
    highlight: 'Strong wind resource with high availability factor'
  },
  {
    id: 'ni-solar-1',
    name: 'Belfast Commercial Logistics Solar',
    region: 'Northern Ireland',
    country: 'Northern Ireland',
    coordinates: { x: 23, y: 41 },
    technology: 'COMMERCIAL',
    category: 'ROOFTOP',
    indicativeCapacity: '1.8 MWp',
    projectStage: 'OPPORTUNITY',
    opportunitySummary: 'Harbour logistics warehouse rooftop solar PV project under structured corporate PPA.',
    potentialTypes: ['Off-Balance Sheet PPA', 'Zero Maintenance SLA', 'Port Carbon Reduction'],
    gridDno: 'NIE Networks',
    highlight: 'Provides predictable locked energy pricing for 20 years'
  }
];

export const PROJECT_DEVELOPMENT_PIPELINE: {
  stageNumber: number;
  stageCode: ProjectDevelopmentStage;
  title: string;
  subtitle: string;
  objective: string;
  keyActivities: string[];
  typicalStakeholders: string[];
  requiredAssessments: string[];
  timelineEstimate: string;
}[] = [
  {
    stageNumber: 1,
    stageCode: 'OPPORTUNITY',
    title: '01. Opportunity Identification',
    subtitle: 'Site Origination & Strategic Screening',
    objective: 'Identify high-potential land, rooftop, or industrial sites matching renewable resource quality and network proximity.',
    keyActivities: [
      'Desktop GIS resource and topography screening',
      'Preliminary constraint analysis (AONB, SSSI, Green Belt, Flood Zones)',
      'High-level grid capacity heat map review',
      'Initial landowner engagement and interest validation'
    ],
    typicalStakeholders: ['Unite Origination Team', 'Landowners', 'Land Agents', 'Commercial Property Hosts'],
    requiredAssessments: ['GIS Spatial Mapping', 'Preliminary Resource Estimate', 'DNO Network Capacity Map Check'],
    timelineEstimate: 'Weeks 1–4'
  },
  {
    stageNumber: 2,
    stageCode: 'FEASIBILITY',
    title: '02. Technical Feasibility',
    subtitle: 'Engineering & Yield Modeling',
    objective: 'Quantify energy generation potential, site layout optimization, commercial viability, and initial connection routes.',
    keyActivities: [
      'On-site topographical and structural roof surveys',
      '3D PVsyst / WindPRO / Storage hourly dispatch modeling',
      'Preliminary G99 / transmission connection route design',
      'Comprehensive financial modeling and LCOE benchmarks'
    ],
    typicalStakeholders: ['Renewable Engineers', 'Surveyors', 'Financial Analysts', 'Host Organization'],
    requiredAssessments: ['PVsyst Yield Simulation', 'Structural Load Calculation', 'Single Line Diagram (SLD) Draft'],
    timelineEstimate: 'Weeks 4–10'
  },
  {
    stageNumber: 3,
    stageCode: 'LAND',
    title: '03. Land & Site Securitisation',
    subtitle: 'Legal Agreements & Exclusivity',
    objective: 'Secure long-term legal rights to develop, build, and operate the renewable plant via robust contracts.',
    keyActivities: [
      'Negotiate Option to Lease / Roof Lease Agreement (25–40 years)',
      'Define cable route easements and sub-station lease rights',
      'Agree rent terms, indexation (CPI/RPI), and decommissioning bond terms',
      'Execute formal legal exclusivity agreements'
    ],
    typicalStakeholders: ['Property Lawyers', 'Landowners', 'Unite Legal Council', 'Agricultural Valuers'],
    requiredAssessments: ['Title Deed & Burden Review', 'Easement Route Legal Title', 'Decommissioning Plan Draft'],
    timelineEstimate: 'Months 2–4'
  },
  {
    stageNumber: 4,
    stageCode: 'GRID',
    title: '04. Grid Connection Application',
    subtitle: 'DNO / National Grid ESO Engagement',
    objective: 'Submit formal connection applications and secure a viable, cost-effective Grid Connection Offer (G99/Transmission).',
    keyActivities: [
      'Formal ENA standard application preparation',
      'DNO network modeling, fault level, and voltage rise studies',
      'Review and negotiate Point of Connection (POC) and contestable works',
      'Accept formal Connection Offer and establish payment milestone schedule'
    ],
    typicalStakeholders: ['DNO Engineers (NGED, UKPN, SPEN, NPg)', 'National Grid ESO', 'Power Systems Consultants'],
    requiredAssessments: ['G99 Grid Compliance Study', 'Harmonic & Fault Level Analysis', 'Contestable Works Assessment'],
    timelineEstimate: 'Months 3–6 (DNO dependent)'
  },
  {
    stageNumber: 5,
    stageCode: 'PLANNING',
    title: '05. Planning & Permitting',
    subtitle: 'Local Authority & Environmental Consents',
    objective: 'Secure full planning permission or statutory Permitted Development rights with comprehensive environmental mitigation.',
    keyActivities: [
      'Environmental Impact Assessment (EIA) screening and scoping',
      'Landscape & Visual Impact Assessment (LVIA), Ecology, and Noise studies',
      'Community and stakeholder consultations',
      'Submit full planning application to Local Planning Authority (LPA)'
    ],
    typicalStakeholders: ['Planning Officers', 'Ecology Consultants', 'Local Councillors', 'Community Stakeholders'],
    requiredAssessments: ['Ecology Phase 1 Habitat Survey', 'Archaeology Desk Study', 'LVIA & Glint/Glare Assessment'],
    timelineEstimate: 'Months 4–9'
  },
  {
    stageNumber: 6,
    stageCode: 'FINANCE',
    title: '06. Commercial & Project Finance',
    subtitle: 'Capital Structuring & Offtake Agreements',
    objective: 'Structure commercial offtake contracts (Corporate PPA / RESCO / BOOT) and finalize non-recourse project capital.',
    keyActivities: [
      'Finalize long-term Corporate PPA / Energy Supply Agreement terms',
      'Bankability review and independent technical due diligence',
      'Structure equity, senior debt, or institutional fund backing',
      'Reach Final Investment Decision (FID)'
    ],
    typicalStakeholders: ['Corporate Offtaker', 'Infrastructure Lenders', 'Unite Group Inc. Investment Committee', 'Legal Advisors'],
    requiredAssessments: ['Bankable Technical Due Diligence (TDD)', 'Financial Audit Model', 'Legal Risk Red Flag Report'],
    timelineEstimate: 'Months 6–10'
  },
  {
    stageNumber: 7,
    stageCode: 'EPC',
    title: '07. EPC Procurement & Engineering',
    subtitle: 'Detailed Design & Equipment Procurement',
    objective: 'Finalize detailed engineering drawings, procure Tier-1 components, and execute comprehensive EPC turnkey delivery.',
    keyActivities: [
      'Issue detailed structural, civil, electrical, and SCADA engineering plans',
      'Tier-1 procurement (Tier-1 BloombergNEF Solar PV, Inverters, LFP BESS)',
      'Subcontractor selection, CDM regulations compliance, and site mobilization',
      'Establish health, safety, quality, and environmental protocols'
    ],
    typicalStakeholders: ['EPC Delivery Team', 'Tier-1 Equipment OEMs', 'Civil Contractors', 'Health & Safety Principal Designer'],
    requiredAssessments: ['Detailed Electrical Design (BIM)', 'CDM Principal Contractor Plan', 'Factory Acceptance Testing (FAT)'],
    timelineEstimate: 'Months 8–11'
  },
  {
    stageNumber: 8,
    stageCode: 'CONSTRUCTION',
    title: '08. Construction & Build',
    subtitle: 'Turnkey Installation & Infrastructure',
    objective: 'Execute high-quality, compliant on-site construction from ground piling/roof mounting through to final cabling.',
    keyActivities: [
      'Piling, mounting frames, ballast, and tracker installation',
      'Module placement, DC stringing, and inverter station placement',
      'Substation build, switchgear integration, and high voltage cabling',
      'Comprehensive on-site Quality Assurance and safety audits'
    ],
    typicalStakeholders: ['Site Management Team', 'DNO Inspectors', 'Civil & Electrical Installers', 'Quality Assurance Auditors'],
    requiredAssessments: ['Cable Insulation & Megger Tests', 'Structural Torque Audits', 'Environmental Compliance Logs'],
    timelineEstimate: 'Months 10–14'
  },
  {
    stageNumber: 9,
    stageCode: 'COMMISSIONING',
    title: '09. Commissioning & Grid Energisation',
    subtitle: 'G99 Testing & Commercial Handover',
    objective: 'Conduct rigorous cold and hot commissioning, satisfy DNO witness testing, energise connection, and achieve COD.',
    keyActivities: [
      'G99 protection relay testing and DNO witness sign-off',
      'Inverter parameter configuration and anti-islanding verification',
      'SCADA / telemetry live grid monitoring system integration',
      'Issue Commercial Operation Date (COD) certificate and performance handover'
    ],
    typicalStakeholders: ['DNO Commissioning Engineers', 'SCADA Integration Engineers', 'Unite Commissioning Lead', 'Client Facility Lead'],
    requiredAssessments: ['G99 Witness Test Certificate', 'Thermal Imaging Drone Baseline', 'Performance Ratio Baseline Test'],
    timelineEstimate: 'Months 13–15'
  },
  {
    stageNumber: 10,
    stageCode: 'OPERATIONS',
    title: '10. Operations & Maintenance (O&M)',
    subtitle: 'Asset Management & Performance Optimization',
    objective: 'Deliver 25+ years of maximized energy yield, preventative servicing, real-time dispatch, and guaranteed availability.',
    keyActivities: [
      '24/7 remote SCADA monitoring and automated fault dispatch',
      'Preventative mechanical and electrical inspections (thermal drone scans)',
      'Vegetation control, panel module washing, and inverter servicing',
      'ESG reporting, generation invoicing, and SEG/export market trading'
    ],
    typicalStakeholders: ['Unite Asset Management Team', 'Field Service Technicians', 'Offtaker Finance Team', 'Grid Operators'],
    requiredAssessments: ['Annual Thermographic Scan Report', 'Quarterly Performance Ratio Audit', 'Degradation Tracking Model'],
    timelineEstimate: 'Years 1–25+'
  }
];

export const PROJECT_SIZE_SCALES: {
  id: string;
  sizeLabel: string;
  rangeKw: string;
  archetype: string;
  typicalSite: string;
  annualGenerationKwh: string;
  gridVoltage: string;
  landOrRoofArea: string;
  typicalCommercialModel: string;
  visualGraphic: 'home' | 'commercial' | 'industrial' | 'solar-park' | 'utility-scale';
  description: string;
}[] = [
  {
    id: 'scale-1',
    sizeLabel: '<10 kW',
    rangeKw: '3 kW – 10 kW',
    archetype: 'Residential & Small Commercial',
    typicalSite: 'Single-phase residential dwellings, small shops, rural home offices.',
    annualGenerationKwh: '3,000 – 9,500 kWh',
    gridVoltage: '230V Single Phase (G98 / G99 Fast Track)',
    landOrRoofArea: '20 – 60 m² roof area',
    typicalCommercialModel: 'Direct Purchase / Equipment Financing',
    visualGraphic: 'home',
    description: 'Entry-scale rooftop installations designed for on-site self-consumption with optional domestic battery storage.'
  },
  {
    id: 'scale-2',
    sizeLabel: '10–50 kW',
    rangeKw: '10 kW – 50 kW',
    archetype: 'Small Commercial & Public Building',
    typicalSite: 'Schools, medical clinics, community centers, small agricultural barns.',
    annualGenerationKwh: '9,500 – 48,000 kWh',
    gridVoltage: '400V Three Phase (G99 Standard)',
    landOrRoofArea: '65 – 300 m² roof area',
    typicalCommercialModel: 'CAPEX / Project Lease',
    visualGraphic: 'commercial',
    description: 'Three-phase commercial systems tailored to daylight operating hours with minimal grid export requirements.'
  },
  {
    id: 'scale-3',
    sizeLabel: '50–250 kW',
    rangeKw: '50 kW – 250 kW',
    archetype: 'Mid-Market Commercial Building',
    typicalSite: 'Supermarkets, light manufacturing units, medium distribution warehouses.',
    annualGenerationKwh: '48,000 – 240,000 kWh',
    gridVoltage: '400V Three Phase LV Substation Connection',
    landOrRoofArea: '300 – 1,500 m² roof area',
    typicalCommercialModel: 'Corporate PPA / RESCO / CAPEX',
    visualGraphic: 'commercial',
    description: 'Standard mid-commercial rooftop arrays delivering significant energy cost protection with zero capital outlay under PPA.'
  },
  {
    id: 'scale-4',
    sizeLabel: '250 kW–1 MW',
    rangeKw: '250 kW – 1 MW',
    archetype: 'Large Industrial & Logistics Depot',
    typicalSite: 'Automated fulfillment centers, refrigerated cold storage, food manufacturing.',
    annualGenerationKwh: '240,000 – 960,000 kWh',
    gridVoltage: '400V / 11kV Dedicated Transformer',
    landOrRoofArea: '1,500 – 6,000 m² roof area or 1.5–3 acres',
    typicalCommercialModel: 'Corporate PPA (Zero Capex) / BOOT',
    visualGraphic: 'industrial',
    description: 'Heavy industrial rooftop and private-wire installations delivering megawatt-hour scale green electricity directly into plant switchboards.'
  },
  {
    id: 'scale-5',
    sizeLabel: '1–5 MW',
    rangeKw: '1 MW – 5 MW',
    archetype: 'Heavy Industrial Campus & Small Solar Park',
    typicalSite: 'Chemical works, port terminals, university estates, private land arrays.',
    annualGenerationKwh: '960,000 – 4,800,000 kWh',
    gridVoltage: '11kV / 33kV DNO Distribution Network',
    landOrRoofArea: '3 – 15 acres land or massive logistics roof parks',
    typicalCommercialModel: 'PPA / BOOT / Turnkey EPC',
    visualGraphic: 'industrial',
    description: 'Multi-megawatt systems capable of powering entire manufacturing complexes or supplying clean energy across private wire networks.'
  },
  {
    id: 'scale-6',
    sizeLabel: '5–50 MW',
    rangeKw: '5 MW – 50 MW',
    archetype: 'Utility-Scale Solar & Storage Park',
    typicalSite: 'Agricultural ground mount solar farms, co-located BESS facilities.',
    annualGenerationKwh: '4.8 GWh – 50 GWh',
    gridVoltage: '33kV / 66kV Bulk Supply Point Connection',
    landOrRoofArea: '15 – 150 acres rural land',
    typicalCommercialModel: 'Utility PPA / CfD / Infrastructure Fund Ownership',
    visualGraphic: 'solar-park',
    description: 'Grid-scale clean generation assets delivering substantial low-carbon electricity volumes directly into regional distribution networks.'
  },
  {
    id: 'scale-7',
    sizeLabel: '50–250 MW',
    rangeKw: '50 MW – 250 MW',
    archetype: 'Transmission-Scale Renewable Infrastructure',
    typicalSite: 'Nationally Significant Infrastructure Projects (NSIP), regional solar & wind clusters.',
    annualGenerationKwh: '50 GWh – 275 GWh',
    gridVoltage: '132kV / 275kV / 400kV National Grid Transmission',
    landOrRoofArea: '150 – 800 acres land',
    typicalCommercialModel: 'Corporate Virtual PPA / Long-Term Institutional Asset',
    visualGraphic: 'utility-scale',
    description: 'Major infrastructure-grade energy assets directly connected to the UK high-voltage transmission system with strategic national energy impact.'
  },
  {
    id: 'scale-8',
    sizeLabel: '250 MW+',
    rangeKw: '250 MW – 1 GW+',
    archetype: 'National Clean Energy Megaproject',
    typicalSite: 'Regional offshore wind hubs, multi-technology hybrid energy zones.',
    annualGenerationKwh: '275 GWh – 1,200+ GWh',
    gridVoltage: '275kV / 400kV Supergrid Interconnectors',
    landOrRoofArea: '800+ acres / Marine seabed concessions',
    typicalCommercialModel: 'Government CfD Auction / Multi-Offtaker Synthetic PPA',
    visualGraphic: 'utility-scale',
    description: 'Next-generation national clean energy assets reshaping Britain electricity grid and accelerating whole-economy decarbonisation.'
  }
];

export const DEMO_PROJECT_PORTFOLIO: ProjectPortfolioItem[] = [
  {
    id: 'proj-somerset-solar-demo',
    name: 'Somerset Sunfield Solar Park',
    code: 'UK-DEMO-SLR-01',
    isDemo: true,
    region: 'South West',
    country: 'England',
    technology: 'SOLAR',
    capacity: '42.5 MWp',
    capacityMw: 42.5,
    developmentStage: 'DEVELOPMENT',
    commercialModel: 'PPA',
    gridStatus: 'Formal Offer',
    landStatus: 'Option to Lease Executed',
    offtakeStatus: 'Corporate PPA Structuring',
    investmentStatus: 'Ready for Co-Investment',
    overview: 'Utility-scale ground mount solar PV park designed on Grade 3b agricultural land in Somerset. Incorporates bifacial N-type TOPCon modules, centralized inverters, and dual-use sheep grazing.',
    technicalSummary: {
      technologySpec: 'N-type Bifacial 610W Modules on Single-Axis Trackers',
      estimatedGenerationGwhYear: 46.2,
      co2AbatedTonnesYear: 8900,
      substationVoltage: '33kV Dedicated Customer Substation',
      footprint: '120 Acres Land Lease'
    },
    commercialStructure: {
      offtakeMechanism: '20-Year Index-Linked Corporate PPA with FTSE 100 Industrial Offtaker',
      targetOperationDate: 'Q2 2027',
      assetLifeYears: 35,
      partnerEcosystem: 'Unite Greentek (Lead Developer) + Institutional Infrastructure Fund'
    },
    availableDocuments: ['Project Teaser (PDF)', 'Grid Offer Summary', 'Environmental Constraints Matrix']
  },
  {
    id: 'proj-heathrow-logistics-demo',
    name: 'London Air Cargo Logistics Solar',
    code: 'UK-DEMO-ROOF-02',
    isDemo: true,
    region: 'South East & London',
    country: 'England',
    technology: 'ROOFTOP',
    capacity: '3.4 MWp',
    capacityMw: 3.4,
    developmentStage: 'READY FOR INVESTMENT',
    commercialModel: 'PPA',
    gridStatus: 'Secured G99/Transmission',
    landStatus: 'Commercial Roof Lease',
    offtakeStatus: '100% On-Site Consumption',
    investmentStatus: 'Fully Funded',
    overview: 'High-density commercial rooftop solar installation across 3 prime distribution centers adjacent to Heathrow Airport. Zero-CAPEX corporate PPA structure providing predictable clean power.',
    technicalSummary: {
      technologySpec: 'Lightweight All-Black 450W Modules with String Inverters',
      estimatedGenerationGwhYear: 3.35,
      co2AbatedTonnesYear: 645,
      substationVoltage: '400V LV Direct Connection to Plant Boards',
      footprint: '24,000 m² Standing Seam Roof'
    },
    commercialStructure: {
      offtakeMechanism: '25-Year Onsite PPA delivering 30% discount against grid electricity',
      targetOperationDate: 'Q4 2026',
      assetLifeYears: 30,
      partnerEcosystem: 'Unite Solar EPC + Logistics Real Estate Trust'
    },
    availableDocuments: ['Structural Roof Assessment', 'G99 Approval Document', 'PPA Term Sheet']
  },
  {
    id: 'proj-norfolk-hybrid-demo',
    name: 'East Anglian Clean Hybrid Hub',
    code: 'UK-DEMO-HYB-03',
    isDemo: true,
    region: 'East of England',
    country: 'England',
    technology: 'HYBRID',
    capacity: '80 MW (50MW Solar + 30MW BESS)',
    capacityMw: 80,
    developmentStage: 'PLANNING',
    commercialModel: 'BOOT',
    gridStatus: 'Technical Study',
    landStatus: 'Option to Lease Executed',
    offtakeStatus: 'Wholesale Export / SEG',
    investmentStatus: 'Seed Development',
    overview: 'Next-generation co-located solar and 2-hour LFP battery storage facility engineered to optimize grid export limits and capture peak merchant price arbitrage in the Eastern region.',
    technicalSummary: {
      technologySpec: 'Solar PV + 30MW/60MWh Liquid-Cooled LFP Storage Containers',
      estimatedGenerationGwhYear: 58.4,
      co2AbatedTonnesYear: 11200,
      substationVoltage: '132kV Connection to National Grid ESO',
      footprint: '165 Acres Farmland + Storage Compound'
    },
    commercialStructure: {
      offtakeMechanism: 'Hybrid Corporate PPA + Dynamic Frequency & Capacity Market Revenues',
      targetOperationDate: 'Q1 2028',
      assetLifeYears: 35,
      partnerEcosystem: 'Unite Greentek + Global Storage OEM'
    },
    availableDocuments: ['Hybrid Dispatch Simulation', 'Planning Statement', 'Grid Capacity Route Analysis']
  },
  {
    id: 'proj-highlands-wind-demo',
    name: 'Caledonian Ridge Onshore Wind',
    code: 'UK-DEMO-WND-04',
    isDemo: true,
    region: 'Scotland Highlands & Islands',
    country: 'Scotland',
    technology: 'WIND',
    capacity: '72 MW',
    capacityMw: 72,
    developmentStage: 'FEASIBILITY',
    commercialModel: 'BOOT',
    gridStatus: 'Preliminary Assessment',
    landStatus: 'Exclusivity Agreed',
    offtakeStatus: 'CfD / Capacity Market',
    investmentStatus: 'Origination',
    overview: 'High-yield Scottish Highland onshore wind development utilizing twelve modern 6.0 MW wind turbines with hub height 125m in high mean wind speed terrain.',
    technicalSummary: {
      technologySpec: '12 x 6.0 MW Low-Noise Direct Drive Wind Turbines',
      estimatedGenerationGwhYear: 235.0,
      co2AbatedTonnesYear: 45300,
      substationVoltage: '132kV SSEN Transmission Line Interface',
      footprint: 'Estateland Concession with Forestry Co-Existence'
    },
    commercialStructure: {
      offtakeMechanism: 'CfD Allocation Round + Corporate Virtual PPA',
      targetOperationDate: 'Q3 2028',
      assetLifeYears: 30,
      partnerEcosystem: 'Scottish Landowners + Unite Greentek Development Team'
    },
    availableDocuments: ['Anemometer 12-Month Wind Study Summary', 'Ecology Scoping Report']
  },
  {
    id: 'proj-manchester-bess-demo',
    name: 'Irwell Valley Grid Support BESS',
    code: 'UK-DEMO-BSS-05',
    isDemo: true,
    region: 'North West',
    country: 'England',
    technology: 'BESS',
    capacity: '50 MW / 100 MWh',
    capacityMw: 50,
    developmentStage: 'GRID',
    commercialModel: 'BOO',
    gridStatus: 'Application Pending',
    landStatus: 'Freehold Acquired',
    offtakeStatus: 'Wholesale Export / SEG',
    investmentStatus: 'Ready for Co-Investment',
    overview: 'Strategic industrial battery storage installation delivering sub-second response times to National Grid ESO to support grid frequency stability and renewable integration.',
    technicalSummary: {
      technologySpec: 'Containerised LFP BESS with Integrated Aerosol Fire Suppression',
      estimatedGenerationGwhYear: 32.0, // Arbitrage throughput
      co2AbatedTonnesYear: 6200,
      substationVoltage: '33kV ENWL Bulk Supply Point',
      footprint: '2.5 Acres Industrial Brownfield'
    },
    commercialStructure: {
      offtakeMechanism: 'Tolling Agreement / Multi-Revenue Route (DC, DM, Wholesale, CM)',
      targetOperationDate: 'Q2 2027',
      assetLifeYears: 20,
      partnerEcosystem: 'Unite Greentek Energy Trading + Infrastructure Fund'
    },
    availableDocuments: ['BESS Revenue Stack Optimization Model', 'Fire Safety & Risk Strategy']
  }
];

export const GRID_CONNECTION_FLOW = [
  {
    step: 1,
    title: 'PROJECT IDENTIFICATION',
    desc: 'Screen site location against regional network constraints and substation proximity.'
  },
  {
    step: 2,
    title: 'GRID ASSESSMENT',
    desc: 'Evaluate DNO capacity heat maps, fault levels, reverse power flow, and G99 requirements.'
  },
  {
    step: 3,
    title: 'CONNECTION APPLICATION',
    desc: 'Submit detailed engineering application to DNO / National Grid ESO with Single Line Diagrams.'
  },
  {
    step: 4,
    title: 'TECHNICAL STUDY',
    desc: 'DNO conducts thermal rating, voltage step change, and system security network studies.'
  },
  {
    step: 5,
    title: 'CONNECTION OFFER',
    desc: 'Formal Point of Connection (POC) offer issued outlining contestable and non-contestable works.'
  },
  {
    step: 6,
    title: 'PROJECT DEVELOPMENT',
    desc: 'Accept offer, secure connection rights, and align engineering with DNO energisation date.'
  }
];

export const PARTNER_ECOSYSTEM_NODES = [
  { id: 'landowners', label: 'LANDOWNERS', role: 'Farmland, industrial estates, commercial rooftops', color: '#7AAA2B' },
  { id: 'investors', label: 'INVESTORS', role: 'Infrastructure funds, family offices, debt providers', color: '#FF6321' },
  { id: 'technology', label: 'TECHNOLOGY', role: 'Tier-1 Solar PV, Inverter & BESS manufacturers', color: '#38BDF8' },
  { id: 'epc', label: 'EPC PARTNERS', role: 'High-voltage civil and electrical engineering contractors', color: '#A855F7' },
  { id: 'grid', label: 'GRID OPERATORS', role: 'DNOs (NGED, UKPN, SPEN, NPg) & National Grid ESO', color: '#FBBF24' },
  { id: 'offtakers', label: 'OFFTAKERS', role: 'FTSE 250 corporations, industrial plants, retail groups', color: '#34D399' },
  { id: 'finance', label: 'PROJECT FINANCE', role: 'PPA / BOOT / RESCO structuring and capital advisory', color: '#EC4899' },
  { id: 'om', label: 'O&M OPERATORS', role: '24/7 remote SCADA monitoring, dispatch, and servicing', color: '#60A5FA' }
];
