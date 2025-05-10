'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  Zap, 
  Check,
  UploadCloud, 
  MessageSquare,
  Calendar,
  Target
} from 'lucide-react';
import { Footer } from '@/components/Footer';

// Feature card component
const FeatureCard = ({ 
  icon, 
  title, 
  description,
  delay = 0
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="suprema-frame bg-black/60 hover:-translate-y-1 transition-all duration-300 p-6 rounded-2xl border border-white/5 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-[0px_8px_16px_rgba(0,231,255,0.1)]"
  >
    <div className="mb-4 p-2 w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/5">
      {icon}
    </div>
    <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
    <p className="text-[#9CA3AF] text-sm">{description}</p>
  </motion.div>
);

export default function FeaturesPage() {
  return (
    <div className="relative pt-20 min-h-screen">
      {/* Subtle glow elements */}
      <div className="suprema-glow absolute top-[30%] right-[10%] w-[400px] h-[400px] --glow-color:rgba(0,231,255,0.03); --blur-amount:80px; --opacity:0.6;"></div>
      <div className="suprema-glow absolute bottom-[20%] left-[5%] w-[300px] h-[300px] --glow-color:rgba(29,139,255,0.05); --blur-amount:60px; --opacity:0.5;"></div>
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-4 rounded-full bg-black/60 border border-white/10 text-[#00E7FF] text-sm"
            >
              Features
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Powerful Twitter Growth Tools
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#9CA3AF] max-w-2xl mx-auto text-lg"
            >
              Everything you need to analyze, optimize, and scale your Twitter presence
            </motion.p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BarChart2 size={20} className="text-[#00E7FF]" />}
              title="AI Analytics"
              description="Advanced insights on your Twitter growth with clean dashboard and real data visualization."
              delay={0.1}
            />
            
            <FeatureCard
              icon={<Users size={20} className="text-[#00E7FF]" />}
              title="Audience Growth"
              description="Discover content that works and grow your followers organically with data-driven recommendations."
              delay={0.2}
            />
            
            <FeatureCard
              icon={<TrendingUp size={20} className="text-[#00E7FF]" />}
              title="Performance Tracking"
              description="Monitor tweets, engagement and growth with simple, dynamic metrics and visualizations."
              delay={0.3}
            />
            
            <FeatureCard
              icon={<Zap size={20} className="text-[#00E7FF]" />}
              title="Smart Recommendations"
              description="Get personalized suggestions to improve your Twitter strategy and content performance."
              delay={0.4}
            />
            
            <FeatureCard
              icon={<Calendar size={20} className="text-[#00E7FF]" />}
              title="Optimal Timing"
              description="Learn when and what to post to maximize interactions and engagement with your audience."
              delay={0.5}
            />
            
            <FeatureCard
              icon={<UploadCloud size={20} className="text-[#00E7FF]" />}
              title="CSV Upload"
              description="Upload your Twitter data via CSV and get instant analytics and actionable insights."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Why Choose Tweetcoa<span className="text-[#00E7FF]">.ch</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#9CA3AF] max-w-2xl mx-auto"
            >
              Maximize your Twitter potential with tools designed for creators and businesses
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="suprema-frame bg-black/60 p-6 rounded-2xl border border-white/5 shadow-[0px_16px_30px_0px_rgba(0,0,0,0.3),0px_2px_2px_0px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-6">
                <Image 
                  src="/images/dashboard-preview.jpg" 
                  alt="Dashboard Analytics" 
                  width={500} 
                  height={300}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              
              <h3 className="text-xl font-medium text-white mb-4">Data-Driven Insights</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check size={16} className="text-[#00E7FF]" />
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Visualize your Twitter metrics in real-time</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check size={16} className="text-[#00E7FF]" />
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Track engagement rates, impressions, and follower growth</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check size={16} className="text-[#00E7FF]" />
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Identify patterns and trends in your performance</p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="suprema-frame bg-black/60 p-6 rounded-2xl border border-white/5 shadow-[0px_16px_30px_0px_rgba(0,0,0,0.3),0px_2px_2px_0px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-6">
                <Image 
                  src="/images/feature-preview.jpg" 
                  alt="AI Recommendations" 
                  width={500} 
                  height={300}
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              
              <h3 className="text-xl font-medium text-white mb-4">AI-Powered Recommendations</h3>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check size={16} className="text-[#00E7FF]" />
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Get personalized content suggestions based on performance</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check size={16} className="text-[#00E7FF]" />
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Optimize posting times for maximum engagement</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Check size={16} className="text-[#00E7FF]" />
                  </div>
                  <p className="text-[#9CA3AF] text-sm">Identify growth opportunities and audience segments</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="suprema-frame bg-black/60 border-white/5 p-8 md:p-12 text-center rounded-2xl shadow-[0px_16px_30px_0px_rgba(0,0,0,0.5),0px_2px_2px_0px_rgba(0,0,0,0.5)]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-white mb-6"
            >
              Ready to grow your Twitter presence?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#9CA3AF] max-w-xl mx-auto mb-8"
            >
              Join thousands who've already increased engagement and followers with Tweetcoa.ch.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="/signup" 
                className="relative inline-flex items-center justify-center rounded-xl font-medium transition-all h-12 px-8 text-sm bg-white hover:bg-[#00E7FF] text-black hover:shadow-[0_4px_15px_rgba(0,231,255,0.25)] hover:-translate-y-0.5 overflow-hidden group btn-white"
              >
                <div className="text-slide-container">
                  <span className="text-slide-normal">Get Started For Free</span>
                  <span className="text-slide-hover">Get Started For Free</span>
                </div>
              </Link>
              <div className="text-xs text-[#9CA3AF] mt-4">
                No credit card required
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 