'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  BarChart2, 
  TrendingUp, 
  Award,
  Bell,
  Search,
  ChevronDown,
  Upload,
  Sparkles,
  Calendar,
  CheckSquare,
  ArrowRight,
  Home,
  UploadCloud
} from 'lucide-react';
import Link from 'next/link';

interface TwitterAnalysis {
  success: boolean;
  summary: {
    totalImpressions: number;
    avgEngagementRate: number;
    totalTweets: number;
    totalEngagements: number;
    avgLikes: number;
    avgRetweets: number;
    avgReplies: number;
    bestDayOfWeek: string;
    bestTimeOfDay: string;
    topPerformingContent: string[];
    growthOpportunities: string[];
  };
  detailedReport: string;
}

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<TwitterAnalysis | null>(null);
  
  // Placeholder data as fallback if no analysis is available
  const accountStats = {
    followers: 12435,
    growth: 8.5,
    engagement: analysis ? analysis.summary.avgEngagementRate : 3.2,
    impressions: analysis ? analysis.summary.totalImpressions : 543200,
  };

  const recentTweets = [
    { id: 1, date: '2023-05-11', content: 'Just released our new AI-powered analytics dashboard for X!', engagement: 187, impressions: 12300 },
    { id: 2, date: '2023-05-09', content: '5 ways to grow your Twitter account in 2023. Thread 🧵', engagement: 432, impressions: 28900 },
    { id: 3, date: '2023-05-07', content: 'How we scaled our SaaS from 0 to 1000 customers in 3 months', engagement: 256, impressions: 18500 },
  ];
  
  // Load analysis data from localStorage on component mount
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('twitterAnalysis');
    if (storedAnalysis) {
      try {
        const parsedAnalysis = JSON.parse(storedAnalysis);
        setAnalysis(parsedAnalysis);
      } catch (error) {
        console.error('Failed to parse stored analysis:', error);
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header with search and user controls */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Dashboard</h1>
          
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 w-64 text-sm text-white focus:outline-none focus:border-cyan-400/50"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            <Bell size={18} />
          </button>
          <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-white/10 transition-colors">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium bg-white/10">
              <Home size={16} />
            </div>
            <div className="ml-2 mr-1">
              <div className="text-xs font-medium text-white">Homepage</div>
            </div>
          </Link>
        </div>
      </header>
      
      {/* Page Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Analytics Overview</h2>
          <p className="text-gray-400">Monitor your account performance and engagement stats</p>
          
          <Link 
            href="/dashboard/onboarding" 
            className="mt-4 inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <UploadCloud size={16} className="mr-2" />
            Upload new Twitter data
          </Link>
        </div>
        
        {/* Main action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/dashboard/growth-analyser" 
            className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
              <Upload size={24} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Upload and Analyse</h3>
            <p className="text-sm text-gray-300 mb-4">Upload your Twitter Analytics CSV to generate AI-powered growth insights</p>
            <div className="flex items-center text-cyan-400 text-sm">
              <span>Get started</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
          
          <Link href="/dashboard/growth-plan"
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Create Growth Plan</h3>
            <p className="text-sm text-gray-300 mb-4">Build a personalized growth strategy tailored to your Twitter goals</p>
            <div className="flex items-center text-purple-400 text-sm">
              <span>Create plan</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
          
          <Link href="/dashboard/content-calendar"
            className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
              <Calendar size={24} className="text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Content Calendar</h3>
            <p className="text-sm text-gray-300 mb-4">Schedule optimized content based on your analytics insights</p>
            <div className="flex items-center text-amber-400 text-sm">
              <span>View calendar</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Followers"
            value={accountStats.followers.toString()}
            change={`+${accountStats.growth}%`}
            icon={<Users size={16} className="text-cyan-400" />}
            iconBg="bg-cyan-400/10"
          />
          
          <StatCard 
            title="Growth Rate"
            value={`${accountStats.growth}%`}
            change="+2.1%"
            icon={<TrendingUp size={16} className="text-green-400" />}
            iconBg="bg-green-400/10"
          />
          
          <StatCard 
            title="Engagement"
            value={`${accountStats.engagement.toFixed(1)}%`}
            change={analysis ? "+0.8%" : "+0.5%"}
            icon={<BarChart2 size={16} className="text-purple-400" />}
            iconBg="bg-purple-400/10"
          />
          
          <StatCard 
            title="Impressions"
            value={`${(accountStats.impressions / 1000).toFixed(1)}K`}
            change="+15.3%"
            icon={<Award size={16} className="text-amber-400" />}
            iconBg="bg-amber-400/10"
          />
        </div>
        
        {/* Growth Recommendations */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">AI Growth Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis && analysis.summary.growthOpportunities.slice(0, 3).map((opportunity, index) => (
              <RecommendationCard 
                key={index}
                title={opportunity.split('.')[0]} 
                description={opportunity}
                color={index === 0 ? "border-cyan-400" : index === 1 ? "border-purple-400" : "border-amber-400"}
              />
            ))}
            
            {!analysis && (
              <>
                <RecommendationCard 
                  title="Increase Posting Frequency" 
                  description="Our analysis shows that increasing your posting frequency to 3-4 times per day can boost your engagement by up to 45%."
                  color="border-cyan-400"
                />
                <RecommendationCard 
                  title="Optimize Posting Time" 
                  description="Your audience is most active between 8-10 AM and 7-9 PM EST. Scheduling posts during these times can improve visibility."
                  color="border-purple-400"
                />
                <RecommendationCard 
                  title="Engage with Larger Accounts" 
                  description="Regularly engaging with accounts that have 50K+ followers in your niche can help increase your reach and follower growth."
                  color="border-amber-400"
                />
              </>
            )}
          </div>
        </div>

        {/* Task Manager Card */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-white">Growth Tasks</h2>
            <Link href="/dashboard/tasks" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
              View all tasks
              <ArrowRight size={12} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="space-y-3 mb-4">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 mr-3 flex-shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Create 2 threads on AI productivity</h4>
                  <p className="text-xs text-gray-400 mt-0.5">High priority • Due in 3 days</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 mr-3 flex-shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Engage with 10 larger accounts</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Medium priority • Due today</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 mr-3 flex-shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Analyze top performing tweets</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Medium priority • Due in 5 days</p>
                </div>
              </div>
            </div>
            
            <Link href="/dashboard/tasks" className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white flex items-center justify-center transition-colors">
              <CheckSquare size={14} className="mr-2" />
              Manage all tasks
            </Link>
          </div>
        </div>
        
        {/* Recent Tweets Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-white">Recent Tweets</h2>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              View all tweets
            </button>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-xs font-medium border-b border-white/10">
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Content</th>
                    <th className="py-3 px-4 text-right font-medium">Engagement</th>
                    <th className="py-3 px-4 text-right font-medium">Impressions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTweets.map(tweet => (
                    <tr key={tweet.id} className="border-b border-white/10 text-xs hover:bg-white/5">
                      <td className="py-3 px-4 text-gray-400">
                        {new Date(tweet.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="py-3 px-4 text-white">{tweet.content}</td>
                      <td className="py-3 px-4 text-right text-gray-400">{tweet.engagement}</td>
                      <td className="py-3 px-4 text-right text-gray-400">
                        {tweet.impressions >= 1000
                          ? `${(tweet.impressions / 1000).toFixed(1)}K`
                          : tweet.impressions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
}

const StatCard = ({ title, value, change, icon, iconBg }: StatCardProps) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-400">{title}</span>
        <div className={`p-1.5 rounded-md ${iconBg}`}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold text-white">{value}</div>
        <div className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </div>
      </div>
    </div>
  );
};

interface RecommendationCardProps {
  title: string;
  description: string;
  color: string;
}

const RecommendationCard = ({ title, description, color }: RecommendationCardProps) => {
  return (
    <div className={`p-4 bg-white/5 rounded-xl border-l-2 ${color} border-t border-r border-b border-white/10`}>
      <h3 className="font-medium text-white text-sm mb-2">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}; 