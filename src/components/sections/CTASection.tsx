import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: as the section scrolls through the viewport,
  // the background image moves at a slower rate — classic parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // image moves from -15% to +15% vertically as section scrolls
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

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
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden"
      style={{ minHeight: 480 }}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: bgY,
          backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // slightly oversized so the parallax shift doesn't show edges
          top: '-20%',
          bottom: '-20%',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      {/* Purple tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-violet-900/20" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[480px] py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Start Your<br />Next Project?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed"
          >
            Let's collaborate to bring your vision to life with cutting-edge technology and exceptional design.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-black/40"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
