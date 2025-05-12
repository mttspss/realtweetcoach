'use client';

import React from 'react';
import { 
  Lightbulb,
  Search,
  Plus,
  ThumbsUp,
  Copy,
  Filter,
  Calendar
} from 'lucide-react';

export default function IdeasPage() {
  const ideas = [
    { 
      id: 1, 
      title: 'Thread on AI productivity hacks', 
      description: 'A 10-part thread covering how AI tools can boost productivity for creators',
      category: 'Thread',
      likes: 42,
      createdAt: '2023-05-15'
    },
    { 
      id: 2, 
      title: 'Comparing top social media scheduling tools', 
      description: 'An analysis of the pros and cons of different scheduling platforms',
      category: 'Article',
      likes: 36,
      createdAt: '2023-05-10'
    },
    { 
      id: 3, 
      title: 'How I grew my account to 10K followers', 
      description: 'A personal story with practical tips for organic growth',
      category: 'Story',
      likes: 85,
      createdAt: '2023-05-05'
    },
    { 
      id: 4, 
      title: 'Top 5 analytics tools for Twitter', 
      description: 'Review of the best tools to track your Twitter performance',
      category: 'List',
      likes: 29,
      createdAt: '2023-04-28'
    },
  ];
  
  const categories = ['All', 'Thread', 'Article', 'Story', 'List', 'Poll'];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header with search and actions */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Ideas</h1>
          
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Search ideas..." 
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 w-64 text-sm text-white focus:outline-none focus:border-cyan-400/50"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center">
          <Plus size={16} className="mr-2" />
          New Idea
        </button>
      </header>
      
      {/* Page Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Content Ideas</h2>
          <p className="text-gray-400">Create, collect and organize your content creation ideas</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter size={14} className="text-gray-400" />
            <span className="text-sm text-gray-400">Filter by:</span>
          </div>
          
          <div className="flex">
            {categories.map((category, index) => (
              <button 
                key={category} 
                className={`px-3 py-1 text-sm rounded-lg border ${
                  index === 0
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                } transition-colors mr-2`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 ml-auto">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-sm text-gray-400">Sort by:</span>
            <select className="bg-white/5 border border-white/10 rounded-lg py-1 px-2 text-sm text-white">
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>Most liked</option>
            </select>
          </div>
        </div>
        
        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map(idea => (
            <IdeaCard 
              key={idea.id}
              title={idea.title}
              description={idea.description}
              category={idea.category}
              likes={idea.likes}
              date={idea.createdAt}
            />
          ))}
          
          {/* Add new idea card */}
          <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-5 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:bg-white/[0.07] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <Plus size={20} className="text-cyan-400" />
            </div>
            <p className="text-sm font-medium text-white mb-1">Add New Idea</p>
            <p className="text-xs text-gray-400 text-center">Capture your content inspiration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IdeaCardProps {
  title: string;
  description: string;
  category: string;
  likes: number;
  date: string;
}

const IdeaCard = ({ title, description, category, likes, date }: IdeaCardProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400">
          {category}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
      </div>
      
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      <div className="flex justify-between items-center">
        <button className="flex items-center text-xs text-gray-400 hover:text-white transition-colors">
          <ThumbsUp size={14} className="mr-1" />
          <span>{likes}</span>
        </button>
        
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            <Copy size={16} />
          </button>
          <button className="p-1.5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            <Lightbulb size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}; 