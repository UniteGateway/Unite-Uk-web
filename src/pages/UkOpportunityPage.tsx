import React, { useState, useEffect } from 'react';
import { UkOpportunityHero } from '../components/UkOpportunity/UkOpportunityHero';
import { InteractiveUkMap } from '../components/UkOpportunity/InteractiveUkMap';
import { ProjectOpportunityCards } from '../components/UkOpportunity/ProjectOpportunityCards';
import { ProjectSubmissionMultiRole } from '../components/UkOpportunity/ProjectSubmissionMultiRole';
import { ProjectSizeVisualSelector } from '../components/UkOpportunity/ProjectSizeVisualSelector';
import { GridConnectionSection } from '../components/UkOpportunity/GridConnectionSection';
import { ProjectPipelineInteractive } from '../components/UkOpportunity/ProjectPipelineInteractive';
import { SolarDevelopmentSection } from '../components/UkOpportunity/SolarDevelopmentSection';
import { WindDevelopmentSection } from '../components/UkOpportunity/WindDevelopmentSection';
import { BessDevelopmentSection } from '../components/UkOpportunity/BessDevelopmentSection';
import { HybridInteractiveSection } from '../components/UkOpportunity/HybridInteractiveSection';
import { CorporatePpaSection } from '../components/UkOpportunity/CorporatePpaSection';
import { ProjectPortfolioDatabase } from '../components/UkOpportunity/ProjectPortfolioDatabase';
import { ProjectDetailModal } from '../components/UkOpportunity/ProjectDetailModal';
import { StrategicPartnershipSection } from '../components/UkOpportunity/StrategicPartnershipSection';
import { WhyUniteSolarOpportunity } from '../components/UkOpportunity/WhyUniteSolarOpportunity';
import { UkOpportunityFaq } from '../components/UkOpportunity/UkOpportunityFaq';
import { OpportunityConversionBar } from '../components/UkOpportunity/OpportunityConversionBar';
import { ProjectPortfolioItem, UkOpportunityRegionData } from '../types';

interface UkOpportunityPageProps {
  onOpenAssessment: (type?: string, data?: any) => void;
  onOpenFranchise: (territory?: string) => void;
}

export const UkOpportunityPage: React.FC<UkOpportunityPageProps> = ({
  onOpenAssessment,
  onOpenFranchise
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectPortfolioItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [submissionRole, setSubmissionRole] = useState<'LANDOWNER' | 'INVESTOR' | 'BUSINESS' | 'DEVELOPER'>('LANDOWNER');
  const [submissionRegion, setSubmissionRegion] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectDetail = (project: ProjectPortfolioItem) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleInquireFromDetail = (project: ProjectPortfolioItem) => {
    onOpenAssessment('project-inquiry', {
      projectCode: project.code,
      projectName: project.name,
      technology: project.technology,
      capacity: project.capacity,
      region: project.region
    });
  };

  const handleSelectRegionFromMap = (region: UkOpportunityRegionData) => {
    setSubmissionRegion(region.name);
    scrollToSection('submit-project');
  };

  const handleSelectRolePathway = (role: 'LANDOWNER' | 'INVESTOR' | 'BUSINESS' | 'DEVELOPER', region?: string) => {
    setSubmissionRole(role);
    if (region) setSubmissionRegion(region);
    scrollToSection('submit-project');
  };

  return (
    <div id="uk-opportunity-portal" className="bg-[#06152F] text-slate-100 min-h-screen">
      
      {/* 1. Hero Section (Section 2, 3, 4 of Prompt 4) */}
      <UkOpportunityHero
        onExploreMap={() => scrollToSection('uk-interactive-map')}
        onSubmitProject={() => scrollToSection('submit-project')}
        onStructurePpa={() => scrollToSection('corporate-ppa')}
      />

      {/* 2. Interactive SVG UK Opportunity Map (Section 3 of Prompt 4) */}
      <InteractiveUkMap
        onSelectRegion={handleSelectRegionFromMap}
        onSubmitProjectForRegion={(regionName) => handleSelectRolePathway('LANDOWNER', regionName)}
      />

      {/* 3. Explore Project Opportunities Cards (Section 5 of Prompt 4) */}
      <ProjectOpportunityCards
        onSelectCategory={(cat) => {
          if (cat === 'corporate-energy') {
            scrollToSection('corporate-ppa');
          } else {
            scrollToSection('submit-project');
          }
        }}
      />

      {/* 4. Project Development Intake Forms for Landowner, Investor, Business, Developer (Sections 6-9) */}
      <ProjectSubmissionMultiRole
        initialRole={submissionRole}
        initialRegion={submissionRegion}
      />

      {/* 5. Project Size Visual Selector (Section 10 of Prompt 4) */}
      <ProjectSizeVisualSelector
        onSelectSize={(scaleId) => {}}
      />

      {/* 6. Grid Connection Architecture (Section 11 of Prompt 4) */}
      <GridConnectionSection />

      {/* 7. Interactive 10-Stage Pipeline (Section 12 of Prompt 4) */}
      <ProjectPipelineInteractive />

      {/* 8. Solar Project Development (Section 13 of Prompt 4) */}
      <SolarDevelopmentSection
        onDevelopSolar={() => handleSelectRolePathway('LANDOWNER')}
      />

      {/* 9. Wind Energy Development (Section 14 of Prompt 4) */}
      <WindDevelopmentSection
        onDevelopWind={() => handleSelectRolePathway('DEVELOPER')}
      />

      {/* 10. Battery Storage Projects (Section 15 of Prompt 4) */}
      <BessDevelopmentSection
        onExploreBess={() => handleSelectRolePathway('BUSINESS')}
      />

      {/* 11. Solar + Wind + BESS Hybrid Interactive System (Section 16 of Prompt 4) */}
      <HybridInteractiveSection
        onRequestHybridDiscussion={() => handleSelectRolePathway('DEVELOPER')}
      />

      {/* 12. Corporate PPA / RESCO / BOOT Section (Section 17 of Prompt 4) */}
      <div id="corporate-ppa">
        <CorporatePpaSection
          onRequestPpa={() => handleSelectRolePathway('BUSINESS')}
        />
      </div>

      {/* 13. Project Portfolio Database (Section 18 of Prompt 4) */}
      <ProjectPortfolioDatabase
        onOpenProjectDetail={handleOpenProjectDetail}
        onSubmitNewProject={() => scrollToSection('submit-project')}
      />

      {/* 14. Strategic Partnerships & Corporate Trust (Sections 20 & 21 of Prompt 4) */}
      <StrategicPartnershipSection
        onSelectRole={(role) => handleSelectRolePathway(role)}
      />

      {/* 15. Why Unite Solar for Project Development (Section 22 of Prompt 4) */}
      <WhyUniteSolarOpportunity />

      {/* 16. Technical & Commercial FAQ (Section 23 of Prompt 4) */}
      <UkOpportunityFaq />

      {/* 17. Conversion Action Bar (Section 24 of Prompt 4) */}
      <OpportunityConversionBar
        onSelectRole={(role) => handleSelectRolePathway(role)}
        onOpenAssessment={() => onOpenAssessment('uk-opportunity-quick')}
      />

      {/* Project Detail Modal (Section 19 of Prompt 4) */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onInquire={handleInquireFromDetail}
      />

    </div>
  );
};
