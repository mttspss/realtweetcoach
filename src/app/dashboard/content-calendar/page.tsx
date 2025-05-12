'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Edit,
  Trash,
  Clock,
  MoreHorizontal,
  Copy,
  Sparkles
} from 'lucide-react';

export default function ContentCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  
  // Funzione per navigare tra i mesi
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };
  
  // Ottieni le date per il calendario corrente
  const getDaysInMonth = (year: number, month: number) => {
    // Mese è 0-based in JavaScript
    const date = new Date(year, month, 1);
    const days = [];
    
    // Aggiungi giorni dal mese precedente per iniziare dalla settimana
    const firstDayOfMonth = date.getDay();
    const prevMonthDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adattamento per iniziare la settimana da lunedì
    
    const prevMonth = new Date(year, month, 0);
    const prevMonthTotalDays = prevMonth.getDate();
    
    for (let i = prevMonthTotalDays - prevMonthDays + 1; i <= prevMonthTotalDays; i++) {
      const day = new Date(year, month - 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Aggiungi giorni del mese corrente
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(year, month, i);
      days.push({ date: day, isCurrentMonth: true });
    }
    
    // Aggiungi giorni del mese successivo per completare la griglia
    const daysNeeded = 42 - days.length; // 6 righe * 7 giorni = 42
    for (let i = 1; i <= daysNeeded; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  
  // Mock data per i contenuti pianificati
  const scheduledContent = [
    {
      id: 1,
      date: new Date(2023, 6, 3, 10, 30),
      content: "Just launched our new AI-powered Twitter analytics tool! Check it out at tweetcoa.ch 🚀",
      type: "post",
      status: "draft",
      viralityScore: 85
    },
    {
      id: 2,
      date: new Date(2023, 6, 5, 9, 0),
      content: "Thread on AI productivity hacks that saved me 10+ hours/week:",
      type: "thread",
      status: "scheduled",
      viralityScore: 92
    },
    {
      id: 3,
      date: new Date(2023, 6, 8, 15, 45),
      content: "5 underrated tools for Twitter growth in 2023:",
      type: "list",
      status: "draft",
      viralityScore: 78
    },
    {
      id: 4,
      date: new Date(2023, 6, 11, 12, 0),
      content: "How I went from 0 to 10K followers in 3 months:",
      type: "story",
      status: "scheduled",
      viralityScore: 89
    },
    {
      id: 5,
      date: new Date(2023, 6, 15, 18, 30),
      content: "Common Twitter growth mistakes to avoid (from personal experience):",
      type: "tips",
      status: "draft",
      viralityScore: 76
    },
    {
      id: 6,
      date: new Date(2023, 6, 19, 9, 15),
      content: "The Twitter algorithm explained in simple terms:",
      type: "thread",
      status: "scheduled",
      viralityScore: 95
    },
    {
      id: 7,
      date: new Date(2023, 6, 22, 14, 0),
      content: "Just crossed 20K followers! Here's what worked and what didn't:",
      type: "milestone",
      status: "draft",
      viralityScore: 88
    }
  ];
  
  // Funzione per formattare la data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  // Funzione per ottenere contenuti per una data specifica
  const getContentForDate = (date: Date) => {
    return scheduledContent.filter(content => {
      return content.date.getDate() === date.getDate() &&
             content.date.getMonth() === date.getMonth() &&
             content.date.getFullYear() === date.getFullYear();
    });
  };
  
  // Funzione per ottenere lo stile del badge in base al tipo di contenuto
  const getContentTypeBadgeStyle = (type: string) => {
    switch(type) {
      case 'thread':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'post':
        return 'bg-purple-500/20 text-purple-400';
      case 'list':
        return 'bg-amber-500/20 text-amber-400';
      case 'story':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'tips':
        return 'bg-indigo-500/20 text-indigo-400';
      case 'milestone':
        return 'bg-pink-500/20 text-pink-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Content Calendar</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
            <Filter size={14} />
            <span>Filters</span>
          </button>
          
          <button
            onClick={() => setShowContentModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm text-white transition-colors"
          >
            <Plus size={14} />
            <span>New Content</span>
          </button>
        </div>
      </header>
      
      <div className="p-6">
        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{formatDate(currentMonth)}</h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center border-b border-white/10">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="py-2 text-xs font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 auto-rows-[120px]">
            {days.map((day, i) => {
              const dayContent = getContentForDate(day.date);
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isSelected = selectedDay?.toDateString() === day.date.toDateString();
              
              return (
                <div 
                  key={i} 
                  className={`
                    border-white/10 border-r border-b p-2 relative transition-colors
                    ${!day.isCurrentMonth ? 'text-gray-600 bg-white/[0.02]' : ''}
                    ${isSelected ? 'bg-white/10' : 'hover:bg-white/[0.07]'}
                  `}
                  onClick={() => setSelectedDay(day.date)}
                >
                  <div className="flex justify-between">
                    <div 
                      className={`
                        w-6 h-6 flex items-center justify-center rounded-full text-xs
                        ${isToday ? 'bg-cyan-500 text-white' : ''}
                      `}
                    >
                      {day.date.getDate()}
                    </div>
                    
                    {dayContent.length > 0 && (
                      <div className="text-[10px] text-gray-400 flex items-center">
                        <CalendarIcon size={10} className="mr-1" />
                        {dayContent.length}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-[75px]">
                    {dayContent.map((content, index) => (
                      <div 
                        key={content.id}
                        className={`
                          text-[10px] p-1 px-2 rounded-md border border-white/10
                          ${content.status === 'scheduled' ? 'bg-white/10' : 'bg-white/5'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-1 rounded text-[8px] ${getContentTypeBadgeStyle(content.type)}`}>
                            {content.type}
                          </span>
                          <div className="flex items-center">
                            <Clock size={8} className="text-gray-400 mr-0.5" />
                            <span className="text-gray-400">
                              {content.date.getHours().toString().padStart(2, '0')}:
                              {content.date.getMinutes().toString().padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                        <div className="mt-0.5 truncate">{content.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected Day Details */}
        {selectedDay && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {selectedDay.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric'
                })}
              </h3>
              
              <button
                onClick={() => setShowContentModal(true)}
                className="flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white transition-colors"
              >
                <Plus size={12} />
                <span>Add</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {getContentForDate(selectedDay).length > 0 ? (
                getContentForDate(selectedDay).map((content) => (
                  <div 
                    key={content.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <span className={`px-2 py-0.5 rounded text-xs ${getContentTypeBadgeStyle(content.type)}`}>
                          {content.type}
                        </span>
                        <div className="ml-2 flex items-center text-xs text-gray-400">
                          <Clock size={12} className="mr-1" />
                          {content.date.getHours().toString().padStart(2, '0')}:
                          {content.date.getMinutes().toString().padStart(2, '0')}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center px-2 py-0.5 bg-white/5 rounded-full text-xs">
                          <Sparkles size={10} className="text-amber-400 mr-1" />
                          <span className="text-white">{content.viralityScore}</span>
                        </div>
                        <div className="dropdown relative">
                          <button className="p-1 rounded-md hover:bg-white/10 transition-colors">
                            <MoreHorizontal size={14} />
                          </button>
                          {/* Dropdown would go here */}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-3">{content.content}</p>
                    
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Edit size={14} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Copy size={14} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon size={24} className="text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No content scheduled for this day</p>
                  <button 
                    className="mt-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs rounded-lg transition-colors"
                    onClick={() => setShowContentModal(true)}
                  >
                    Add content
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modal per aggiungere contenuti - sarebbe implementato in una app reale */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Content Type</label>
                <select className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm">
                  <option value="post">Single Post</option>
                  <option value="thread">Thread</option>
                  <option value="list">List</option>
                  <option value="story">Story</option>
                  <option value="tips">Tips</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                <textarea 
                  className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm h-24"
                  placeholder="What do you want to share?"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full p-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center">
                  <button className="flex items-center gap-1 text-xs text-cyan-400">
                    <Sparkles size={12} />
                    <span>Generate with AI</span>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                    onClick={() => setShowContentModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm transition-colors"
                    onClick={() => setShowContentModal(false)}
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 