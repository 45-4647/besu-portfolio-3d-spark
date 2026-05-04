import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  /** When true, applies the sticky card-stack shrink effect. Default false = normal scroll with fade-up. */
  stack?: boolean;
}

/**
 * stack=true  → sticky card that scales/fades as the next card scrolls over it (Hero/About/Projects intro)
 * stack=false → normal flow section with a smooth fade-up-on-enter animation
 */
export function ScrollSection({ children, stack = false }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: stack ? ['start start', 'end start'] : ['start end', 'start 60%'],
  });

  // Stack mode: shrink + fade as next card slides over
  const stackScale   = useTransform(scrollYProgress, [0, 1],   [1, 0.93]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);
  const stackRadius  = useTransform(scrollYProgress, [0, 1],   [0, 20]);

  // Normal mode: fade + rise on enter
  const normalOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const normalY       = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (stack) {
    return (
      <div ref={ref} className="sticky top-0 z-10">
        <motion.div
          style={{
            scale: stackScale,
            opacity: stackOpacity,
            borderRadius: stackRadius,
          }}
          className="origin-top overflow-hidden will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <motion.div
        style={{ opacity: normalOpacity, y: normalY }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
