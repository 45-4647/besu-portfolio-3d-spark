import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { SectionBackground } from "../3d/SectionBackground";
import { Card3D } from "../3d/Card3D";

const experiences = [
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Amhara Regional Supreme Court",
    period: "2023 – Present",
    description: "Built and maintained the ARSCMS platform — a digital court management system with live broadcasting, case tracking, SMS notifications, and role-based access control.",
    tech: ["React", "Node.js", "MongoDB", "WebSocket", "mediasoup"],
    gradient: "from-violet-600 to-purple-600",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Freelance",
    period: "2021 – Present",
    description: "Delivered 50+ projects including e-commerce platforms, marketplaces, 3D web experiences, and SaaS dashboards for clients across multiple industries.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    type: "education",
    title: "BSc in Information technology",
    company: "University — Bahirdar-Ethiopia",
    period: "2019 – 2023",
    description: "Studied software engineering, algorithms, databases, and system architecture. Graduated with distinction.",
    tech: ["Algorithms", "Data Structures", "OS", "Networking"],
    gradient: "from-pink-600 to-rose-500",
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
    <section ref={sectionRef} id="experience" className="relative py-24 bg-secondary/20 overflow-hidden">
      <SectionBackground variant="experience" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 z-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey building real-world products and growing as a developer
          </p>
        </motion.div>

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
                  : 'glass border-primary/20 hover:border-primary/40'
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
              <div className="font-bold text-sm">{exp.title}</div>
              <div className={`text-xs mt-0.5 ${active === i ? 'text-white/70' : 'text-muted-foreground'}`}>
                {exp.company}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card3D intensity={6}>
              <div className="glass rounded-3xl border border-primary/20 overflow-hidden">
                {/* Header bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${experiences[active].gradient}`} />
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{experiences[active].title}</h3>
                      <p className={`font-semibold bg-gradient-to-r ${experiences[active].gradient} bg-clip-text text-transparent`}>
                        {experiences[active].company}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                      <Calendar className="h-3.5 w-3.5" />
                      {experiences[active].period}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                    {experiences[active].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {experiences[active].tech.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1 text-sm rounded-full bg-primary/15 text-primary font-semibold border border-primary/20"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Timeline dots */}
        <div className="flex justify-center gap-3 mt-8">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-primary/30 hover:bg-primary/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
