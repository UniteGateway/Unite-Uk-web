import { EnergySolution, BusinessModel, UkRegionOpportunity, OemPartnerCategory, JourneyStep, LegacyFranchiseRegion } from '../types';

export const ENERGY_SOLUTIONS: EnergySolution[] = [
  {
    id: 'rooftop-solar',
    number: '01',
    title: 'ROOFTOP SOLAR',
    shortTag: 'Solar Photovoltaic',
    subtitle: 'Homes, apartments, businesses and institutional assets.',
    description: 'Engineered high-yield rooftop PV systems turning unutilised roof spaces into private clean power generation stations, shielded against energy grid volatility.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    keyBenefits: [
      'Immediate electricity bill reduction up to 70%',
      'Tier-1 high-efficiency monocrystalline N-Type TOPCon panels',
      'Integrated real-time micro-inverter and string safety architectures',
      'Structural roof load integrity validation & G99/G100 grid compliance'
    ],
    specs: [
      { label: 'System Sizes', value: '4 kWp – 250 kWp+' },
      { label: 'Module Efficiency', value: 'Up to 22.8%' },
      { label: 'Typical Payback', value: '3.5 – 6 Years' },
      { label: 'Asset Lifespan', value: '25 – 30 Years' }
    ],
    applications: ['Modern Residential', 'Commercial Real Estate', 'Multi-tenant Flats', 'Educational Campuses']
  },
  {
    id: 'commercial-industrial',
    number: '02',
    title: 'COMMERCIAL & INDUSTRIAL',
    shortTag: 'C&I Megawatt Scale',
    subtitle: 'High-performance solar for factories, warehouses, offices and large energy users.',
    description: 'Multi-hundred kilowatt to multi-megawatt commercial solar arrays designed to slash operational expenditures, achieve ISO 50001 / SECR carbon compliance, and insulate balance sheets.',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
    keyBenefits: [
      'Massive daytime self-consumption offsetting peak tariff bands',
      'Zero-capex Corporate PPA & RESCO structured financing available',
      'Industrial-grade HV/LV substation integration & export limiting',
      'Enterprise SCADA telemetry with automated AI fault diagnostics'
    ],
    specs: [
      { label: 'System Capacities', value: '100 kWp – 10 MWp' },
      { label: 'Annual Generation', value: '950 – 1,150 kWh/kWp' },
      { label: 'Carbon Abatement', value: '0.21 kg CO2e / kWh' },
      { label: 'Grid Connection', value: 'G99 Type B/C/D' }
    ],
    applications: ['Logistics Hubs & Warehouses', 'Manufacturing Facilities', 'Cold Storage Parks', 'Corporate HQ Campuses']
  },
  {
    id: 'battery-storage',
    number: '03',
    title: 'BATTERY ENERGY STORAGE',
    shortTag: 'BESS Solutions',
    subtitle: 'Store energy. Shift demand. Improve resilience.',
    description: 'Utility-scale and commercial BESS architectures unlocking time-of-use tariff arbitrage, frequency response revenue streams (Dynamic Containment/Moderation), and blackout immunity.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    keyBenefits: [
      'Peak shaving & triad avoidance to minimise network capacity charges',
      'Liquid-cooled LFP (Lithium Iron Phosphate) cell safety with multi-stage fire suppression',
      'Uninterruptible Power Supply (UPS) with sub-20ms seamless transfer',
      'UK National Grid ancillary service stacking & automated market dispatch'
    ],
    specs: [
      { label: 'Storage Sizing', value: '50 kWh – 50 MWh+' },
      { label: 'C-Rate Options', value: '0.5C to 2C Duration' },
      { label: 'Round-trip Efficiency', value: '> 89%' },
      { label: 'Cycle Life', value: '6,000+ Cycles (80% SOH)' }
    ],
    applications: ['Heavy Industry', 'Data Centres', 'EV Fleet Charging Hubs', 'Renewable Farm Co-location']
  },
  {
    id: 'wind-energy',
    number: '04',
    title: 'WIND ENERGY',
    shortTag: 'Onshore Wind',
    subtitle: 'Onshore wind and renewable-energy development.',
    description: 'Harnessing the UK’s class-leading wind profile with modern direct-drive onshore wind turbines, from distributed commercial self-generation turbines to utility wind park co-development.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    keyBenefits: [
      'High winter generation aligning precisely with UK peak heating & energy demands',
      'Low levelised cost of energy (LCOE) with long-term revenue predictability',
      'Full lifecycle planning, acoustic modelling, environmental EIA & grid routing',
      'Integrated condition monitoring systems for predictive drivetrain maintenance'
    ],
    specs: [
      { label: 'Turbine Ratings', value: '500 kW – 4.5 MW+' },
      { label: 'Capacity Factor', value: '32% – 46% (UK Average)' },
      { label: 'Hub Heights', value: '60m – 125m' },
      { label: 'Design Life', value: '25 – 30 Years' }
    ],
    applications: ['Agricultural Estates', 'Ports & Heavy Marine Terminals', 'Private Wire Industrial Estates', 'Utility Co-development']
  },
  {
    id: 'hybrid-energy',
    number: '05',
    title: 'HYBRID ENERGY',
    shortTag: 'Solar + Wind + BESS',
    subtitle: 'Solar + Wind + BESS for optimised renewable generation.',
    description: 'Co-located multisource renewable power plants sharing a single grid connection point to maximise capacity factor, flatten intermittency curves, and deliver near-baseload clean energy.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    keyBenefits: [
      'Complementary day/night and summer/winter generation profiles',
      'Up to 40% higher grid connection utilization without costly reinforcement upgrades',
      'Centralized Energy Management System (EMS) optimizing dynamic asset dispatch',
      'Maximized revenue stacking across wholesale power markets and capacity markets'
    ],
    specs: [
      { label: 'Combined Output', value: '1 MW – 100 MW+' },
      { label: 'Grid Efficiency', value: 'Up to 96% Asset Utilization' },
      { label: 'EMS Response', value: '< 100ms Autonomous Dispatch' },
      { label: 'Carbon Offset', value: 'Continuous 24/7 Coverage' }
    ],
    applications: ['Major Manufacturing Zones', 'Energy Intensive Consumers', 'District Clean Microgrids', 'Utility-scale IPP Portfolios']
  },
  {
    id: 'corporate-energy',
    number: '06',
    title: 'CORPORATE ENERGY',
    shortTag: 'PPA • RESCO • BOOT • BOO',
    subtitle: 'CAPEX, Corporate PPA, RESCO, BOOT, BOO and flexible project leasing.',
    description: 'Institutional-grade commercial structuring tailored to balance sheet preferences, enabling zero-capital deployment or long-term ownership with guaranteed performance SLAs.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    keyBenefits: [
      'Bespoke financing from 0% upfront capital to maximum equity ownership',
      'Long-term price hedge indexation below projected grid electricity inflation',
      'Fully turnkey engineering, procurement, construction, and O&M under one contract',
      'ESG and Scope 1 & 2 carbon reductions verifiable under GHG Protocol'
    ],
    specs: [
      { label: 'Contract Tenors', value: '5 – 25 Years' },
      { label: 'Upfront Capital', value: '£0 to 100% Client Equity' },
      { label: 'O&M Inclusions', value: '24/7 Monitoring & Performance Guarantees' },
      { label: 'Accounting', value: 'Off-Balance Sheet Options Available' }
    ],
    applications: ['FTSE 250 Corporates', 'Retail Chains & Supermarkets', 'NHS Trusts & Public Sector', 'Commercial Landlords']
  }
];

