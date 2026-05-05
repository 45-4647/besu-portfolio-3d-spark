import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Search, FileText, Palette, Code2, TestTube, Rocket, Check } from 'lucide-react';

const steps = [
  {
    id: 1, title: 'Discovery', icon: Search,
    description: 'Understanding your goals, target audience, and project requirements through in-depth consultation.',
    bullets: ['Business goal analysis', 'Competitor research', 'User persona definition', 'Scope & timeline planning'],
  },
  {
    id: 2, title: 'Planning', icon: FileText,
    description: 'Creating a detailed roadmap, wireframes, and technical architecture for your project.',
    bullets: ['Project roadmap creation', 'Wireframe sketching', 'Tech stack selection', 'Milestone definition'],
  },
  {
    id: 3, title: 'Design', icon: Palette,
    description: 'Crafting visually stunning and user-friendly interfaces that align with your brand.',
    bullets: ['Wireframing', 'UI/UX design', 'Prototype development', 'Client feedback integration', 'Design finalization'],
  },
  {
    id: 4, title: 'Development', icon: Code2,
    description: 'Building robust, scalable, and performant solutions using cutting-edge technologies.',
    bullets: ['Frontend development', 'Backend & API setup', 'Database architecture', 'Third-party integrations'],
  },
  {
    id: 5, title: 'Testing', icon: TestTube,
    description: 'Rigorous quality assurance to ensure flawless performance across all devices.',
    bullets: ['Cross-browser testing', 'Mobile responsiveness', 'Performance audits', 'Bug fixing & QA'],
  },
  {
    id: 6, title: 'Launch', icon: Rocket,
    description: 'Deploying your project and providing ongoing support for continued success.',
    bullets: ['Production deployment', 'Domain & SSL setup', 'Analytics integration', 'Post-launch support'],
  },
];

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) setIsVisible(true);
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = steps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 bg-white dark:bg-[#0d0d0d] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
            My Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How I <span className="text-purple-500 dark:text-purple-400">Work</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 text-lg max-w-2xl mx-auto">
            A structured approach to delivering exceptional results for your project.
          </p>
        </motion.div>

        {/* ── Step timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-start justify-between mb-10 max-w-4xl mx-auto px-2"
        >
          {/* Connector line */}
          <div className="absolute top-5 left-2 right-2 h-px bg-gray-200 dark:bg-white/10 z-0" />

          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <button onClick={() => setActiveStep(index)} className="focus:outline-none">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                      isActive
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white shadow-lg'
                        : isCompleted
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'bg-white dark:bg-transparent border-gray-300 dark:border-white/30 text-gray-400 dark:text-white/50 hover:border-gray-400 dark:hover:border-white/60'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </motion.div>
                </button>
                <span className={`text-xs font-medium transition-colors duration-300 hidden sm:block ${
                  isActive ? 'text-gray-900 dark:text-white'
                  : isCompleted ? 'text-purple-500 dark:text-purple-400'
                  : 'text-gray-400 dark:text-white/40'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ── Detail: left text + right card ── */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              {/* LEFT — step info + bullets */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                    <ActiveIcon className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-500 dark:text-purple-400 text-xs font-semibold uppercase tracking-widest">
                      Step &bull; {String(active.id).padStart(2, '0')}
                    </p>
                    <h3 className="text-gray-900 dark:text-white text-2xl font-bold">{active.title}</h3>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">
                  {active.description}
                </p>

                <ul className="space-y-2.5">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-gray-600 dark:text-white/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT — dark visual card */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/5 min-h-[260px] flex items-center justify-center">
                {/* Background glow blobs */}
                <div className="absolute w-32 h-32 bg-purple-600/20 rounded-full blur-3xl top-4 left-8 pointer-events-none" />
                <div className="absolute w-24 h-24 bg-violet-500/15 rounded-full blur-2xl bottom-4 right-8 pointer-events-none" />

                <div className="relative z-10 text-center px-8 py-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <ActiveIcon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2">{active.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                    {active.description}
                  </p>
                </div>

                {/* Step number watermark */}
                <span className="absolute bottom-4 right-5 text-6xl font-black text-white/5 select-none">
                  {String(active.id).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-2 mt-8 sm:hidden">
          {steps.map((_, i) => (
            <button key={i} onClick={() => setActiveStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeStep ? 'w-6 bg-purple-500' : 'w-2 bg-gray-300 dark:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
