import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { FullscreenModal } from '../FullscreenModal';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'How to Build a Full Stack App with React & Node.js',
    category: 'Web Development',
    date: 'MAR 15',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=500&fit=crop',
    excerpt: 'A step by step guide to building modern full stack applications with React and Node.js.',
    content: `Building a full stack application requires understanding both the frontend and backend layers. React handles the UI while Node.js powers the server.

**Getting Started**
Start by setting up your project structure. Create a client folder for React and a server folder for Node.js. Use Express to build your REST API endpoints.

**Database Integration**
Connect MongoDB using Mongoose for flexible data modeling. Define schemas for your data and create CRUD operations.

**Authentication**
Implement JWT-based authentication. Store tokens securely and protect your API routes with middleware.

**Deployment**
Deploy your frontend to Vercel and your backend to Railway or Render. Use environment variables for sensitive configuration.

This approach gives you a scalable, maintainable full stack application that can grow with your needs.`,
  },
  {
    id: 2,
    title: 'Will Artificial Intelligence Replace Web Developers?',
    category: 'Web Development',
    date: 'MAR 25',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&h=500&fit=crop',
    excerpt: 'AI is evolving fast, but will it replace human developers? A deep dive into the future.',
    content: `AI tools like GitHub Copilot and ChatGPT are transforming how developers work. But will they replace us entirely?

**What AI Does Well**
AI excels at boilerplate code, repetitive tasks, and suggesting solutions to common problems. It speeds up development significantly.

**What Humans Do Better**
Understanding business requirements, creative problem solving, system architecture decisions, and client communication remain deeply human skills.

**The Reality**
AI is a powerful tool, not a replacement. Developers who learn to use AI effectively will be far more productive than those who don't.

**The Future**
Expect AI to handle more routine coding tasks while developers focus on higher-level design, strategy, and innovation. The role evolves, it doesn't disappear.`,
  },
  {
    id: 3,
    title: 'Mastering CSS Grid and Flexbox for Modern Layouts',
    category: 'Web Development',
    date: 'APR 2',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop',
    excerpt: 'A comprehensive guide to master modern CSS layout techniques for any project.',
    content: `CSS Grid and Flexbox are the two most powerful layout tools in modern CSS. Understanding when to use each is key.

**Flexbox — One Dimension**
Flexbox is perfect for laying out items in a single row or column. Use it for navigation bars, card rows, and centering content.

**CSS Grid — Two Dimensions**
Grid shines when you need control over both rows and columns simultaneously. Perfect for page layouts and complex component structures.

**Combining Both**
The real power comes from using them together. Use Grid for the overall page layout and Flexbox for the components within each grid area.

**Responsive Design**
Both tools work beautifully with media queries. Grid's auto-fill and minmax functions make responsive layouts almost effortless.`,
  },
  {
    id: 4,
    title: 'Building Real-Time Apps with WebSockets',
    category: 'Backend',
    date: 'APR 10',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=500&fit=crop',
    excerpt: 'Learn how to build real-time features using WebSocket technology and Node.js.',
    content: `WebSockets enable bidirectional, real-time communication between client and server — essential for chat apps, live dashboards, and collaborative tools.

**How WebSockets Work**
Unlike HTTP, WebSockets maintain a persistent connection. Once established, both client and server can send messages at any time.

**Setting Up with Socket.io**
Socket.io simplifies WebSocket implementation with automatic reconnection, room support, and fallback to polling.

**Use Cases**
Real-time chat, live notifications, collaborative editing, live sports scores, and multiplayer games all benefit from WebSockets.

**Scaling Considerations**
For production, use Redis adapter with Socket.io to share state across multiple server instances. This enables horizontal scaling.`,
  },
  {
    id: 5,
    title: 'MongoDB vs PostgreSQL: Which Should You Choose?',
    category: 'Database',
    date: 'APR 18',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&h=500&fit=crop',
    excerpt: 'A detailed comparison of the two most popular databases for modern applications.',
    content: `Choosing the right database is one of the most important architectural decisions you'll make. Here's how MongoDB and PostgreSQL compare.

**MongoDB — Document Store**
MongoDB stores data as JSON-like documents. It's flexible, schema-less, and scales horizontally with ease. Great for rapidly changing data structures.

**PostgreSQL — Relational**
PostgreSQL uses structured tables with strict schemas. It excels at complex queries, joins, and maintaining data integrity with ACID compliance.

**When to Use MongoDB**
Choose MongoDB for content management, catalogs, user profiles, and applications where data structure evolves frequently.

**When to Use PostgreSQL**
Choose PostgreSQL for financial data, e-commerce orders, anything requiring complex relationships, or when data consistency is critical.

**The Verdict**
Both are excellent. The choice depends on your data model, not popularity. Many modern apps use both — MongoDB for flexible data, PostgreSQL for transactional data.`,
  },
  {
    id: 6,
    title: 'Three.js for Beginners: Creating 3D Web Experiences',
    category: '3D / WebGL',
    date: 'APR 25',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop',
    excerpt: 'Get started with Three.js and create stunning 3D web experiences from scratch.',
    content: `Three.js makes WebGL accessible, letting you create stunning 3D experiences in the browser without deep graphics programming knowledge.

**Core Concepts**
Every Three.js scene needs three things: a Scene (container), a Camera (viewpoint), and a Renderer (draws to canvas).

**Geometry and Materials**
Create 3D objects by combining geometry (shape) with material (appearance). BoxGeometry + MeshStandardMaterial gives you a basic 3D box.

**Lighting**
Without lights, your scene is black. Add AmbientLight for base illumination and DirectionalLight or PointLight for shadows and depth.

**Animation Loop**
Use requestAnimationFrame to create a render loop. Update object rotations, positions, or any property each frame to animate your scene.

**React Three Fiber**
For React projects, React Three Fiber provides a declarative API for Three.js. Combined with @react-three/drei, building 3D UIs becomes intuitive.`,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Web Development': 'bg-purple-500/80',
  'Backend': 'bg-blue-500/80',
  'Database': 'bg-emerald-500/80',
  '3D / WebGL': 'bg-orange-500/80',
};

