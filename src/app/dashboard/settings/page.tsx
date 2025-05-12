'use client';

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-6 pb-20">
      {/* Header with document icon and breadcrumb */}
      <div className="flex items-center mb-2">
        <div className="p-2 border border-zinc-800 rounded-md mr-3">
          <div className="w-5 h-5"></div>
        </div>
        <h1 className="text-xl font-medium text-white">Settings</h1>
      </div>

      {/* Page title */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold text-white mb-2">Account Settings</h1>
        <p className="text-zinc-400">Manage your account preferences and profile information</p>
      </div>
      
      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings navigation */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-fit">
          <nav className="space-y-1">
            <SettingsNavItem 
              icon={<User size={16} />} 
              label="Profile Settings" 
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')} 
            />
            <SettingsNavItem 
              icon={<Lock size={16} />} 
              label="Security" 
              active={activeTab === 'security'}
              onClick={() => setActiveTab('security')} 
            />
            <SettingsNavItem 
              icon={<Bell size={16} />} 
              label="Notifications" 
              active={activeTab === 'notifications'}
              onClick={() => setActiveTab('notifications')} 
            />
            <SettingsNavItem 
              icon={<Globe size={16} />} 
              label="Language & Region" 
              active={activeTab === 'language'}
              onClick={() => setActiveTab('language')} 
            />
          </nav>
        </div>

        {/* Settings content */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-medium text-white mb-6">Profile Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    defaultValue="Buildora Corp"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    defaultValue="buildoraeu@gmail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-zinc-400 mb-2">
                    Twitter Username
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-700 bg-zinc-800 text-zinc-400 text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      id="twitter"
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-r-md py-2 px-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                      defaultValue="buildoraHQ"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-zinc-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    defaultValue="Building the future of Twitter growth analytics with AI."
                  />
                </div>
                
                <div className="pt-4">
                  <button className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-medium text-white mb-6">Security Settings</h2>
              <p className="text-zinc-400">Security settings will be shown here.</p>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-medium text-white mb-6">Notification Preferences</h2>
              <p className="text-zinc-400">Notification settings will be shown here.</p>
            </div>
          )}
          
          {activeTab === 'language' && (
            <div>
              <h2 className="text-xl font-medium text-white mb-6">Language & Region</h2>
              <p className="text-zinc-400">Language and region settings will be shown here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface SettingsNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SettingsNavItem = ({ icon, label, active, onClick }: SettingsNavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
        active 
          ? 'bg-purple-500/10 text-white font-medium' 
          : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
}; 