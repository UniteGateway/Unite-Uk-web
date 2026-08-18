import React, { useState, useEffect } from 'react';
import { FranchiseHero } from '../components/Franchise/FranchiseHero';
import { FranchiseValueProp } from '../components/Franchise/FranchiseValueProp';
import { ProfitShareSection } from '../components/Franchise/ProfitShareSection';
import { InvestmentSection } from '../components/Franchise/InvestmentSection';
import { TerritorySelector } from '../components/Franchise/TerritorySelector';
import { TerritoryDashboardConcept } from '../components/Franchise/TerritoryDashboardConcept';
import { CrmWorkflowSection } from '../components/Franchise/CrmWorkflowSection';
import { BusinessTransparencySection } from '../components/Franchise/BusinessTransparencySection';
import { FranchiseJourney } from '../components/Franchise/FranchiseJourney';
import { PartnerEligibility } from '../components/Franchise/PartnerEligibility';
import { PartnerEcosystem } from '../components/Franchise/PartnerEcosystem';
import { TechnologySupport } from '../components/Franchise/TechnologySupport';
import { FranchiseBusinessModel } from '../components/Franchise/FranchiseBusinessModel';
import { PartTimePathways } from '../components/Franchise/PartTimePathways';
import { FranchiseApplicationForm } from '../components/Franchise/FranchiseApplicationForm';
import { FranchiseFaq } from '../components/Franchise/FranchiseFaq';
import { FranchiseCta } from '../components/Franchise/FranchiseCta';
import { FranchiseInfoPackModal } from '../components/Franchise/FranchiseInfoPackModal';
import { FranchiseTerritory } from '../types';
import { MapPin, FileText, PhoneCall, ShieldCheck, Zap } from 'lucide-react';

interface FranchisePageProps {
  onOpenAssessment: (type?: string, data?: any) => void;
  onOpenBookingModal?: (data?: any) => void;
  initialTerritory?: string | null;
}

