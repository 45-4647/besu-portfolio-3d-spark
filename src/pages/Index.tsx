import { Navigation } from '@/components/Navigation';
import { ScrollSection } from '@/components/ScrollSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ArticlesSection } from '@/components/sections/ArticlesSection';
import { CTASection } from '@/components/sections/CTASection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { useState, useEffect } from 'react';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const isDark = saved === null ? true : saved === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900'}`}>
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        {/*
          ── STACK ZONE (Hero → About → Projects) ──
          These three sections use sticky card-stack: each one shrinks and
          fades as the next slides over it, creating a layered intro effect.
          The stack zone ends after Projects — everything below scrolls normally.
        */}
        <div className="relative">
          {/* Hero is the base card — no shrink needed, just sits at top */}
          <div className="sticky top-0 z-10">
            <HeroSection />
          </div>

          {/* About slides over Hero */}
          <ScrollSection stack>
            <AboutSection />
          </ScrollSection>

          {/* Projects slides over About */}
          <ScrollSection stack>
            <ProjectsSection />
          </ScrollSection>
        </div>

        {/*
          ── NORMAL SCROLL ZONE ──
          Sections below scroll naturally with a smooth fade-up-on-enter.
          No sticky, no stacking — clean and readable.
        */}
        <ScrollSection>
          <ProcessSection />
        </ScrollSection>

        <ScrollSection>
          <PricingSection />
        </ScrollSection>

        <ScrollSection>
          <TestimonialsSection />
        </ScrollSection>

        <ScrollSection>
          <ArticlesSection />
        </ScrollSection>

        <ScrollSection>
          <CTASection />
        </ScrollSection>

        <ScrollSection>
          <ContactSection />
        </ScrollSection>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
