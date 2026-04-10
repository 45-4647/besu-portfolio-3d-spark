import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Download, Mail, Code2, Layers, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scene3D } from '../3d/Scene3D';

const roles = ['Full Stack Developer', 'Tech Innovator', 'UI/UX Enthusiast', '3D Web Creator'];

const stats = [
  { label: 'Projects', value: '50+', icon: Layers },
  { label: 'Experience', value: '5yr', icon: Cpu },
  { label: 'Technologies', value: '20+', icon: Code2 },
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const orbX = useTransform(springX, [-1, 1], [-30, 30]);
  const orbY = useTransform(springY, [-1, 1], [-30, 30]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Animated orbs */}
      <motion.div style={{ x: orbX, y: orbY }} className="pointer-events-none absolute inset-0 z-0">
        <div className="orb w-[500px] h-[500px] bg-purple-600/20 top-[-100px] left-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-blue-500/15 bottom-[-80px] right-[-80px]" />
        <div className="orb w-[300px] h-[300px] bg-pink-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background/90 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 pt-20">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Welcome to my digital space 👋
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight hero-text">
              Besufikad
              <br />
              <span className="text-gradient-secondary">Kasahun</span>
            </h1>

            <div className="text-xl md:text-2xl font-semibold mb-6 h-9 flex items-center gap-1 justify-center lg:justify-start">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {displayed}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                className="text-primary"
              >|</motion.span>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Crafting modern, scalable, and visually engaging digital experiences
              that make an impact.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  onClick={() => scrollTo('contact')}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/30 w-full sm:w-auto"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/40 hover:border-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm w-full sm:w-auto"
                  asChild
                >
                  <a href="https://drive.google.com/file/d/17_BvRJ30b1Wvk8zQi95i3zk8JnPIWl5y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-xl font-bold text-primary">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — image with orbiting rings */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative flex justify-center items-center"
          >
            {/* Outer orbit ring */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-[380px] h-[380px] md:w-[460px] md:h-[460px] rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

            {/* Orbiting dot */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] animate-spin" style={{ animationDuration: '8s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
            </div>
            <div className="absolute w-[380px] h-[380px] md:w-[460px] md:h-[460px] animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50" />
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />

            {/* Image */}
            <div className="relative rounded-full p-[4px] bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/40">
              <motion.img
                src="/hero.png"
                alt="Besufikad Kasahun"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full bg-background"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