export const BUSINESS_MODELS: BusinessModel[] = [
  {
    id: 'capex',
    code: 'CAPEX',
    name: 'Direct Capital Expenditure',
    tagline: 'Invest once. Maximise long-term energy savings and balance sheet equity.',
    description: 'Your business funds and owns 100% of the renewable energy asset from Day 1. Benefit directly from immediate energy cost savings, capital allowances (such as full expensing), and rapid ROI.',
    ownership: '100% Client Owned from Day 1',
    upfrontCost: 'Direct Client Capital',
    maintenance: 'Covered via Unite Solar comprehensive SLA',
    bestFor: 'Organisations with available capital expenditure looking for the fastest overall return and highest asset lifetime yield.',
    whoItMaySuit: 'Owner-occupiers and corporations with capital budget seeking maximum IRR.',
    howItWorks: 'Direct procurement and EPC delivery with turnkey warranty & engineering.',
    capitalRequirement: '100% upfront (or asset finance).',
    contractStructure: 'Turnkey EPC Contract + Optional Long-Term O&M Service Agreement.',
    typicalProjectType: 'Commercial rooftops, corporate HQs, schools, and private estates.',
    keyPoints: [
      'Maximum total lifetime savings over 25+ years',
      'Full capital allowance tax benefits under UK Corporation Tax rules',
      'Direct revenue from grid export and SEG tariffs',
      'Full control over technology and equipment specification'
    ]
  },
  {
    id: 'ppa',
    code: 'PPA',
    name: 'Corporate Power Purchase Agreement',
    tagline: 'Zero upfront cost. Buy clean solar energy at a locked, discounted rate.',
    description: 'Unite Greentek funds, engineers, installs, and maintains the solar/BESS system on your premises. You simply purchase the clean power generated at an agreed rate, significantly cheaper than grid tariff.',
    ownership: 'Unite Greentek / Clean Energy Fund',
    upfrontCost: '£0 (Zero Upfront Capital)',
    maintenance: '100% Included by Unite Greentek throughout term',
    bestFor: 'Companies seeking immediate utility bill savings without spending capital or taking on technological and operational risks.',
    badge: 'Most Popular for C&I',
    whoItMaySuit: 'Logistics hubs, manufacturing facilities, cold storage, and heavy power users.',
    howItWorks: 'Fully funded installation; you pay a contracted per-kWh rate for generated solar electricity.',
    capitalRequirement: '£0 Upfront Capex.',
    contractStructure: 'Long-term Power Purchase Agreement (typically 15–25 years).',
    typicalProjectType: 'Large commercial roofs (150 kWp – 10 MWp) with continuous load profile.',
    keyPoints: [
      'Immediate operational cost reduction with zero capital budget required',
      'Long-term price hedge against grid inflation and volatility',
      'Unite Greentek guarantees system uptime and generation benchmarks',
      'Off-balance sheet solution with predictable recurring energy expenses'
    ]
  },
  {
    id: 'resco',
    code: 'RESCO',
    name: 'Renewable Energy Service Company',
    tagline: 'Energy-as-a-Service model with shared performance incentives.',
    description: 'An integrated energy services agreement where Unite Greentek operates as your comprehensive clean energy provider, optimizing generation, storage, and demand-side response with unified billing.',
    ownership: 'Energy Service Entity (RESCO Special Purpose Vehicle)',
    upfrontCost: '£0 Upfront Investment',
    maintenance: 'Complete lifecycle operation and proactive optimization',
    bestFor: 'Medium-to-large enterprises wanting a single partner to handle all power infrastructure, metering, and energy optimization.',
    whoItMaySuit: 'Multi-site retail, industrial parks, and commercial property portfolios.',
    howItWorks: 'Comprehensive Energy-as-a-Service with smart metering, peak shaving, and performance guarantees.',
    capitalRequirement: '£0 Capital Outlay.',
    contractStructure: 'Comprehensive Energy Services Agreement (ESA).',
    typicalProjectType: 'Multi-technology commercial sites with Solar PV + BESS storage.',
    keyPoints: [
      'Comprehensive energy-as-a-service SLA covering equipment and software',
      'Demand response and battery arbitrage sharing mechanisms',
      'No operational burden on internal facilities or engineering teams',
      'Guaranteed minimum carbon abatement and performance metrics'
    ]
  },
  {
    id: 'boot',
    code: 'BOOT',
    name: 'Build • Own • Operate • Transfer',
    tagline: 'Zero initial cost today. Full asset ownership transfer at end of term.',
    description: 'Unite Greentek builds, owns, and operates the clean energy plant for an agreed concession period (e.g. 10–15 years). At the conclusion of the term, ownership of the high-yielding plant transfers to you for £1.',
    ownership: 'Unite Greentek during term → Transferred 100% to Client at handover',
    upfrontCost: '£0 Upfront Capital',
    maintenance: 'Fully managed until handover, with asset handover health warranty',
    bestFor: 'Corporate asset owners who want zero risk during initial operational life with guaranteed ownership of a fully paid-off asset later.',
    whoItMaySuit: 'Long-term freehold owners and institutions seeking ultimate asset ownership.',
    howItWorks: 'Zero cost during concession; full asset ownership transfers to client for nominal sum at end.',
    capitalRequirement: '£0 Upfront.',
    contractStructure: 'Concession / BOOT Agreement (10–15 Years).',
    typicalProjectType: 'Commercial manufacturing plants, distribution hubs, university campuses.',
    keyPoints: [
      'Structured pathway to 100% asset equity with zero upfront capital',
      'Zero maintenance headache during initial operational life',
      'Retain remaining 10–15+ years of free green power after handover',
      'Asset delivered in prime operational condition under strict handover criteria'
    ]
  },
  {
    id: 'boo',
    code: 'BOO',
    name: 'Build • Own • Operate',
    tagline: 'Long-term clean utility generation without ever taking on asset liabilities.',
    description: 'Unite Greentek builds, retains permanent ownership of, and continuously operates the renewable power installation on your site or adjacent land, delivering low-cost green electrons perpetually.',
    ownership: 'Unite Greentek / Infrastructure Asset Fund',
    upfrontCost: '£0 Upfront Capital',
    maintenance: 'Perpetual full-scope O&M and inverter replacements',
    bestFor: 'Tenants, industrial campuses, and institutions that want clean energy without balance sheet asset liabilities or decommissioning duties.',
    whoItMaySuit: 'Industrial tenants, leased estate operators, and land lease hosts.',
    howItWorks: 'Permanent utility generation with zero equipment liability for the building occupant.',
    capitalRequirement: '£0 Capital.',
    contractStructure: 'Long-term Energy Supply & Roof/Land Lease Agreement.',
    typicalProjectType: 'Ground mount solar parks, shared industrial private wires, port terminals.',
    keyPoints: [
      'Permanent hands-off clean energy generation for the site',
      'All repowering, inverter upgrades, and insurance handled by operator',
      'Clear lease or roof-space rental income opportunities for landlords',
      'Complete insulation from technology obsolescence'
    ]
  },
  {
    id: 'leasing',
    code: 'PROJECT LEASING',
    name: 'Flexible Equipment & Project Leasing',
    tagline: 'Fixed monthly operating or finance lease tailored to project cash flow.',
    description: 'Finance your solar and battery storage setup through tax-efficient operating or capital lease options, structured so that monthly energy savings comfortably exceed monthly lease installments.',
    ownership: 'Client Option (Operating vs Finance Lease structure)',
    upfrontCost: 'Minimal / Structured deposit',
    maintenance: 'Standard or tailored O&M maintenance package',
    bestFor: 'Businesses wanting asset ownership benefits with smoothed, cashflow-positive monthly payments.',
    whoItMaySuit: 'SMEs, commercial businesses, and agricultural facilities.',
    howItWorks: 'Fixed monthly lease structured so bill savings exceed monthly lease cost.',
    capitalRequirement: 'Low / Structured monthly installments.',
    contractStructure: 'Equipment Lease Agreement (3–7 Years) with buy-out options.',
    typicalProjectType: 'Rooftop solar (30 kWp – 250 kWp) and commercial battery systems.',
    keyPoints: [
      'Cash-flow positive from month one in most commercial scenarios',
      'Flexible buyout or upgrade terms at the conclusion of the lease',
      'Preserves existing corporate banking lines and liquidity',
      'Tax-efficient rental deductions against UK taxable profits'
    ]
  }
];