const CATEGORY_BG: Record<string, string> = {
  'Web Development': 'from-violet-700 to-purple-900',
  'Backend': 'from-blue-700 to-cyan-900',
  'Database': 'from-emerald-700 to-teal-900',
  '3D / WebGL': 'from-orange-600 to-amber-800',
};

export function ArticlesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);
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
              className="group bg-white dark:bg-[#0d0d0d] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-none"
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
                <button
                  onClick={() => setSelected(article)}
                  className="flex items-center gap-1.5 text-purple-500 dark:text-purple-400 text-sm font-medium hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200"
                >
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </button>
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

      {/* ── Article detail fullscreen modal ── */}
      <FullscreenModal
        open={!!selected}
        onClose={() => setSelected(null)}
        videoBg="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
        videoPoster={selected?.image}
      >
        {selected && (
          <div className="min-h-screen py-20 px-6">
            <div className="max-w-3xl mx-auto">
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 border border-white/10" style={{ height: 320 }}>
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_BG[selected.category] ?? 'from-purple-700 to-violet-900'} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Category + date */}
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${CATEGORY_COLORS[selected.category] ?? 'bg-white/20'}`}>
                    {selected.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/60 text-xs">
                    <Calendar className="w-3.5 h-3.5" /> {selected.date}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {selected.title}
              </h1>

              {/* Excerpt */}
              <p className="text-white/60 text-lg leading-relaxed mb-8 border-l-2 border-purple-400 pl-4">
                {selected.excerpt}
              </p>

              {/* Content */}
              <div className="prose prose-invert prose-purple max-w-none">
                {selected.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return (
                      <h3 key={i} className="text-white text-xl font-bold mt-8 mb-3">
                        {para.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (para.includes('**')) {
                    const parts = para.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={i} className="text-white/70 leading-relaxed mb-4">
                        {parts.map((part, j) =>
                          j % 2 === 1
                            ? <strong key={j} className="text-white font-semibold">{part}</strong>
                            : part
                        )}
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="text-white/70 leading-relaxed mb-4">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-10 pt-8 border-t border-white/10">
                <Tag className="w-4 h-4 text-white/40" />
                <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${CATEGORY_COLORS[selected.category] ?? 'bg-white/20'}`}>
                  {selected.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </FullscreenModal>
    </section>
  );
}
