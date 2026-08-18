import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EnergyFlowInteractive } from './components/EnergyFlowInteractive';
import { PlatformSolutions } from './components/PlatformSolutions';
import { WhyUnite } from './components/WhyUnite';
import { BusinessModels } from './components/BusinessModels';
import { UkOpportunityMap } from './components/UkOpportunityMap';
import { TechnologyAndJourney } from './components/TechnologyAndJourney';
import { SolarCalculator } from './components/SolarCalculator';
import { FranchiseSection } from './components/FranchiseSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { EnergySolution } from './types';

export default function App() {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState('commercial');
  const [modalInitialData, setModalInitialData] = useState<any>(null);

  const handleOpenAssessment = (type = 'commercial', data?: any) => {
    setModalInitialType(type);
    setModalInitialData(data || null);
    setIsAssessmentModalOpen(true);
  };

  const handleOpenFranchise = (territory?: string) => {
    setModalInitialType('franchise');
    setModalInitialData(territory ? { region: territory } : null);
    setIsAssessmentModalOpen(true);
  };

  const handleExploreSolar = () => {
    const el = document.getElementById('solutions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuildWithUs = () => {
    const el = document.getElementById('franchise');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 font-sans selection:bg-[#4E8B1E] selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Sticky Main Navigation */}
      <Navbar
        onOpenAssessment={() => handleOpenAssessment('general')}
        onOpenFranchise={() => handleOpenFranchise()}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* Stage 1: Full-Screen Hero Experience */}
        <Hero
          onExploreSolar={handleExploreSolar}
          onBuildWithUs={handleBuildWithUs}
          onOpenAssessment={() => handleOpenAssessment('commercial')}
        />

        {/* Section 12: Interactive Synchronized Energy Flow Simulator */}
        <EnergyFlowInteractive />

        {/* Section 8 & 9 & 10: Our Energy Platform (6 Interactive Cards) */}
        <PlatformSolutions
          onSelectSolution={(solution: EnergySolution) => {}}
          onOpenAssessment={(solutionId: string) => handleOpenAssessment(solutionId)}
        />

        {/* Section 11: Why Unite Solar (4 Pillars) */}
        <WhyUnite
          onOpenAssessment={() => handleOpenAssessment('why-unite')}
        />

        {/* Section 13: Smart Business Models (CAPEX, PPA, RESCO, BOOT, BOO, Project Leasing) */}
        <BusinessModels
          onOpenAssessment={(modelCode: string) => handleOpenAssessment(modelCode, { model: modelCode })}
        />

        {/* Interactive Solar & Clean Energy Calculator */}
        <SolarCalculator
          onOpenAssessmentWithData={(calcData: any) => handleOpenAssessment('calculator', calcData)}
        />

        {/* Section 14: UK Renewable Energy Opportunity Map */}
        <UkOpportunityMap
          onExploreProject={(regionName?: string) => handleOpenAssessment('uk-region', { region: regionName })}
        />

        {/* Section 15: Global Technology OEM Ecosystem + 7-Step Project Journey */}
        <TechnologyAndJourney
          onOpenAssessment={() => handleOpenAssessment('journey-stage-1')}
        />

        {/* Section 16: Partnership & Franchise Opportunities (£20,000*) */}
        <FranchiseSection
          onOpenFranchiseModal={(territory?: string) => handleOpenFranchise(territory)}
          onOpenAssessment={(type: string) => handleOpenAssessment(type)}
        />

        {/* Section 17: Final Conversion Section & CTA */}
        <FinalCta
          onRequestAssessment={() => handleOpenAssessment('final-cta')}
          onBecomePartner={() => handleOpenAssessment('partner-inquiry')}
          onExploreFranchise={() => handleOpenFranchise()}
        />
      </main>

      {/* Corporate Multi-Tier Footer */}
      <Footer />

      {/* Interactive Assessment & Franchise Modal */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        initialType={modalInitialType}
        initialData={modalInitialData}
      />

    </div>
  );
}
