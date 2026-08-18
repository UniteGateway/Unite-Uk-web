import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { submitBookingRequest } from '../../services/crmService';
import { Calendar, Clock, Phone, Mail, User, Building, CheckCircle2, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface DiscussionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export const DiscussionBookingModal: React.FC<DiscussionBookingModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('Morning (09:00 - 12:00)');
  const [projectType, setProjectType] = useState<string>(initialData?.projectType || 'Commercial Solar PV');
  const [notes, setNotes] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !phone || !email) {
      setErrorMessage('Please provide your name, telephone, and email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please accept the privacy consent to schedule a consultation.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitBookingRequest({
        name,
        company,
        phone,
        email,
        preferredDate: preferredDate || 'Earliest Available',
        preferredTime,
        projectType,
        notes,
      });

      setBookingId(res.booking.bookingId);
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to submit discussion request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0A1E3A] border border-line rounded-sm max-w-lg w-full shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-line bg-[#06152F]">
          <div>
            <span className="mini-tag text-[#7AAA2B]">Direct Engineering Consultation</span>
            <h3 className="text-lg font-bold text-white font-display uppercase">
              BOOK A PROJECT DISCUSSION
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h4 className="text-xl font-bold text-white font-display uppercase">
              DISCUSSION REQUEST RECEIVED
            </h4>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Our engineering & commercial team has scheduled your preliminary review under reference:
            </p>

            <div className="p-3 bg-[#06152F] rounded-sm border border-line font-mono text-sm text-[#7AAA2B] font-bold">
              {bookingId}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              A senior technical advisor from Unite Greentek Limited will connect with you at your chosen window: <strong className="text-slate-200">{preferredTime}</strong>.
            </p>

            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-bold hover:bg-[#689423] cursor-pointer transition-colors"
            >
              CLOSE WINDOW
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-sm bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mini-tag text-slate-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Ross"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="mini-tag text-slate-300 block mb-1">Company / Organisation</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Logistics UK Ltd"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mini-tag text-slate-300 block mb-1">Telephone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 203 034 1066"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs font-mono focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="mini-tag text-slate-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="david@company.co.uk"
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mini-tag text-slate-300 block mb-1">Project Focus</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                >
                  <option value="Commercial Solar PV">Commercial Solar PV</option>
                  <option value="Industrial Megawatt PV">Industrial Megawatt PV</option>
                  <option value="BESS Battery Storage">BESS Battery Storage</option>
                  <option value="Wind Energy / Hybrid">Wind Energy / Hybrid</option>
                  <option value="Corporate PPA / RESCO">Corporate PPA / RESCO (Zero-CAPEX)</option>
                  <option value="UK Franchise Partnership">UK Franchise Partnership</option>
                  <option value="Residential Solar + Storage">Residential Solar + Storage</option>
                </select>
              </div>

              <div>
                <label className="mini-tag text-slate-300 block mb-1">Preferred Time Window</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 – 12:00 GMT)</option>
                  <option value="Afternoon (12:00 - 15:00)">Afternoon (12:00 – 15:00 GMT)</option>
                  <option value="Late Afternoon (15:00 - 18:00)">Late Afternoon (15:00 – 18:00 GMT)</option>
                  <option value="Anytime">Anytime during business hours</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mini-tag text-slate-300 block mb-1">Optional Notes or Site Postcode</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Details regarding your annual spend, roof condition, or substation capacity..."
                className="w-full px-3 py-2 rounded-sm bg-[#06152F] border border-line text-white text-xs focus:outline-none focus:border-[#7AAA2B]"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="booking-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#7AAA2B]"
              />
              <label htmlFor="booking-consent" className="text-[11px] text-slate-400 cursor-pointer">
                I agree to be contacted by Unite Greentek Limited regarding my clean energy enquiry in accordance with the Privacy Policy.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
            >
              <span>{isSubmitting ? 'PROCESSING...' : 'CONFIRM DISCUSSION REQUEST'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
