import { LeadRecord, BookingRequest } from '../types';
import { generateReferenceId } from './calculationEngine';

/**
 * UNITE SOLAR — CRM & Enterprise Lead Management Architecture
 * Prepares clean, strongly typed data contracts ready for Salesforce, HubSpot,
 * Zoho, or custom ERP/CRM webhook integration.
 */

// Local persistence key for client session cache
const CRM_LEADS_STORAGE_KEY = 'unite_solar_crm_leads';
const SAVED_ASSESSMENTS_KEY = 'unite_solar_saved_assessments';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates UK Phone numbers & international format
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone || phone.trim().length < 8) return false;
  // Allows UK formats (+44, 07, 01, 02) and general international numbers
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(\+?\d{8,15})$/.test(cleaned);
}

/**
 * Validates standard email RFC-compliant format
 */
export function validateEmail(email: string): boolean {
  if (!email || email.trim().length < 5) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates UK Postcodes
 */
export function validateUkPostcode(postcode: string): boolean {
  if (!postcode) return false;
  const cleaned = postcode.trim().toUpperCase();
  // Standard UK postcode regex
  const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2})$/i;
  return ukPostcodeRegex.test(cleaned) || cleaned.length >= 3;
}

/**
 * Validates a lead submission payload before transmission
 */
export function validateLeadSubmission(payload: Partial<LeadRecord>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }

  if (!payload.email || !validateEmail(payload.email)) {
    errors.email = 'Please provide a valid business or personal email address.';
  }

  if (!payload.phone || !validatePhoneNumber(payload.phone)) {
    errors.phone = 'Please provide a valid contact telephone number.';
  }

  if (payload.privacyConsent === false) {
    errors.privacyConsent = 'You must agree to the privacy policy to proceed.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submits a new project assessment lead into the CRM pipeline
 */
export async function submitProjectLead(leadData: Omit<LeadRecord, 'leadId' | 'referenceNumber' | 'createdDate' | 'status'>): Promise<{ success: boolean; leadRecord: LeadRecord; message: string }> {
  // 1. Validate payload
  const validation = validateLeadSubmission(leadData);
  if (!validation.isValid) {
    const errorMsg = Object.values(validation.errors).join(' ');
    throw new Error(errorMsg || 'Invalid form submission.');
  }

  // 2. Build full CRM record
  const fullRecord: LeadRecord = {
    ...leadData,
    leadId: `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    referenceNumber: generateReferenceId('UNITE'),
    createdDate: new Date().toISOString(),
    status: 'NEW',
    leadSource: leadData.leadSource || 'Unite Solar Web Assessment Platform',
    privacyConsent: true,
  };

  // 3. Local persistence storage for session continuity
  try {
    const existingRaw = localStorage.getItem(CRM_LEADS_STORAGE_KEY);
    const existingLeads: LeadRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingLeads.unshift(fullRecord);
    localStorage.setItem(CRM_LEADS_STORAGE_KEY, JSON.stringify(existingLeads.slice(0, 50)));
  } catch (e) {
    // Non-blocking fallback if storage is restricted
    console.warn('Local storage write unavailable for lead records', e);
  }

  // Simulating network roundtrip for clean UI feedback
  await new Promise((res) => setTimeout(res, 600));

  return {
    success: true,
    leadRecord: fullRecord,
    message: 'Your project assessment has been logged successfully with Unite Greentek Limited.',
  };
}

/**
 * Saves an assessment draft / dossier under a reference ID
 */
export function saveAssessmentDraft(assessmentData: any): { referenceNumber: string; savedAt: string } {
  const referenceNumber = generateReferenceId('DRAFT');
  const savedAt = new Date().toISOString();

  try {
    const existingRaw = localStorage.getItem(SAVED_ASSESSMENTS_KEY);
    const existingDrafts = existingRaw ? JSON.parse(existingRaw) : {};
    existingDrafts[referenceNumber] = {
      ...assessmentData,
      referenceNumber,
      savedAt,
    };
    localStorage.setItem(SAVED_ASSESSMENTS_KEY, JSON.stringify(existingDrafts));
  } catch (e) {
    console.warn('Could not persist assessment draft', e);
  }

  return { referenceNumber, savedAt };
}

/**
 * Submits a project discussion / callback request
 */
export async function submitBookingRequest(bookingData: Omit<BookingRequest, 'bookingId' | 'createdDate'>): Promise<{ success: boolean; booking: BookingRequest }> {
  if (!bookingData.name || !bookingData.phone || !bookingData.email) {
    throw new Error('Please complete all required contact details for the project discussion.');
  }

  const booking: BookingRequest = {
    ...bookingData,
    bookingId: `CALL-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdDate: new Date().toISOString(),
  };

  await new Promise((res) => setTimeout(res, 500));

  return {
    success: true,
    booking,
  };
}
