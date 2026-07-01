import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown, Download, Mail, Code2, Layers, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scene3D } from '../3d/Scene3D';

const roles = ['Full Stack Developer', 'Tech Innovator', 'UI/UX Enthusiast', '3D Web Creator'];
const stats = [
  { label: 'Projects', value: '50+', icon: Layers },
  { label: 'Experience', value: '2yr', icon: Cpu },
  { label: 'Technologies', value: '20+', icon: Code2 },
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const orbX = useTransform(springX, [-1, 1], [-40, 40]);
  const orbY = useTransform(springY, [-1, 1], [-40, 40]);
  const imgX = useTransform(springX, [-1, 1], [-12, 12]);
  const imgY = useTransform(springY, [-1, 1], [-12, 12]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        t = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIndex]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-visible bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <Scene3D />

      {/* Parallax orbs */}
      <motion.div style={{ x: orbX, y: orbY }} className="pointer-events-none absolute inset-0 z-0 overflow-visible">
        <div className="orb w-[600px] h-[600px] bg-violet-600/25 -top-32 -left-32" />
        <div className="orb w-[500px] h-[500px] bg-purple-500/20 -bottom-24 -right-24" />
        <div className="orb w-[300px] h-[300px] bg-pink-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/85 dark:from-black/85 via-transparent to-gray-50/85 dark:to-black/85 z-10" />

      <div className="relative z-20 container mx-auto px-6 pt-24 pb-28 overflow-visible">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 overflow-visible">

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
              Besufikad<br />
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

            <p className="text-lg md:text-xl text-gray-600 dark:text-muted-foreground mb-8 leading-relaxed">
             Full Stack Developer specializing in MERN & Mobile apps with 2+ years experience building scalable systems. Passionate about crafting seamless user experiences and innovative solutions. Let's build something amazing together!
            </p>

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
                  <a href="https://drive.google.com/file/d/1bBLY0aq57q33Qg19CRaSIn2hCFpo79-k/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm cursor-default"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-xl font-bold text-primary">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — 3D parallax image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            style={{ x: imgX, y: imgY }}
            className="relative flex justify-center items-center overflow-visible"
          >
            {/* Orbit rings */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute w-[390px] h-[390px] md:w-[470px] md:h-[470px] rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />

            {/* Orbiting dots */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] animate-spin" style={{ animationDuration: '8s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-lg shadow-violet-400/60" />
            </div>
            <div className="absolute w-[390px] h-[390px] md:w-[470px] md:h-[470px] animate-spin" style={{ animationDuration: '13s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/60" />
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl animate-glow-pulse" />

            {/* Image */}
            <div className="relative rounded-full p-[4px] bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/50 overflow-visible">
              <motion.img
                src="/hero.JPG"
                alt="Besufikad Kasahun"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full bg-background"
                style={{ objectPosition: 'center 10%' }}
              />
            </div>

            {/* Floating skill badges */}
            {[
              { label: 'React', x: '-110%', y: '20%', delay: 1.2 },
              { label: 'Node.js', x: '110%', y: '20%', delay: 1.4 },
              { label: 'Three.js', x: '-90%', y: '75%', delay: 1.6 },
              { label: 'MongoDB', x: '90%', y: '75%', delay: 1.8 },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: badge.delay, type: 'spring' }}
                whileHover={{ scale: 1.15 }}
                className="absolute px-3 py-1.5 rounded-full bg-white/90 dark:bg-background/80 border border-primary/30 backdrop-blur-md text-xs font-semibold text-primary shadow-lg cursor-default"
                style={{ left: badge.x, top: badge.y }}
              >
                {badge.label}
              </motion.div>
            ))}
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
          className="flex flex-col items-center text-gray-500 dark:text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
