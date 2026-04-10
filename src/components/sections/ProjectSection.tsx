import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBackground } from "../3d/SectionBackground";
import { Card3D } from "../3d/Card3D";

const filters = ["all", "web", "mobile", "fullstack", "3d"];

const projects = [
  {
    id: 1,
    title: "Court Management System",
    description: "Digital platform modernizing court operations with live broadcasting, case tracking, SMS notifications, and secure role-based access.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "mediasoup", "WebSocket"],
    github: "https://github.com/45-4647",
    live: "https://amhcourt-website.vercel.app/",
    featured: true,
    gradient: "from-violet-600 to-purple-600",
  },
  {
    id: 2,
    title: "Seller & Buyer Platform",
    description: "Modern online marketplace connecting buyers and sellers directly with real-time communication and listing management.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/45-4647/broker-front",
    live: "https://broker-fullstack.vercel.app/",
    featured: true,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
    category: "fullstack",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/45-4647/full-stack-ecommerce-website",
    live: "https://full-stack-ecommerce-website-43j2.vercel.app/",
    featured: true,
    gradient: "from-pink-600 to-rose-500",
  },
  {
    id: 4,
    title: "Brain Wave Website",
    description: "Responsive mobile-first web application with smooth animations and modern UI design patterns.",
    category: "web",
    technologies: ["React", "D3.js", "PostgreSQL"],
    github: "https://github.com/45-4647/BrainWave-wabsite",
    live: "https://brain-wave-wabsite.vercel.app/",
    featured: false,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    title: "3D Portfolio Experience",
    description: "Interactive 3D portfolio built with Three.js and React Three Fiber for an immersive user experience.",
    category: "3d",
    technologies: ["React", "Three.js", "WebGL", "GSAP"],
    github: "https://github.com/45-4647/besu-portfolio-3d-spark",
    live: "https://besufikad-portfolio.vercel.app/",
    featured: true,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: 6,
    title: "Fitness Website",
    description: "Fitness platform showing exercise guides, muscle targeting, and workout routines with visual demonstrations.",
    category: "web",
    technologies: ["React", "Express", "MongoDB"],
    github: "https://github.com/45-4647/chat_app",
    live: "https://besu-fitnnes.netlify.app/",
    featured: false,
    gradient: "from-indigo-600 to-blue-500",
  },
  {
    id: 7,
    title: "iPhone 3D Showcase",
    description: "Immersive iPhone promotion website with 3D model rendering and smooth scroll-driven animations.",
    category: "3d",
    technologies: ["React", "Three.js", "GSAP"],
    github: "https://github.com/45-4647/3d-apple-iphone",
    live: "https://3d-apple-iphone.vercel.app/",
    featured: false,
    gradient: "from-fuchsia-600 to-pink-500",
  },
  {
    id: 8,
    title: "Movie Website",
    description: "Modern movie platform with search, detailed info pages, and ticket booking powered by a live movie API.",
    category: "fullstack",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/45-4647/movie_website",
    live: "https://modern-movie-six.vercel.app/",
    featured: true,
    gradient: "from-purple-600 to-indigo-600",
  },
];

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = activeFilter === "all"
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
    <section ref={sectionRef} id="projects" className="relative py-24 overflow-hidden">
      <SectionBackground variant="projects" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70 z-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`capitalize px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                  : "glass border-primary/20 text-foreground/70 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
            >
              <Card3D intensity={10} className="h-full">
                <div className="relative h-full rounded-3xl overflow-hidden border border-primary/10 bg-background/60 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col">

                  {/* Banner */}
                  <div className={`relative w-full h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                    {/* Animated mesh */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full border border-white/30"
                          style={{
                            width: `${80 + i * 40}px`,
                            height: `${80 + i * 40}px`,
                            left: '50%',
                            top: '50%',
                            x: '-50%',
                            y: '-50%',
                          }}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </div>

                    {/* Initials */}
                    <span className="text-6xl font-black text-white/20 select-none z-10">
                      {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
                    </span>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                        <Zap className="h-3 w-3 text-yellow-300" />
                        Featured
                      </div>
                    )}

                    {/* Hover action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                        <Github className="h-4 w-4 text-white" />
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-primary/15 text-primary font-medium border border-primary/20">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-4 w-4" /> Code
                        </a>
                      </Button>
                      <Button size="sm" className={`flex-1 bg-gradient-to-r ${project.gradient} text-white border-0 shadow-md`} asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
