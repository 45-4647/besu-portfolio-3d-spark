import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scene3D } from '../3d/Scene3D';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/80 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

          {/* ================= LEFT SIDE (TEXT) ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left max-w-2xl"
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6">
              Welcome to my digital space 👋
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight hero-text">
              Besufikad
              <br />
              <span className="text-gradient-secondary">
                Kasahun
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Full Stack Developer & Tech Innovator crafting modern,
              scalable, and visually engaging digital experiences.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground px-8 py-4 text-lg font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="glass px-8 py-4 text-lg font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                <a
                  href="https://drive.google.com/file/d/17_BvRJ30b1Wvk8zQi95i3zk8JnPIWl5y/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV
                </a>
              </Button>
            </div>

            {/* Status */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Based in Ethiopia</span>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT SIDE (IMAGE) ================= */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative flex justify-center"
          >
            <div className="relative group">

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl group-hover:bg-purple-500/30 transition-all duration-700" />

              {/* Gradient Border */}
              <div className="rounded-full p-[4px] bg-gradient-to-br from-primary via-purple-500 to-blue-500">
                <motion.img
                  src="/hero.png"
                  alt="Besufikad Kasahun"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    w-64 h-64
                    md:w-80 md:h-80
                    lg:w-96 lg:h-96
                    object-cover
                    rounded-full
                    bg-background
                    shadow-2xl
                  "
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}