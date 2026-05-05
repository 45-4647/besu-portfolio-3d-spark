import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 0,
    title: "Village Reporting System",
    category: "Full Stack",
    description: "Platform allowing users to report local infrastructure problems with real-time tracking and admin dashboard.",
    technologies: ["React", "Django", "Supabase", "Redis"],
    github: "https://github.com/45-4647",
    live: "https://village-reporting-system.vercel.app/",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
  },
  {
    id: 1,
    title: "Court Management System",
    category: "Full Stack",
    description: "Digital platform modernizing court operations with live broadcasting, case tracking, SMS notifications, and secure role-based access.",
    technologies: ["React", "Node.js", "MongoDB", "WebSocket"],
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
    technologies: ["React", "Next.js", "Node.js", "Stripe"],
    github: "https://github.com/45-4647/movie_website",
    live: "https://modern-movie-six.vercel.app/",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
  },
];

// Show 3 cards at a time, middle one is active
const VISIBLE = 3;

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setCurrent(((i % projects.length) + projects.length) % projects.length);
    startAuto();
  };

  // Build the 3 visible indices: [prev, current, next]
  const indices = [-1, 0, 1].map(offset =>
    ((current + offset) % projects.length + projects.length) % projects.length
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Featured <span className="text-purple-500 dark:text-purple-400">Projects</span>
          </h2>
          <p className="text-gray-500 dark:text-white/50 text-lg max-w-2xl mx-auto">
            A selection of my most impactful work across various industries and technologies.
          </p>
        </motion.div>

        {/* 3-card slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Prev arrow */}
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-[#111] shadow-md flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:border-purple-400 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-white dark:bg-[#111] shadow-md flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:border-purple-400 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards grid — always 3 visible */}
          <div className="grid grid-cols-3 gap-5 px-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {indices.map((projIdx, pos) => {
                const project = projects[projIdx];
                const isCenter = pos === 1;
                return (
                  <motion.div
                    key={`${projIdx}-${current}`}
                    initial={{ opacity: 0, x: pos === 0 ? -40 : pos === 2 ? 40 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`rounded-2xl overflow-hidden border bg-white dark:bg-[#111] transition-all duration-300 ${
                      isCenter
                        ? 'border-purple-400 dark:border-purple-500/50 shadow-2xl shadow-purple-500/15 scale-100'
                        : 'border-gray-100 dark:border-white/5 opacity-70 scale-95'
                    }`}
                  >
                    {/* Screenshot image */}
                    <div className="relative overflow-hidden" style={{ height: 180 }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {/* Category tag — bottom left like reference */}
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-medium border border-white/20">
                        {project.category}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-gray-900 dark:text-white font-bold text-base mb-1.5">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 dark:text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map(t => (
                          <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/55">
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* View Project button — matches reference */}
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-all group"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-purple-500'
                  : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* View All button */}
        <div className="flex justify-center mt-8">
          <a
            href="https://github.com/45-4647"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/70 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-all"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
