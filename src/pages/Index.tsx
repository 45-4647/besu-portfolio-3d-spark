import { Navigation } from '@/components/Navigation';
import { ScrollSection } from '@/components/ScrollSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
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
        {/* Hero — no scroll animation, loads immediately */}
        <HeroSection />

        {/* Every section below fades up smoothly as it enters the viewport */}
        <ScrollSection><AboutSection /></ScrollSection>
        <ScrollSection><ServicesSection /></ScrollSection>
        <ScrollSection><ProjectsSection /></ScrollSection>
        <ScrollSection><ProcessSection /></ScrollSection>
        <ScrollSection><PricingSection /></ScrollSection>
        <ScrollSection><TestimonialsSection /></ScrollSection>
        <ScrollSection><ArticlesSection /></ScrollSection>
        <ScrollSection><CTASection /></ScrollSection>
        <ScrollSection><ContactSection /></ScrollSection>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
