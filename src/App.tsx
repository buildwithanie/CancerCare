import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CollaborationSection } from '@/components/sections/CollaborationSection';
import { DirectorySection } from '@/components/sections/DirectorySection';
import { FocusSection } from '@/components/sections/FocusSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { MissionSection } from '@/components/sections/MissionSection';
import { PilotSection } from '@/components/sections/PilotSection';
import { useLanguage } from '@/hooks/useLanguage';

function App() {
  const { language, setLanguage, text } = useLanguage();

  return (
    <div className="overflow-hidden bg-sand text-ink">
      <SiteHeader language={language} onLanguageChange={setLanguage} text={text} />
      <main id="main">
        <HeroSection hero={text.hero} />
        <FocusSection work={text.work} />
        <MissionSection mission={text.mission} />
        <PilotSection pilot={text.pilot} />
        <DirectorySection directory={text.directory} language={language} />
        <CollaborationSection participation={text.participation} />
      </main>
      <SiteFooter language={language} text={text} />
    </div>
  );
}

export default App;
