interface ScrollSectionProps {
  children: React.ReactNode;
  stack?: boolean; // kept for API compatibility
}

/**
 * Simple passthrough — no scroll animation, sections are always visible.
 * Each section handles its own entrance animations internally via IntersectionObserver.
 */
export function ScrollSection({ children }: ScrollSectionProps) {
  return <>{children}</>;
}
