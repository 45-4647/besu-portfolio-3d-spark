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
    <section ref={sectionRef} id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate full-stack developer with 5+ years of experience building
            innovative solutions and leading technical teams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — photo + bio + tech stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Photo */}
            <div className="relative w-fit mx-auto">
              <div className="rounded-3xl p-[3px] bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30">
                <img
                  src="/hero.png"
                  alt="Besufikad Kasahun"
                  className="w-64 h-64 object-cover rounded-3xl bg-background"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Code className="h-7 w-7 text-white" />
              </motion.div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold">Building the Future</h3>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in creating scalable web applications, mobile solutions,
                and innovative digital experiences. My passion lies in solving complex
                problems with elegant, efficient code.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  5+ Years Experience
                </span>
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                  50+ Projects
                </span>
                <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 font-medium border border-green-500/20">
                  Available for hire
                </span>
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
                    className="px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors cursor-default"
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
            className="space-y-5"
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
                  className="glass p-4 rounded-xl hover:glass-strong transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
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
                      transition={{ duration: 1.2, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                      className="h-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-500"
                    />
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
