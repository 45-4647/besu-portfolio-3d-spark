import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Michael Reynolds', role: 'Marketing Manager', company: 'Digital Systems', quote: 'He built an outstanding landing page for our email marketing campaign. Perfectly balanced technical detail with elegant design. The mobile optimization and navigation truly enhanced our user experience.', verified: true },
  { id: 2, name: 'Muhammad Tahir', role: 'CEO', company: 'Muscle Factory', quote: 'He brought my vision for The Muscle Factory to life with a powerful, professional website that perfectly captures our mission. From eCommerce to coaching services, everything runs smoothly.', verified: true },
  { id: 3, name: 'James Mitchell', role: 'Founder', company: 'Elite Learning Hub', quote: 'He turned our vision into a powerful, high-performance training platform. From flawless animations to the user and admin dashboards, every detail was executed with precision.', verified: true },
  { id: 4, name: 'Sarah Chen', role: 'Artist', company: 'Creative Direction', quote: 'Delivered a beautiful portfolio that captures both elegance and user experience perfectly. Truly exceptional work that exceeded all expectations.', verified: true },
  { id: 5, name: 'Ahmed Hassan', role: 'CTO', company: 'TechVentures', quote: 'Exceptional full-stack work. The system architecture is solid and the code quality is outstanding. Would highly recommend for any complex technical project.', verified: true },
  { id: 6, name: 'Lisa Park', role: 'Product Manager', company: 'InnovateCo', quote: 'Transformed our product vision into reality. The attention to detail and communication throughout was excellent. Delivered on time and beyond expectations.', verified: true },
];

const AVATAR_COLORS = ['from-purple-500 to-violet-600', 'from-blue-500 to-cyan-600', 'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600', 'from-amber-500 to-orange-600', 'from-indigo-500 to-purple-600'];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const next = useCallback(() => { setDirection(1); setCurrent(p => (p + 1) % total); }, [total]);
  const prev = useCallback(() => { setDirection(-1); setCurrent(p => (p - 1 + total) % total); }, [total]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

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

  const visibleIndices = [0, 1, 2].map(i => (current + i) % total);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 bg-white dark:bg-[#0d0d0d] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            What Clients <span className="text-purple-500 dark:text-purple-400">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleIndices.map((idx, pos) => {
                const t = testimonials[idx];
                return (
                  <motion.div
                    key={`${idx}-${current}`}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 60 }}
                    transition={{ duration: 0.4, delay: pos * 0.05 }}
                    className={`bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-4 ${pos !== 0 ? 'hidden md:flex' : 'flex'}`}
                  >
                    <div className="text-purple-400 text-5xl font-serif leading-none select-none">&ldquo;</div>
                    <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed flex-1">{t.quote}</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-white/5">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {getInitials(t.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-semibold text-sm truncate">{t.name}</p>
                        <p className="text-gray-400 dark:text-white/40 text-xs truncate">{t.role}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 text-xs">{t.company}</span>
                        {t.verified && (
                          <span className="flex items-center gap-1 text-emerald-500 dark:text-emerald-400 text-xs">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={() => { prev(); resetTimer(); }} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); resetTimer(); }}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-purple-500' : 'w-2 h-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'}`}
                />
              ))}
            </div>
            <button onClick={() => { next(); resetTimer(); }} className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mt-8">
            <button className="text-gray-400 dark:text-white/50 hover:text-gray-700 dark:hover:text-white text-sm transition-colors duration-200">
              View All Testimonials →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
