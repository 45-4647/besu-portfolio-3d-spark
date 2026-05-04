import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Smartphone, Server, Zap } from 'lucide-react';

const skills = [
  { name: 'Frontend Development', icon: Globe, progress: 95 },
  { name: 'Backend Development', icon: Server, progress: 90 },
  { name: 'Database Design', icon: Database, progress: 85 },
  { name: 'Mobile Development', icon: Smartphone, progress: 80 },
  { name: 'DevOps & Cloud', icon: Zap, progress: 75 },
  { name: 'System Architecture', icon: Code, progress: 88 },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'MongoDB', 'PostgreSQL', 'Three.js', 'Tailwind',
  'Docker', 'WebSocket', 'GraphQL', 'Redis',
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) setIsVisible(true);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          videoRef.current?.play().catch(() => {});
        }
      },
      { threshold: 0 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 bg-gray-50 dark:bg-[#0d0d0d] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: video + badge */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl shadow-purple-500/10 bg-gray-100 dark:bg-[#111]">
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                autoPlay muted loop playsInline
                poster="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop"
              >
                <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop" alt="Developer working" className="w-full aspect-video object-cover" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 50+ badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -left-6 z-20"
            >
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="50" fill="none" stroke="url(#badgeGrad)" strokeWidth="3" strokeDasharray="8 6" />
                  <defs>
                    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="w-20 h-20 rounded-full bg-white dark:bg-[#0d0d0d] border-2 border-purple-500/60 flex flex-col items-center justify-center shadow-xl shadow-purple-500/30">
                  <span className="text-2xl font-black text-gray-900 dark:text-white leading-none">50+</span>
                  <span className="text-[9px] text-gray-500 dark:text-white/60 text-center leading-tight mt-0.5">Completed<br />Projects</span>
                </div>
              </div>
            </motion.div>

            {/* Years badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 backdrop-blur-sm"
            >
              <span className="text-purple-600 dark:text-purple-300 text-sm font-semibold">2+ Years</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: text + skills */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
                About Me
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Crafting Experiences<br />
                Since <span className="text-purple-500 dark:text-purple-400">2022</span>
              </h2>
              <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-3">
                I'm a passionate Full Stack Developer who's deeply committed to bringing ideas to life through thoughtful, user-centered design. Every project I take on is built with care, creativity, and a clear understanding of what the client truly needs.
              </p>
              <p className="text-gray-500 dark:text-white/50 leading-relaxed text-sm">
                What truly drives me is the satisfaction of solving problems and making a real impact. I believe in clear communication, long-term value, and building strong relationships.
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/10 font-medium hover:bg-purple-50 dark:hover:bg-purple-500/15 hover:border-purple-300 dark:hover:border-purple-500/30 hover:text-purple-600 dark:hover:text-purple-300 transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Skill bars */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3">Technical Skills</h4>
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                        <span className="text-gray-700 dark:text-white/70 text-xs font-medium">{skill.name}</span>
                      </div>
                      <span className="text-purple-500 dark:text-purple-400 text-xs font-bold">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${skill.progress}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.6 + index * 0.08, ease: 'easeOut' }}
                        className="h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-400"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
