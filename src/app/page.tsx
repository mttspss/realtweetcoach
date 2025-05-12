'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart2, 
  Users, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  UploadCloud, 
  MessageSquare, 
  Target, 
  Star, 
  Calendar, 
  ShieldCheck, 
  HelpCircle,
  Check,
  ChevronRight
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

const features = [
  {
    icon: <BarChart2 size={18} className="text-accent" />, 
    title: 'AI Analytics',
    desc: 'Advanced insights on your Twitter growth with clean dashboard and real data.'
  },
  {
    icon: <Users size={18} className="text-accent" />, 
    title: 'Audience Growth',
    desc: 'Discover content that works and grow your followers organically.'
  },
  {
    icon: <TrendingUp size={18} className="text-accent" />, 
    title: 'Performance Tracking',
    desc: 'Monitor tweets, engagement and growth with simple, dynamic metrics.'
  },
  {
    icon: <Zap size={18} className="text-accent" />, 
    title: 'Smart Recommendations',
    desc: 'Personalized suggestions to improve your Twitter strategy.'
  },
  {
    icon: <CheckCircle size={18} className="text-accent" />, 
    title: 'Engagement Boost',
    desc: 'Learn when and what to post to maximize interactions.'
  },
  {
    icon: <UploadCloud size={18} className="text-accent" />, 
    title: 'CSV Upload',
    desc: 'Upload your Twitter data via CSV and get instant analytics.'
  },
];

const benefits = [
  { 
    icon: <Star size={18} className="text-accent" />, 
    title: 'Increased Efficiency', 
    desc: 'Automate and save time with smart tools.' 
  },
  { 
    icon: <MessageSquare size={18} className="text-accent" />, 
    title: 'Enhanced Collaboration', 
    desc: 'Work with your team in real-time.' 
  },
  { 
    icon: <ShieldCheck size={18} className="text-accent" />, 
    title: 'Security', 
    desc: 'Your data is always protected and private.' 
  },
  { 
    icon: <Calendar size={18} className="text-accent" />, 
    title: 'AI Scheduling', 
    desc: 'Get suggestions and schedule tweets automatically.' 
  },
];

const pricing = [
  { 
    plan: 'Free Plan', 
    price: '$0',
    yearlyPrice: '$0',
    period: 'per user / month',
    yearlyPeriod: 'per user / month',
    desc: 'Basic plan',
    badge: '',  
    features: [
      'Task Management',
      'Data Encryption',
      'Deadline Alerts',
      'Collaboration Tools',
      'Task Management',
      'Custom Workflows',
      'Real-Time Sync'
    ],
    activeFeatures: 3,
    cta: 'Get Started',
    disabled: false,
    buttonStyle: 'dark'
  },
  { 
    plan: 'Pro Plan', 
    price: '$12',
    yearlyPrice: '$10',
    period: 'per user / month',
    yearlyPeriod: 'per user / month',
    desc: '',
    badge: 'Most Popular', 
    features: [
      'Task Management',
      'Data Encryption',
      'Deadline Alerts',
      'Collaboration Tools',
      'Task Management',
      'Custom Workflows',
      'Real-Time Sync'
    ],
    activeFeatures: 7,
    cta: 'Get Started',
    disabled: false,
    buttonStyle: 'white'
  },
  { 
    plan: 'Advanced Plan', 
    price: '$19',
    yearlyPrice: '$16',
    period: 'per user / month',
    yearlyPeriod: 'per user / month',
    desc: '',
    badge: '',
    features: [
      'Task Management',
      'Data Encryption',
      'Deadline Alerts',
      'Collaboration Tools',
      'Task Management',
      'Custom Workflows',
      'Real-Time Sync'
    ],
    activeFeatures: 7,
    cta: 'Get Started',
    disabled: false,
    buttonStyle: 'dark'
  },
];

