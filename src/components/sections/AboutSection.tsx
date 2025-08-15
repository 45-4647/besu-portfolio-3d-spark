import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Code, Database, Globe, Smartphone, Server, Zap } from 'lucide-react';

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills = [
    { name: 'Frontend Development', icon: Globe, progress: 95, color: '#8B5CF6' },
    { name: 'Backend Development', icon: Server, progress: 90, color: '#A855F7' },
    { name: 'Database Design', icon: Database, progress: 85, color: '#C084FC' },
    { name: 'Mobile Development', icon: Smartphone, progress: 80, color: '#DDD6FE' },
    { name: 'DevOps & Cloud', icon: Zap, progress: 75, color: '#8B5CF6' },
    { name: 'System Architecture', icon: Code, progress: 88, color: '#A855F7' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate full-stack developer with 5+ years of experience creating
            innovative solutions and leading technical teams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-3xl bg-gradient-primary p-1">
                <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
                  <div className="w-56 h-56 rounded-2xl bg-gradient-secondary flex items-center justify-center text-6xl font-bold text-primary">
                    BK
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center"
              >
                <Code className="h-8 w-8 text-primary-foreground" />
              </motion.div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Building the Future</h3>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in creating scalable web applications, mobile solutions,
                and innovative digital experiences. My passion lies in solving complex
                problems with elegant, efficient code.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                  5+ Years Experience
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                  50+ Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="skill-card glass p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {skill.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.progress}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      className="h-2 rounded-full bg-gradient-primary"
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