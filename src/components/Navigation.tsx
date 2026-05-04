import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Briefcase, Sun, Moon } from 'lucide-react';

const navItems = [
  { name: 'Home',       href: 'home' },
  { name: 'About Me',   href: 'about' },
  { name: 'Portfolio',  href: 'projects' },
  { name: 'Process',    href: 'process' },
  { name: 'Pricing',    href: 'pricing' },
  { name: 'Reviews',    href: 'testimonials' },
];

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const updateActive = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
    // If near the very top, always mark Home as active
    if (window.scrollY < 100) { setActive('home'); return; }
    const ids = navItems.map(n => n.href);
    let found = 'home';
    for (let i = ids.length - 1; i >= 0; i--) {
      const el = document.getElementById(ids[i]);
      if (el && el.getBoundingClientRect().top <= 100) { found = ids[i]; break; }
    }
    setActive(found);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, [updateActive]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById('main-nav');
      if (nav && !nav.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Adaptive colors based on mode
  const navBg = isScrolled
    ? darkMode
      ? 'bg-black/85 backdrop-blur-xl border-b border-white/5'
      : 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm'
    : 'bg-transparent';

  const textPrimary   = darkMode ? 'text-white'       : 'text-gray-900';
  const textSecondary = darkMode ? 'text-white/50'     : 'text-gray-500';
  const textHover     = darkMode ? 'hover:text-white/80' : 'hover:text-gray-900';
  const iconBtn       = darkMode
    ? 'border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
    : 'border-gray-200 bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200';
  const indicator     = darkMode ? 'bg-white'          : 'bg-gray-900';
  const mobileBg      = darkMode ? 'bg-black/95 border-white/10' : 'bg-white border-gray-200 shadow-lg';
  const mobileActive  = darkMode ? 'bg-white/10 text-white'      : 'bg-purple-50 text-purple-700';
  const mobileInactive = darkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';
  const activeDot     = darkMode ? 'bg-purple-400'     : 'bg-purple-500';

  return (
    <motion.nav
      id="main-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2.5 text-left shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/30">
              BK
            </div>
            <div className="hidden sm:block">
              <div className={`font-bold text-sm leading-tight ${textPrimary}`}>Besufikad Kasahun</div>
              <div className={`text-xs ${textSecondary}`}>Code Meets Creativity.</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  active === item.href ? textPrimary : `${textSecondary} ${textHover}`
                }`}
              >
                {item.name}
                {active === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${indicator}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: theme toggle + Hire Me + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${iconBtn}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Sun className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Moon className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hire Me */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Hire Me
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(o => !o)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className={`lg:hidden w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${iconBtn}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden border-t backdrop-blur-xl ${mobileBg}`}
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    active === item.href ? mobileActive : mobileInactive
                  }`}
                >
                  {item.name}
                  {active === item.href && <span className={`w-1.5 h-1.5 rounded-full ${activeDot}`} />}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.04 }}
                onClick={() => scrollTo('contact')}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
