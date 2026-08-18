import React, { useState } from 'react';
import { UniteSolarLogo, UniteGroupLogo } from './UniteLogos';
import { Phone, Mail, Globe, MapPin, Linkedin, Twitter, Youtube, ShieldCheck, ArrowUp, QrCode, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showQrExpanded, setShowQrExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040D1D] text-slate-400 text-xs border-t border-line pt-14 pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Tier: Company Identities & Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1-4: Unite Solar & Corporate Pedigree */}
          <div className="lg:col-span-4 space-y-3.5">
            <UniteSolarLogo size="lg" theme="dark" />
            
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2 text-xs">
                <span className="mini-tag text-slate-400">Powered by</span>
                <strong className="text-white font-semibold uppercase tracking-wider">UNITE GREENTEK LIMITED</strong>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Registered in the United Kingdom. Delivering commercial & industrial solar PV, battery energy storage systems (BESS), onshore wind, and corporate PPAs.
              </p>
            </div>

            {/* Parent Group Badge */}
            <div className="pt-2 border-t border-line">
              <span className="mini-tag text-slate-400 block mb-1.5">
                A Company Of:
              </span>
              <div className="flex items-center gap-3 p-2 rounded-sm bg-[#06152F] border border-line">
                <UniteGroupLogo theme="dark" />
                <span className="text-[10px] text-slate-300 font-mono">Unite Group Inc., USA</span>
              </div>
            </div>
          </div>

          {/* Col 5-7: Quick Navigation */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="mini-tag text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              {[
                { label: 'Energy Solutions', href: '#solutions' },
                { label: 'Business Models (PPA / CAPEX)', href: '#models' },
                { label: 'UK Opportunity Map', href: '#uk-opportunity' },
                { label: 'Technology & OEMs', href: '#technology' },
                { label: 'Project Journey', href: '#journey' },
                { label: 'Solar Feasibility Calculator', href: '#calculator' },
                { label: 'Franchise Opportunity (£20k*)', href: '#franchise' },
                { label: 'Contact & Assessment', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors flex items-center justify-between group text-[11px]"
                  >
                    <span>{item.label}</span>
                    <span className="text-slate-600 group-hover:text-[#7AAA2B] transition-colors font-mono">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 8-10: Contact Information */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="mini-tag text-white font-bold">
              UK Headquarters
            </h4>
            <div className="space-y-2 text-slate-300 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF6321] shrink-0 mt-0.5" />
                <span>
                  Unite Greentek Limited <br />
                  London & Regional UK Operations
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#7AAA2B] shrink-0" />
                <a href="tel:+442030341066" className="hover:text-white transition-colors font-mono">
                  +44 203 034 1066
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href="mailto:info@unitegreentech.com" className="hover:text-white transition-colors font-mono">
                  info@unitegreentech.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <a
                  href="https://unitegreentech.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white underline decoration-slate-700 underline-offset-4 font-mono"
                >
                  unitegreentech.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-1 flex items-center gap-1.5">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-sm bg-[#06152F] border border-line flex items-center justify-center hover:text-white hover:border-[#FF6321] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-sm bg-[#06152F] border border-line flex items-center justify-center hover:text-white hover:border-[#7AAA2B] transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-sm bg-[#06152F] border border-line flex items-center justify-center hover:text-white hover:border-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 11-12: Interactive QR Code to Official Website */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-start space-y-2">
            <h4 className="mini-tag text-white font-bold">
              Scan Website
            </h4>
            <div
              onClick={() => setShowQrExpanded(!showQrExpanded)}
              className="p-2.5 bg-white rounded-sm shadow-lg cursor-pointer hover:scale-105 transition-transform border border-line"
              title="Click to zoom QR Code"
            >
              {/* Scalable Vector SVG QR Code */}
              <svg width="80" height="80" viewBox="0 0 100 100" fill="#06152F">
                {/* QR Pattern Representation for https://unitegreentech.com */}
                <rect x="5" y="5" width="30" height="30" fill="#06152F" />
                <rect x="10" y="10" width="20" height="20" fill="white" />
                <rect x="15" y="15" width="10" height="10" fill="#FF6321" />

                <rect x="65" y="5" width="30" height="30" fill="#06152F" />
                <rect x="70" y="10" width="20" height="20" fill="white" />
                <rect x="75" y="15" width="10" height="10" fill="#7AAA2B" />

                <rect x="5" y="65" width="30" height="30" fill="#06152F" />
                <rect x="10" y="70" width="20" height="20" fill="white" />
                <rect x="15" y="75" width="10" height="10" fill="#06152F" />

                {/* Random Data cells */}
                <rect x="42" y="10" width="8" height="8" fill="#06152F" />
                <rect x="52" y="18" width="8" height="8" fill="#06152F" />
                <rect x="45" y="45" width="12" height="12" fill="#FF6321" />
                <rect x="65" y="45" width="8" height="8" fill="#06152F" />
                <rect x="80" y="55" width="8" height="8" fill="#06152F" />
                <rect x="45" y="70" width="8" height="8" fill="#7AAA2B" />
                <rect x="60" y="80" width="8" height="8" fill="#06152F" />
                <rect x="75" y="75" width="12" height="12" fill="#06152F" />
              </svg>
            </div>
            <span className="text-[9px] text-slate-400 font-mono text-center">
              unitegreentech.com
            </span>
          </div>

        </div>

        {/* Bottom Legal Tier: Compliance & Entity Distinctions */}
        <div className="pt-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} UNITE SOLAR. All rights reserved. Powered by Unite Greentek Limited (United Kingdom), a company of Unite Group Inc. (USA).
            </p>
            <p className="text-slate-400">
              Clean Energy. Smart Solutions. Sustainable Future. G99, G100, MCS & NICEIC Compliant Engineering.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-sm bg-[#06152F] hover:bg-[#0A1E3A] text-slate-300 hover:text-white border border-line transition-colors flex items-center gap-1.5 cursor-pointer mini-tag"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
