import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filters = ["all", "web", "mobile", "fullstack", "3d"];

  const projects = [
    {
      id: 1,
      title: "The Amhara Regional Supreme Court Management System (ARSCMS)",
      description:
      " The Amhara Regional Supreme Court Management System (ARSCMS) is a digital platform developed to modernize court operations, improve case management efficiency, and enhance transparency within the judicial system. The system supports digital case tracking, hearing scheduling, live court broadcasting, SMS notifications, and secure role-based access.",
      category: "fullstack",
      image: "/api/placeholder/400/300",
      technologies: ["livestream","mediasoup","websocket","React", "Node.js", "MongoDB", "tailwund"],
      github: "https://github.com/45-4647",
      live: "https://amhcourt-website.vercel.app/",
      featured: true,
    },
    {
      id: 2,
      title: "seller and Buyer communication platform",
      description:
      " Broker is a modern online marketplace platform that connects buyers and sellers directly — without involving delivery or payment system",
      category: "fullstack",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Node.js", "MongoDB", "tailwund"],
      github: "https://github.com/45-4647/broker-front",
      live: "https://broker-fullstack.vercel.app/",
      featured: true,
    },
    
    {
      id: 3,
      title: "E-Commerce Platform",
      description:
        "Modern e-commerce solution with advanced features including real-time inventory, payment processing, and analytics dashboard.",
      category: "fullstack",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/45-4647/full-stack-ecommerce-website",
      live: "https://full-stack-ecommerce-website-43j2.vercel.app/",
      featured: true,
    },
     {
      id: 4,
      title: "Brain Wave Website",
      description:
        "😅😍 this project is responsive mobile based web application",
      category: "web",
      image: "/api/placeholder/400/300",
      technologies: ["React", "D3.js", "MongoDB", "PostgreSQL"],
      github: "https://github.com/45-4647/BrainWave-wabsite",
      live: "https://brain-wave-wabsite.vercel.app/",
      featured: false,
    },
    
    {
      id: 5,
      title: "3D Portfolio Experience",
      description:
        "Interactive 3D portfolio website built with Three.js and React Three Fiber for immersive user experience.",
      category: "3d",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Three.js", "WebGL", "GSAP"],
      github: "https://github.com/45-4647/besu-portfolio-3d-spark",
      live: "https://besufikad-portfolio.vercel.app/",
      featured: true,
    },
   
    {
      id: 6,
      title: "Fitness Website",
      description:
        "i build fitness website that provide how the exercise work and where the exercise should be work ",
      image: "/api/placeholder/400/300",
      technologies: ["React", "D3.js", "MongoDB", "Express", "Socket.io"],
      github: "https://github.com/45-4647/chat_app",
      live: "https://besu-fitnnes.netlify.app/",
      featured: false,
    },
     {
      id: 7,
      title: "iphone model Website",
      description:
        "Comprehensive iphone promotion website with real-time data visualization and reporting capabilities.",
      category: "web",
      image: "/api/placeholder/400/300",
      technologies: ["React", "D3.js", "MongoDB", "Express", "Socket.io"],
      github: "https://github.com/45-4647/3d-apple-iphone",
      live: "https://3d-apple-iphone.vercel.app/",
      featured: false,
    },
    
    {
      id: 8,
      title: "Movie Website",
      description:
        "modern movie website that provide the user to search the movie and get the information about the movie and also provide the user to buy the ticket for the movie",
      category: "fullstack",
      image: "/api/placeholder/400/300",
      technologies: ["React","next.js", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/45-4647/movie_website",
      live: "https://modern-movie-six.vercel.app/",
      featured: true,
    },
   
    
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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
    <section ref={sectionRef} id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`capitalize magnetic-button ${
                activeFilter === filter
                  ? "bg-gradient-primary text-primary-foreground"
                  : "glass hover:glass-strong"
              }`}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 justify-center"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className="flex justify-center"
            >
              <Card className="relative group overflow-hidden w-full h-full flex flex-col text-lg md:text-xl p-2 md:p-4 max-w-2xl md:max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border-2 border-transparent hover:border-gradient-to-r hover:from-primary hover:to-secondary shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 pointer-events-none z-0 rounded-3xl border-4 border-transparent group-hover:border-gradient-to-r group-hover:from-primary group-hover:to-secondary animate-border-glow" />
                <div className="relative z-10 overflow-hidden">
                  {/* Banner with floating icons */}
                  <div className="w-full h-72 md:h-[26rem] bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center relative rounded-2xl shadow-lg">
                    <div className="absolute top-6 left-8 animate-float-slow opacity-30 text-5xl md:text-6xl">
                      <Zap />
                    </div>
                    <div className="absolute bottom-6 right-8 animate-float-fast opacity-30 text-5xl md:text-6xl">
                      <Github />
                    </div>
                    <div className="text-7xl md:text-8xl font-extrabold text-primary-foreground opacity-30 drop-shadow-lg select-none">
                      {project.title
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  </div>
                  {/* Action Buttons Floating */}
                  <div className="absolute top-6 right-6 flex space-x-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 z-20">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-md hover:scale-110"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full shadow-md hover:scale-110"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-6 left-6 z-20">
                      <div className="flex items-center space-x-2 px-4 py-1 rounded-full bg-primary/30 backdrop-blur-md shadow text-primary-foreground font-semibold text-base animate-pulse">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="relative z-10 p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-gradient-secondary drop-shadow">
                    {project.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold shadow"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-auto">
                    <Button size="lg" variant="outline" asChild className="flex-1 font-bold border-2 border-primary/40 hover:border-primary">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold shadow-lg hover:from-secondary hover:to-primary"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
