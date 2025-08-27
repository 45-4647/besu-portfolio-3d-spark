// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { ExternalLink, Github, Zap } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// export function ProjectsSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const sectionRef = useRef<HTMLElement>(null);

//   const filters = ["all", "web", "mobile", "fullstack", "3d"];

//   const projects = [
//     {
//       id: 1,
//       title: "E-Commerce Platform",
//       description:
//         "Modern e-commerce solution with advanced features including real-time inventory, payment processing, and analytics dashboard.",
//       category: "fullstack",
//       image: "/api/placeholder/400/300",
//       technologies: ["React", "Node.js", "MongoDB", "Stripe"],
//       github: "https://github.com/45-4647/full-stack-ecommerce-website",
//       live: "https://full-stack-ecommerce-frontend-seven.vercel.app/",
//       featured: true,
//     },
//     {
//       id: 2,
//       title: "3D Portfolio Experience",
//       description:
//         "Interactive 3D portfolio website built with Three.js and React Three Fiber for immersive user experience.",
//       category: "3d",
//       image: "/api/placeholder/400/300",
//       technologies: ["React", "Three.js", "WebGL", "GSAP"],
//       github: "https://github.com/45-4647/besu-portfolio-3d-spark",
//       live: "https://besufikad-portfolio.vercel.app/",
//       featured: true,
//     },
//     {
//       id: 3,
//       title: "Netours Website",
//       description:
//         "Secure mobile banking application with biometric authentication and real-time transaction processing.",
//       category: "mobile",
//       image: "/api/placeholder/400/300",
//       technologies: ["React", "Firebase", "Node.js"],
//       github: "https://github.com/45-4647/netours",
//       live: "https://netours-website.vercel.app/",
//       featured: false,
//     },
//     {
//       id: 4,
//       title: "Brain Wave Website",
//       description:
//         "Comprehensive analytics dashboard with real-time data visualization and reporting capabilities.",
//       category: "web",
//       image: "/api/placeholder/400/300",
//       technologies: ["React", "D3.js", "MongoDB", "PostgreSQL"],
//       github: "https://github.com/45-4647/BrainWave-wabsite",
//       live: "https://brain-wave-wabsite.vercel.app/",
//       featured: false,
//     },
//     {
//       id: 5,
//       title: "Fitness Website",
//       description:
//         "Comprehensive fitness website with real-time data visualization and reporting capabilities.",
//       category: "web",
//       image: "/api/placeholder/400/300",
//       technologies: ["React", "D3.js", "MongoDB", "Express", "Socket.io"],
//       github: "https://github.com/45-4647/chat_app",
//       live: "https://besu-fitnnes.netlify.app/",
//       featured: false,
//     },
//     {
//       id: 6,
//       title: "iphone model Website",
//       description:
//         "Comprehensive iphone promotion website with real-time data visualization and reporting capabilities.",
//       category: "web",
//       image: "/api/placeholder/400/300",
//       technologies: ["React", "D3.js", "MongoDB", "Express", "Socket.io"],
//       github: "https://github.com/45-4647/3d-apple-iphone",
//       live: "https://3d-apple-iphone.vercel.app/",
//       featured: false,
//     },
//     {
//       id: 7,
//       title: "modern movie Website",
//       description:
//         "Comprehensive modern movie website with real-time data visualization and reporting capabilities.",
//       category: "web",
//       image: "/api/placeholder/400/300",
//       technologies: ["nextjs", "D3.js", "MongoDB","nextauth"],
//       github: "https://github.com/45-4647/moder_portfolio",
//       live: "https://modern-movie-site.vercel.app/",
//       featured: false,
//     },
    
//   ];

//   const filteredProjects =
//     activeFilter === "all"
//       ? projects
//       : projects.filter((project) => project.category === activeFilter);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.2 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} id="projects" className="py-20">
//       <div className="container mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
//             Featured Projects
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             A showcase of innovative solutions and creative implementations
//           </p>
//         </motion.div>

//         {/* Filter Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="flex flex-wrap justify-center gap-4 mb-12"
//         >
//           {filters.map((filter) => (
//             <Button
//               key={filter}
//               variant={activeFilter === filter ? "default" : "outline"}
//               onClick={() => setActiveFilter(filter)}
//               className={`capitalize magnetic-button ${
//                 activeFilter === filter
//                   ? "bg-gradient-primary text-primary-foreground"
//                   : "glass hover:glass-strong"
//               }`}
//             >
//               {filter}
//             </Button>
//           ))}
//         </motion.div>

