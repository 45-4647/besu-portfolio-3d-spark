import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  stack?: boolean; // kept for API compatibility but ignored
}

/**
 * Simple scroll-triggered fade-up for every section.
 * No sticky, no stacking — just clean smooth entrance animations.
 */
export function ScrollSection({ children }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 60%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y       = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div ref={ref}>
      <motion.div style={{ opacity, y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
