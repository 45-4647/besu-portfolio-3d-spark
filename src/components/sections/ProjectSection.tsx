import { motion } from "framer-motion";
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

const CARD_W = 320;
const GAP = 20;
const STEP = CARD_W + GAP;

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Measure the slider viewport width so centering is pixel-perfect
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => setContainerW(el.getBoundingClientRect().width);
    measure(); // immediate read

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isVisible]); // re-measure once the element becomes visible

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

  const startAuto = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      setCurrent(c => (c + 1) % projects.length);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => {
    setCurrent(Math.max(0, Math.min(projects.length - 1, i)));
    startAuto();
  };
  const prev = () => goTo(current - 1 < 0 ? projects.length - 1 : current - 1);
  const next = () => goTo((current + 1) % projects.length);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
    trackRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - dragStartX.current) > 8) isDragging.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setTimeout(() => { isDragging.current = false; }, 0);
  };

  // Pixel-perfect centering using measured container width
  // card[current] centre = containerW/2
  // translateX = containerW/2 - CARD_W/2 - current*STEP
  const translateX = containerW > 0
    ? containerW / 2 - CARD_W / 2 - current * STEP
    : 0;

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 px-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Featured <span className="text-purple-500 dark:text-purple-400">Projects</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-2xl mx-auto">
            A selection of my most impactful work across various industries and technologies.
          </p>
        </motion.div>

        {/* ── Slider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* viewport — always rendered so ResizeObserver can measure it */}
          <div
            ref={viewportRef}
            className="relative overflow-hidden"
            style={{ height: 420 }}
          >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex items-center select-none"
            style={{
              gap: GAP,
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              cursor: 'grab',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {projects.map((project, index) => {
              const isActive = index === current;
              const dist = Math.abs(index - current);
              return (
                <div
                  key={project.id}
                  onClick={() => { if (!isDragging.current) goTo(index); }}
                  style={{
                    width: CARD_W,
                    flexShrink: 0,
                    transform: `scale(${isActive ? 1 : dist === 1 ? 0.9 : 0.82})`,
                    opacity: isActive ? 1 : dist === 1 ? 0.6 : 0.35,
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                  }}
                  className="group"
                >
                  <div className={`rounded-2xl overflow-hidden border bg-white dark:bg-[#111] transition-all duration-300 ${
                    isActive
                      ? 'border-gray-300 dark:border-white/25 shadow-2xl shadow-purple-500/20'
                      : 'border-gray-100 dark:border-white/5 cursor-pointer'
                  }`}>
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: 200 }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category badge */}
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-purple-500/80 text-white text-xs font-semibold">
                        {project.category}
                      </span>

                      {/* Action buttons — active card only */}
                      {isActive && (
                        <div className="absolute top-3 right-3 flex gap-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                          >
                            <Github className="h-3.5 w-3.5 text-white" />
                          </a>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-white" />
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1.5 truncate">{project.title}</h3>
                      <p className="text-gray-500 dark:text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map(t => (
                          <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/55">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 px-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2 bg-purple-500' : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-gray-400 dark:text-white/25 text-xs mt-2">
          {current + 1} / {projects.length} &nbsp;·&nbsp; drag or swipe to browse
        </p>
      </div>
    </section>
  );
}
