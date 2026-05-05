import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Monitor, ShoppingCart, Smartphone, Zap, Globe, Code2 } from 'lucide-react';

// Each "shot" simulates a camera cut — different angle, content, label
const shots = [
  {
    id: 0,
    label: 'Responsive Design',
    sublabel: 'Looks perfect on every screen',
    icon: Smartphone,
    color: 'from-violet-600 to-purple-700',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=900&h=500&fit=crop',
    tag: 'Mobile First',
  },
  {
    id: 1,
    label: 'E-Commerce Stores',
    sublabel: 'Sell products & services online',
    icon: ShoppingCart,
    color: 'from-blue-600 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&h=500&fit=crop',
    tag: 'E-Commerce',
  },
  {
    id: 2,
    label: 'Smooth Animations',
    sublabel: 'Scroll-driven & interactive UI',
    icon: Zap,
    color: 'from-pink-600 to-rose-600',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop',
    tag: '3D & Motion',
  },
  {
    id: 3,
    label: 'Full Stack Apps',
    sublabel: 'Backend, APIs & databases',
    icon: Code2,
    color: 'from-emerald-600 to-teal-600',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=500&fit=crop',
    tag: 'Full Stack',
  },
  {
    id: 4,
    label: 'Web Platforms',
    sublabel: 'Scalable SaaS & dashboards',
    icon: Globe,
    color: 'from-orange-500 to-amber-500',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop',
    tag: 'SaaS / Dashboard',
  },
  {
    id: 5,
    label: 'Portfolio & Blogs',
    sublabel: 'Personal brand & content sites',
    icon: Monitor,
    color: 'from-indigo-600 to-violet-600',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop',
    tag: 'Portfolio',
  },
];

// Camera transition variants — each shot gets a different "angle"
const cameraVariants = [
  { initial: { opacity: 0, scale: 1.08, x: 0 },   exit: { opacity: 0, scale: 0.94, x: 0 } },
  { initial: { opacity: 0, x: 60, scale: 1 },       exit: { opacity: 0, x: -60, scale: 1 } },
  { initial: { opacity: 0, x: -60, scale: 1 },      exit: { opacity: 0, x: 60, scale: 1 } },
  { initial: { opacity: 0, y: 40, scale: 1.04 },    exit: { opacity: 0, y: -40, scale: 1 } },
  { initial: { opacity: 0, scale: 1.12, x: 30 },    exit: { opacity: 0, scale: 0.9, x: -30 } },
  { initial: { opacity: 0, x: -40, y: 20 },         exit: { opacity: 0, x: 40, y: -20 } },
];

const SHOT_DURATION = 3200; // ms per shot

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [shotIdx, setShotIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Auto-advance shots
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setShotIdx(i => (i + 1) % shots.length);
      setProgress(0);
    }, SHOT_DURATION);

    // Progress bar
    const tick = 50;
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(100, p + (tick / SHOT_DURATION) * 100));
    }, tick);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const shot = shots[shotIdx];
  const ShotIcon = shot.icon;
  const camVar = cameraVariants[shotIdx % cameraVariants.length];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 bg-gray-100 dark:bg-black overflow-hidden transition-colors duration-300"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 dark:from-purple-900/25 via-transparent to-violet-100/40 dark:to-violet-900/15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 text-sm text-gray-600 dark:text-white/70">
              Start Your Website
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Launch Your Website or Online Business with{' '}
              <span className="text-purple-500 dark:text-purple-400">Confidence</span>
            </h2>

            <p className="text-gray-600 dark:text-white/60 text-lg leading-relaxed">
              Have an idea? Whether it's a portfolio, blog, or eCommerce store — I build responsive, performant websites that turn your vision into reality.
            </p>

            {/* What I build — animated list */}
            <div className="space-y-2.5">
              {shots.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === shotIdx;
                return (
                  <motion.button
                    key={s.id}
                    onClick={() => { setShotIdx(i); setProgress(0); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-50 dark:bg-white/10 border border-purple-200 dark:border-white/20'
                        : 'border border-transparent hover:bg-gray-200/60 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-white/60'}`}>
                        {s.label}
                      </div>
                      {isActive && (
                        <div className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{s.sublabel}</div>
                      )}
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <motion.a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 transition-all shadow-lg"
            >
              Launch Now <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* RIGHT — multi-shot showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main shot frame */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl shadow-purple-500/20 bg-gray-200 dark:bg-gray-800"
              style={{ aspectRatio: '16/10' }}>

              {/* Camera shots */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={shotIdx}
                  initial={{ ...camVar.initial, opacity: 0 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ ...camVar.exit, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <img
                    src={shot.image}
                    alt={shot.label}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${shot.color} opacity-30`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* HUD overlay — top left: shot label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${shotIdx}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-4 flex items-center gap-2"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${shot.color} flex items-center justify-center shadow-lg`}>
                    <ShotIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white text-sm font-bold leading-tight">{shot.label}</div>
                    <div className="text-gray-600 dark:text-white/60 text-xs">{shot.sublabel}</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top right: category tag */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`tag-${shotIdx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 dark:bg-black/50 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold"
                >
                  {shot.tag}
                </motion.span>
              </AnimatePresence>

              {/* Bottom: shot counter + progress bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                {/* Shot dots */}
                <div className="flex gap-1.5 mb-2">
                  {shots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setShotIdx(i); setProgress(0); }}
                      className="flex-1 h-0.5 rounded-full overflow-hidden bg-black/30 dark:bg-white/20"
                    >
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: i < shotIdx ? '100%' : i === shotIdx ? `${progress}%` : '0%' }}
                        transition={{ duration: 0.05 }}
                      />
                    </button>
                  ))}
                </div>

                {/* Bottom label */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`bottom-${shotIdx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/80 text-xs font-medium"
                  >
                    {shotIdx + 1} / {shots.length} &nbsp;·&nbsp; {shot.label}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white/80 dark:text-white/60 text-xs font-mono tracking-widest">REC</span>
              </div>
            </div>

            {/* Floating stat badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-xl"
            >
              <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">50+</div>
              <div className="text-xs text-gray-500 dark:text-white/50 mt-0.5">Projects Delivered</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 px-4 py-2.5 rounded-xl bg-purple-500 shadow-xl shadow-purple-500/30"
            >
              <div className="text-2xl font-black text-white leading-none">2+</div>
              <div className="text-xs text-white/80 mt-0.5">Years Experience</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
