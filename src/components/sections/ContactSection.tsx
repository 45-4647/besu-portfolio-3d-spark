import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Mail, Phone, MapPin, Send, Github, Linkedin,
  Twitter, Sparkles, CheckCircle, ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactScene } from '../3d/ContactScene';

/* ─── data ─────────────────────────────────────────────── */
const contactInfo = [
  {
    icon: Mail, label: 'Email',
    value: 'besufikadkasahun12@gmail.com',
    href: 'mailto:besufikadkasahun12@gmail.com',
    gradient: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-500/40',
  },
  {
    icon: Phone, label: 'Phone',
    value: '+251 937 184 393',
    href: 'tel:+251937184393',
    gradient: 'from-blue-600 to-cyan-500',
    glow: 'shadow-blue-500/40',
  },
  {
    icon: MapPin, label: 'Location',
    value: 'Addis Ababa, Ethiopia',
    href: '#',
    gradient: 'from-pink-600 to-rose-500',
    glow: 'shadow-pink-500/40',
  },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/besufikad-kasahun-9112a8378/', label: 'LinkedIn', color: 'hover:bg-blue-600/20 hover:border-blue-500/60' },
  { icon: Github,   href: 'https://github.com/45-4647',                                label: 'GitHub',   color: 'hover:bg-violet-600/20 hover:border-violet-500/60' },
  { icon: Twitter,  href: '#',                                                          label: 'Twitter',  color: 'hover:bg-sky-600/20 hover:border-sky-500/60' },
];

/* random floating particles */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 5,
  dur: Math.random() * 4 + 5,
}));