export const UK_REGIONS: UkRegionOpportunity[] = [
  {
    id: 'south-west',
    name: 'South West England',
    coordinates: { x: 30, y: 78 },
    solarPotential: 'Exceptional',
    windPotential: 'Very High',
    bessOpportunity: 'Critical Grid Node',
    typicalProject: 'Large-scale C&I rooftop, ground mount solar farms, and grid co-located BESS',
    customerSegment: 'Agricultural estates, manufacturing, logistics hubs, tourism hospitality',
    relevantTech: ['N-Type TopCon PV', 'Utility BESS (2-4hr)', 'Onshore Wind'],
    installedPipelineMw: 320,
    highlight: 'Highest annual solar irradiance in the UK (>1,150 kWh/kWp/yr) with strong grid interconnection needs.'
  },
  {
    id: 'south-east',
    name: 'South East & London',
    coordinates: { x: 68, y: 75 },
    solarPotential: 'Very High',
    windPotential: 'Moderate',
    bessOpportunity: 'High Demand',
    typicalProject: 'Commercial rooftop arrays, corporate campus microgrids, data centre backup storage',
    customerSegment: 'Data centres, corporate headquarters, cold chain distribution, retail logistics',
    relevantTech: ['High-density Solar Modules', 'C&I BESS', 'Smart Microgrid EMS'],
    installedPipelineMw: 410,
    highlight: 'Massive commercial power density, high retail electricity rates, and intense ESG decarbonisation targets.'
  },
  {
    id: 'east-england',
    name: 'East of England',
    coordinates: { x: 74, y: 60 },
    solarPotential: 'Very High',
    windPotential: 'Very High',
    bessOpportunity: 'Strategic Storage',
    typicalProject: 'Hybrid Solar + Wind clusters, agricultural packing facilities, port electrification',
    customerSegment: 'Agri-tech, logistics ports, commercial manufacturing, clean tech parks',
    relevantTech: ['Ground-mount PV', 'Onshore Wind', 'Colocated BESS'],
    installedPipelineMw: 290,
    highlight: 'Flat topography, superior sunshine hours, and key coastal energy transmission landing points.'
  },
  {
    id: 'midlands',
    name: 'Midlands & Central UK',
    coordinates: { x: 50, y: 55 },
    solarPotential: 'High',
    windPotential: 'Moderate',
    bessOpportunity: 'Industrial Cluster',
    typicalProject: 'Gigantic warehouse rooftop PV (Golden Triangle), industrial automotive factories',
    customerSegment: 'Logistics corridors (M1/M6), advanced automotive, aerospace manufacturing',
    relevantTech: ['Megawatt C&I Solar', 'Peak-shaving BESS', 'High-voltage Grid Substation'],
    installedPipelineMw: 480,
    highlight: 'The logistics heartbeat of Britain with millions of square metres of unutilised industrial warehouse roofs.'
  },
  {
    id: 'north-west',
    name: 'North West England',
    coordinates: { x: 42, y: 42 },
    solarPotential: 'Moderate',
    windPotential: 'Very High',
    bessOpportunity: 'Industrial Cluster',
    typicalProject: 'Chemical & heavy manufacturing solar, industrial estate private wire networks',
    customerSegment: 'Heavy process industry, pharmaceuticals, maritime ports, commercial real estate',
    relevantTech: ['C&I Solar PV', 'Heavy Duty Inverters', 'Industrial BESS'],
    installedPipelineMw: 215,
    highlight: 'High baseload manufacturing demand seeking long-term corporate PPAs to control energy exposure.'
  },
  {
    id: 'yorkshire',
    name: 'Yorkshire & The Humber',
    coordinates: { x: 58, y: 44 },
    solarPotential: 'High',
    windPotential: 'High',
    bessOpportunity: 'Critical Grid Node',
    typicalProject: 'Energy transition industrial hubs, food processing facilities, steel decarbonisation',
    customerSegment: 'Steel, glass, food manufacturing, distribution centres',
    relevantTech: ['Commercial Solar', 'Behind-the-Meter BESS', 'Hybrid Private Wire'],
    installedPipelineMw: 260,
    highlight: 'Hub for UK industrial cluster decarbonisation with substantial electrical demand and grid flexibility value.'
  },
  {
    id: 'wales',
    name: 'Wales',
    coordinates: { x: 32, y: 60 },
    solarPotential: 'High',
    windPotential: 'Very High',
    bessOpportunity: 'Strategic Storage',
    typicalProject: 'Onshore wind developments, industrial port solar, rural commercial microgrids',
    customerSegment: 'Ports, manufacturing, public sector estates, rural enterprise',
    relevantTech: ['Wind Turbines', 'Hybrid Wind-Solar EMS', 'Containerised BESS'],
    installedPipelineMw: 185,
    highlight: 'Exceptional wind energy yield combined with proactive regional sustainability policies.'
  },
  {
    id: 'scotland',
    name: 'Scotland',
    coordinates: { x: 44, y: 18 },
    solarPotential: 'Moderate',
    windPotential: 'Exceptional',
    bessOpportunity: 'Strategic Storage',
    typicalProject: 'Commercial onshore wind, massive grid-scale BESS for constraint management, distillery solar',
    customerSegment: 'Whisky distilleries, heavy processing, technology parks, renewable energy co-developments',
    relevantTech: ['Multi-MW Wind Turbines', 'Grid-stabilisation BESS', 'Cold-climate Solar PV'],
    installedPipelineMw: 530,
    highlight: 'World-leading wind energy generation capacity with high demand for smart battery constraint management.'
  }
];

