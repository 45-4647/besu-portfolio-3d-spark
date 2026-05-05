import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface FullscreenModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Optional video URL to play behind the content */
  videoBg?: string;
  /** Fallback image if video fails */
  videoPoster?: string;
}

export function FullscreenModal({ open, onClose, children, videoBg, videoPoster }: FullscreenModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col"
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Video background */}
          {videoBg ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoBg}
              poster={videoPoster}
              autoPlay muted loop playsInline
            />
          ) : (
            <div className="absolute inset-0 bg-[#0a0a0a]" />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          {/* Close button — z-50 so it's always above the scrollable content */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.15 }}
            onClick={onClose}
            className="fixed top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all shadow-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Scrollable content — z-10, below the close button */}
          <div className="relative z-10 flex-1 overflow-y-auto pt-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
