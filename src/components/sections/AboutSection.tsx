import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Smartphone, Server, Zap } from 'lucide-react';
import { SectionBackground } from '../3d/SectionBackground';
import { Card3D } from '../3d/Card3D';

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
    <section ref={sectionRef} id="about" className="relative py-24 bg-secondary/20 overflow-hidden">
      <SectionBackground variant="about" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 z-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate full-stack developer with 2+ years building innovative solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* 3D photo card */}
            <Card3D className="w-fit mx-auto" intensity={12}>
              <div className="relative rounded-3xl p-[3px] bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/40">
                <img
                  src="/hero.png"
                  alt="Besufikad Kasahun"
                  className="w-64 h-64 object-cover rounded-3xl bg-background"
                  style={{ transform: 'translateZ(20px)' }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Code className="h-7 w-7 text-white" />
                </motion.div>
              </div>
            </Card3D>

            {/* Bio */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold">Building the Future</h3>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in creating scalable web applications, mobile solutions,
                and innovative digital experiences. My passion lies in solving complex
                problems with elegant, efficient code.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {['5+ Years Experience', '50+ Projects', 'Available for hire'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border cursor-default ${
                      i === 2
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/25 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-semibold text-sm">{skill.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.progress}%` } : {}}
                      transition={{ duration: 1.4, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                      className="h-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-400 relative"
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md shadow-purple-500/50" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