export const FranchisePage: React.FC<FranchisePageProps> = ({
  onOpenAssessment,
  onOpenBookingModal,
  initialTerritory
}) => {
  const [selectedTerritoryForApp, setSelectedTerritoryForApp] = useState<FranchiseTerritory | null>(null);
  const [selectedPathwayForApp, setSelectedPathwayForApp] = useState<string>('FULL-TIME BUSINESS');
  const [isInfoPackModalOpen, setIsInfoPackModalOpen] = useState(false);

  // Set page document title for SEO
  useEffect(() => {
    document.title = 'Unite Solar Franchise & Partner Platform | Unite Greentek UK';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTerritory = (territory: FranchiseTerritory) => {
    setSelectedTerritoryForApp(territory);
    scrollToSection('apply-franchise');
  };

  const handleSelectPathway = (pathway: string) => {
    setSelectedPathwayForApp(pathway);
    scrollToSection('apply-franchise');
  };

  const handleTalkToUs = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal({
        topic: 'Franchise & Partner Territory Discovery',
        source: 'Franchise Platform'
      });
    } else {
      onOpenAssessment('franchise-discussion');
    }
  };

  return (
    <div id="unite-franchise-platform" className="w-full bg-[#06152F] text-slate-100 selection:bg-[#4E8B1E] selection:text-white">
      
      {/* 1. Hero Section (Prompt 5 Section 1) */}
      <FranchiseHero
        onSelectTerritory={() => scrollToSection('select-territory')}
        onDownloadPack={() => setIsInfoPackModalOpen(true)}
        onRequestDiscussion={handleTalkToUs}
      />

      {/* 2. Value Proposition Cards (Prompt 5 Section 2) */}
      <FranchiseValueProp />

      {/* 3. 25% Net Profit Share Section (Prompt 5 Section 3) */}
      <ProfitShareSection
        onOpenApplication={() => scrollToSection('apply-franchise')}
      />

      {/* 4. £20,000 Package Breakdown (Prompt 5 Section 4) */}
      <InvestmentSection
        onRequestDetails={() => scrollToSection('apply-franchise')}
      />

      {/* 5. Interactive UK Territory Selector & Map (Prompt 5 Section 5 & 20) */}
      <TerritorySelector
        onRequestTerritory={handleSelectTerritory}
      />

      {/* 6. Territory Dashboard Concept (Prompt 5 Section 6) */}
      <TerritoryDashboardConcept />

      {/* 7. Complete CRM Workflow & 10 Features (Prompt 5 Section 7) */}
      <CrmWorkflowSection />

      {/* 8. Business Transparency & Value Flow (Prompt 5 Section 8) */}
      <BusinessTransparencySection />

      {/* 9. 6-Stage Franchise Journey (Prompt 5 Section 9) */}
      <FranchiseJourney
        onStartJourney={() => scrollToSection('apply-franchise')}
      />

      {/* 10. Partner Eligibility & Inclusivity (Prompt 5 Section 10) */}
      <PartnerEligibility
        onApply={() => scrollToSection('apply-franchise')}
      />

      {/* 11. Connected Partner Network / Ecosystem (Prompt 5 Section 11) */}
      <PartnerEcosystem />

      {/* 12. Technology & Supplier Network (Prompt 5 Section 12) */}
      <TechnologySupport />

      {/* 13. Structural Business Model Flow (Prompt 5 Section 13) */}
      <FranchiseBusinessModel />

      {/* 14. Part-Time & Expansion Pathways (Prompt 5 Section 14) */}
      <PartTimePathways
        onSelectPathway={handleSelectPathway}
      />

      {/* 15. Structured 6-Step Application Form (Prompt 5 Section 15) */}
      <section id="apply-franchise" className="py-16 bg-[#020A17] border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#06152F] border border-line text-[#7AAA2B] text-xs font-mono font-bold uppercase">
              <Zap className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>Section 15 // Franchise Discovery Application</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display uppercase">
              APPLY FOR YOUR TERRITORY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Complete the structured application below to receive the formal Franchise Prospectus and schedule your Stage 02 Discovery Briefing.
            </p>
          </div>

          <FranchiseApplicationForm
            preselectedTerritory={selectedTerritoryForApp}
            preselectedPathway={selectedPathwayForApp}
          />
        </div>
      </section>

      {/* 16. Franchise FAQ (Prompt 5 Section 16) */}
      <FranchiseFaq
        onRequestDiscussion={handleTalkToUs}
      />

      {/* 17. Final Conversion Section (Prompt 5 Section 17) */}
      <FranchiseCta
        onSelectTerritory={() => scrollToSection('select-territory')}
        onRequestInformation={() => setIsInfoPackModalOpen(true)}
        onTalkToUs={handleTalkToUs}
      />

      {/* Downloadable Information Pack Modal */}
      <FranchiseInfoPackModal
        isOpen={isInfoPackModalOpen}
        onClose={() => setIsInfoPackModalOpen(false)}
      />

      {/* Mobile Sticky Quick Conversion Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#06152F]/95 backdrop-blur-md border-t border-line p-3 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={() => scrollToSection('select-territory')}
          className="flex-1 py-2.5 rounded-sm mini-tag bg-[#0A1E3A] border border-line text-white text-[11px] font-bold flex items-center justify-center gap-1"
        >
          <MapPin className="w-3.5 h-3.5 text-[#7AAA2B]" />
          <span>Territories</span>
        </button>

        <button
          onClick={() => scrollToSection('apply-franchise')}
          className="flex-1 py-2.5 rounded-sm mini-tag bg-[#7AAA2B] text-[#06152F] text-[11px] font-bold flex items-center justify-center gap-1 shadow-md"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Apply (£20k*)</span>
        </button>

        <button
          onClick={() => setIsInfoPackModalOpen(true)}
          className="p-2.5 rounded-sm bg-[#06152F] border border-line text-[#FF6321]"
          title="Download Prospectus"
        >
          <FileText className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
