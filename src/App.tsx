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
import { PilotSection } from '@/components/sections/PilotSection';
import { ScreeningGuideSection } from '@/components/sections/ScreeningGuideSection';
import { useLanguage } from '@/hooks/useLanguage';

function App() {
  const currentPage = /^\/learn(?:\/|$)/.test(window.location.pathname)
    ? 'learn'
    : /^\/find-care(?:\/|$)/.test(window.location.pathname) ? 'find-care'
      : /^\/how-it-works(?:\/|$)/.test(window.location.pathname) ? 'how-it-works'
        : /^\/get-involved(?:\/|$)/.test(window.location.pathname) ? 'get-involved' : 'home';
  const { language, setLanguage, text } = useLanguage(currentPage);

  return (
    <div className="overflow-hidden bg-sand text-ink">
      <SiteHeader language={language} onLanguageChange={setLanguage} text={text} currentPage={currentPage} />
      <main id="main">
        {currentPage === 'learn' ? <>
          <LearnPageIntro content={text.learnPage} language={language} />
          <LearnSection learn={text.learn} />
          <ScreeningGuideSection screening={text.screening} />
        </> : currentPage === 'find-care' ? <>
          <FindCarePage content={text.findCarePage} directory={text.directory} pilot={text.pilot} language={language} />
        </> : currentPage === 'how-it-works' ? <>
          <HowItWorksPage content={text.howPage} pilot={text.pilot} />
        </> : currentPage === 'get-involved' ? <>
          <GetInvolvedPage content={text.getInvolvedPage} />
        </> : <>
          <HeroSection hero={text.hero} />
          <FocusSection work={text.work} />
          <MissionSection mission={text.mission} />
          <PilotSection pilot={text.pilot} />
          <CollaborationSection participation={text.participation} />
        </>}
      </main>
      <SiteFooter language={language} text={text} currentPage={currentPage} />
    </div>
  );
}

export default App;
