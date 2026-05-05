import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Code2, Heart } from 'lucide-react';

const navLinks = [
  { label: 'Home',       href: 'home' },
  { label: 'About',      href: 'about' },
  { label: 'Projects',   href: 'projects' },
  { label: 'Experience', href: 'experience' },
  { label: 'Contact',    href: 'contact' },
];

const socialLinks = [
  { icon: Github,   href: 'https://github.com/45-4647',                               label: 'GitHub',   color: 'hover:text-violet-500 hover:border-violet-400/50 dark:hover:text-violet-400' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/besufikad-kasahun-9112a8378/', label: 'LinkedIn', color: 'hover:text-blue-500 hover:border-blue-400/50 dark:hover:text-blue-400' },
  { icon: Twitter,  href: '#',                                                         label: 'Twitter',  color: 'hover:text-sky-500 hover:border-sky-400/50 dark:hover:text-sky-400' },
  { icon: Mail,     href: 'mailto:besufikadkasahun12@gmail.com',                      label: 'Email',    color: 'hover:text-pink-500 hover:border-pink-400/50 dark:hover:text-pink-400' },
];

const techStack = ['React', 'TypeScript', 'Three.js', 'Tailwind', 'Node.js', 'MongoDB'];

const scrollTo = (id: string) => {
  if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">

      {/* top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-400/40 dark:via-purple-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-20 bg-purple-400/5 dark:bg-purple-500/5 blur-3xl pointer-events-none" />

      {/* grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(250 84% 64% / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(250 84% 64% / 0.06) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">

        {/* top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent cursor-default w-fit"
            >
              BK
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed max-w-xs">
              Full Stack Developer crafting modern, scalable, and visually engaging
              digital experiences from Addis Ababa, Ethiopia.
            </p>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Available for work</span>
            </div>
          </div>

          {/* nav links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">Navigate</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-600 dark:text-white/60 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-purple-500 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* tech stack */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 font-medium cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">Get In Touch</h4>
            <div className="space-y-3">
              <a href="mailto:besufikadkasahun12@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                <Mail className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">besufikadkasahun12@gmail.com</span>
              </a>
              <a href="tel:+251937184393"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                <Code2 className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span>+251 937 184 393</span>
              </a>
            </div>

            <div className="flex gap-2 pt-1">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-9 h-9 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/50 transition-all duration-300 ${s.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent mb-8" />

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-white/50 flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            © {new Date().getFullYear()} Besufikad Kasahun. Made with
            <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            and cutting-edge tech.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 dark:text-white/30">Designed & built by BK</span>
            <motion.button
              onClick={() => scrollTo('home')}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
