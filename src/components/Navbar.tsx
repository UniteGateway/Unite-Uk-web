import React, { useState, useEffect } from 'react';
import { UniteSolarLogo, UniteGroupLogo } from './UniteLogos';
import { Phone, Mail, ChevronRight, Menu, X, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAssessment: (type?: string) => void;
  onOpenFranchise: () => void;
  currentView?: 'home' | 'uk-opportunity' | 'franchise' | 'admin';
  onNavigate?: (view: 'home' | 'uk-opportunity' | 'franchise' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAssessment,
  onOpenFranchise,
  currentView = 'home',
  onNavigate
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveGridPct, setLiveGridPct] = useState(44.8);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle live grid clean power pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveGridPct((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'HOME PLATFORM', view: 'home' as const, href: '#top' },
    { label: 'UK OPPORTUNITY', view: 'uk-opportunity' as const, href: '#uk-opportunity', isNew: true },
    { label: 'SOLUTIONS', view: 'home' as const, href: '#solutions' },
    { label: 'BUSINESS MODELS', view: 'home' as const, href: '#models' },
    { label: 'PORTFOLIO', view: 'uk-opportunity' as const, href: '#project-portfolio' },
    { label: 'FRANCHISE', view: 'franchise' as const, href: '#franchise', tag: '£20k*' },
    { label: 'CONTACT', view: 'home' as const, href: '#final-cta' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    if (onNavigate) {
      if (link.view !== currentView) {
        e.preventDefault();
        onNavigate(link.view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
  };

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06152F]/92 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#06152F]/95 via-[#06152F]/70 to-transparent py-4'
      }`}
    >
      {/* Top micro-bar for international parent company & UK operating entity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 hidden lg:flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/50 pb-1.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#4E8B1E] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#4E8B1E] -ml-3.5" />
            <span>UK Clean Grid Share: <strong className="text-white font-mono">{liveGridPct}%</strong></span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7AAA2B]" />
            <span>Operating entity: <strong className="text-slate-200">Unite Greentek Limited</strong> (UK)</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Group:</span>
            <UniteGroupLogo className="opacity-90 hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-slate-700">|</span>
          <a
            href="tel:+442030341066"
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#F37021]" />
            <span>+44 203 034 1066</span>
          </a>
          <a
            href="mailto:info@unitegreentech.com"
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-[#7AAA2B]" />
            <span>info@unitegreentech.com</span>
          </a>
          <span className="text-slate-700">|</span>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#7AAA2B] hover:text-white bg-[#0A1E3A] px-2.5 py-0.5 rounded-sm border border-line transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3 h-3 text-[#FF6321]" />
            <span>CRM & ADMIN OS</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Unite Solar Home"
        >
          <UniteSolarLogo size="md" theme="dark" />
          <div className="hidden sm:flex flex-col pl-3 border-l border-slate-700/80">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7AAA2B]">
              Powered by Unite Greentek
            </span>
            <span className="text-[9px] text-slate-400 font-medium">
              United Kingdom
            </span>
          </div>
        </a>

        {/* Desktop Nav links */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-slate-300">
          {navLinks.map((link) => {
            const isActive = link.view === currentView;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`transition-colors relative py-1 hover:text-white flex items-center gap-1.5 ${
                  isActive ? 'text-[#7AAA2B] font-bold' : 'text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[#FF6321] text-white animate-pulse">
                    UK HUB
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7AAA2B]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-franchise-button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('franchise');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onOpenFranchise();
              }
            }}
            className="px-3.5 py-2 rounded-sm mini-tag text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-line transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Franchise</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#FF6321]/20 text-[#FF6321] font-mono">£20k*</span>
          </button>

          <button
            id="nav-get-started-button"
            onClick={() => onOpenAssessment('general')}
            className="px-4 py-2 rounded-sm mini-tag text-white bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] hover:from-[#5aa222] hover:to-[#8bc232] shadow-lg shadow-green-950/40 hover:shadow-green-900/60 transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>GET STARTED</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-[#0A1E3A] border-b border-slate-700/80 px-6 py-6 mt-3 space-y-4 shadow-2xl transition-all"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span>Parent: <strong>Unite Group Inc., USA</strong></span>
            <span className="text-[#7AAA2B] font-semibold">Unite Greentek Ltd UK</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link);
                }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 text-slate-200 text-sm font-medium hover:bg-slate-800 hover:text-white border border-slate-800"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[9px] font-mono font-bold bg-[#FF6321] text-white px-1.5 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2.5 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment('commercial');
              }}
              className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#4E8B1E] to-[#7AAA2B] flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Request Project Assessment</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFranchise();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
            >
              <span>Explore Franchise Opportunity (£20,000*)</span>
            </button>
          </div>

          <div className="pt-2 text-xs text-slate-400 space-y-1">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#F37021]" />
              <a href="tel:+442030341066" className="hover:text-white">+44 203 034 1066</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#7AAA2B]" />
              <a href="mailto:info@unitegreentech.com" className="hover:text-white">info@unitegreentech.com</a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
