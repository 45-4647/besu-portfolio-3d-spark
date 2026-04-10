import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Amhara Regional Supreme Court",
    location: "Bahir Dar, Ethiopia",
    period: "2023 – Present",
    description:
      "Built and maintained the ARSCMS platform — a digital court management system with live broadcasting, case tracking, SMS notifications, and role-based access control.",
    tech: ["React", "Node.js", "MongoDB", "WebSocket", "mediasoup"],
    color: "from-violet-600 to-purple-600",
    glow: "shadow-violet-500/30",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Freelance",
    location: "Remote",
    period: "2021 – Present",
    description:
      "Delivered 50+ projects including e-commerce platforms, marketplaces, 3D web experiences, and SaaS dashboards for clients across multiple industries.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    color: "from-blue-600 to-cyan-500",
    glow: "shadow-blue-500/30",
  },
  {
    type: "education",
    title: "BSc in Computer Science",
    company: "University — Ethiopia",
    location: "Ethiopia",
    period: "2019 – 2023",
    description:
      "Studied software engineering, algorithms, databases, and system architecture. Graduated with distinction.",
    tech: ["Algorithms", "Data Structures", "OS", "Networking"],
    color: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/30",
  },
];

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-purple-500/10 top-0 left-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-cyan-500/10 bottom-0 right-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Briefcase className="h-3.5 w-3.5" /> My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building real-world products and growing as a developer
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={isVisible ? { height: '100%' } : {}}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              className="w-full bg-gradient-to-b from-violet-500 via-blue-500 to-emerald-500"
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
                className="relative md:pl-20"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Timeline dot */}
                <motion.div
                  animate={activeIndex === index ? { scale: 1.3 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`hidden md:flex absolute left-0 top-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.color} items-center justify-center shadow-lg ${exp.glow} z-10`}
                >
                  {exp.type === "work" ? (
                    <Briefcase className="h-6 w-6 text-white" />
                  ) : (
                    <GraduationCap className="h-6 w-6 text-white" />
                  )}
                </motion.div>

                {/* Card */}
                <motion.div
                  animate={activeIndex === index
                    ? { y: -4, boxShadow: '0 20px 40px -10px rgba(139,92,246,0.3)' }
                    : { y: 0, boxShadow: '0 4px 12px -2px rgba(0,0,0,0.1)' }
                  }
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-md p-6 overflow-hidden"
                >
                  {/* Gradient accent top bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.color} rounded-t-2xl`} />

                  {/* Hover glow */}
                  <motion.div
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-5 rounded-2xl pointer-events-none`}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className={`font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.1 }}
                        className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${exp.color} text-white font-semibold shadow-sm cursor-default`}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