const faqs = [
  { 
    q: 'How does Tweetcoa.ch work?', 
    a: 'Connect your Twitter account or upload CSV data to get personalized insights and suggestions.' 
  },
  { 
    q: 'Can I use the free version?', 
    a: 'We offer different plans to fit your needs. Choose the plan that works best for you.' 
  },
  { 
    q: 'Is my data secure?', 
    a: 'Yes. All data is encrypted and never shared with third parties.' 
  },
  { 
    q: 'What kind of CSV files can I upload?', 
    a: 'You can upload Twitter Analytics exports or any CSV with engagement metrics.' 
  },
  { 
    q: 'Do you offer team collaboration?', 
    a: 'Yes, our Pro plan includes advanced team collaboration features.' 
  },
];

// Immagini di background in stile Suprema
const backgroundScreens = [
  // Left side screens
  {
    title: 'Productivity Reports',
    style: 'top-[15%] left-[5%] rotate-[-8deg] w-[300px] opacity-80 z-0',
    color: 'from-accent/30 to-accent/10',
    type: 'chart'
  },
  {
    title: 'Activity Monitor',
    style: 'top-[42%] left-[5%] rotate-[-5deg] w-[280px] opacity-80 z-0',
    color: 'from-accent/40 to-accent/5',
    type: 'list',
    image: '/images/activity-monitor.svg'
  },
  {
    title: 'Tweet Performance',
    style: 'bottom-[15%] left-[10%] rotate-[-4deg] w-[280px] opacity-80 z-0',
    color: 'from-accent/25 to-accent/5',
    type: 'chart'
  },
  
  // Right side screens
  {
    title: 'Analytics Dashboard',
    style: 'top-[16%] right-[5%] rotate-[6deg] w-[300px] opacity-30 z-0',
    color: 'from-accent/30 to-accent/5',
    type: 'dashboard',
    image: '/images/analytics-dashboard.svg'
  },
  {
    title: 'Content Optimization',
    style: 'top-[48%] right-[5%] rotate-[2deg] w-[280px] opacity-80 z-0',
    color: 'from-accent/20 to-accent/5',
    type: 'feature',
    image: '/images/content-optimizer.svg'
  },
  {
    title: 'Engagement Metrics',
    style: 'bottom-[15%] right-[10%] rotate-[3deg] w-[280px] opacity-100 z-0',
    color: 'from-accent/35 to-accent/5',
    type: 'dashboard'
  }
];

// Statistiche utilizzate dopo la hero section
const stats = [
  { value: '87%', label: 'Increase in Engagement' },
  { value: '12.4K+', label: 'Active Users' },
  { value: '500K+', label: 'Tweets Analyzed' },
];