export const OEM_ECOSYSTEM: OemPartnerCategory[] = [
  {
    category: 'SOLAR MODULES',
    description: 'Tier-1 ultra-high efficiency monocrystalline N-Type TOPCon & Heterojunction photovoltaic modules.',
    brands: [
      { name: 'JinkoSolar', origin: 'Global Tier-1 Leader', specialty: 'Tiger Neo N-Type TOPCon modules up to 23.2% efficiency', tier: 'BloombergNEF Tier-1' },
      { name: 'JA Solar', origin: 'Global Tier-1 Leader', specialty: 'DeepBlue 4.0 Pro high-power bifacial panels', tier: 'BloombergNEF Tier-1' },
      { name: 'Trina Solar', origin: 'Global Tier-1 Leader', specialty: 'Vertex N 600W+ ultra-high power C&I modules', tier: 'BloombergNEF Tier-1' },
      { name: 'LONGi', origin: 'Global Tier-1 Leader', specialty: 'Hi-MO X6 anti-dust & high temperature coefficient tech', tier: 'BloombergNEF Tier-1' },
      { name: 'Canadian Solar', origin: 'Global Tier-1 Leader', specialty: 'HiKu7 high-density multi-busbar solar panels', tier: 'BloombergNEF Tier-1' }
    ]
  },
  {
    category: 'INVERTERS',
    description: 'Grid-compliant string, central and hybrid inverters with advanced G99 rapid shutdown and arc fault protection.',
    brands: [
      { name: 'Sungrow', origin: 'Global Inverter Pioneer', specialty: 'High-power C&I string inverters (33kW – 350kW)', tier: 'Top Global Market Share' },
      { name: 'GoodWe', origin: 'Smart Energy Innovator', specialty: 'Hybrid energy storage inverters and smart EMS', tier: 'TÜV & G99 Certified' },
      { name: 'SMA', origin: 'German Engineering', specialty: 'Sunny Tripower Core series with integrated diagnostics', tier: 'Premium Industrial Grade' },
      { name: 'Growatt', origin: 'Global Inverter Brand', specialty: 'MAX series high-yield multi-MPPT commercial units', tier: 'Top 3 Global Supplier' },
      { name: 'Solis', origin: 'Ginlong Technologies', specialty: 'Ultra-reliable string inverters with high DC/AC ratio', tier: 'BloombergNEF Tier-1 Inverter' }
    ]
  },
  {
    category: 'ENERGY STORAGE',
    description: 'Liquid-cooled Lithium Iron Phosphate (LFP) BESS containers and C&I modular storage systems.',
    brands: [
      { name: 'Sungrow Storage', origin: 'Turnkey BESS', specialty: 'PowerTitan & PowerStack liquid-cooled energy storage', tier: 'Utility & C&I Benchmark' },
      { name: 'Trina Storage', origin: 'Integrated Solutions', specialty: 'Elementa modular 0.5C/1C grid battery solutions', tier: 'Tier-1 Bankable' },
      { name: 'CATL', origin: 'Battery Global Giant', specialty: 'Ultra-long cycle life LFP cells & EnerOne systems', tier: 'Global Cell Leader #1' },
      { name: 'GoodWe BESS', origin: 'Commercial Storage', specialty: 'Lynx C series scalable commercial battery cabinets', tier: 'Smart EMS Integrated' },
      { name: 'BYD', origin: 'Zero-Emission Tech', specialty: 'Battery-Box Commercial & grid-scale Energy Cube', tier: 'Top Global Manufacturer' }
    ]
  },
  {
    category: 'WIND TECHNOLOGY',
    description: 'High-efficiency direct drive and geared onshore wind turbine generators engineered for UK wind regimes.',
    brands: [
      { name: 'Vestas', origin: 'Denmark', specialty: 'EnVentus platform onshore turbines (4.2MW – 6.0MW)', tier: 'Global Wind Leader' },
      { name: 'Siemens Gamesa', origin: 'Germany / Spain', specialty: 'SG onshore platform with low-noise aerofoil blades', tier: 'UK Grid Proven' },
      { name: 'Nordex', origin: 'Germany', specialty: 'Delta4000 series optimized for medium and high wind sites', tier: 'European Market Leader' },
      { name: 'Suzlon', origin: 'Global Wind Power', specialty: 'S120 & S144 series high-yield wind generators', tier: 'Global Wind Pioneer' }
    ]
  }
];

