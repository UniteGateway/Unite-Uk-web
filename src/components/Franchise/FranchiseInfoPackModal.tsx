import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { requestFranchiseInformationPack } from '../../services/franchiseService';

interface FranchiseInfoPackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FranchiseInfoPackModal: React.FC<FranchiseInfoPackModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [territory, setTerritory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await requestFranchiseInformationPack({
        name,
        email,
        phone,
        preferredTerritory: territory
      });
      setDownloadSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not process information pack request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#040E20] border-2 border-line rounded-sm shadow-2xl max-w-lg w-full p-6 sm:p-8 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-sm bg-[#06152F] border border-line cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {downloadSuccess ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-[#7AAA2B]/20 border-2 border-[#7AAA2B] flex items-center justify-center mx-auto text-[#7AAA2B]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white uppercase font-display">
                PROSPECTUS DISPATCHED
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Thank you, <strong>{name}</strong>. The comprehensive Unite Solar Franchise & Partner Dossier has been sent to <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#06152F] border border-line text-left text-xs font-mono text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span>Document:</span>
                <strong className="text-white">Unite_Solar_Franchise_Pack_2026.pdf</strong>
              </div>
              <div className="flex justify-between">
                <span>Territory Focus:</span>
                <strong className="text-[#7AAA2B]">{territory || 'UK Nationwide'}</strong>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] font-bold text-xs cursor-pointer shadow-md"
            >
              CLOSE & RETURN TO PLATFORM
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-[10px] font-mono font-bold uppercase">
                <FileText className="w-3 h-3 text-[#FF6321]" />
                <span>CONFIDENTIAL PROSPECTUS</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase font-display tracking-tight">
                DOWNLOAD FRANCHISE INFORMATION PACK
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Access full commercial breakdowns of the £20,000* entry package, territory allocation maps, CRM suite manuals, and net profit-share schedules.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-sm bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Rigby"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@company.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Contact Telephone *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +44 20 7946 0912"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">Preferred UK Territory (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Yorkshire & Humber or Bristol"
                  value={territory}
                  onChange={(e) => setTerritory(e.target.value)}
                  className="w-full p-2.5 rounded-sm bg-[#06152F] border border-line text-white focus:outline-none focus:border-[#7AAA2B]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-sm mini-tag bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? 'PREPARING DOSSIER...' : 'RECEIVE FRANCHISE DOSSIER'}</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-mono text-center pt-1">
                Corporate governance by Unite Greentek Limited under UK data standards.
              </p>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