//         {/* Projects Grid */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={isVisible ? { opacity: 1 } : {}}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {filteredProjects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 50 }}
//               animate={isVisible ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
//               className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
//             >
//               <Card className="glass hover:glass-strong group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow">
//                 <div className="relative overflow-hidden">
//                   <div
//                     className={`${
//                       project.featured ? "h-64" : "h-48"
//                     } bg-gradient-secondary flex items-center justify-center`}
//                   >
//                     <div className="text-6xl font-bold text-primary opacity-20">
//                       {project.title
//                         .split(" ")
//                         .map((word) => word[0])
//                         .join("")}
//                     </div>
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <Button
//                       size="icon"
//                       variant="secondary"
//                       className="rounded-full"
//                       asChild
//                     >
//                       <a href={project.github} target="_blank" rel="noopener noreferrer">
//                         <Github className="h-4 w-4" />
//                       </a>
//                     </Button>
//                     <Button
//                       size="icon"
//                       variant="secondary"
//                       className="rounded-full"
//                       asChild
//                     >
//                       <a href={project.live} target="_blank" rel="noopener noreferrer">
//                         <ExternalLink className="h-4 w-4" />
//                       </a>
//                     </Button>
//                   </div>
//                   {project.featured && (
//                     <div className="absolute top-4 left-4">
//                       <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
//                         <Zap className="h-4 w-4 text-primary" />
//                         <span className="text-sm font-medium text-primary">
//                           Featured
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <CardContent className="p-6">
//                   <h3 className="text-xl font-bold mb-3 text-gradient-secondary">
//                     {project.title}
//                   </h3>
//                   <p className="text-muted-foreground mb-4 leading-relaxed">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {project.technologies.map((tech) => (
//                       <span
//                         key={tech}
//                         className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex space-x-3">
//                     <Button size="sm" variant="outline" asChild className="flex-1">
//                       <a href={project.github} target="_blank" rel="noopener noreferrer">
//                         <Github className="mr-2 h-4 w-4" />
//                         Code
//                       </a>
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="flex-1 bg-gradient-primary text-primary-foreground"
//                       asChild
//                     >
//                       <a href={project.live} target="_blank" rel="noopener noreferrer">
//                         <ExternalLink className="mr-2 h-4 w-4" />
//                         Live Demo
//                       </a>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }


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
      title: "E-Commerce Platform",
      description:
        "Modern e-commerce solution with advanced features including real-time inventory, payment processing, and analytics dashboard.",
      category: "fullstack",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/45-4647/full-stack-ecommerce-website",
      live: "https://full-stack-ecommerce-frontend-seven.vercel.app/",
      featured: true,
    },
    {
      id: 2,
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
      id: 3,
      title: "Netours Website",
      description:
        "Secure mobile banking application with biometric authentication and real-time transaction processing.",
      category: "mobile",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Firebase", "Node.js"],
      github: "https://github.com/45-4647/netours",
      live: "https://netours-website.vercel.app/",
      featured: false,
    },
    {
      id: 4,
      title: "Brain Wave Website",
      description:
        "Comprehensive analytics dashboard with real-time data visualization and reporting capabilities.",
      category: "web",
      image: "/api/placeholder/400/300",
      technologies: ["React", "D3.js", "MongoDB", "PostgreSQL"],
      github: "https://github.com/45-4647/BrainWave-wabsite",
      live: "https://brain-wave-wabsite.vercel.app/",
      featured: false,
    },
    {
      id: 5,
      title: "Fitness Website",
      description:
        "Comprehensive fitness website with real-time data visualization and reporting capabilities.",
      category: "web",
      image: "/api/placeholder/400/300",
      technologies: ["React", "D3.js", "MongoDB", "Express", "Socket.io"],
      github: "https://github.com/45-4647/chat_app",
      live: "https://besu-fitnnes.netlify.app/",
      featured: false,
    },
    {
      id: 6,
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
      id: 7,
      title: "modern movie Website",
      description:
        "Comprehensive modern movie website with real-time data visualization and reporting capabilities.",
      category: "web",
      image: "/api/placeholder/400/300",
      technologies: ["nextjs", "D3.js", "MongoDB","nextauth"],
      github: "https://github.com/45-4647/moder_portfolio",
      live: "https://modern-movie-site.vercel.app/",
      featured: false,
    },
    
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // stop observing once triggered
        }
      },
      {
        threshold: 0.05, // only need 5% visibility
        rootMargin: "0px 0px -10% 0px", // trigger earlier on mobile
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback in case observer never fires (mobile quirks)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <Card className="glass hover:glass-strong group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow">
                <div className="relative overflow-hidden">
                  <div
                    className={`${
                      project.featured ? "h-64" : "h-48"
                    } bg-gradient-secondary flex items-center justify-center`}
                  >
                    <div className="text-6xl font-bold text-primary opacity-20">
                      {project.title
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          Featured
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gradient-secondary">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-primary text-primary-foreground"
                      asChild
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
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
