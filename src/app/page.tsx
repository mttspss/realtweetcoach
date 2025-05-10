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
    plan: 'Free', 
    price: '€0', 
    desc: 'For beginners', 
    features: [
      'Basic dashboard',
      '1 CSV upload per month',
      'Basic analytics',
      'Email support'
    ], 
    cta: 'Start Free', 
    highlighted: false 
  },
  { 
    plan: 'Creator', 
    price: '€12', 
    desc: 'For creators and influencers', 
    features: [
      'Everything in Free',
      'Unlimited CSV uploads',
      'AI tweet suggestions',
      'Advanced analytics',
      'Priority support'
    ], 
    cta: 'Try Creator', 
    highlighted: true 
  },
  { 
    plan: 'Pro', 
    price: '€29', 
    desc: 'For teams and businesses', 
    features: [
      'Everything in Creator',
      'Team collaboration',
      'Advanced AI insights',
      'Dedicated account manager',
      'Custom reporting'
    ], 
    cta: 'Get Pro', 
    highlighted: false
  },
];

const faqs = [
  { 
    q: 'How does Tweetcoa.ch work?', 
    a: 'Connect your Twitter account or upload CSV data to get personalized insights and suggestions.' 
  },
  { 
    q: 'Can I use the free version?', 
    a: 'Absolutely! You can start with the free plan and upgrade when needed.' 
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
  {
    title: 'Productivity Reports',
    style: 'top-[60%] left-[10%] rotate-[-8deg] w-[400px] opacity-70',
    color: 'from-accent/30 to-accent/10',
    type: 'chart'
  },
  {
    title: 'Activity Monitor',
    style: 'top-[30%] left-[4%] rotate-[-5deg] w-[320px] opacity-60',
    color: 'from-accent/40 to-accent/5',
    type: 'list'
  },
  {
    title: 'Analytics Dashboard',
    style: 'top-[70%] right-[8%] rotate-[6deg] w-[420px] opacity-75',
    color: 'from-accent/30 to-accent/5',
    type: 'dashboard'
  },
  {
    title: 'Keyboard-first design',
    style: 'top-[20%] right-[7%] rotate-[5deg] w-[300px] opacity-60',
    color: 'from-accent/20 to-accent/5',
    type: 'feature',
    flag: '🇺🇸'
  },
  {
    title: 'Tweet Performance',
    style: 'bottom-[12%] left-[40%] rotate-[-4deg] w-[350px] opacity-60',
    color: 'from-accent/25 to-accent/5',
    type: 'chart'
  },
];

// Statistiche utilizzate dopo la hero section
const stats = [
  { value: '87%', label: 'Increase in Engagement' },
  { value: '12.4K+', label: 'Active Users' },
  { value: '500K+', label: 'Tweets Analyzed' },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      {/* Elementi decorativi in stile Suprema */}
      <div className="suprema-glow absolute top-[10%] right-[10%] w-[400px] h-[400px] --glow-color:rgba(0,231,255,0.03); --blur-amount:80px; --opacity:0.6;"></div>
      <div className="suprema-glow absolute bottom-[15%] left-[5%] w-[300px] h-[300px] --glow-color:rgba(29,139,255,0.05); --blur-amount:60px; --opacity:0.5;"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-[100vh] pt-24 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background pattern with dot grid */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        
        {/* Background UI elements like Suprema */}
        {backgroundScreens.map((screen, i) => (
          <div 
            key={i}
            className={`absolute ${screen.style} hidden md:block`}
          >
            <div className="suprema-frame bg-black/60">
              {/* Header bar */}
              <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center">
                  {screen.flag && <span className="mr-2 text-xs">{screen.flag}</span>}
                  <span className="text-xs text-primary-darker">{screen.title}</span>
                </div>
                <div className="flex space-x-1">
                  {screen.type === 'dashboard' && (
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[8px]">⌘</span>
                      </div>
                      <div className="w-4 h-4 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[8px]">⌘</span>
                      </div>
                    </div>
                  )}
                  <div className="w-4 h-4 rounded bg-white/5 flex items-center justify-center">
                    <span className="text-[8px]">⌘</span>
                  </div>
                </div>
              </div>
              
              {/* Content based on type */}
              <div className="p-3">
                {screen.type === 'chart' && (
                  <div>
                    {/* Circular charts for productivity */}
                    {screen.title === 'Productivity Reports' ? (
                      <div className="flex space-x-4 h-[150px]">
                        <div className="relative flex-1 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
                          <div className="absolute bottom-0 left-0 right-0 rounded-full border-8 border-[#00E7FF]/70" style={{height: '80%', borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}></div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">80%</div>
                            <div className="text-[10px] text-primary-darker">Productivity</div>
                          </div>
                        </div>
                        <div className="relative flex-1 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
                          <div className="absolute bottom-0 left-0 right-0 rounded-full border-8 border-[#00E7FF]/70" style={{height: '65%', borderTop: 'none', borderRight: 'none', borderLeft: 'none'}}></div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">65%</div>
                            <div className="text-[10px] text-primary-darker">Productivity</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[120px] flex items-end space-x-1">
                        {[40, 65, 55, 80, 60, 45, 75, 90, 85, 70, 80, 95].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-[#00E7FF]/80 to-[#00E7FF]/20" style={{height: `${h}%`}}></div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {screen.type === 'list' && (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center py-1 border-b border-white/5">
                        <div className="w-4 h-4 rounded-full bg-white/5 mr-2"></div>
                        <div className="flex-1">
                          <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                        </div>
                        <div className="text-[10px] text-primary-darker/70">1m ago</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {screen.type === 'dashboard' && (
                  <div className="space-y-2">
                    <div className="w-full h-[80px] bg-white/5 rounded mb-2"></div>
                    <div className="flex space-x-2">
                      <div className="w-1/2 h-[40px] bg-white/5 rounded"></div>
                      <div className="w-1/2 h-[40px] bg-white/5 rounded"></div>
                    </div>
                  </div>
                )}
                
                {screen.type === 'feature' && (
                  <div>
                    <div className="mb-2 text-xs text-white">Keyboard-first design</div>
                    <div className="text-[10px] text-primary-darker mb-2">Shortcuts for everything - no mouse required</div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-6 h-5 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[8px] text-primary-darker">K</span>
                      </div>
                      <div className="w-6 h-5 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[8px] text-primary-darker">S</span>
                      </div>
                      <div className="w-6 h-5 rounded bg-white/5 flex items-center justify-center">
                        <span className="text-[8px] text-primary-darker">⌘</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Central Hero Content - Suprema style */}
        <div className="container relative z-10 px-4 mx-auto max-w-4xl">
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
              className="text-primary-darker max-w-lg mb-8 text-base md:text-lg"
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
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors h-12 px-6 text-sm bg-white hover:bg-[#00E7FF] hover:text-black text-black"
              >
                Get Started For Free
              </Link>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors h-12 px-6 text-sm border border-white/10 hover:bg-black/30 text-white"
              >
                View Dashboard <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <div className="text-xs text-primary-darker mt-2">
              No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section - Right after hero like Suprema */}
      <section className="pt-4 pb-16">
        <div className="container-tight text-center">
          <p className="text-primary-darker text-sm mb-10">
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

      {/* Product Overview */}
      <section id="overview" className="py-16">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Product Overview</h2>
            <p className="text-primary-darker max-w-2xl mx-auto">
              Explore Tweetcoa.ch's powerful features designed to streamline Twitter growth,
              enhance engagement, and optimize your content strategy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="glass-card p-5 hover:-translate-y-1 transition-all">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                    <UploadCloud size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">CSV Data Analysis</h3>
                    <p className="text-primary-darker text-sm">Upload your Twitter data and get instant, actionable insights.</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-5 hover:-translate-y-1 transition-all">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                    <BarChart2 size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Growth Metrics</h3>
                    <p className="text-primary-darker text-sm">Track followers, engagement and reach with visual analytics.</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-5 hover:-translate-y-1 transition-all">
                <div className="flex gap-4">
                  <div className="p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                    <Zap size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">AI Suggestions</h3>
                    <p className="text-primary-darker text-sm">Get content ideas and optimization tips powered by AI.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/feature-preview.jpg"
                  alt="Tweetcoa.ch Features"
                  fill
                  className="object-cover"
                  style={{ objectFit: 'cover' }}
                />
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
            <p className="text-primary-darker max-w-2xl mx-auto">
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
                className="glass-card p-5 hover:-translate-y-1 transition-all"
              >
                <div className="mb-3 p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                  {feature.icon}
                </div>
                <h3 className="font-medium mb-1.5 text-white">{feature.title}</h3>
                <p className="text-primary-darker text-sm">{feature.desc}</p>
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
            <p className="text-primary-darker max-w-2xl mx-auto">
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
                className="glass-card text-center p-4 hover:-translate-y-1 transition-all"
              >
                <div className="mx-auto mb-3 p-2 rounded-lg w-8 h-8 flex items-center justify-center bg-background-start/60">
                  {benefit.icon}
                </div>
                <h3 className="font-medium mb-1 text-white">{benefit.title}</h3>
                <p className="text-primary-darker text-sm">{benefit.desc}</p>
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

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Pricing Plans</h2>
            <p className="text-primary-darker max-w-2xl mx-auto">
              Choose the plan that's right for you, from freelancers to enterprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pricing.map((plan, i) => (
              <div 
                key={plan.plan} 
                className={`glass-card p-6 relative ${plan.highlighted ? 'border-accent/50 shadow-[0_0_20px_rgba(0,231,255,0.15)]' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center">
                    <div className="px-3 py-1 bg-accent rounded-full text-xs text-background-start font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">{plan.plan}</h3>
                  <div className="flex justify-center items-baseline mb-1">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-primary-darker ml-1">/month</span>
                  </div>
                  <p className="text-sm text-primary-darker">{plan.desc}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check size={16} className="text-accent shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/signup?plan=${plan.plan.toLowerCase()}`}
                  className={`block w-full py-2 text-center rounded-lg text-sm font-medium transition-all ${
                    plan.highlighted 
                      ? 'bg-accent hover:bg-accent-hover text-background-start neon-glow' 
                      : 'border border-card-border bg-background-start/60 hover:bg-background-start/80 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-primary-darker">
              All plans include 7-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-small">
          <div className="glass-card p-8 text-center border-gradient">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Grow Your Twitter?</h2>
            <p className="text-primary-darker mb-6 max-w-lg mx-auto">
              Join thousands who've already increased engagement and followers with Tweetcoa.ch.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center rounded-lg font-medium transition-colors h-10 px-5 text-sm bg-accent hover:bg-accent-hover text-background-start neon-glow"
              >
                Start Free Trial
              </Link>
              <span className="text-xs text-primary-darker">No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="container-small">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-primary-darker max-w-2xl mx-auto">
              Get answers to common questions about Tweetcoa.ch.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card p-5">
                <h3 className="text-base font-medium text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-primary-darker">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-primary-darker mb-2">
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
