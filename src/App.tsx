import { useEffect } from 'react';
import { ChatWidget } from '@/components/ChatWidget';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CollaborationSection } from '@/components/sections/CollaborationSection';
import { FindCarePage } from '@/components/sections/FindCarePage';
import { FocusSection } from '@/components/sections/FocusSection';
import { GetInvolvedPage } from '@/components/sections/GetInvolvedPage';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksPage } from '@/components/sections/HowItWorksPage';
import { LearnSection } from '@/components/sections/LearnSection';
import { LearnPageIntro } from '@/components/sections/LearnPageIntro';
import { MissionSection } from '@/components/sections/MissionSection';
import { CaregiversPage } from '@/components/sections/CaregiversPage';
import { caregiverCopy } from '@/content-caregivers';
import { AboutPage } from '@/components/sections/AboutPage';
import { AwarenessSection } from '@/components/sections/AwarenessSection';
import { MythsSection } from '@/components/sections/MythsSection';
import { NotFoundPage } from '@/components/sections/NotFoundPage';
import { PartnersMarquee } from '@/components/sections/PartnersMarquee';
import { PrivacyPage } from '@/components/sections/PrivacyPage';
import { ResourcesPage } from '@/components/sections/ResourcesPage';
import { PilotSection } from '@/components/sections/PilotSection';
import { ScreeningGuideSection } from '@/components/sections/ScreeningGuideSection';
import { VisitPlannerSection } from '@/components/sections/VisitPlannerSection';
import { useLanguage } from '@/hooks/useLanguage';
import { pageFromPath } from '@/lib/pages';
import { isCalm } from '@/lib/reading';
import { pagesCopy } from '@/content-pages';

const currentPage = pageFromPath(window.location.pathname);

// Gently fades sections in as they scroll into view.
function useSectionReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || isCalm()) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section')).slice(1);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (const section of sections) {
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add('reveal');
        observer.observe(section);
      }
    }
    return () => observer.disconnect();
  }, []);
}

// The browser tries to jump to #section before React has drawn the page, so jump again once it exists.
function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const jump = () => document.getElementById(id)?.scrollIntoView({ block: 'start' });
    const frame = window.requestAnimationFrame(jump);
    const settle = window.setTimeout(jump, 400); // after fonts and images settle
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(settle); };
  }, []);
}

function App() {
  const { language, setLanguage, text } = useLanguage(currentPage);
  const pages = pagesCopy[language];
  useSectionReveal();
  useInitialHashScroll();

  return (
    <div className="overflow-hidden bg-sand text-ink">
      <SiteHeader language={language} onLanguageChange={setLanguage} text={text} currentPage={currentPage} />
      <main id="main">
        {currentPage === 'learn' ? <>
          <LearnPageIntro content={text.learnPage} language={language} />
          <LearnSection learn={text.learn} language={language} />
          <ScreeningGuideSection screening={text.screening} />
          <VisitPlannerSection key={language} planner={text.visitPlanner} />
          <MythsSection myths={text.myths} />
        </> : currentPage === 'find-care' ? <>
          <FindCarePage content={text.findCarePage} directory={text.directory} pilot={text.pilot} language={language} />
        </> : currentPage === 'how-it-works' ? <>
          <HowItWorksPage content={text.howPage} pilot={text.pilot} />
          <PartnersMarquee content={text.partners} />
        </> : currentPage === 'get-involved' ? <>
          <GetInvolvedPage content={text.getInvolvedPage} />
        </> : currentPage === 'about' ? <>
          <AboutPage content={pages.about} language={language} />
          <PartnersMarquee content={text.partners} />
        </> : currentPage === 'resources' ? <>
          <ResourcesPage content={pages.resources} language={language} speech={pages.speech} />
        </> : currentPage === 'privacy' ? <>
          <PrivacyPage content={pages.privacy} />
        </> : currentPage === 'caregivers' ? <>
          <CaregiversPage content={caregiverCopy[language]} language={language} speech={pages.speech} />
        </> : currentPage === 'not-found' ? <>
          <NotFoundPage content={text.notFound} />
        </> : <>
          <HeroSection hero={text.hero} />
          <FocusSection work={text.work} />
          <MissionSection mission={text.mission} />
          <MythsSection myths={text.myths} />
          <AwarenessSection content={text.awareness} />
          <PilotSection pilot={text.pilot} />
          <CollaborationSection participation={text.participation} />
          <PartnersMarquee content={text.partners} />
        </>}
      </main>
      <SiteFooter language={language} text={text} currentPage={currentPage} />
      <ChatWidget language={language} content={text.assistant} />
    </div>
  );
}

export default App;
