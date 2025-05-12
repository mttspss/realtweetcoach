'use client';

import React, { useState } from 'react';
import { 
  PlusCircle,
  MessageSquare,
  Edit,
  Trash2,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function RepliesSetupPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample data for the automations
  const automations = [
    { 
      id: 1, 
      name: 'New Follower Welcome', 
      trigger: 'New Follower', 
      status: 'active',
      message: 'Thanks for following! I regularly share content about $TOPIC. Feel free to engage with my posts!'
    },
    { 
      id: 2, 
      name: 'Comment Thank You', 
      trigger: 'Comment Received', 
      status: 'active',
      message: 'Thanks for your comment! I appreciate your thoughts on this topic.'
    },
    { 
      id: 3, 
      name: 'Question Response', 
      trigger: 'Contains Question', 
      status: 'paused',
      message: "Great question! Let me get back to you with a more thoughtful response soon. In the meantime, you might find useful information in my pinned tweets."
    },
  ];
  
  const filteredAutomations = activeTab === 'all' 
    ? automations 
    : automations.filter(a => a.status === activeTab);

  return (
    <div className="p-6 pb-20">
      {/* Header with document icon and breadcrumb */}
      <div className="flex items-center mb-2">
        <div className="p-2 border border-zinc-800 rounded-md mr-3">
          <div className="w-5 h-5"></div>
        </div>
        <h1 className="text-xl font-medium text-white">Replies Setup</h1>
      </div>

      {/* Page title and actions */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-semibold text-white mb-2">Replies Setup</h1>
          <p className="text-zinc-400">Configure automated responses to your audience interactions</p>
        </div>
        <button className="px-4 py-2 bg-white text-black font-medium rounded-lg flex items-center">
          <PlusCircle size={18} className="mr-2" />
          New Automation
        </button>
      </div>
      
      {/* Info Banner */}
      <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex items-start">
        <Info size={20} className="text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-white mb-1">Auto-replies help you engage with your audience</h3>
          <p className="text-sm text-zinc-400">
            Set up automated responses based on triggers like new followers, comments, or specific keywords. 
            Each automation can use a different tone to match the context.
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-zinc-800 mb-8">
        <div className="flex space-x-6">
          <TabButton 
            label="All Automations" 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
            count={automations.length}
          />
          <TabButton 
            label="Active" 
            active={activeTab === 'active'} 
            onClick={() => setActiveTab('active')}
            count={automations.filter(a => a.status === 'active').length}
          />
          <TabButton 
            label="Paused" 
            active={activeTab === 'paused'} 
            onClick={() => setActiveTab('paused')}
            count={automations.filter(a => a.status === 'paused').length}
          />
        </div>
      </div>
      
      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.map(automation => (
          <div key={automation.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center">
                  <h3 className="text-base font-medium text-white">{automation.name}</h3>
                  <div className={`ml-3 px-2 py-0.5 text-xs rounded ${
                    automation.status === 'active' 
                      ? 'bg-green-900/20 text-green-400' 
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {automation.status === 'active' ? 'Active' : 'Paused'}
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mt-1">Trigger: {automation.trigger}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  {automation.status === 'active' 
                    ? <AlertTriangle size={16} /> 
                    : <Check size={16} />
                  }
                </button>
                <button className="p-2 rounded-md bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="bg-zinc-800 rounded-md p-3 text-sm text-zinc-300">
              <div className="flex items-start">
                <MessageSquare size={16} className="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
                <p>{automation.message}</p>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center text-xs text-zinc-500">
              <div>Updated 2 days ago</div>
              <div className="flex items-center">
                <span className="mr-2">Uses AI Tone:</span>
                <span className="px-2 py-0.5 bg-purple-900/20 text-purple-400 rounded">Friendly Professional</span>
              </div>
            </div>
          </div>
        ))}
        
        {filteredAutomations.length === 0 && (
          <div className="flex flex-col items-center justify-center p-10 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="w-12 h-12 mb-4 rounded-full bg-zinc-800 flex items-center justify-center">
              <MessageSquare size={24} className="text-zinc-500" />
            </div>
            <h3 className="text-base font-medium text-white mb-1">No automations found</h3>
            <p className="text-sm text-zinc-400 mb-4">Create your first automation to start engaging with your audience</p>
            <button className="flex items-center px-4 py-2 bg-white text-black font-medium rounded-lg">
              <PlusCircle size={16} className="mr-2" />
              Create Automation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}

const TabButton = ({ label, active, onClick, count }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-1 py-3 border-b-2 font-medium text-sm transition-colors ${
        active 
          ? 'border-purple-500 text-white' 
          : 'border-transparent text-zinc-400 hover:text-white'
      }`}
    >
      {label} <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-zinc-800">{count}</span>
    </button>
  );
}; 