/* ─── component ─────────────────────────────────────────── */
export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 15 });
  const sy = useSpring(my, { stiffness: 30, damping: 15 });
  const orbX = useTransform(sx, [-1, 1], [-50, 50]);
  const orbY = useTransform(sy, [-1, 1], [-50, 50]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  useEffect(() => {
    if (sectionRef.current) {
      const r = sectionRef.current.getBoundingClientRect();
      if (r.top < window.innerHeight) setIsVisible(true);
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }, 1800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 overflow-hidden min-h-screen flex items-center">

      {/* ── 3-D background ── */}
      <ContactScene />

      {/* holographic grid */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(250 84% 64% / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsl(250 84% 64% / 0.05) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      {/* scan-line sweep */}
      <motion.div
        className="absolute left-0 right-0 h-16 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(transparent, hsl(250 84% 64% / 0.07), transparent)',
        }}
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
      />

      {/* floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/50"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -35, 0], x: [0, (p.id % 2 === 0 ? 12 : -12), 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* parallax warp orb */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
      >
        <div className="w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(250 84% 64%) 0%, hsl(280 84% 74% / 0.4) 40%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'warp-wave 10s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/50 to-background/85 z-0 pointer-events-none" />

      {/* ── content ── */}
      <div className="relative z-10 container mx-auto px-6 w-full">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary mb-5 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Open to new opportunities
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            <span className="text-gradient">Let's Build</span>
            <br />
            <span className="text-gradient-secondary">Something Great</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message and let's make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto items-start">

          {/* ── LEFT col (2/5) ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* contact cards */}
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className={`group flex items-center gap-4 p-4 rounded-2xl
                    bg-background/40 backdrop-blur-md border border-white/10
                    hover:border-primary/40 hover:shadow-xl ${info.glow}
                    transition-all duration-300 relative overflow-hidden`}
                >
                  {/* holo sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 30%, hsl(250 84% 64% / 0.12) 50%, transparent 70%)',
                      backgroundSize: '200% auto',
                      animation: 'holo-sweep 2s linear infinite',
                    }}
                  />
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${info.gradient} shadow-lg shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">{info.label}</div>
                    <div className="font-semibold text-sm truncate">{info.value}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
              );
            })}

            {/* social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-2"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={{ scale: 1.18, y: -4, rotate: 6 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-2xl bg-background/40 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 ${s.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="relative p-4 rounded-2xl overflow-hidden border border-green-500/20 bg-green-500/5 backdrop-blur-md"
            >
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-green-400/15 blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative">
                <div className="relative shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />
                </div>
                <div>
                  <div className="font-semibold text-green-400 text-sm">Available for work</div>
                  <div className="text-xs text-muted-foreground">Full-time · Freelance · Collaboration</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT col (3/5) — form ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3 relative"
          >
            {/* outer glow ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-600/30 via-purple-500/15 to-pink-500/30 blur-lg opacity-70 animate-glow-pulse pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-xl shadow-2xl">
              {/* rainbow top bar */}
              <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 via-pink-500 to-cyan-400"
                style={{ backgroundSize: '200% auto', animation: 'holo-sweep 3s linear infinite' }}
              />

              {/* scan lines on card */}
              <div className="absolute inset-0 pointer-events-none z-0"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(250 84% 64% / 0.025) 2px, hsl(250 84% 64% / 0.025) 4px)',
                }}
              />

              <div className="relative z-10 p-8 md:p-10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── success state ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="flex flex-col items-center justify-center py-14 text-center gap-5"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 0.6, repeat: 3 }}
                          className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center"
                        >
                          <CheckCircle className="h-10 w-10 text-green-400" />
                        </motion.div>
                        {/* burst particles */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary top-1/2 left-1/2"
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{
                              x: Math.cos((i / 8) * Math.PI * 2) * 60,
                              y: Math.sin((i / 8) * Math.PI * 2) * 60,
                              opacity: 0,
                              scale: 0,
                            }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                          />
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-gradient">Message Sent!</h3>
                      <p className="text-muted-foreground max-w-xs">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    /* ── form ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold mb-1">Send a Message</h3>
                        <p className="text-sm text-muted-foreground">I'll reply within 24 hours.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {(['name', 'email'] as const).map((field) => (
                          <div key={field} className="space-y-1.5 relative">
                            <label htmlFor={field} className="text-sm font-medium capitalize text-foreground/80">
                              {field}
                            </label>
                            <div className="relative">
                              <Input
                                id={field} name={field}
                                type={field === 'email' ? 'email' : 'text'}
                                placeholder={field === 'email' ? 'you@email.com' : 'Your name'}
                                value={formData[field]}
                                onChange={handleChange}
                                onFocus={() => setFocused(field)}
                                onBlur={() => setFocused(null)}
                                className="bg-white/5 border-white/10 focus:border-primary/60 rounded-xl h-11 transition-all"
                                required
                              />
                              {focused === field && (
                                <motion.div
                                  layoutId="field-glow"
                                  className="absolute -inset-px rounded-xl bg-gradient-to-r from-violet-600/25 to-purple-600/25 -z-10 blur-sm"
                                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5 relative">
                        <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                        <div className="relative">
                          <Textarea
                            id="message" name="message"
                            placeholder="Tell me about your project, timeline, and budget..."
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                            className="bg-white/5 border-white/10 focus:border-primary/60 min-h-[140px] resize-none rounded-xl transition-all"
                            required
                          />
                          {focused === 'message' && (
                            <motion.div
                              layoutId="field-glow"
                              className="absolute -inset-px rounded-xl bg-gradient-to-r from-violet-600/25 to-purple-600/25 -z-10 blur-sm"
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                            />
                          )}
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full relative overflow-hidden h-12 rounded-xl font-semibold text-white
                          bg-gradient-to-r from-violet-600 to-purple-600
                          hover:from-violet-500 hover:to-purple-500
                          shadow-lg shadow-purple-500/30
                          disabled:opacity-70 disabled:cursor-not-allowed
                          transition-all duration-300 group"
                      >
                        {/* holo sweep on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{
                            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                            backgroundSize: '200% auto',
                            animation: 'holo-sweep 1.5s linear infinite',
                          }}
                        />
                        <AnimatePresence mode="wait">
                          {sending ? (
                            <motion.div
                              key="sending"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Sending...
                            </motion.div>
                          ) : (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <Send className="h-4 w-4" />
                              Send Message
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
