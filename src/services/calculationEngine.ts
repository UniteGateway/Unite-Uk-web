import {
  SolarAssessmentInput,
  SolarAssessmentResult,
  BatteryAssessmentInput,
  BessAssessmentResult,
  HybridAssessmentInput,
  HybridAssessmentResult,
  AdminCalculationConfig,
  PropertyType
} from '../types';

/**
 * UNITE SOLAR — Configurable Calculation Engine Assumptions
 * Based on official UK Department for Energy Security and Net Zero (DESNZ) standards,
 * standard MCS PV methodology, and commercial clean energy benchmarking.
 */
export const ADMIN_CONFIG: AdminCalculationConfig = {
  solarYieldFactorDefault: 950, // UK average kWh generated per kWp installed annually
  regionalYieldMultipliers: {
    'South West': 1.08,
    'South East': 1.06,
    'London': 1.04,
    'East of England': 1.05,
    'East Midlands': 0.98,
    'West Midlands': 0.96,
    'Yorkshire & Humber': 0.93,
    'North West': 0.91,
    'North East': 0.89,
    'Wales': 0.95,
    'Scotland': 0.88,
    'Northern Ireland': 0.90,
  },
  panelPowerWatts: 430, // Modern Tier-1 N-Type TOPCon module wattage
  usableRoofAreaRatio: 0.70, // 70% usable accounting for shading, ridge setbacks & obstacles
  m2PerKwp: 5.5, // m2 of roof space required per 1 kWp installed
  batteryUsableCapacityRatio: 0.90, // Depth of discharge (DOD) 90% for LFP chemistry
  ukGridEmissionFactorKgPerKwh: 0.193, // Defensible UK National Grid carbon intensity (DESNZ 2024/2025)
  defaultElectricityTariffGbpPerKwh: 0.28, // Indicative blended UK commercial/residential tariff
  capexPerKwpResidentialGbp: 1350,
  capexPerKwpCommercialGbp: 850,
  bessCostPerKwhGbp: 420,
};

/**
 * Checks if a property type falls under the commercial / industrial archetype
 */
export function isCommercialPropertyType(propertyType: PropertyType): boolean {
  const commercialTypes: PropertyType[] = [
    'OFFICE',
    'SHOP',
    'WAREHOUSE',
    'FACTORY',
    'HOTEL',
    'SCHOOL',
    'HOSPITAL',
    'FARM',
    'OTHER',
  ];
  return commercialTypes.includes(propertyType);
}

/**
 * Generates a unique, audit-compliant project reference number
 */
