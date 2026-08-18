import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EnergyFlowInteractive } from './components/EnergyFlowInteractive';
import { SolarAssessmentTool } from './components/InteractivePlatform/SolarAssessmentTool';
import { BessAssessmentTool } from './components/InteractivePlatform/BessAssessmentTool';
import { HybridProjectExplorer } from './components/InteractivePlatform/HybridProjectExplorer';
import { ZeroCapexHighlight } from './components/InteractivePlatform/ZeroCapexHighlight';
import { DiscussionBookingModal } from './components/InteractivePlatform/DiscussionBookingModal';
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
import { UkOpportunityPage } from './pages/UkOpportunityPage';
import { FranchisePage } from './pages/FranchisePage';
import { EnergySolution } from './types';
import { AdminLayout } from './components/Admin/AdminLayout';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminUser, AdminUserRole } from './types/adminTypes';
import { adminStore } from './services/adminStore';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'uk-opportunity' | 'franchise' | 'admin'>('home');
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(adminStore.getCurrentUser());
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState('commercial');
  const [modalInitialData, setModalInitialData] = useState<any>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any>(null);

  // Synchronize hash with current view
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (
        hash.includes('admin') ||
        hash.includes('crm') ||
        hash.includes('portal') ||
        path.includes('admin')
      ) {
        setCurrentView('admin');
      } else if (
        hash.includes('uk-opportunity') ||
        hash.includes('project-portfolio') ||
        hash.includes('submit-project') ||
        path.includes('uk-opportunity')
      ) {
        setCurrentView('uk-opportunity');
      } else if (
        hash.includes('franchise') ||
        hash.includes('territory') ||
        hash.includes('partner') ||
        path.includes('franchise')
      ) {
        setCurrentView('franchise');
      } else {
        if (currentView === 'admin' && (hash === '' || hash === '#top')) {
          setCurrentView('home');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAssessment = (type = 'commercial', data?: any) => {
    setModalInitialType(type);
    setModalInitialData(data || null);
    setIsAssessmentModalOpen(true);
  };

  const handleOpenFranchise = (territory?: string) => {
    setCurrentView('franchise');
    window.location.hash = 'franchise';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (data?: any) => {
    setBookingInitialData(data || null);
    setIsBookingModalOpen(true);
  };

  const handleExploreSolar = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('solar-assessment');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('solar-assessment');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else {
        const fallback = document.getElementById('solutions');
        if (fallback) fallback.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBuildWithUs = () => {
    setCurrentView('franchise');
    window.location.hash = 'franchise';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view: 'home' | 'uk-opportunity' | 'franchise' | 'admin') => {
    setCurrentView(view);
    if (view === 'uk-opportunity') {
      window.location.hash = 'uk-opportunity';
    } else if (view === 'franchise') {
      window.location.hash = 'franchise';
    } else if (view === 'admin') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = (user: AdminUser) => {
    setCurrentUser(user);
    adminStore.setCurrentUser(user);
  };

  const handleAdminLogout = () => {
    adminStore.logout();
    setCurrentUser(null);
  };

  const handleSwitchRole = (role: AdminUserRole) => {
    if (currentUser) {
      const updatedUser: AdminUser = {
        ...currentUser,
        role
      };
      adminStore.setCurrentUser(updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  // If user is viewing Admin CRM
  if (currentView === 'admin') {
    if (!currentUser) {
      return (
        <AdminLogin
          onSuccess={handleAdminLogin}
          onBackToPublic={() => handleNavigateView('home')}
        />
      );
    }

    return (
      <AdminLayout
        currentUser={currentUser}
        onLogout={handleAdminLogout}
        onNavigateToPublic={() => handleNavigateView('home')}
        onSwitchRole={handleSwitchRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#06152F] text-slate-100 font-sans selection:bg-[#4E8B1E] selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Sticky Main Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigateView}
        onOpenAssessment={() => handleOpenAssessment('general')}
        onOpenFranchise={() => handleOpenFranchise()}
      />

      {/* Main Content Layout */}
      <main className="flex-1 pt-16">
        {currentView === 'uk-opportunity' ? (
          /* ========================================================
             DEDICATED UK RENEWABLE ENERGY OPPORTUNITY PLATFORM (PROMPT 4)
             ======================================================== */
          <UkOpportunityPage
            onOpenAssessment={handleOpenAssessment}
            onOpenFranchise={handleOpenFranchise}
          />
        ) : currentView === 'franchise' ? (
          /* ========================================================
             DEDICATED UNITE SOLAR FRANCHISE & PARTNER PLATFORM (PROMPT 5)
             ======================================================== */
          <FranchisePage
            onOpenAssessment={handleOpenAssessment}
            onOpenBookingModal={handleOpenBooking}
          />
        ) : (
          /* ========================================================
             INTERACTIVE RENEWABLE ENERGY PLATFORM HOMEPAGE (PROMPT 3 & BASE)
             ======================================================== */
          <>
            {/* Stage 1: Full-Screen Hero Experience */}
            <Hero
              onExploreSolar={handleExploreSolar}
              onBuildWithUs={handleBuildWithUs}
              onOpenAssessment={() => handleOpenAssessment('commercial')}
            />

            {/* Quick Portal Switcher Banner */}
            <div className="bg-[#0A1E3A] border-y border-line py-4 px-4">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7AAA2B] animate-ping" />
                  <div>
                    <span className="text-xs font-bold text-white uppercase font-display block">
                      UK RENEWABLE ENERGY OPPORTUNITY & PROJECT DEVELOPMENT
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Explore land leasing, grid capacity, utility solar parks, wind corridors, and co-development.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigateView('uk-opportunity')}
                  className="px-4 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#689423] text-[#06152F] font-bold text-xs cursor-pointer shrink-0 shadow-md flex items-center gap-1.5"
                >
                  <span>LAUNCH UK OPPORTUNITY PORTAL</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Section 1: 6-Step Interactive Solar Assessment Tool (Section 1-6 of Prompt 3) */}
            <SolarAssessmentTool
              onOpenEnquiryModal={(data) => handleOpenAssessment('solar-assessment-lead', data)}
            />

            {/* Section 12: Interactive Synchronized Energy Flow Simulator */}
            <EnergyFlowInteractive />

            {/* Section 8 & 9 & 10: Our Energy Platform (6 Interactive Cards) */}
            <PlatformSolutions
              onSelectSolution={(solution: EnergySolution) => {}}
              onOpenAssessment={(solutionId: string) => handleOpenAssessment(solutionId)}
            />

            {/* Section 10: Battery Storage Assessment Tool */}
            <BessAssessmentTool
              onOpenAssessment={(data) => handleOpenAssessment('bess-assessment-lead', data)}
            />

            {/* Section 11: Wind + Solar Hybrid Project Explorer */}
            <HybridProjectExplorer
              onOpenAssessment={(data) => handleOpenAssessment('hybrid-assessment-lead', data)}
            />

            {/* Zero / Low Upfront Capital Highlight Experience (Section 9) */}
            <ZeroCapexHighlight
              onCheckEligibility={() => handleOpenAssessment('zero-capex-eligibility')}
            />

            {/* Section 11: Why Unite Solar (4 Pillars) */}
            <WhyUnite
              onOpenAssessment={() => handleOpenAssessment('why-unite')}
            />

            {/* Section 7 & 8: Smart Business Models (CAPEX, PPA, RESCO, BOOT, BOO, Project Leasing) */}
            <BusinessModels
              onOpenAssessment={(modelCode: string) => handleOpenAssessment(modelCode, { model: modelCode })}
            />

            {/* Interactive Solar & Clean Energy Quick Estimator */}
            <SolarCalculator
              onOpenAssessmentWithData={(calcData: any) => handleOpenAssessment('calculator', calcData)}
            />

            {/* Section 14: UK Renewable Energy Opportunity Map */}
            <UkOpportunityMap
              onExploreProject={(regionName?: string) => {
                handleNavigateView('uk-opportunity');
              }}
            />

            {/* Section 15: Global Technology OEM Ecosystem + 7-Step Project Journey */}
            <TechnologyAndJourney
              onOpenAssessment={() => handleOpenAssessment('journey-stage-1')}
            />

            {/* Section 16 & 21: Partnership & Franchise Opportunities (£20,000* | 25% Profit Share*) */}
            <FranchiseSection
              onOpenFranchiseModal={(territory?: string) => handleOpenFranchise(territory)}
              onOpenAssessment={(type: string) => handleOpenAssessment(type)}
            />

            {/* Section 14: Final Conversion Section & CTA (4 Explicit Conversion Paths) */}
            <FinalCta
              onCalculateSolar={handleExploreSolar}
              onRequestAssessment={() => handleOpenAssessment('final-cta')}
              onBecomePartner={() => handleOpenAssessment('partner-inquiry')}
              onExploreFranchise={() => handleOpenFranchise()}
            />
          </>
        )}
      </main>

      {/* Corporate Multi-Tier Footer */}
      <Footer />

      {/* Section 12 & 13 & 21: 5-Step Project Enquiry & Franchise Form */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        initialType={modalInitialType}
        initialData={modalInitialData}
      />

      {/* Section 20: Direct Discussion & Booking Modal */}
      <DiscussionBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialData={bookingInitialData}
      />

    </div>
  );
}
