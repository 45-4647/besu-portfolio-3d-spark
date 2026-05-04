import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 0,
    title: "Village Reporting System",
    category: "Full Stack",
    description: "Platform allowing users to report local infrastructure problems with real-time tracking and admin dashboard.",
    technologies: ["React", "Django", "Supabase", "Redis", "WebSocket"],
    github: "https://github.com/45-4647",
    live: "https://village-reporting-system.vercel.app/",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
  },
  {
    id: 1,
    title: "Court Management System",
    category: "Full Stack",
    description: "Digital platform modernizing court operations with live broadcasting, case tracking, SMS notifications, and secure role-based access.",
    technologies: ["React", "Node.js", "MongoDB", "mediasoup", "WebSocket"],
    github: "https://github.com/45-4647",
    live: "https://amhcourt-website.vercel.app/",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Seller & Buyer Platform",
    category: "Full Stack",
    description: "Modern online marketplace connecting buyers and sellers directly with real-time communication and listing management.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/45-4647/broker-front",
    live: "https://broker-fullstack.vercel.app/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Full-featured e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/45-4647/full-stack-ecommerce-website",
    live: "https://full-stack-ecommerce-website-43j2.vercel.app/",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Brain Wave Website",
    category: "Web",
    description: "Responsive mobile-first web application with smooth animations and modern UI design patterns.",
    technologies: ["React", "D3.js", "PostgreSQL"],
    github: "https://github.com/45-4647/BrainWave-wabsite",
    live: "https://brain-wave-wabsite.vercel.app/",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "3D Portfolio Experience",
    category: "3D / WebGL",
    description: "Interactive 3D portfolio built with Three.js and React Three Fiber for an immersive user experience.",
    technologies: ["React", "Three.js", "WebGL", "GSAP"],
    github: "https://github.com/45-4647/besu-portfolio-3d-spark",
    live: "https://besufikad-portfolio.vercel.app/",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "Fitness Website",
    category: "Web",
    description: "Fitness platform showing exercise guides, muscle targeting, and workout routines with visual demonstrations.",
    technologies: ["React", "Express", "MongoDB"],
    github: "https://github.com/45-4647/chat_app",
    live: "https://besu-fitnnes.netlify.app/",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
  },
  {
    id: 7,
    title: "iPhone 3D Showcase",
    category: "3D / WebGL",
    description: "Immersive iPhone promotion website with 3D model rendering and smooth scroll-driven animations.",
    technologies: ["React", "Three.js", "GSAP"],
    github: "https://github.com/45-4647/3d-apple-iphone",
    live: "https://3d-apple-iphone.vercel.app/",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=500&fit=crop",
  },
  {
    id: 8,
    title: "Movie Website",
    category: "Full Stack",
    description: "Modern movie platform with search, detailed info pages, and ticket booking powered by a live movie API.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/45-4647/movie_website",
    live: "https://modern-movie-six.vercel.app/",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
  },
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) setIsVisible(true);
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Track which card is centred via scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isScrolling.current) return;
      const cardW = el.firstElementChild?.clientWidth ?? 320;
      const gap = 24;
      const step = cardW + gap;
      const idx = Math.round(el.scrollLeft / step);
      setCurrent(Math.max(0, Math.min(projects.length - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const startAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % projects.length;
        scrollToCard(next);
        return next;
      });
    }, 2000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToCard = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.firstElementChild?.clientWidth ?? 320;
    const gap = 24;
    const step = cardW + gap;
    isScrolling.current = true;
    el.scrollTo({ left: idx * step, behavior: 'smooth' });
    setTimeout(() => { isScrolling.current = false; }, 600);
  };

  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(projects.length - 1, i));
    setCurrent(idx);
    scrollToCard(idx);
    startAuto();
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 px-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm text-white/70 mb-4">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A selection of my most impactful work across various industries and technologies.
          </p>
        </motion.div>

        {/* ── Scroll-snap slider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/*
            scroll-snap-type: x mandatory  → browser snaps each card to centre
            scroll-padding-inline: 50%     → snap point is the viewport centre
            Each card has scroll-snap-align: center
            Links work perfectly because we never intercept pointer events.
          */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPaddingInline: '50%',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Left spacer so first card can snap to centre */}
            <div className="shrink-0" style={{ width: 'calc(50vw - 160px)' }} />

            {projects.map((project, index) => {
              const isActive = index === current;
              const dist = Math.abs(index - current);

              return (
                <div
                  key={project.id}
                  style={{
                    scrollSnapAlign: 'center',
                    width: 320,
                    minWidth: 320,
                    flexShrink: 0,
                    transform: `scale(${isActive ? 1 : dist === 1 ? 0.92 : 0.84})`,
                    opacity: isActive ? 1 : dist === 1 ? 0.6 : 0.35,
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                  }}
                >
                  <div className={`rounded-2xl overflow-hidden border bg-[#111] h-full ${
                    isActive
                      ? 'border-purple-500/40 shadow-2xl shadow-purple-500/20'
                      : 'border-white/5'
                  }`}>
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 190 }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-purple-500/90 text-white text-xs font-semibold">
                        {project.category}
                      </span>

                      {/* Icon links — always on top, always clickable */}
                      <div className="absolute top-3 right-3 flex gap-2 z-20">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600 transition-colors"
                          title="View Code"
                        >
                          <Github className="h-3.5 w-3.5 text-white" />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-white" />
                        </a>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-white font-bold text-sm mb-1.5 truncate">{project.title}</h3>
                      <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map(t => (
                          <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/55">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Text links */}
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 text-white/60 hover:border-purple-400 hover:text-purple-400 text-xs font-semibold transition-all"
                        >
                          <Github className="h-3.5 w-3.5" /> Code
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-semibold transition-all"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Right spacer */}
            <div className="shrink-0" style={{ width: 'calc(50vw - 160px)' }} />
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-4 px-6">
          <button
            onClick={() => goTo(current - 1 < 0 ? projects.length - 1 : current - 1)}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2 bg-purple-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo((current + 1) % projects.length)}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-white/25 text-xs mt-2">
          {current + 1} / {projects.length} &nbsp;·&nbsp; scroll or swipe to browse
        </p>

        {/* Active project detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 max-w-xl mx-auto text-center px-6"
          >
            <h3 className="text-base font-bold text-white mb-1">{projects[current].title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{projects[current].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
