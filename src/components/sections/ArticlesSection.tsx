import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const articles = [
  { id: 1, title: 'How to Build a Full Stack App with React & Node.js', category: 'Web Development', date: 'MAR 15', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop', excerpt: 'A step by step guide to building modern full stack applications with React and Node.js.' },
  { id: 2, title: 'Will Artificial Intelligence Replace Web Developers?', category: 'Web Development', date: 'MAR 25', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop', excerpt: 'AI is evolving fast, but will it replace human developers? A deep dive into the future.' },
  { id: 3, title: 'Mastering CSS Grid and Flexbox for Modern Layouts', category: 'Web Development', date: 'APR 2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop', excerpt: 'A comprehensive guide to master modern CSS layout techniques for any project.' },
  { id: 4, title: 'Building Real-Time Apps with WebSockets', category: 'Backend', date: 'APR 10', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop', excerpt: 'Learn how to build real-time features using WebSocket technology and Node.js.' },
  { id: 5, title: 'MongoDB vs PostgreSQL: Which Should You Choose?', category: 'Database', date: 'APR 18', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop', excerpt: 'A detailed comparison of the two most popular databases for modern applications.' },
  { id: 6, title: 'Three.js for Beginners: Creating 3D Web Experiences', category: '3D / WebGL', date: 'APR 25', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop', excerpt: 'Get started with Three.js and create stunning 3D web experiences from scratch.' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Web Development': 'bg-purple-500/80',
  'Backend': 'bg-blue-500/80',
  'Database': 'bg-emerald-500/80',
  '3D / WebGL': 'bg-orange-500/80',
};

export function ArticlesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="articles"
      className="relative py-24 bg-gray-50 dark:bg-[#111] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
            Latest Articles
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest <span className="text-purple-500 dark:text-purple-400">Articles</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 text-lg max-w-3xl mx-auto">
            Get the latest insights, tutorials, and updates from the ever evolving world of the web and online technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
              className="group bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-md dark:shadow-none"
            >
              <div className="relative overflow-hidden h-48">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-white text-xs font-semibold ${CATEGORY_COLORS[article.category] ?? 'bg-white/20'}`}>
                  {article.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-white/80 text-xs font-medium">
                  {article.date}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 dark:text-white font-semibold text-base leading-snug mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                <span className="text-purple-500 dark:text-purple-400 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200">
                  Read More →
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button className="px-8 py-3 rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 text-sm font-medium transition-all duration-300 shadow-sm dark:shadow-none">
            View All Articles →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
