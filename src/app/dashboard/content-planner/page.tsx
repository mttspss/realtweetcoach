'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Calendar, 
  Sparkles, 
  Download, 
  ChevronRight,
  Copy,
  CheckCircle2,
  Clock,
  BarChart
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ContentPlan {
  days: ContentDay[];
  strategy: string;
  themes: string[];
}

interface ContentDay {
  day: number;
  tweet: string;
  type: string;
  time: string;
  hashtags?: string[];
}

export default function ContentPlannerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'I am your Twitter content planning assistant. I will help you create a 30-day content plan based on your goals and audience.'
    },
    {
      role: 'assistant',
      content: 'Hi there! I\'m your Twitter content planning assistant. I\'ll help you create a strategic 30-day content plan that aligns with your growth goals. Let\'s start with a few questions:\n\n1. What are your main Twitter growth goals? (e.g., growing followers, increasing engagement, establishing authority)\n\n2. Who is your target audience?\n\n3. What content themes or topics do you want to focus on?\n\n4. How often do you want to post per week?'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contentPlan, setContentPlan] = useState<ContentPlan | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied !== null) {
      const timer = setTimeout(() => {
        setCopied(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Check if this is a request to generate the content plan
      const shouldGeneratePlan = 
        inputValue.toLowerCase().includes('generate') || 
        inputValue.toLowerCase().includes('create plan') ||
        inputValue.toLowerCase().includes('30 day') ||
        inputValue.toLowerCase().includes('content plan');
      
      if (shouldGeneratePlan) {
        // Call the API to generate a content plan
        const response = await fetch('/api/content-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: messages.filter(m => m.role !== 'system')
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error generating content plan');
        }
        
        const data = await response.json();
        
        // Set the content plan
        setContentPlan(data.contentPlan);
        
        // Add AI response
        const aiResponse: Message = {
          role: 'assistant',
          content: `I've created your 30-day Twitter content plan based on our conversation! I've designed it to help you reach your growth goals while maintaining a consistent and engaging presence.

The plan follows these key themes: ${data.contentPlan.themes.join(', ')}.

Strategy overview: ${data.contentPlan.strategy}

You can view the full plan below. You can:
1. Copy individual tweets to use directly
2. Download the entire plan as CSV
3. Add these tweets to your content calendar

${data.isMock ? '\n(Note: This is using simulated data due to API quota limitations)' : ''}

Would you like me to explain any part of the plan in more detail or make any adjustments?`
        };
        
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Continue the conversation
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              ...messages,
              userMessage
            ],
            context: 'twitter_content_planning'
          }),
        });
        
        if (!response.ok) {
          // Fallback to simulated responses if API call fails
          const aiResponse: Message = {
            role: 'assistant',
            content: generateAIResponse(inputValue, messages)
          };
          
          setMessages(prev => [...prev, aiResponse]);
        } else {
          const data = await response.json();
          const aiResponse: Message = {
            role: 'assistant',
            content: data.response || generateAIResponse(inputValue, messages)
          };
          
          setMessages(prev => [...prev, aiResponse]);
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.'
      }]);
    }
  };
  
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
  };
  
  const downloadCSV = () => {
    if (!contentPlan) return;
    
    // Create CSV content
    const headers = ['Day', 'Tweet', 'Type', 'Time', 'Hashtags'];
    const rows = contentPlan.days.map(day => [
      day.day,
      `"${day.tweet.replace(/"/g, '""')}"`,
      day.type,
      day.time,
      day.hashtags ? day.hashtags.join(' ') : ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', '30_day_twitter_content_plan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Content Plan Generator</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link 
            href="/dashboard/growth-analyser"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <BarChart size={16} className="mr-1" />
            Growth Analyser
          </Link>
          
          <Link 
            href="/dashboard/content-calendar"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <Calendar size={16} className="mr-1" />
            Content Calendar
          </Link>
        </div>
      </header>
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row gap-6">
            {/* Chat section */}
            <div className="lg:w-1/2 flex flex-col h-[calc(100vh-180px)]">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {messages.filter(msg => msg.role !== 'system').map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'assistant' 
                            ? 'bg-white/10 rounded-bl-none' 
                            : 'bg-cyan-500/30 rounded-br-none'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center mb-1">
                            <Sparkles size={12} className="text-cyan-400 mr-1" />
                            <span className="text-xs text-cyan-400">AI Assistant</span>
                          </div>
                        )}
                        <div className="text-sm whitespace-pre-line">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-white/10 rounded-bl-none">
                        <div className="flex items-center mb-1">
                          <Sparkles size={12} className="text-cyan-400 mr-1" />
                          <span className="text-xs text-cyan-400">AI Assistant</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                          <div className="w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="mt-4 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Tell me about your content goals..."
                  className="w-full p-3 pl-4 pr-12 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 disabled:text-gray-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
              
              <div className="mt-2 text-xs text-gray-400">
                <p>Hint: Say "Generate my 30 day content plan" when you're ready to create your plan.</p>
              </div>
            </div>
            
            {/* Content plan preview */}
            <div className="lg:w-1/2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-[calc(100vh-180px)] overflow-y-auto">
                {contentPlan ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-white">Your 30-Day Content Plan</h2>
                      <div className="flex gap-2">
                        <button
                          onClick={downloadCSV}
                          className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md transition-colors"
                        >
                          <Download size={14} />
                          Download CSV
                        </button>
                        
                        <Link
                          href="/dashboard/content-calendar"
                          className="flex items-center gap-1 text-xs bg-cyan-500/30 hover:bg-cyan-500/40 text-white px-2 py-1 rounded-md transition-colors"
                        >
                          <Calendar size={14} />
                          Add to Calendar
                        </Link>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-sm font-medium text-white mb-1">Content Strategy</h3>
                      <p className="text-xs text-gray-300">{contentPlan.strategy}</p>
                      
                      <h3 className="text-sm font-medium text-white mt-3 mb-1">Content Themes</h3>
                      <div className="flex flex-wrap gap-1">
                        {contentPlan.themes.map((theme, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full"
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {contentPlan.days.map((day, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white">
                                Day {day.day}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getContentTypeStyles(day.type)}`}>
                                {day.type}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock size={12} className="mr-1" />
                              {day.time}
                            </div>
                          </div>
                          
                          <p className="text-sm text-white mb-2">{day.tweet}</p>
                          
                          {day.hashtags && day.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {day.hashtags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className="text-xs text-cyan-400"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-end">
                            <button
                              onClick={() => copyToClipboard(day.tweet, index)}
                              className="flex items-center text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              {copied === index ? (
                                <>
                                  <CheckCircle2 size={12} className="mr-1 text-green-400" />
                                  <span className="text-green-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} className="mr-1" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Calendar size={48} className="text-gray-600 mb-4" />
                    <h2 className="text-lg font-medium text-white mb-2">No Content Plan Yet</h2>
                    <p className="text-sm text-gray-400 max-w-md mb-6">
                      Chat with the AI assistant to create your personalized 30-day Twitter content plan. Tell it about your goals, audience, and content preferences.
                    </p>
                    <div className="flex items-center text-xs text-cyan-400">
                      <ChevronRight size={14} className="mr-1 animate-pulse" />
                      Ask the AI to generate your content plan
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function generateAIResponse(userInput: string, messages: Message[]): string {
  // In a real implementation, this would call your backend which then calls OpenAI
  // For now, we'll return simple hardcoded responses based on the conversation stage
  
  const messageHistory = messages.filter(m => m.role !== 'system');
  const conversationLength = messageHistory.length;
  
  if (conversationLength <= 2) {
    return "Thanks for sharing! Now, could you tell me about the main content formats you prefer? For example, do you like creating threads, sharing tips, posting insights, or asking questions?";
  } else if (conversationLength <= 4) {
    return "Great! To make your content plan more effective, what are the best times for you to post? Also, do you have any specific Twitter growth goals (like follower targets or engagement rates)?";
  } else if (conversationLength <= 6) {
    return "Thanks for all this information. I have enough to start creating your content plan. Is there anything else you'd like to add before I generate your 30-day Twitter content plan?";
  } else {
    return "I'm ready to create your personalized 30-day Twitter content plan based on your goals and preferences. Just say 'Generate my content plan' when you're ready!";
  }
}

function getContentTypeStyles(type: string): string {
  switch (type.toLowerCase()) {
    case 'thread':
      return 'bg-cyan-500/20 text-cyan-400';
    case 'tips':
      return 'bg-purple-500/20 text-purple-400';
    case 'question':
      return 'bg-amber-500/20 text-amber-400';
    case 'insight':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'story':
      return 'bg-blue-500/20 text-blue-400';
    case 'engagement':
      return 'bg-pink-500/20 text-pink-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
} 