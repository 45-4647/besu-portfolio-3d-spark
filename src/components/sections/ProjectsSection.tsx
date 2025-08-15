import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  const filters = ['all', 'web', 'mobile', 'fullstack', '3d'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with advanced features including real-time inventory, payment processing, and analytics dashboard.',
      category: 'fullstack',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 2,
      title: '3D Portfolio Experience',
      description: 'Interactive 3D portfolio website built with Three.js and React Three Fiber for immersive user experience.',
      category: '3d',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Three.js', 'WebGL', 'GSAP'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and real-time transaction processing.',
      category: 'mobile',
      image: '/api/placeholder/400/300',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Comprehensive analytics dashboard with real-time data visualization and reporting capabilities.',
      category: 'web',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
      github: '#',
      live: '#',
      featured: false,
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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
                  ? 'bg-gradient-primary text-primary-foreground' 
                  : 'glass hover:glass-strong'
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
              className={project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <Card className="glass hover:glass-strong group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow">
                <div className="relative overflow-hidden">
                  <div className={`${project.featured ? 'h-64' : 'h-48'} bg-gradient-secondary flex items-center justify-center`}>
                    <div className="text-6xl font-bold text-primary opacity-20">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Featured</span>
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
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-primary text-primary-foreground">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
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