export default function HomePage() {
  const [isYearly, setIsYearly] = React.useState(false);
  const [individualYearly, setIndividualYearly] = React.useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  // Generazione ottimizzata dei punti animati
  const animatedDots = React.useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      // Dimensione variabile per simulare la profondità
      const size = Math.random() * 3 + 0.8;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Più il punto è grande, più veloce si muove (effetto parallasse)
      const speedFactor = size / 2;
      const duration = (Math.random() * 10 + 15) / speedFactor;
      const delay = Math.random() * 5;
      
      // I punti più grandi si muovono più lontano
      const moveX = (Math.random() * 30 - 15) * speedFactor;
      const moveY = (Math.random() * 30 - 15) * speedFactor;
      
      // I punti più grandi sono leggermente più luminosi
      const opacityBase = 0.2 + (size / 10);
      const opacityPeak = opacityBase + 0.2;
      
      return (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
            boxShadow: size > 2 ? `0 0 ${size}px rgba(255, 255, 255, 0.3)` : 'none'
          }}
          initial={{ opacity: 0 }}
          animate={{
            x: [0, moveX, 0],
            y: [0, moveY, 0],
            opacity: [opacityBase, opacityPeak, opacityBase]
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror"
          }}
        />
      );
    });
  }, []);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
    // Also update individual toggles to match the main toggle
    setIndividualYearly({
      'Pro Plan': !isYearly,
      'Advanced Plan': !isYearly
    });
  };

  const toggleIndividualBilling = (plan: string) => {
    setIndividualYearly({
      ...individualYearly,
      [plan]: !individualYearly[plan]
    });
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      {/* Elementi decorativi in stile Suprema */}
      <div className="suprema-glow absolute top-[10%] right-[10%] w-[400px] h-[400px] --glow-color:rgba(0,231,255,0.03); --blur-amount:80px; --opacity:0.6;"></div>
      <div className="suprema-glow absolute bottom-[15%] left-[5%] w-[300px] h-[300px] --glow-color:rgba(29,139,255,0.05); --blur-amount:60px; --opacity:0.5;"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-[100vh] pt-24 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background pattern with dot grid - animated */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Static grid base */}
            <div className="absolute inset-0 bg-grid opacity-15"></div>
            
            {/* Animated dots */}
            <div className="absolute inset-0 overflow-hidden">
              {animatedDots}
            </div>
          </div>
        </div>
        
        {/* Background UI elements like Suprema */}
        {backgroundScreens.map((screen, i) => (
          <motion.div 
            key={i}
            className={`absolute ${screen.style} hidden lg:block pointer-events-none`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: [0, i % 2 === 0 ? -3 : 3, 0],
              rotate: [0, i % 2 === 0 ? -0.7 : 0.7, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 + i * 0.1 },
              y: { duration: 0.8, delay: 0.2 + i * 0.1 },
              x: { repeat: Infinity, duration: 8, ease: "easeInOut", repeatType: "mirror" },
              rotate: { repeat: Infinity, duration: 10, ease: "easeInOut", repeatType: "mirror" }
            }}
          >
            <div className="suprema-frame bg-black/80 backdrop-blur-sm shadow-lg border border-white/20">
              {/* Header bar */}
              <div className="px-3.5 py-2.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs text-white/80">{screen.title}</span>
                </div>
                <div className="flex space-x-1.5">
                  {screen.type === 'dashboard' && (
                    <div className="flex items-center space-x-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[7px]">⌘</span>
                      </div>
                      <div className="w-3.5 h-3.5 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[7px]">⌘</span>
                      </div>
                    </div>
                  )}
                  <div className="w-3.5 h-3.5 rounded bg-white/5 flex items-center justify-center">
                    <span className="text-[7px]">⌘</span>
                  </div>
                </div>
              </div>
              
              {/* Content based on type */}
              <div className="p-3.5">
                {screen.image ? (
                  <Image 
                    src={screen.image} 
                    alt={screen.title} 
                    width={300} 
                    height={150} 
                    className="w-full object-contain"
                  />
                ) : screen.type === 'chart' ? (
                  <div>
                    {/* Circular charts for productivity */}
                    {screen.title === 'Productivity Reports' ? (
                      <div className="flex space-x-4 h-[100px]">
                        <div className="relative flex-1 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                          <div className="absolute bottom-0 left-0 right-0 rounded-full border-4 border-[#00E7FF]/70" style={{height: '80%', borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}></div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-white">80%</div>
                            <div className="text-[9px] text-white/60">Productivity</div>
                          </div>
                        </div>
                        <div className="relative flex-1 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                          <div className="absolute bottom-0 left-0 right-0 rounded-full border-4 border-[#00E7FF]/70" style={{height: '65%', borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}></div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-white">65%</div>
                            <div className="text-[9px] text-white/60">Productivity</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[80px] flex items-end space-x-0.5">
                        {[40, 65, 55, 80, 60, 45, 75, 90, 85, 70, 80, 95].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-accent to-accent/80 rounded-t-sm" style={{height: `${h}%`}}></div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : screen.type === 'list' ? (
                  <div className="space-y-1.5">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center py-1 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-white/10 mr-2"></div>
                        <div className="flex-1">
                          <div className="h-1.5 w-3/4 bg-white/10 rounded"></div>
                        </div>
                        <div className="text-[8px] text-white/40">1m ago</div>
                      </div>
                    ))}
                  </div>
                ) : screen.type === 'dashboard' ? (
                  <div className="space-y-2">
                    {screen.title === 'Engagement Metrics' ? (
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="text-[10px] text-white/80">Weekly Engagement</div>
                          <div className="text-[10px] text-[#00E7FF]">+24%</div>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <div className="text-[8px] text-white/60">Likes</div>
                            <div className="flex-1 mx-2">
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00E7FF]/70 rounded-full" style={{width: '78%'}}></div>
                              </div>
                            </div>
                            <div className="text-[8px] text-white/80">78%</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-[8px] text-white/60">Retweets</div>
                            <div className="flex-1 mx-2">
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00E7FF]/70 rounded-full" style={{width: '52%'}}></div>
                              </div>
                            </div>
                            <div className="text-[8px] text-white/80">52%</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-[8px] text-white/60">Replies</div>
                            <div className="flex-1 mx-2">
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00E7FF]/70 rounded-full" style={{width: '34%'}}></div>
                              </div>
                            </div>
                            <div className="text-[8px] text-white/80">34%</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-full h-[50px] bg-white/5 rounded-md mb-2"></div>
                        <div className="flex space-x-2">
                          <div className="w-1/2 h-[20px] bg-white/5 rounded"></div>
                          <div className="w-1/2 h-[20px] bg-white/5 rounded"></div>
                        </div>
                      </>
                    )}
                  </div>
                ) : screen.type === 'feature' ? (
                  <div>
                    <div className="mb-1.5 text-[10px] text-white/80">Content Optimization</div>
                    <div className="text-[8px] text-white/50 mb-1.5">AI-powered suggestions to improve engagement</div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-5 h-4 rounded bg-white/10 flex items-center justify-center">
                        <span className="text-[7px] text-white/70">AI</span>
                      </div>
                      <div className="w-5 h-4 rounded bg-white/10 flex items-center justify-center">
                        <span className="text-[7px] text-white/70">📈</span>
                      </div>
                      <div className="w-5 h-4 rounded bg-white/10 flex items-center justify-center">
                        <span className="text-[7px] text-white/70">💬</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Central Hero Content - Suprema style */}
        <div className="container relative z-20 px-4 mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm text-[#00E7FF] text-xs font-medium">
                <Zap size={12} className="mr-1.5 text-[#00E7FF]" />
                Twitter Growth Made Simple
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            >
              Grow your Twitter <br />
              with <span className="gradient-text">data-driven</span> insights.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-100 max-w-lg mb-8 text-base md:text-lg"
            >
              Analyze your Twitter data, get AI-powered tweet suggestions, and track growth—all in one powerful platform.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center rounded-full font-medium transition-colors h-12 px-8 text-sm bg-white hover:bg-[#00E7FF] hover:text-black text-black"
              >
                Get Started
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center rounded-full font-medium transition-colors h-12 px-8 text-sm border border-[#00E7FF]/30 hover:border-[#00E7FF] hover:bg-black/30 text-white"
              >
                View Dashboard <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted by Section - Right after hero like Suprema */}
      <section className="pt-2 pb-2">
        <div className="container-tight text-center">
          <p className="text-gray-200 text-sm mb-2">
            Trusted by 50,000+ creators and businesses for Twitter growth and analytics.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container-small">
          <div className="glass-card">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-card-border">
              {stats.map((stat, i) => (
                <div key={i} className="p-5 text-center">
                  <p className="text-2xl font-bold neon-text mb-1">{stat.value}</p>
                  <p className="text-sm text-primary-darker">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-16">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Product Overview</h2>
            <p className="text-primary-darker max-w-2xl mx-auto">
              See exactly what you get: a powerful dashboard with real Twitter analytics, actionable insights, and AI-powered growth tips.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 flex justify-center">
              <img src="/images/dashboard-mockup.svg" alt="Dashboard Preview" className="rounded-2xl shadow-lg w-full max-w-2xl border border-white/10 bg-black/30" />
            </div>
            <div className="flex-1 flex flex-col gap-6 max-w-md">
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">All-in-one Analytics</h3>
                  <p className="text-primary-darker text-sm">Track followers, impressions, engagement and more in a single dashboard.</p>
                </div>
              </div>
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Performance Insights</h3>
                  <p className="text-primary-darker text-sm">Visualize tweet performance and discover what works best for your audience.</p>
                </div>
              </div>
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3.13a4 4 0 0 1 0 7.75M12 21v-4M8 17v-4M16 17v-4M12 13V9"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">AI Growth Tips</h3>
                  <p className="text-primary-darker text-sm">Get actionable recommendations to grow your Twitter account faster.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Growth Assistant Section */}
      <section className="py-16">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">AI Growth Assistant</h2>
            <p className="text-primary-darker max-w-2xl mx-auto">
              Chat with your personal AI assistant to create growth plans, analyze your Twitter data, discuss strategy, and automate your tasks—all in one place.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 flex justify-center">
              {/* Chat mockup realistica */}
              <div className="bg-[#181E2A] rounded-2xl p-6 w-full max-w-xl shadow-lg border border-white/10 flex flex-col">
                {/* Header chat */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="9"/><path d="M10 6v4l2 2"/></svg>
                  </div>
                  <div className="text-white font-medium">AI Growth Assistant</div>
                  <div className="ml-auto w-3 h-3 rounded-full bg-green-400" title="Online"></div>
                </div>
                {/* Chat bubbles */}
                <div className="flex flex-col gap-2">
                  {/* User */}
                  <div className="self-start max-w-[75%]">
                    <div className="bg-[#232B3A] text-cyan-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                      Can you create a growth plan?
                    </div>
                  </div>
                  {/* AI */}
                  <div className="self-end max-w-[75%]">
                    <div className="bg-cyan-500/10 text-cyan-200 px-4 py-2 rounded-2xl rounded-br-sm text-sm">
                      Absolutely! Here's a tailored plan for your account 🚀
                    </div>
                  </div>
                  {/* User */}
                  <div className="self-start max-w-[75%]">
                    <div className="bg-[#232B3A] text-cyan-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                      Analyze my Twitter CSV
                    </div>
                  </div>
                  {/* AI */}
                  <div className="self-end max-w-[75%]">
                    <div className="bg-cyan-500/10 text-cyan-200 px-4 py-2 rounded-2xl rounded-br-sm text-sm">
                      CSV processed! Here are your key insights 📊
                    </div>
                  </div>
                  {/* User */}
                  <div className="self-start max-w-[75%]">
                    <div className="bg-[#232B3A] text-cyan-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                      What's the best strategy?
                    </div>
                  </div>
                  {/* AI */}
                  <div className="self-end max-w-[75%]">
                    <div className="bg-cyan-500/10 text-cyan-200 px-4 py-2 rounded-2xl rounded-br-sm text-sm">
                      Let's discuss your goals and audience for a custom strategy.
                    </div>
                  </div>
                  {/* AI Task Manager */}
                  <div className="self-end max-w-[75%]">
                    <div className="bg-cyan-500/10 text-cyan-200 px-4 py-2 rounded-2xl rounded-br-sm text-sm">
                      Automatic task manager enabled: your growth tasks are ready ✅
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-6 max-w-md">
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M8 12l4-4 4 4"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Growth Plan Creation</h3>
                  <p className="text-primary-darker text-sm">Let the AI build a personalized growth plan tailored to your Twitter goals.</p>
                </div>
              </div>
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">CSV Analysis</h3>
                  <p className="text-primary-darker text-sm">Upload your Twitter Analytics CSV and get instant, actionable insights from the AI.</p>
                </div>
              </div>
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="8" rx="2"/></svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Strategy Conversation</h3>
                  <p className="text-primary-darker text-sm">Discuss your audience, content, and goals to get a custom strategy from the AI.</p>
                </div>
              </div>
              <div className="glass-card flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <svg width="24" height="24" fill="none" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Automatic Task Manager</h3>
                  <p className="text-primary-darker text-sm">Let the AI generate and manage your growth tasks automatically, so you can focus on what matters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Key Features</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Everything you need to grow on Twitter, beautifully designed and easy to use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card hover:-translate-y-1 transition-all"
              >
                <div className="mb-3 p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                  {feature.icon}
                </div>
                <h3 className="font-medium mb-1.5 text-white">{feature.title}</h3>
                <p className="text-gray-200 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16">
        <div className="container-small">
          <div className="glass-card p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Growth Overview</h3>
                <p className="text-primary-darker text-sm mb-4">Track your growth with clean, visual analytics.</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-primary-darker mb-1">
                      <span>Tweets</span><span className="text-accent">+12%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-start/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full neon-glow" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-primary-darker mb-1">
                      <span>Likes</span><span className="text-accent">+28%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-start/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full neon-glow" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-primary-darker mb-1">
                      <span>Followers</span><span className="text-accent">+17%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background-start/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full neon-glow" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full h-32 md:h-40 bg-background-start/60 rounded-lg flex items-end gap-1 p-3">
                  {[38, 42, 35, 50, 45, 52, 48, 58, 63, 68, 64, 72, 70, 75, 82, 78, 80, 85].map((h, i) => (
                    <div key={i} className="flex-1">
                      <div className="bg-gradient-to-t from-accent/80 to-accent/40 rounded-t" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Why Choose Tweetcoa.ch</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Maximize your Twitter potential with tools designed for creators and businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card text-center hover:-translate-y-1 transition-all"
              >
                <div className="mx-auto mb-3 p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                  {benefit.icon}
                </div>
                <h3 className="font-medium mb-1 text-white">{benefit.title}</h3>
                <p className="text-gray-200 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-16">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="mb-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-background-start/60 border border-card-border backdrop-blur-sm text-accent text-xs font-medium">
                  Progress Tracking
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Monitor Your Growth Faster Than Ever</h2>
              <p className="text-primary-darker mb-6">
                Instantly access real-time updates to track your Twitter progress and make quick adjustments to your strategy.
              </p>
              <div className="grid grid-cols-2 gap-5 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background-start/60 flex items-center justify-center">
                    <Check size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-white">Visual analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background-start/60 flex items-center justify-center">
                    <Check size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-white">Growth heatmaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background-start/60 flex items-center justify-center">
                    <Check size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-white">Performance badges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background-start/60 flex items-center justify-center">
                    <Check size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-white">Real-time updates</span>
                </div>
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover"
              >
                Start tracking today <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="glass-card p-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/tracking-preview.jpg"
                  alt="Progress Tracking"
                  fill
                  className="object-cover"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How TweetCoa.ch Works Section - con stesso pattern dell'hero section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-grid opacity-15"></div>
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How TweetCoa.ch Works</h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Everything you need to analyze, plan, and grow on Twitter
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            {/* Main dashboard container */}
            <WorkingSteps />
            {/* Call to action */}
            <div className="mt-16 text-center">
              <Link href="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-accent px-6 py-3 rounded-full text-white font-medium hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                Try It Now <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - con stesso pattern dell'hero section */}
      <section className="py-16 relative" id="pricing">
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-grid opacity-15"></div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Affordable Pricing Plans</h2>
            <p className="text-gray-200 max-w-xl mx-auto">Choose the perfect plan for your needs and start growing your social media presence today.</p>
          </div>
          
          {/* Billing toggle */}
          <div className="flex justify-center items-center mb-10">
            <div className="flex items-center space-x-3 bg-black/40 border border-white/10 rounded-full p-1 backdrop-blur-sm">
              <button 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isYearly ? 'bg-[#00E7FF] text-black' : 'text-white/70'
                }`}
                onClick={() => toggleBilling()}
              >
                Monthly
              </button>
              <button 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isYearly ? 'bg-[#00E7FF] text-black' : 'text-white/70'
                }`}
                onClick={() => toggleBilling()}
              >
                Billed yearly
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, i) => {
              const isThisPlanYearly = plan.plan !== 'Free Plan' && 
                (isYearly || individualYearly[plan.plan]);
              
              return (
                <div 
                  key={i} 
                  className="relative rounded-2xl border border-white/20 glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(0,231,255,0.15)]"
                >
                  {plan.badge && (
                    <div className="absolute top-4 right-4 bg-zinc-800/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{plan.plan}</h3>
                    
                    <div className="mb-5">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-white">
                          {isThisPlanYearly ? plan.yearlyPrice : plan.price}
                        </span>
                        <span className="text-gray-200 ml-2">
                          {isThisPlanYearly ? plan.yearlyPeriod : plan.period}
                        </span>
                      </div>
                      {plan.desc && (
                        <p className="text-gray-200 mt-2 text-sm">{plan.desc}</p>
                      )}
                    </div>
                    
                    {/* Yearly toggle */}
                    {plan.plan !== 'Free Plan' && (
                      <div className="flex items-center mb-4">
                        <button 
                          onClick={() => toggleIndividualBilling(plan.plan)}
                          className="w-10 h-6 bg-gray-700/50 backdrop-blur-sm rounded-full p-1 flex items-center cursor-pointer"
                        >
                          <div 
                            className={`w-4 h-4 rounded-full transition-all ${
                              individualYearly[plan.plan] ? 'translate-x-4' : 'translate-x-0'
                            } bg-white`}
                          ></div>
                        </button>
                        <span className="ml-2 text-gray-200 text-sm">Billed yearly</span>
                      </div>
                    )}
                    
                    <button 
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mb-4 ${
                        plan.buttonStyle === 'white'
                          ? 'bg-white text-black' 
                          : 'bg-black/50 backdrop-blur-sm text-white border border-white/20'
                      }`}
                      disabled={plan.disabled}
                    >
                      {plan.cta}
                    </button>
                  </div>
                  
                  <div className="border-t border-white/10 p-6">
                    <h4 className="font-medium text-white mb-4">What's Included</h4>
                    <div className="space-y-3">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-start">
                          <div className={j < plan.activeFeatures ? "text-[#00E7FF]" : "text-gray-500"}>
                            <Check size={18} />
                          </div>
                          <span className={`ml-2 text-sm ${j < plan.activeFeatures ? "text-white" : "text-gray-500"}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section - con stesso pattern dell'hero section */}
      <section id="faq" className="py-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-grid opacity-15"></div>
          </div>
        </div>
        <div className="container-small relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Get answers to common questions about Tweetcoa.ch.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h3 className="text-base font-medium text-white">{faq.q}</h3>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-background-start/60">
                    <span className="text-white text-lg">{openFaq === i ? '-' : '+'}</span>
                  </div>
                </div>
                {openFaq === i && (
                  <p className="text-sm text-gray-200 mt-3">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-200 mb-2">
              Still have questions?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover"
            >
              Contact our support team <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function WorkingSteps() {
  const [activeStep, setActiveStep] = React.useState(2); // Terzo step attivo di default
  
  // Contenuto degli step in stile Landio
  const steps = [
    {
      number: "01",
      title: "Start by Entering Your Data",
      description: "Easily upload your marketing data or integrate your CRM, social media, and email platforms. Our AI effortlessly syncs and organizes everything for a smooth analysis process."
    },
    {
      number: "02",
      title: "Analyze & Optimize using AI",
      description: "Unlock the power of AI to analyze and optimize your marketing data. Our AI automatically processes and enhances your data for better insights, driving smarter decisions and improved results."
    },
    {
      number: "03",
      title: "Get Clear Insights",
      description: "Receive meaningful, actionable results from your data. Our AI delivers insights that are ready to be acted upon, helping you make informed decisions and achieve your goals."
    }
  ];

  return (
    <div className="bg-[#080808] border border-[#1A1A1A] rounded-2xl overflow-hidden">
      {/* Tab navigation full-width con stile Landio */}
      <div className="grid grid-cols-3 gap-px">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`py-4 text-center transition-all duration-200 ${
              activeStep === index 
                ? 'bg-[#111] text-white' 
                : 'bg-[#090909] text-white/40 hover:text-white/70'
            }`}
            onClick={() => setActiveStep(index)}
          >
            <span className="text-sm font-medium">STEP {index + 1}</span>
          </button>
        ))}
      </div>
      
      {/* Contenuto principale con dashboard a sinistra e testo a destra */}
      <div className="flex min-h-[450px]">
        {/* Dashboard section (60%) */}
        <div className="w-[60%] p-6 relative">
          {activeStep === 2 && (
            <div className="h-full flex flex-col">
              {/* Top metrics cards */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Customers</span>
                    <span className="text-xs text-green-400">+ Growth</span>
                  </div>
                  <div className="text-white text-2xl font-semibold mb-2">86%</div>
                  <div className="h-8 w-full">
                    <svg className="w-full h-full" viewBox="0 0 120 30" preserveAspectRatio="none">
                      <path 
                        d="M0,20 C5,18 10,22 15,15 C20,8 25,25 30,20 C35,15 40,12 45,15 C50,18 55,10 60,15 C65,20 70,25 75,20 C80,15 85,10 90,12 C95,14 100,20 105,18 C110,16 115,10 120,8" 
                        fill="none" 
                        stroke="#00E7FF" 
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Profit gain</span>
                    <span className="text-xs text-green-400">+ Growth</span>
                  </div>
                  <div className="text-white text-2xl font-semibold mb-2">54%</div>
                  <div className="h-8 w-full">
                    <svg className="w-full h-full" viewBox="0 0 120 30" preserveAspectRatio="none">
                      <path 
                        d="M0,15 C5,18 10,12 15,14 C20,16 25,20 30,18 C35,16 40,10 45,8 C50,6 55,15 60,18 C65,21 70,10 75,12 C80,14 85,18 90,15 C95,12 100,8 105,10 C110,12 115,15 120,12" 
                        fill="none" 
                        stroke="#00E7FF" 
                        strokeWidth="1.5"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Middle metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A]">
                  <div className="text-xs text-gray-400 mb-1">Sales</div>
                  <div className="flex items-center">
                    <span className="text-white text-xl font-semibold">$103,430</span>
                    <span className="ml-2 text-xs text-green-400">+5%</span>
                  </div>
                  <div className="w-full h-px bg-[#1A1A1A] my-2"></div>
                </div>
                
                <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A]">
                  <div className="text-xs text-gray-400 mb-1">New Clients</div>
                  <div className="flex items-center">
                    <span className="text-white text-xl font-semibold">2,300</span>
                    <span className="ml-2 text-xs text-green-400">+20%</span>
                  </div>
                  <div className="w-full h-px bg-[#1A1A1A] my-2"></div>
                </div>
              </div>
              
              {/* Weakest Topics panel */}
              <div className="mt-auto">
                <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A]">
                  <div className="text-sm text-white mb-3">Weakest Topics</div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18 9l-5-5-4 4-3 3" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Marketing & ads
                        </div>
                        <span className="text-gray-400">64% Score</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00E7FF]" style={{width: '64%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00E7FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          AI Automation
                        </div>
                        <span className="text-gray-400">58% Score</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00E7FF]" style={{width: '58%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Money & Finance
                        </div>
                        <span className="text-gray-400">74% Score</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00E7FF]" style={{width: '74%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeStep === 0 && (
            <div className="h-full flex flex-col">
              {/* Placeholder for step 1 */}
              <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A] h-full flex flex-col">
                <div className="text-sm text-white mb-3">Step 1 Dashboard</div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-3 text-[#00E7FF]" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-400 text-sm">Upload your marketing data here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeStep === 1 && (
            <div className="h-full flex flex-col">
              {/* Placeholder for step 2 */}
              <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1A1A1A] h-full flex flex-col">
                <div className="text-sm text-white mb-3">Step 2 Dashboard</div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-3 text-[#00E7FF]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-400 text-sm">Analyzing your data with AI</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Text section (40%) */}
        <div className="w-[40%] p-10 flex flex-col justify-center">
          <div className="text-[#00E7FF] font-medium text-lg mb-2">
            {steps[activeStep].number}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {steps[activeStep].title}
          </h3>
          <p className="text-gray-300 text-base leading-relaxed">
            {steps[activeStep].description}
          </p>
        </div>
      </div>
    </div>
  );
}