export const PROJECT_JOURNEY: JourneyStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Energy Profiling & Objectives',
    description: 'We analyze your half-hourly electricity data, peak demand curves, and sustainability targets to map optimal clean power generation capacity.',
    deliverables: ['Half-Hourly Demand Analysis', 'Preliminary Feasibility Study', 'Carbon Baseline Report'],
    duration: '1 – 2 Weeks'
  },
  {
    step: '02',
    title: 'ASSESS',
    subtitle: 'Site & Structural Assessment',
    description: 'Our chartered engineers conduct detailed laser 3D roof scanning, structural load calculations, and electrical infrastructure switchgear surveys.',
    deliverables: ['3D Drone LIDAR Scan', 'Structural Integrity Certificate', 'Electrical Grid Capacity Audit'],
    duration: '1 – 3 Weeks'
  },
  {
    step: '03',
    title: 'DESIGN',
    subtitle: 'Precision Engineering & Simulation',
    description: 'Using PVSyst and AutoCAD, we design optimized PV layouts, string configurations, BESS sizing, and submit statutory G99/G100 grid connection applications.',
    deliverables: ['PVSyst Yield Simulation (P50/P90)', 'Full Single Line Diagram (SLD)', 'DNO G99 Grid Approval Submission'],
    duration: '2 – 4 Weeks'
  },
  {
    step: '04',
    title: 'FINANCE',
    subtitle: 'Commercial Structure Selection',
    description: 'Select your preferred financial model: Direct CAPEX, Zero-Capital Corporate PPA, RESCO, BOOT, BOO, or flexible Project Leasing.',
    deliverables: ['Financial Yield Model', 'PPA / Lease Term Sheet', 'Board-Level Approval Pack'],
    duration: '1 – 3 Weeks'
  },
  {
    step: '05',
    title: 'DELIVER',
    subtitle: 'Procurement & Safe Installation',
    description: 'Turnkey procurement of Tier-1 equipment and flawless installation managed by our SMSTS/SSSTS certified renewable project engineers under strict CDM regulations.',
    deliverables: ['CDM Compliance Plan', 'Tier-1 Equipment Delivery', 'Certified Mechanical & Electrical Build'],
    duration: '4 – 12 Weeks'
  },
  {
    step: '06',
    title: 'COMMISSION',
    subtitle: 'G99 Witness Testing & Energisation',
    description: 'Comprehensive cold/hot commissioning, DNO G99 witness testing, thermographic imaging, and official energisation onto the UK National Grid.',
    deliverables: ['DNO Energisation Notice', 'MCS & NICEIC Certificates', 'Thermographic Baseline Scan'],
    duration: '1 – 2 Weeks'
  },
  {
    step: '07',
    title: 'MONITOR',
    subtitle: 'AI Telemetry, O&M and Support',
    description: '24/7 continuous cloud telemetry through our operations centre with automated fault prediction, rapid field engineering response, and annual preventive servicing.',
    deliverables: ['Live Client Portal Access', '24/7 Automated SCADA Telemetry', 'Guaranteed Performance Ratio SLA'],
    duration: 'Ongoing (25+ Years)'
  }
];

