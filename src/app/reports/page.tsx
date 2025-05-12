'use client';

import React from 'react';
import { 
  BarChart2, 
  Calendar,
  ChevronDown,
  Download,
  File,
  Search,
  SlidersHorizontal
} from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { 
      id: 1, 
      name: 'Engagement Analysis', 
      description: 'Detailed breakdown of engagement metrics across your posts',
      date: '2023-06-15', 
      type: 'PDF'
    },
    { 
      id: 2, 
      name: 'Growth Report Q2', 
      description: 'Quarterly growth analysis and comparison with previous periods',
      date: '2023-05-02', 
      type: 'PDF'
    },
    { 
      id: 3, 
      name: 'Audience Demographics', 
      description: 'Analysis of your follower base demographics and interests',
      date: '2023-04-18', 
      type: 'PDF'
    },
    { 
      id: 4, 
      name: 'Content Performance', 
      description: 'Performance metrics for different content types and formats',
      date: '2023-03-30', 
      type: 'PDF'
    },
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header with search and filters */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Reports</h1>
          
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 w-64 text-sm text-white focus:outline-none focus:border-cyan-400/50"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-colors">
            <Calendar size={14} className="mr-2 text-gray-400" />
            <span>Date Range</span>
            <ChevronDown size={12} className="ml-2 text-gray-400" />
          </button>
          <button className="flex items-center px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-colors">
            <SlidersHorizontal size={14} className="mr-2 text-gray-400" />
            <span>Filters</span>
          </button>
        </div>
      </header>
      
      {/* Page Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Reports</h2>
          <p className="text-gray-400">Access and generate insights about your social media performance</p>
        </div>
        
        {/* Generate Report Section */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-xl p-5 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-white mb-1">Generate Custom Report</h3>
              <p className="text-sm text-gray-300">Create a tailored report with your selected metrics and date range</p>
            </div>
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center text-sm">
              <BarChart2 size={16} className="mr-2" />
              Create New Report
            </button>
          </div>
        </div>
        
        {/* Reports Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-white">Recent Reports</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-xs font-medium border-b border-white/10">
                    <th className="py-3 px-4 text-left font-medium">Report Name</th>
                    <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Description</th>
                    <th className="py-3 px-4 text-center font-medium">Type</th>
                    <th className="py-3 px-4 text-center font-medium">Date</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id} className="border-b border-white/10 text-xs hover:bg-white/5">
                      <td className="py-3 px-4 text-white font-medium">{report.name}</td>
                      <td className="py-3 px-4 text-gray-400 hidden md:table-cell">{report.description}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-200">
                          <File size={10} className="mr-1" />
                          {report.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-400">
                        {new Date(report.date).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="p-1.5 rounded-lg text-cyan-400 hover:bg-white/10 hover:text-cyan-300 transition-colors">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Report Types */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">Available Report Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportTypeCard 
              title="Engagement Analytics" 
              description="Analyze likes, comments, shares, and overall engagement rates on your content"
              icon={<BarChart2 size={20} className="text-cyan-400" />}
            />
            <ReportTypeCard 
              title="Audience Growth" 
              description="Track follower growth, demographic changes, and audience insights"
              icon={<BarChart2 size={20} className="text-purple-400" />}
            />
            <ReportTypeCard 
              title="Content Performance" 
              description="Evaluate which content types and topics perform best with your audience"
              icon={<BarChart2 size={20} className="text-amber-400" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ReportTypeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ReportTypeCard = ({ title, description, icon }: ReportTypeCardProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-colors">
      <div className="flex items-start mb-2">
        <div className="p-1.5 rounded-md bg-white/10 mr-2">
          {icon}
        </div>
        <h3 className="font-bold text-white text-sm mt-1">{title}</h3>
      </div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
}; 