export function generateReferenceId(prefix = 'UNITE'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-UK-${randomSuffix}`;
}

/**
 * Main calculation logic for Solar PV opportunity
 */
export function calculateSolarOpportunity(input: SolarAssessmentInput): SolarAssessmentResult {
  const isCommercial = isCommercialPropertyType(input.propertyType) || !!input.isCommercialMode;
  
  // 1. Determine Annual Consumption (kWh)
  let annualKwh = 0;
  if (input.energyInputMode === 'ANNUAL_KWH' && input.annualKwh && input.annualKwh > 0) {
    annualKwh = input.annualKwh;
  } else if (input.monthlyBillGbp && input.monthlyBillGbp > 0) {
    const tariff = (input.currentTariffPencePerKwh ? input.currentTariffPencePerKwh / 100 : ADMIN_CONFIG.defaultElectricityTariffGbpPerKwh);
    annualKwh = (input.monthlyBillGbp * 12) / tariff;
  } else {
    // Fallback baseline consumption depending on property type
    annualKwh = isCommercial ? 45000 : 3800;
  }

  // 2. Space Availability Constraint (kWp limit based on roof size)
  let maxKwpByArea = 99999;
  if (input.exactRoofAreaM2 && input.exactRoofAreaM2 > 0) {
    const usableArea = input.exactRoofAreaM2 * ADMIN_CONFIG.usableRoofAreaRatio;
    maxKwpByArea = usableArea / ADMIN_CONFIG.m2PerKwp;
  } else {
    // Sizing brackets based on qualitative size
    const spaceCapacityMap: Record<string, number> = {
      'Small': isCommercial ? 25 : 4,
      'Medium': isCommercial ? 75 : 7,
      'Large': isCommercial ? 200 : 10,
      'Very Large': isCommercial ? 500 : 16,
    };
    maxKwpByArea = spaceCapacityMap[input.spaceSize] || (isCommercial ? 100 : 6);
  }

  // 3. Target System Sizing (sized to offset 60-80% of demand)
  const regionalMultiplier = ADMIN_CONFIG.regionalYieldMultipliers[input.region] || 1.0;
  const effectiveYieldPerKwp = ADMIN_CONFIG.solarYieldFactorDefault * regionalMultiplier;
  
  const idealKwpForConsumption = (annualKwh * 0.75) / effectiveYieldPerKwp;
  const rawSystemSizeKw = Math.min(idealKwpForConsumption, maxKwpByArea);
  
  // Round sensibly
  const estimatedSystemSizeKw = isCommercial
    ? Math.max(10, Math.round(rawSystemSizeKw))
    : Math.max(2, Math.round(rawSystemSizeKw * 10) / 10);

  // 4. Panel Count
  const panelWatts = ADMIN_CONFIG.panelPowerWatts;
  const estimatedPanelsCount = Math.ceil((estimatedSystemSizeKw * 1000) / panelWatts);

  // 5. Estimated Annual Generation (kWh)
  const estimatedAnnualGenerationKwh = Math.round(estimatedSystemSizeKw * effectiveYieldPerKwp);

  // 6. Solar Coverage %
  const estimatedSolarCoveragePercent = Math.min(
    95,
    Math.round((estimatedAnnualGenerationKwh / Math.max(1, annualKwh)) * 100)
  );

  // 7. Defensible Carbon Abatement (kg CO2e per year)
  // UK DESNZ emission factor
  const estimatedCo2AvoidanceKgPerYear = Math.round(
    estimatedAnnualGenerationKwh * ADMIN_CONFIG.ukGridEmissionFactorKgPerKwh
  );

  // 8. Battery Storage Sizing
  const wantsBattery = input.wantsBattery === 'YES' || input.wantsBattery === 'NOT_SURE';
  let indicativeBatteryCapacityKwh = 0;
  if (input.selectedBatteryKwh && input.selectedBatteryKwh > 0) {
    indicativeBatteryCapacityKwh = input.selectedBatteryKwh;
  } else if (wantsBattery) {
    if (isCommercial) {
      indicativeBatteryCapacityKwh = estimatedSystemSizeKw > 200 ? 250 : estimatedSystemSizeKw > 80 ? 100 : 50;
    } else {
      indicativeBatteryCapacityKwh = estimatedSystemSizeKw > 8 ? 10 : 5;
    }
  }

  // 9. Financial Estimation (Indicative Range)
  const capexPerKwp = isCommercial
    ? ADMIN_CONFIG.capexPerKwpCommercialGbp
    : ADMIN_CONFIG.capexPerKwpResidentialGbp;
  
  const solarHardwareCost = estimatedSystemSizeKw * capexPerKwp;
  const batteryHardwareCost = (input.wantsBattery === 'YES' ? indicativeBatteryCapacityKwh * ADMIN_CONFIG.bessCostPerKwhGbp : 0);
  const baseCost = solarHardwareCost + batteryHardwareCost;

  const estimatedProjectCostRangeGbp = {
    min: Math.round(baseCost * 0.9),
    max: Math.round(baseCost * 1.15),
  };

  const selfConsumptionRatio = (input.wantsBattery === 'YES' ? 0.75 : 0.45);
  const tariffRate = (input.currentTariffPencePerKwh ? input.currentTariffPencePerKwh / 100 : ADMIN_CONFIG.defaultElectricityTariffGbpPerKwh);
  const exportTariffRate = 0.08; // SEG / export value

  const annualSelfConsumedValue = estimatedAnnualGenerationKwh * selfConsumptionRatio * tariffRate;
  const annualExportValue = estimatedAnnualGenerationKwh * (1 - selfConsumptionRatio) * exportTariffRate;
  const totalAnnualValue = annualSelfConsumedValue + annualExportValue;

  const estimatedAnnualEnergyValueGbp = {
    min: Math.round(totalAnnualValue * 0.9),
    max: Math.round(totalAnnualValue * 1.1),
  };

  const simplePayback = baseCost / Math.max(1, totalAnnualValue);
  const indicativePaybackYears = {
    min: Math.max(3.2, Math.round((simplePayback - 0.7) * 10) / 10),
    max: Math.max(4.5, Math.round((simplePayback + 0.9) * 10) / 10),
  };

  // Recommended business model based on scale
  let recommendedBusinessModel = 'CAPEX';
  if (isCommercial) {
    if (estimatedSystemSizeKw >= 250) {
      recommendedBusinessModel = 'Corporate PPA / BOOT';
    } else if (estimatedSystemSizeKw >= 50) {
      recommendedBusinessModel = 'RESCO / Project Leasing';
    } else {
      recommendedBusinessModel = 'CAPEX / Leasing';
    }
  }

  return {
    estimatedSystemSizeKw,
    estimatedPanelsCount,
    estimatedAnnualGenerationKwh,
    estimatedSolarCoveragePercent,
    estimatedCo2AvoidanceKgPerYear,
    indicativeBatteryCapacityKwh,
    batteryAdded: input.wantsBattery === 'YES',
    estimatedAnnualEnergyValueGbp,
    estimatedProjectCostRangeGbp,
    indicativePaybackYears,
    recommendedBusinessModel,
    isCommercialScale: isCommercial,
    assessmentReferenceId: generateReferenceId('UNITE'),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Dedicated BESS Calculation and Use-Case Assessor
 */
export function calculateBessAssessment(input: BatteryAssessmentInput): BessAssessmentResult {
  const peakKw = input.peakDemandKw || 150;
  const durationHours = input.desiredBackupHours || 2;
  const recommendedCapacityKwh = Math.round(peakKw * durationHours * 1.15); // buffer for 90% DoD

  const cRate = durationHours <= 1 ? '1C (High-Power Fast Response)' : durationHours <= 2 ? '0.5C (Standard Commercial Duration)' : '0.25C (Deep Long-Duration)';

  const useCases = [
    {
      title: 'Peak Shaving & Capacity Charge Mitigation',
      description: 'Discharges stored clean power during local network peak demand periods, suppressing maximum demand kVA penalties.',
      relevanceScore: 'Essential' as const,
      benefit: 'Lowers distribution connection charges and DUoS red band charges.',
    },
    {
      title: 'Time-of-Use (ToU) Tariff Arbitrage',
      description: 'Charges during low-rate overnight / off-peak windows and discharges during high commercial tariff hours.',
      relevanceScore: 'High' as const,
      benefit: 'Optimises blended energy procurement price per kWh.',
    },
    {
      title: 'Solar PV Self-Consumption Maximisation',
      description: 'Captures midday surplus solar generation that would otherwise be exported at low SEG rates, dispatching it during evening/night loads.',
      relevanceScore: input.solarCapacityKwp > 0 ? ('Essential' as const) : ('Medium' as const),
      benefit: 'Increases site clean energy autonomy up to 85%.',
    },
    {
      title: 'Critical Load Backup & Energy Resilience',
      description: 'Sub-20ms uninterruptible islanding protection against voltage sags, brownouts, and localized grid outages.',
      relevanceScore: 'High' as const,
      benefit: 'Protects continuous manufacturing lines, cold storage, and servers.',
    },
    {
      title: 'Grid Ancillary Service Stacking (Optional)',
      description: 'Pre-engineered to participate in UK National Grid ESO frequency response markets (Dynamic Containment / Dynamic Regulation).',
      relevanceScore: 'Medium' as const,
      benefit: 'Opens recurring non-operational revenue streams.',
    },
  ];

  return {
    recommendedCapacityKwh,
    recommendedCrate: cRate,
    useCases,
    fireSuppressionSpec: 'Integrated Aerosol / Novec-1230 + Multi-point Thermal Runaway Early Warning',
    gridAncillaryReadiness: 'G99 Type C/D Telemetry Ready with OpenADR / Modbus TCP Gateway',
  };
}

/**
 * Hybrid Wind + Solar + BESS Calculation Logic
 */
export function calculateHybridProject(input: HybridAssessmentInput): HybridAssessmentResult {
  const solarCapacityMw = input.solarCapacityMw || 5;
  const landAcres = input.landAreaAcres || 25;
  
  // Approximate wind capacity based on land and rating
  const windCapacityMw = input.windOpportunityRating === 'Exceptional' ? 6 : input.windOpportunityRating === 'High' ? 4 : 2;

  // 1 MW solar produces approx 950 MWh/year in UK
  const solarGenerationGwhYear = Math.round((solarCapacityMw * 0.95) * 10) / 10;
  // 1 MW onshore wind produces approx 2.8 GWh/year (32% capacity factor)
  const windGenerationGwhYear = Math.round((windCapacityMw * 2.7) * 10) / 10;
  const totalGenerationGwhYear = Math.round((solarGenerationGwhYear + windGenerationGwhYear) * 10) / 10;

  const bessCapacityMwh = input.storageRequirementMwh || Math.round((solarCapacityMw + windCapacityMw) * 0.6);

  // Combined capacity factor calculation
  const totalInstalledMw = solarCapacityMw + windCapacityMw;
  const theoreticalMaxGwh = totalInstalledMw * 8.76;
  const combinedCapacityFactorPercent = Math.min(65, Math.round((totalGenerationGwhYear / theoreticalMaxGwh) * 100));

  // CO2 abatement (Tonnes per year)
  const co2AbatementTonnesYear = Math.round((totalGenerationGwhYear * 1000000 * ADMIN_CONFIG.ukGridEmissionFactorKgPerKwh) / 1000);

  return {
    solarGenerationGwhYear,
    windGenerationGwhYear,
    totalGenerationGwhYear,
    bessArbitrageCapacityMwh: bessCapacityMwh,
    combinedCapacityFactorPercent,
    co2AbatementTonnesYear,
    recommendedArchitecture: `Co-located ${solarCapacityMw} MWp Solar PV + ${windCapacityMw} MW Wind Turbines + ${bessCapacityMwh} MWh LFP BESS behind single G99 Grid Interconnection Point.`,
  };
}
