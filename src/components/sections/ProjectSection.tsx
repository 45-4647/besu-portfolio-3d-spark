import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const gradients = [
  "from-violet-600 to-purple-600",
  "from-blue-600 to-cyan-500",
  "from-pink-600 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-amber-500",
  "from-indigo-600 to-blue-500",
  "from-fuchsia-600 to-pink-500",
  "from-purple-600 to-indigo-600",
];

const projects = [
  {
    id: 1,
    title: "Court Management System",
    description:
      "Digital platform modernizing court operations with live broadcasting, case tracking, SMS notifications, and secure role-based access.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "mediasoup", "WebSocket"],
    github: "https://github.com/45-4647",
    live: "https://amhcourt-website.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Seller & Buyer Platform",
    description:
      "Modern online marketplace connecting buyers and sellers directly with real-time communication and listing management.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/45-4647/broker-front",
    live: "https://broker-fullstack.vercel.app/",
    featured: true,
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/45-4647/full-stack-ecommerce-website",
    live: "https://full-stack-ecommerce-website-43j2.vercel.app/",
    featured: true,
  },
  {
    id: 4,
    title: "Brain Wave Website",
    description:
      "Responsive mobile-first web application with smooth animations and modern UI design patterns.",
    category: "web",
    technologies: ["React", "D3.js", "PostgreSQL"],
    github: "https://github.com/45-4647/BrainWave-wabsite",
    live: "https://brain-wave-wabsite.vercel.app/",
    featured: false,
  },
  {
    id: 5,
    title: "3D Portfolio Experience",
    description:
      "Interactive 3D portfolio built with Three.js and React Three Fiber for an immersive user experience.",
    category: "3d",
    technologies: ["React", "Three.js", "WebGL", "GSAP"],
    github: "https://github.com/45-4647/besu-portfolio-3d-spark",
    live: "https://besufikad-portfolio.vercel.app/",
    featured: true,
  },
  {
    id: 6,
    title: "Fitness Website",
    description:
      "Fitness platform showing exercise guides, muscle targeting, and workout routines with visual demonstrations.",
    category: "web",
    technologies: ["React", "Express", "MongoDB"],
    github: "https://github.com/45-4647/chat_app",
    live: "https://besu-fitnnes.netlify.app/",
    featured: false,
  },
  {
    id: 7,
    title: "iPhone 3D Showcase",
    description:
      "Immersive iPhone promotion website with 3D model rendering and smooth scroll-driven animations.",
    category: "3d",
    technologies: ["React", "Three.js", "GSAP"],
    github: "https://github.com/45-4647/3d-apple-iphone",
    live: "https://3d-apple-iphone.vercel.app/",
    featured: false,
  },
  {
    id: 8,
    title: "Movie Website",
    description:
      "Modern movie platform with search, detailed info pages, and ticket booking powered by a live movie API.",
    category: "fullstack",
    technologies: ["React", "Next.js", "MongoDB", "Stripe"],
    github: "https://github.com/45-4647/movie_website",
    live: "https://modern-movie-six.vercel.app/",
    featured: true,
  },
];

// 3D tilt card component
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const gradient = gradients[index % gradients.length];
  const initials = project.title.split(' ').slice(0, 3).map(w => w[0]).join('');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative group cursor-pointer"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-card/60 backdrop-blur-md shadow-xl transition-shadow duration-300 group-hover:shadow-2xl group-hover:border-white/20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic glow follow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            background: glowX.get() !== undefined
              ? `radial-gradient(circle at ${glowX}% ${glowY}%, hsl(250 84% 54% / 0.15), transparent 60%)`
              : undefined,
          }}
        />

        {/* Banner */}
        <div className={`relative w-full h-52 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          {/* Animated bg shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full border-2 border-white/40 animate-float-slow" />
            <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border border-white/30 animate-float-fast" />
            <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-white/20 animate-float-slow" style={{ animationDelay: '1s' }} />
          </div>

          {/* Initials */}
          <span className="text-6xl font-black text-white/20 select-none z-10 drop-shadow-2xl">
            {initials}
          </span>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              Featured
            </div>
          )}

          {/* Hover action buttons */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <Github className="h-4 w-4" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Shine sweep */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium border border-primary/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="flex-1 border-border/50 hover:border-primary hover:bg-primary/5 text-xs" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" /> Code
              </a>
            </Button>
            <Button size="sm" className={`flex-1 bg-gradient-to-r ${gradient} text-white text-xs hover:opacity-90 shadow-md`} asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filters = ["all", "web", "fullstack", "3d"];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
    <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-violet-500/10 top-0 right-0 pointer-events-none" />
      <div className="orb w-80 h-80 bg-blue-500/10 bottom-0 left-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="h-3.5 w-3.5" /> My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
