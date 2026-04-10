import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Amhara Regional Supreme Court",
    period: "2023 – Present",
    description:
      "Built and maintained the ARSCMS platform — a digital court management system with live broadcasting, case tracking, SMS notifications, and role-based access control.",
    tech: ["React", "Node.js", "MongoDB", "WebSocket", "mediasoup"],
  },
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Freelance",
    period: "2021 – Present",
    description:
      "Delivered 50+ projects including e-commerce platforms, marketplaces, 3D web experiences, and SaaS dashboards for clients across multiple industries.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
  },
  {
    type: "education",
    title: "BSc in Computer Science",
    company: "University — Ethiopia",
    period: "2019 – 2023",
    description:
      "Studied software engineering, algorithms, databases, and system architecture. Graduated with distinction.",
    tech: ["Algorithms", "Data Structures", "OS", "Networking"],
  },
];

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if already in view on mount
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey building real-world products and growing as a developer
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-transparent hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                className="relative flex gap-6 md:pl-16"
              >
                {/* Icon dot */}
                <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary items-center justify-center shrink-0 z-10">
                  {exp.type === "work" ? (
                    <Briefcase className="h-5 w-5 text-primary" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  )}
                </div>

                <div className="glass rounded-2xl p-6 w-full hover:glass-strong transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
