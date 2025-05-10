'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnalyticsBadge } from '@/components/AnalyticsBadge';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { CodeSnippet } from '@/components/CodeSnippet';
import { GrowthBadge } from '@/components/GrowthBadge';
import { 
  ArrowUpRight, 
  Calendar, 
  Users, 
  BarChart2, 
  Award, 
  TrendingUp, 
  Upload,
  Clock,
  Filter,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';

export default function DashboardPage() {
  const [periodFilter, setPeriodFilter] = useState('30d');
  
  // This is a placeholder dashboard. In a real app, you would fetch data from your API
  const accountStats = {
    followers: 12435,
    growth: 8.5,
    engagement: 3.2,
    tweetCount: 432,
    impressions: 543200,
  };

  const recentTweets = [
    { id: 1, date: '2023-05-11', content: 'Just released our new AI-powered analytics dashboard for X!', engagement: 187, impressions: 12300 },
    { id: 2, date: '2023-05-09', content: '5 ways to grow your Twitter account in 2023. Thread 🧵', engagement: 432, impressions: 28900 },
    { id: 3, date: '2023-05-07', content: 'How we scaled our SaaS from 0 to 1000 customers in 3 months', engagement: 256, impressions: 18500 },
  ];
  
  // Sample badge HTML code for sharing
  const badgeCode = `<a href="https://tweetcoa.ch/badge/pro-grower" target="_blank">
  <img src="https://tweetcoa.ch/api/badge/progrow-tier2.svg" 
       alt="Tweetcoa.ch Pro Grower Badge" 
       width="150" height="40">
</a>`;

  return (
    <main className="min-h-screen bg-gradient-dark">
      {/* Background pattern with dot grid */}
      <div className="fixed inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-primary-darker mt-1">Welcome back! Here's your account overview.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-card-border/40 bg-card/30 text-sm text-primary-darker hover:text-white transition-colors">
                <Clock size={14} />
                <span>Last {periodFilter === '30d' ? '30 days' : (periodFilter === '90d' ? '90 days' : 'Year')}</span>
                <ChevronDown size={14} />
              </button>
            </div>
            <Link 
              href="/upload" 
              className="btn-primary px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-sm"
            >
              <Upload size={14} /> Upload CSV
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <AnalyticsBadge 
            value={accountStats.followers.toLocaleString()}
            label="Followers"
            trend={{
              direction: 'up',
              value: `${accountStats.growth}%`
            }}
            icon={<Users size={18} />}
            variant="primary"
          />
          
          <AnalyticsBadge 
            value={`${accountStats.growth}%`}
            label="Growth Rate"
            trend={{
              direction: 'up',
              value: '2.1%'
            }}
            icon={<TrendingUp size={18} />}
            variant="accent"
          />
          
          <AnalyticsBadge 
            value={`${accountStats.engagement}%`}
            label="Engagement Rate"
            trend={{
              direction: 'up',
              value: '0.5%'
            }}
            icon={<BarChart2 size={18} />}
            variant="success"
          />
          
          <AnalyticsBadge 
            value={accountStats.tweetCount}
            label="Total Tweets"
            trend={{
              direction: 'neutral',
              value: '0'
            }}
            icon={<Calendar size={18} />}
          />
          
          <AnalyticsBadge 
            value={`${(accountStats.impressions / 1000).toFixed(1)}K`}
            label="Impressions"
            trend={{
              direction: 'up',
              value: '15.3%'
            }}
            icon={<Award size={18} />}
            variant="warning"
          />
        </div>

        {/* Growth Chart and Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnalyticsChart 
              title="Followers Growth"
              description="Track your audience growth over time"
              type="area"
              actions={
                <button className="p-1.5 rounded-lg bg-card/50 border border-card-border/30 text-primary-darker hover:text-white transition-colors">
                  <Filter size={14} />
                </button>
              }
            />
          </div>
          
          <div className="glass-card p-5 flex flex-col items-center justify-center">
            <h3 className="text-base font-medium text-white mb-5">Your Growth Badge</h3>
            <GrowthBadge badgeName="Pro Grower" tier={2} size="lg" />
            <p className="mt-4 text-sm text-primary-darker text-center">
              Share this badge on your profile to showcase your growth success!
            </p>
            <div className="mt-4 w-full">
              <CodeSnippet code={badgeCode} language="html" title="Badge HTML" />
            </div>
          </div>
        </div>

        {/* Recent Tweets & Engagement Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 glass-card p-5 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-medium text-white">Recent Tweets Performance</h3>
              <Link href="/tweets" className="text-accent text-xs hover:underline flex items-center">
                View all <ArrowUpRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border/30">
                    <th className="text-left py-3 px-4 text-primary-darker font-medium text-xs">Date</th>
                    <th className="text-left py-3 px-4 text-primary-darker font-medium text-xs">Tweet</th>
                    <th className="text-right py-3 px-4 text-primary-darker font-medium text-xs">Engagement</th>
                    <th className="text-right py-3 px-4 text-primary-darker font-medium text-xs">Impressions</th>
                    <th className="text-right py-3 px-4 text-primary-darker font-medium text-xs"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentTweets.map((tweet) => (
                    <tr key={tweet.id} className="border-b border-card-border/20 hover:bg-card/50 transition-colors">
                      <td className="py-3 px-4 text-xs text-primary-darker">{tweet.date}</td>
                      <td className="py-3 px-4 text-sm">{tweet.content}</td>
                      <td className="py-3 px-4 text-right text-sm">{tweet.engagement}</td>
                      <td className="py-3 px-4 text-right text-sm">{tweet.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-1 hover:bg-card/70 rounded text-primary-darker hover:text-white transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AnalyticsChart 
              title="Engagement Rate"
              description="Interactions per 100 impressions"
              type="line"
              height={240}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-base font-medium text-white mb-4">AI Growth Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-card/50 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-medium mb-1 text-white">Increase Posting Frequency</h4>
              <p className="text-sm text-primary-darker">Our analysis shows that increasing your posting frequency to 3-4 times per day can boost your engagement by up to 45%.</p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-medium mb-1 text-white">Optimize Posting Time</h4>
              <p className="text-sm text-primary-darker">Your audience is most active between 8-10 AM and 7-9 PM EST. Scheduling posts during these times can improve visibility.</p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-medium mb-1 text-white">Engage with Larger Accounts</h4>
              <p className="text-sm text-primary-darker">Regularly engaging with accounts that have 50K+ followers in your niche can help increase your reach and follower growth.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 