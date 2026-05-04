import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

interface Plan { name: string; price: string; description: string; features: string[]; popular?: boolean; }
interface Category { label: string; plans: Plan[]; }

const categories: Category[] = [
  {
    label: 'Web Design',
    plans: [
      { name: 'Basic Design', price: '$99', description: 'Design for simple websites', features: ['Up to 3 pages', 'Responsive Mockups', 'Basic UI Kit', 'Figma Source File', '1 Revision Round'] },
      { name: 'Standard Design', price: '$249', description: 'Professional design package', features: ['Up to 10 pages', 'Custom Illustrations', 'Brand Guidelines', 'Interactive Prototype', 'Component Library', '3 Revision Rounds'], popular: true },
      { name: 'Premium Design', price: '$599', description: 'Full-scale design system', features: ['Unlimited Pages', 'Full Design System', 'Motion Design', 'User Research', 'Usability Testing', 'Unlimited Revisions'] },
    ],
  },
  {
    label: 'Web Development',
    plans: [
      { name: 'Basic Development', price: '$139', description: 'Development for simple websites', features: ['Up to 5 pages', 'Responsive Design', 'Basic SEO', 'Contact Form', '1 Month Support'] },
      { name: 'Standard Development', price: '$379', description: 'Full-featured web project', features: ['Up to 15 pages', 'Custom Animations', 'Advanced SEO', 'CMS Integration', 'E-commerce Ready', '3 Months Support'], popular: true },
      { name: 'Premium Development', price: '$899', description: 'Enterprise-grade solution', features: ['Unlimited Pages', 'Full Custom Design', 'Performance Optimization', 'API Integration', 'Priority Support', '6 Months Support'] },
    ],
  },
  {
    label: 'CMS Solutions',
    plans: [
      { name: 'Starter CMS', price: '$119', description: 'Simple content management', features: ['WordPress Setup', 'Theme Customization', 'Basic Plugins', 'Admin Training', '1 Month Support'] },
      { name: 'Business CMS', price: '$299', description: 'Full CMS implementation', features: ['Custom Theme', 'Advanced Plugins', 'Multi-user Roles', 'SEO Optimization', 'E-commerce Plugin', '3 Months Support'], popular: true },
      { name: 'Enterprise CMS', price: '$699', description: 'Headless CMS architecture', features: ['Headless CMS', 'Custom API', 'Multi-language', 'CDN Integration', 'Priority Support', '6 Months Support'] },
    ],
  },
  {
    label: 'Bug Fixing',
    plans: [
      { name: 'Quick Fix', price: '$49', description: 'Minor bug fixes', features: ['Up to 3 bugs', '24h Turnaround', 'Code Review', 'Fix Report', '7 Days Warranty'] },
      { name: 'Standard Fix', price: '$129', description: 'Comprehensive debugging', features: ['Up to 10 bugs', '48h Turnaround', 'Performance Audit', 'Detailed Report', 'Code Refactor', '30 Days Warranty'], popular: true },
      { name: 'Full Audit', price: '$299', description: 'Complete code overhaul', features: ['Unlimited Bugs', 'Priority Queue', 'Security Audit', 'Full Refactor', 'Test Coverage', '90 Days Warranty'] },
    ],
  },
  {
    label: 'Maintenance',
    plans: [
      { name: 'Basic Care', price: '$49', description: 'Monthly maintenance', features: ['Monthly Updates', 'Uptime Monitoring', 'Backup Service', 'Security Patches', 'Email Support'] },
      { name: 'Pro Care', price: '$99', description: 'Proactive maintenance', features: ['Weekly Updates', '24/7 Monitoring', 'Daily Backups', 'Performance Reports', 'Priority Support', 'Content Updates'], popular: true },
      { name: 'Enterprise Care', price: '$199', description: 'Full managed service', features: ['Daily Updates', 'Real-time Monitoring', 'Hourly Backups', 'Dedicated Manager', 'SLA Guarantee', 'Unlimited Changes'] },
    ],
  },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
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

  const currentPlans = categories[activeCategory].plans;

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-800/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-white/5 text-sm text-gray-600 dark:text-white/70 mb-4">
            Pricing &amp; Plans
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent <span className="text-purple-500 dark:text-purple-400">Pricing</span>
          </h2>
          <p className="text-gray-500 dark:text-white/60 text-lg max-w-2xl mx-auto">
            Straightforward pricing options to fit your project needs and budget.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                i === activeCategory
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white'
                  : 'bg-transparent text-gray-500 dark:text-white/60 border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 hover:text-gray-700 dark:hover:text-white/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {currentPlans.map((plan, index) => (
            <motion.div
              key={`${activeCategory}-${plan.name}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-white dark:bg-[#111] border-purple-400 dark:border-purple-500/60 shadow-lg shadow-purple-500/10 md:-mt-4'
                  : 'bg-white dark:bg-[#111] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold whitespace-nowrap">
                    ☆ Most Popular
                  </span>
                </div>
              )}
              <div className="mb-5">
                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-gray-500 dark:text-white/50 text-sm">{plan.description}</p>
              </div>
              <div className="mb-6 flex items-end gap-1">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-400 dark:text-white/40 text-sm mb-1">/project</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600 dark:text-white/70">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-50 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center">
                      <Check className="w-3 h-3 text-purple-500 dark:text-purple-400" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                plan.popular
                  ? 'bg-purple-500 hover:bg-purple-400 text-white shadow-md shadow-purple-500/30'
                  : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
