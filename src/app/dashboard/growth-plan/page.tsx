'use client';

import React, { useState } from 'react';
import { 
  BarChart, 
  Calendar, 
  Clock, 
  Edit, 
  MessageSquare, 
  Sparkles, 
  Target, 
  ThumbsUp, 
  Trash,
  ChevronRight,
  CheckCircle,
  ChevronDown,
  Send
} from 'lucide-react';
import Link from 'next/link';

export default function GrowthPlanPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [step, setStep] = useState(1);
  const [objectives, setObjectives] = useState({
    followers: '',
    engagement: '',
    timeframe: '3 months'
  });
  const [selectedNiche, setSelectedNiche] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{from: 'user' | 'ai', message: string}[]>([]);
  
  // Lista di nicchie disponibili
  const niches = [
    'Tech & AI',
    'Personal Growth',
    'Finance & Investing',
    'Marketing',
    'Health & Fitness',
    'Programming',
    'Entrepreneurship',
    'Education',
    'Design',
    'Productivity'
  ];
  
  // Timeframe options
  const timeframeOptions = ['1 month', '3 months', '6 months', '12 months'];
  
  // Funzione per generare il piano
  const generatePlan = () => {
    setIsGenerating(true);
    
    // Simuliamo il tempo di generazione
    setTimeout(() => {
      setIsGenerating(false);
      setPlanGenerated(true);
    }, 3000);
  };
  
  // Funzione per inviare un messaggio nella chat
  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = { from: 'user' as const, message: chatMessage };
    setChatHistory([...chatHistory, newMessage]);
    setChatMessage('');
    
    // Simula la risposta dell'AI
    setTimeout(() => {
      const aiResponse = { 
        from: 'ai' as const, 
        message: "I've adjusted your growth plan based on your feedback. The new plan focuses more on thread-based content that drives higher engagement while maintaining your authentic voice." 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1500);
  };
  
  // Contenuto basato sullo step corrente
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Set your growth objectives</h3>
            <p className="text-sm text-gray-400">Define clear goals to help the AI create a tailored growth plan</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Target followers growth</label>
                <input 
                  type="text" 
                  placeholder="e.g. 10,000" 
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
                  value={objectives.followers}
                  onChange={(e) => setObjectives({...objectives, followers: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Target engagement rate</label>
                <input 
                  type="text" 
                  placeholder="e.g. 5%" 
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
                  value={objectives.engagement}
                  onChange={(e) => setObjectives({...objectives, engagement: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Timeframe</label>
                <div className="relative">
                  <select 
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none appearance-none"
                    value={objectives.timeframe}
                    onChange={(e) => setObjectives({...objectives, timeframe: e.target.value})}
                  >
                    {timeframeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                className="w-full px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                onClick={() => setStep(2)}
              >
                Continue
                <ChevronRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">Select your content niche</h3>
            <p className="text-sm text-gray-400">Choose the primary niche for your Twitter content</p>
            
            <div className="grid grid-cols-2 gap-3">
              {niches.map((niche) => (
                <div 
                  key={niche}
                  className={`
                    p-3 border rounded-lg cursor-pointer transition-all
                    ${selectedNiche === niche 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'}
                  `}
                  onClick={() => setSelectedNiche(niche)}
                >
                  <div className="flex items-center">
                    {selectedNiche === niche && (
                      <CheckCircle size={16} className="text-cyan-400 mr-1.5" />
                    )}
                    <span className="text-sm">{niche}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex space-x-3">
              <button 
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-colors flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button 
                className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex-1 flex items-center justify-center"
                onClick={generatePlan}
                disabled={!selectedNiche}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white/10 border-t-white rounded-full mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Plan
                    <Sparkles size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <Link href="/dashboard/growth-analyser" className="text-gray-400 mr-2 hover:text-white transition-colors">
            <ChevronRight size={16} className="rotate-180" />
          </Link>
          <h1 className="text-xl font-bold text-white">Growth Plan Generator</h1>
        </div>
      </header>
      
      {/* Page Content */}
      <div className="p-6">
        {!planGenerated ? (
          <div className="max-w-2xl mx-auto">
            {/* Creazione piano */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              {renderStepContent()}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Personalized Growth Plan</h2>
              <p className="text-gray-400">AI-generated strategy based on your objectives and analytics</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Growth Plan Overview */}
              <div className="lg:col-span-2 space-y-6">
                {/* Goals Section */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Target size={18} className="mr-2 text-cyan-400" />
                    Growth Objectives
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Followers Goal</div>
                      <div className="text-lg font-bold text-white">{objectives.followers || "10,000"}</div>
                      <div className="text-xs text-cyan-400">In {objectives.timeframe}</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Engagement Target</div>
                      <div className="text-lg font-bold text-white">{objectives.engagement || "5%"}</div>
                      <div className="text-xs text-cyan-400">Average per post</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Posting Frequency</div>
                      <div className="text-lg font-bold text-white">5-7×</div>
                      <div className="text-xs text-cyan-400">Posts per week</div>
                    </div>
                  </div>
                </div>
                
                {/* Content Strategy */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Edit size={18} className="mr-2 text-purple-400" />
                    Content Strategy
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border border-white/10 rounded-lg p-4">
                      <h4 className="font-medium text-white text-sm mb-2">Content Mix Recommendation</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-cyan-500/20 h-16 rounded flex flex-col items-center justify-center p-1">
                          <div className="text-xs text-white font-medium">Threads</div>
                          <div className="text-xs text-cyan-300 mt-1">40%</div>
                        </div>
                        <div className="bg-purple-500/20 h-16 rounded flex flex-col items-center justify-center p-1">
                          <div className="text-xs text-white font-medium">Tips</div>
                          <div className="text-xs text-purple-300 mt-1">25%</div>
                        </div>
                        <div className="bg-amber-500/20 h-16 rounded flex flex-col items-center justify-center p-1">
                          <div className="text-xs text-white font-medium">Stories</div>
                          <div className="text-xs text-amber-300 mt-1">20%</div>
                        </div>
                        <div className="bg-emerald-500/20 h-16 rounded flex flex-col items-center justify-center p-1">
                          <div className="text-xs text-white font-medium">Engagement</div>
                          <div className="text-xs text-emerald-300 mt-1">15%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-lg p-4">
                      <h4 className="font-medium text-white text-sm mb-3">Top Performing Content Types</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></div>
                            <span className="text-xs text-gray-300">AI productivity threads</span>
                          </div>
                          <span className="text-xs font-medium text-white">8.5% engagement</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                            <span className="text-xs text-gray-300">Personal growth stories</span>
                          </div>
                          <span className="text-xs font-medium text-white">7.2% engagement</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                            <span className="text-xs text-gray-300">Tool recommendations</span>
                          </div>
                          <span className="text-xs font-medium text-white">6.8% engagement</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-lg p-4">
                      <h4 className="font-medium text-white text-sm mb-3">Optimal Posting Times</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded p-2 flex items-center">
                          <Clock size={14} className="text-cyan-400 mr-2" />
                          <div>
                            <div className="text-xs font-medium text-white">9-11 AM</div>
                            <div className="text-[10px] text-gray-400">Weekdays</div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded p-2 flex items-center">
                          <Clock size={14} className="text-cyan-400 mr-2" />
                          <div>
                            <div className="text-xs font-medium text-white">7-9 PM</div>
                            <div className="text-[10px] text-gray-400">Weekdays</div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded p-2 flex items-center">
                          <Calendar size={14} className="text-purple-400 mr-2" />
                          <div>
                            <div className="text-xs font-medium text-white">Tuesday</div>
                            <div className="text-[10px] text-gray-400">Best day</div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded p-2 flex items-center">
                          <Calendar size={14} className="text-purple-400 mr-2" />
                          <div>
                            <div className="text-xs font-medium text-white">Thursday</div>
                            <div className="text-[10px] text-gray-400">Second best</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Items */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <CheckCircle size={18} className="mr-2 text-amber-400" />
                    Priority Actions (Next 30 Days)
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start p-3 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 mr-3 flex-shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Increase posting frequency</h4>
                        <p className="text-xs text-gray-400 mt-1">Move from 4 to 5-7 posts per week, focusing on your highest engagement days (Tuesday, Thursday)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 mr-3 flex-shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Create 2 threads per week</h4>
                        <p className="text-xs text-gray-400 mt-1">Develop in-depth threads on {selectedNiche || "Tech & AI"} topics with at least 5 posts per thread</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 border border-white/10 rounded-lg">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 mr-3 flex-shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">Engage with 10 larger accounts daily</h4>
                        <p className="text-xs text-gray-400 mt-1">Focus on meaningful interactions with accounts that have 50K+ followers in your niche</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Link 
                      href="/dashboard/tasks" 
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View complete task list
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* AI Chat for Plan Adjustments */}
              <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col h-[800px]">
                <div className="px-4 py-3 border-b border-white/10 flex items-center">
                  <Sparkles size={16} className="text-cyan-400 mr-2" />
                  <h3 className="text-sm font-medium text-white">Refine with AI</h3>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-3 max-w-[85%] text-xs text-white">
                      <div className="text-cyan-400 text-[10px] mb-1">AI Assistant</div>
                      I've created your growth plan based on your goals and analytics. You can ask me questions or request adjustments to any part of the plan.
                    </div>
                    
                    {chatHistory.map((message, index) => (
                      <div 
                        key={index} 
                        className={`rounded-lg p-3 max-w-[85%] text-xs text-white ${
                          message.from === 'ai' 
                            ? 'bg-white/5' 
                            : 'bg-cyan-500/20 ml-auto'
                        }`}
                      >
                        <div className={`text-[10px] mb-1 ${message.from === 'ai' ? 'text-cyan-400' : 'text-white'}`}>
                          {message.from === 'ai' ? 'AI Assistant' : 'You'}
                        </div>
                        {message.message}
                      </div>
                    ))}
                    
                    {chatHistory.length === 0 && (
                      <div className="flex items-center justify-center h-32 w-full">
                        <div className="text-xs text-gray-500 text-center">
                          <MessageSquare size={18} className="mx-auto mb-2 text-gray-600" />
                          Ask AI to modify your growth plan or give you more specific advice
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-3 border-t border-white/10">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Ask about your growth plan..."
                      className="w-full p-2.5 pr-10 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      onClick={sendMessage}
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/dashboard/content-calendar" 
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg transition-colors flex items-center flex-1 justify-center"
              >
                <Calendar size={16} className="mr-2" />
                Go to Content Calendar
              </Link>
              
              <Link 
                href="/dashboard/tasks" 
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg transition-colors flex items-center flex-1 justify-center"
              >
                <CheckCircle size={16} className="mr-2" />
                View Growth Tasks
              </Link>
              
              <Link 
                href="/dashboard/tones" 
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center flex-1 justify-center"
              >
                <Edit size={16} className="mr-2" />
                Create Content Tone
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 