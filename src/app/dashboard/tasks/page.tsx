'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Edit,
  Filter,
  MoreHorizontal, 
  Plus,
  Search,
  Trash,
  ArrowUp,
  ArrowDown,
  CheckSquare,
  Square,
  Sparkles
} from 'lucide-react';

type TaskStatus = 'pending' | 'completed';
type TaskPriority = 'high' | 'medium' | 'low';
type TaskCategory = 'content' | 'engagement' | 'optimization' | 'growth';

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: Date | null;
  aiGenerated: boolean;
}

export default function TasksPage() {
  // Mock tasks data
  const initialTasks: Task[] = [
    {
      id: 1,
      title: 'Create 2 threads on AI productivity',
      description: 'Create in-depth threads with at least 5 posts each about AI productivity tools and how they can boost workflow',
      status: 'pending',
      priority: 'high',
      category: 'content',
      dueDate: new Date(2023, 6, 15),
      aiGenerated: true
    },
    {
      id: 2,
      title: 'Engage with 10 larger accounts',
      description: 'Find and meaningfully engage with 10 accounts that have 50K+ followers in your niche',
      status: 'pending',
      priority: 'medium',
      category: 'engagement',
      dueDate: new Date(2023, 6, 10),
      aiGenerated: true
    },
    {
      id: 3,
      title: 'Optimize posting schedule',
      description: 'Update posting schedule to publish at peak times (9-11AM and 7-9PM on weekdays)',
      status: 'completed',
      priority: 'high',
      category: 'optimization',
      dueDate: new Date(2023, 6, 5),
      aiGenerated: true
    },
    {
      id: 4,
      title: 'Create content calendar for next month',
      description: 'Plan out content topics and posting schedule for the upcoming month',
      status: 'pending',
      priority: 'medium',
      category: 'content',
      dueDate: new Date(2023, 6, 20),
      aiGenerated: false
    },
    {
      id: 5,
      title: 'Update profile bio and header image',
      description: 'Refresh profile with updated bio that includes keywords and a new header image',
      status: 'pending',
      priority: 'low',
      category: 'optimization',
      dueDate: new Date(2023, 6, 25),
      aiGenerated: false
    },
    {
      id: 6,
      title: 'Reply to all mentions and DMs',
      description: 'Check and respond to all mentions and direct messages to improve engagement',
      status: 'completed',
      priority: 'high',
      category: 'engagement',
      dueDate: new Date(2023, 6, 3),
      aiGenerated: false
    },
    {
      id: 7,
      title: 'Analyze top performing tweets',
      description: 'Review your 10 top performing tweets and identify common patterns for content strategy',
      status: 'pending',
      priority: 'medium',
      category: 'growth',
      dueDate: new Date(2023, 6, 18),
      aiGenerated: true
    }
  ];
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<{
    status: TaskStatus | 'all',
    priority: TaskPriority | 'all',
    category: TaskCategory | 'all'
  }>({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Funzione per cambiare lo stato di una task
  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };
  
  // Funzione per cambiare la priorità di una task
  const changeTaskPriority = (id: number, newPriority: TaskPriority) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, priority: newPriority } 
        : task
    ));
  };
  
  // Funzione per eliminare una task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Ottieni colore per la categoria
  const getCategoryColor = (category: TaskCategory) => {
    switch(category) {
      case 'content':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'engagement':
        return 'bg-purple-500/20 text-purple-400';
      case 'optimization':
        return 'bg-amber-500/20 text-amber-400';
      case 'growth':
        return 'bg-emerald-500/20 text-emerald-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  // Ottieni icona e colore per la priorità
  const getPriorityDisplay = (priority: TaskPriority) => {
    switch(priority) {
      case 'high':
        return { 
          icon: <ArrowUp size={12} className="text-red-400" />,
          text: 'text-red-400',
          bg: 'bg-red-400/10'
        };
      case 'medium':
        return { 
          icon: <MoreHorizontal size={12} className="text-amber-400" />,
          text: 'text-amber-400',
          bg: 'bg-amber-400/10'
        };
      case 'low':
        return { 
          icon: <ArrowDown size={12} className="text-green-400" />,
          text: 'text-green-400',
          bg: 'bg-green-400/10'
        };
    }
  };
  
  // Filtra le tasks in base ai filtri e alla ricerca
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter.status === 'all' || task.status === filter.status;
    const matchesPriority = filter.priority === 'all' || task.priority === filter.priority;
    const matchesCategory = filter.category === 'all' || task.category === filter.category;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });
  
  // Stats
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && task.status === 'pending').length;
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-black/50 backdrop-blur-lg z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white mr-6">Growth Tasks</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 w-64 text-sm text-white focus:outline-none focus:border-cyan-400/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={15} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
          >
            <Filter size={14} />
            <span>Filters</span>
          </button>
          
          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm text-white transition-colors"
          >
            <Plus size={14} />
            <span>New Task</span>
          </button>
        </div>
      </header>
      
      <div className="p-6">
        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{tasks.length}</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <CheckSquare size={20} className="text-cyan-400" />
              </div>
            </div>
            <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
              <div 
                className="bg-cyan-500 h-1.5 rounded-full" 
                style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{completedTasks} of {tasks.length} completed</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Pending Tasks</p>
                <p className="text-2xl font-bold text-white">{pendingTasks}</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <Clock size={20} className="text-purple-400" />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className="bg-red-400/20 rounded-md py-1 px-2 text-center">
                <p className="text-xs text-white">{highPriorityTasks}</p>
                <p className="text-[10px] text-gray-400">High</p>
              </div>
              <div className="bg-amber-400/20 rounded-md py-1 px-2 text-center">
                <p className="text-xs text-white">
                  {tasks.filter(t => t.priority === 'medium' && t.status === 'pending').length}
                </p>
                <p className="text-[10px] text-gray-400">Medium</p>
              </div>
              <div className="bg-green-400/20 rounded-md py-1 px-2 text-center">
                <p className="text-xs text-white">
                  {tasks.filter(t => t.priority === 'low' && t.status === 'pending').length}
                </p>
                <p className="text-[10px] text-gray-400">Low</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Tasks by Category</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
              <div className="p-2 rounded-full bg-white/10">
                <Filter size={20} className="text-amber-400" />
              </div>
            </div>
            <div className="mt-2 flex space-x-1">
              <div className="bg-cyan-500/20 h-1.5 rounded-full flex-1"></div>
              <div className="bg-purple-500/20 h-1.5 rounded-full flex-1"></div>
              <div className="bg-amber-500/20 h-1.5 rounded-full flex-1"></div>
              <div className="bg-emerald-500/20 h-1.5 rounded-full flex-1"></div>
            </div>
            <div className="mt-1 grid grid-cols-4 gap-1 text-center">
              <p className="text-[10px] text-cyan-400">Content</p>
              <p className="text-[10px] text-purple-400">Engage</p>
              <p className="text-[10px] text-amber-400">Optimize</p>
              <p className="text-[10px] text-emerald-400">Growth</p>
            </div>
          </div>
        </div>
        
        {/* Filters section */}
        {showFilters && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Status</p>
                <div className="flex space-x-1">
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.status === 'all' 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, status: 'all'})}
                  >
                    All
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.status === 'pending' 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, status: 'pending'})}
                  >
                    Pending
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.status === 'completed' 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, status: 'completed'})}
                  >
                    Completed
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">Priority</p>
                <div className="flex space-x-1">
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.priority === 'all' 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, priority: 'all'})}
                  >
                    All
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.priority === 'high' 
                        ? 'bg-red-400/20 text-red-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, priority: 'high'})}
                  >
                    High
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.priority === 'medium' 
                        ? 'bg-amber-400/20 text-amber-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, priority: 'medium'})}
                  >
                    Medium
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.priority === 'low' 
                        ? 'bg-green-400/20 text-green-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, priority: 'low'})}
                  >
                    Low
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">Category</p>
                <div className="flex space-x-1">
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.category === 'all' 
                        ? 'bg-white/10 text-white' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, category: 'all'})}
                  >
                    All
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.category === 'content' 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, category: 'content'})}
                  >
                    Content
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.category === 'engagement' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, category: 'engagement'})}
                  >
                    Engagement
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.category === 'optimization' 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, category: 'optimization'})}
                  >
                    Optimization
                  </button>
                  <button 
                    className={`px-2 py-1 text-xs rounded-md ${
                      filter.category === 'growth' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                    onClick={() => setFilter({...filter, category: 'growth'})}
                  >
                    Growth
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length > 0 ? filteredTasks.map(task => {
            const priorityDisplay = getPriorityDisplay(task.priority);
            
            return (
              <div 
                key={task.id}
                className={`bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.07] transition-colors ${
                  task.status === 'completed' ? 'opacity-70' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <button 
                    className="mt-0.5 flex-shrink-0"
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 size={18} className="text-cyan-400" />
                    ) : (
                      <Square size={18} className="text-gray-400" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'}`}>
                        {task.title}
                      </h3>
                      
                      {task.aiGenerated && (
                        <div className="flex items-center px-1.5 py-0.5 rounded-full bg-white/5 text-[10px] text-cyan-400">
                          <Sparkles size={8} className="mr-0.5" />
                          AI Generated
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-400 mb-2">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex items-center ${priorityDisplay.bg}`}>
                        {priorityDisplay.icon}
                        <span className={`ml-0.5 ${priorityDisplay.text}`}>
                          {task.priority} priority
                        </span>
                      </span>
                      
                      {task.dueDate && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-300 flex items-center">
                          <Clock size={8} className="mr-0.5" />
                          Due {task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 flex-shrink-0">
                    <button 
                      className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                      onClick={() => {
                        // Edit functionality would go here
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-12 bg-white/5 border border-white/10 rounded-xl">
              <CheckSquare size={32} className="text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No tasks found</h3>
              <p className="text-gray-400 text-sm mb-4">
                {searchQuery 
                  ? "No tasks match your search criteria" 
                  : "You don't have any tasks yet"}
              </p>
              <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors text-sm">
                Create New Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 