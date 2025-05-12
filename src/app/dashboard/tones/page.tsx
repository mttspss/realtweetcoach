'use client';

import React from 'react';
import { PlusCircle } from 'lucide-react';

export default function TonesPage() {
  return (
    <div className="p-6 pb-20">
      {/* Header with document icon and breadcrumb */}
      <div className="flex items-center mb-2">
        <div className="p-2 border border-zinc-800 rounded-md mr-3">
          <div className="w-5 h-5"></div>
        </div>
        <h1 className="text-xl font-medium text-white">Tones</h1>
      </div>

      {/* Page title and actions */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-semibold text-white mb-2">Tones</h1>
          <p className="text-zinc-400">Customize how your AI responds to social media posts</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg border border-zinc-700">
            Preview Reply
          </button>
          <button className="px-4 py-2 bg-white text-black font-medium rounded-lg flex items-center">
            <PlusCircle size={18} className="mr-2" />
            Create New Tone
          </button>
        </div>
      </div>

      {/* Custom Tones Section */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-white mr-2">Custom Tones</h2>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Personal</span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">Your personalized tones for AI responses</p>
          </div>
          <div className="text-sm text-zinc-400 max-w-md text-right">
            Create and customize your own tones to match your unique communication style and needs.
          </div>
        </div>

        {/* Empty state for custom tones */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-white mb-2">No custom tones available</h3>
            <p className="text-zinc-400 mb-2">Create your first tone to get started with customized AI responses.</p>
          </div>
        </div>
      </div>

      {/* Amplifresh Tones Section */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-white mr-2">Amplifresh Tones</h2>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">Built-in</span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">Pre-built tones carefully crafted for various use cases</p>
          </div>
          <div className="text-sm text-zinc-400 max-w-md text-right">
            These tones are maintained by Amplifresh and cannot be edited, ensuring consistent quality across all responses.
          </div>
        </div>

        {/* Tone cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToneCard name="thanks" />
          <ToneCard name="1-liner" />
          <ToneCard name="asking" />
        </div>
      </div>
    </div>
  );
}

interface ToneCardProps {
  name: string;
}

const ToneCard = ({ name }: ToneCardProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
      <h3 className="text-lg font-medium text-white mb-1">{name}</h3>
      <p className="text-zinc-500 text-sm">Pre-built tone by Amplifresh</p>
    </div>
  );
}; 