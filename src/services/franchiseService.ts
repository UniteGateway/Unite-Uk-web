import {
  FranchiseApplication,
  FranchiseInfoPackDownloadRequest,
  FranchiseTerritory
} from '../types';
import { UK_FRANCHISE_TERRITORIES } from '../data/franchiseData';

const FRANCHISE_APPLICATIONS_KEY = 'unite_franchise_applications_v1';
const FRANCHISE_INFO_REQUESTS_KEY = 'unite_franchise_info_downloads_v1';

/**
 * Generates official reference format UG-FR-XXXXX as requested in Prompt 5
 */
export function generateFranchiseRefId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `UG-FR-${rand}`;
}

/**
 * Submits a new Franchise Partner Application
 */
export async function submitFranchiseApplication(
  data: Omit<FranchiseApplication, 'applicationId' | 'referenceNumber' | 'createdDate' | 'status'>
): Promise<{ success: boolean; application: FranchiseApplication; message: string }> {
  // Simple validation
  if (!data.name || !data.email || !data.phone) {
    throw new Error('Please provide your full name, email and telephone number.');
  }

  const refNumber = generateFranchiseRefId();
  const fullApp: FranchiseApplication = {
    ...data,
    applicationId: refNumber,
    referenceNumber: refNumber,
    status: 'APPLICATION',
    createdDate: new Date().toISOString(),
    privacyConsent: true
  };

  // Local persistence
  try {
    const raw = localStorage.getItem(FRANCHISE_APPLICATIONS_KEY);
    const list: FranchiseApplication[] = raw ? JSON.parse(raw) : [];
    list.unshift(fullApp);
    localStorage.setItem(FRANCHISE_APPLICATIONS_KEY, JSON.stringify(list.slice(0, 50)));
  } catch (e) {
    console.warn('Could not persist franchise application locally', e);
  }

  // Artificial short delay for realistic feedback
  await new Promise((res) => setTimeout(res, 650));

  return {
    success: true,
    application: fullApp,
    message: 'Your franchise enquiry has been successfully logged with Unite Greentek Limited.'
  };
}

/**
 * Logs a request for the downloadable Franchise Information Pack
 */
export async function requestFranchiseInformationPack(
  data: Omit<FranchiseInfoPackDownloadRequest, 'requestId' | 'requestedAt'>
): Promise<{ success: boolean; requestId: string; downloadUrl: string }> {
  if (!data.name || !data.email || !data.phone) {
    throw new Error('Please fill in your name, email and contact number to access the document.');
  }

  const requestId = `PACK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const packRequest: FranchiseInfoPackDownloadRequest = {
    ...data,
    requestId,
    requestedAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(FRANCHISE_INFO_REQUESTS_KEY);
    const list: FranchiseInfoPackDownloadRequest[] = raw ? JSON.parse(raw) : [];
    list.unshift(packRequest);
    localStorage.setItem(FRANCHISE_INFO_REQUESTS_KEY, JSON.stringify(list.slice(0, 50)));
  } catch (e) {
    console.warn('Could not store info pack download request', e);
  }

  await new Promise((res) => setTimeout(res, 500));

  return {
    success: true,
    requestId,
    downloadUrl: '#franchise-info-pack-ready'
  };
}

/**
 * Retrieves territories with optional filters
 */
export function getFranchiseTerritories(
  countryFilter = 'ALL',
  searchQuery = ''
): FranchiseTerritory[] {
  return UK_FRANCHISE_TERRITORIES.filter((t) => {
    if (countryFilter !== 'ALL' && t.country !== countryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        t.county.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q) ||
        t.territory_id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}