export const FRANCHISE_TERRITORIES: LegacyFranchiseRegion[] = [
  { region: 'London & Home Counties', code: 'UK-LON', status: 'Under Review', industrialDensity: 'Very High', annualSolarIrradiance: '1,080 kWh/m²', targetMrrPotential: '£180k - £350k/mo' },
  { region: 'South West & Bristol Channel', code: 'UK-SW', status: 'Available', industrialDensity: 'High', annualSolarIrradiance: '1,190 kWh/m²', targetMrrPotential: '£140k - £280k/mo' },
  { region: 'West Midlands & Birmingham', code: 'UK-WM', status: 'Available', industrialDensity: 'Extremely High', annualSolarIrradiance: '1,020 kWh/m²', targetMrrPotential: '£160k - £320k/mo' },
  { region: 'East Midlands & Logistics Hubs', code: 'UK-EM', status: 'Available', industrialDensity: 'Very High', annualSolarIrradiance: '1,040 kWh/m²', targetMrrPotential: '£150k - £300k/mo' },
  { region: 'North West & Greater Manchester', code: 'UK-NW', status: 'Available', industrialDensity: 'Very High', annualSolarIrradiance: '960 kWh/m²', targetMrrPotential: '£130k - £270k/mo' },
  { region: 'Yorkshire & Leeds Corridor', code: 'UK-YH', status: 'Available', industrialDensity: 'High', annualSolarIrradiance: '980 kWh/m²', targetMrrPotential: '£120k - £250k/mo' },
  { region: 'East of England & Cambridge', code: 'UK-EE', status: 'Under Review', industrialDensity: 'High', annualSolarIrradiance: '1,110 kWh/m²', targetMrrPotential: '£140k - £290k/mo' },
  { region: 'South Wales & Coastal Strip', code: 'UK-WA', status: 'Available', industrialDensity: 'Moderate', annualSolarIrradiance: '1,070 kWh/m²', targetMrrPotential: '£110k - £220k/mo' },
  { region: 'Scotland Central Belt (Glasgow/Edin)', code: 'UK-SC', status: 'Available', industrialDensity: 'High', annualSolarIrradiance: '920 kWh/m²', targetMrrPotential: '£120k - £240k/mo' },
  { region: 'North East & Teesside', code: 'UK-NE', status: 'Available', industrialDensity: 'High (Industrial)', annualSolarIrradiance: '940 kWh/m²', targetMrrPotential: '£100k - £210k/mo' }
];

export const PROPERTY_TYPES = [
  { id: 'business', label: 'Commercial Business', factor: 1.1, icon: 'Building2', defaultRoof: 800, defaultSpend: 45000, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'factory', label: 'Manufacturing Factory', factor: 1.25, icon: 'Factory', defaultRoof: 3500, defaultSpend: 180000, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { id: 'warehouse', label: 'Logistics Warehouse', factor: 1.2, icon: 'Warehouse', defaultRoof: 6000, defaultSpend: 240000, img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80' },
  { id: 'school', label: 'School / University', factor: 0.95, icon: 'GraduationCap', defaultRoof: 1200, defaultSpend: 65000, img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
  { id: 'hospital', label: 'Hospital / Healthcare', factor: 1.3, icon: 'Activity', defaultRoof: 2200, defaultSpend: 140000, img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80' },
  { id: 'solar-park', label: 'Utility Ground Mount', factor: 1.4, icon: 'Sun', defaultRoof: 20000, defaultSpend: 800000, img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80' },
  { id: 'home', label: 'Residential Estate', factor: 0.85, icon: 'Home', defaultRoof: 65, defaultSpend: 2200, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' }
];
