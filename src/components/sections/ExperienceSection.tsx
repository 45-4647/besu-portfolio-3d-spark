import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Amhara Regional Supreme Court",
    period: "2023 – Present",
    description: "Built and maintained the ARSCMS platform — a digital court management system with live broadcasting, case tracking, SMS notifications, and role-based access control.",
    tech: ["React", "Node.js", "MongoDB", "WebSocket", "mediasoup"],
    gradient: "from-violet-600 to-purple-600",
    color: "bg-violet-500",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Freelance",
    period: "2021 – Present",
    description: "Delivered 50+ projects including e-commerce platforms, marketplaces, 3D web experiences, and SaaS dashboards for clients across multiple industries.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    gradient: "from-blue-600 to-cyan-500",
    color: "bg-blue-500",
  },
  {
    type: "education",
    title: "BSc in Information Technology",
    company: "University — Bahirdar, Ethiopia",
    period: "2019 – 2023",
    description: "Studied software engineering, algorithms, databases, and system architecture. Graduated with distinction.",
    tech: ["Algorithms", "Data Structures", "OS", "Networking"],
    gradient: "from-pink-600 to-rose-500",
    color: "bg-pink-500",
  },
];

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 bg-white dark:bg-[#0d0d0d] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & <span className="text-purple-500 dark:text-purple-400">Education</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 text-xl max-w-3xl mx-auto">
            My journey building real-world products and growing as a developer
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4 mb-8">
          {experiences.map((exp, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                active === i
                  ? `bg-gradient-to-br ${exp.gradient} text-white border-transparent shadow-lg`
                  : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {exp.type === 'work'
                  ? <Briefcase className="h-4 w-4" />
                  : <GraduationCap className="h-4 w-4" />}
                <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  {exp.type}
                </span>
              </div>
              <div className={`font-bold text-sm ${active === i ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {exp.title}
              </div>
              <div className={`text-xs mt-0.5 ${active === i ? 'text-white/70' : 'text-gray-500 dark:text-white/50'}`}>
                {exp.company}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white dark:bg-[#111] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${experiences[active].gradient}`} />

              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {experiences[active].title}
                    </h3>
                    <p className={`font-semibold bg-gradient-to-r ${experiences[active].gradient} bg-clip-text text-transparent`}>
                      {experiences[active].company}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/60 bg-gray-100 dark:bg-white/5 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10">
                    <Calendar className="h-3.5 w-3.5" />
                    {experiences[active].period}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-6 text-base">
                  {experiences[active].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {experiences[active].tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1 text-sm rounded-full bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-500/20"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? 'w-8 h-3 bg-purple-500'
                  : 'w-3 h-3 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
