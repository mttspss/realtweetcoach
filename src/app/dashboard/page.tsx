'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  BarChart2, 
  Users,
  AlertCircle,
  Filter,
  SortAsc,
  Search
} from 'lucide-react';
import { useSession } from 'next-auth/react';

// Task type definition
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
}

// Column type definition
interface Column {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  icon: React.ReactNode;
  tasks: Task[];
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize data
  useEffect(() => {
    const initializeData = () => {
      // Sample data - in a real app this would come from an API or database
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Finalize growth strategy',
          description: 'Define growth targets and strategy for Q3',
          status: 'todo',
          priority: 'high',
          assignee: session?.user?.name || 'User',
          dueDate: '2023-08-15',
          tags: ['strategy', 'growth']
        },
        {
          id: '2',
          title: 'Create content calendar',
          description: 'Plan content for next month including themes and post types',
          status: 'todo',
          priority: 'medium',
          dueDate: '2023-08-10',
          tags: ['content', 'planning']
        },
        {
          id: '3',
          title: 'Design new tweet templates',
          description: 'Create visual templates for different tweet types',
          status: 'in-progress',
          priority: 'medium',
          assignee: session?.user?.name || 'User',
          tags: ['design', 'templates']
        },
        {
          id: '4',
          title: 'Analyze engagement metrics',
          description: 'Review last month\'s engagement data and prepare report',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2023-08-05',
          tags: ['analytics', 'reporting']
        },
        {
          id: '5',
          title: 'Update audience personas',
          description: 'Refine target audience personas based on new data',
          status: 'review',
          priority: 'low',
          assignee: session?.user?.name || 'User',
          tags: ['audience', 'research']
        },
        {
          id: '6',
          title: 'Competitor analysis',
          description: 'Analyze top 5 competitors and their content strategy',
          status: 'done',
          priority: 'medium',
          assignee: session?.user?.name || 'User',
          dueDate: '2023-07-28',
          tags: ['research', 'competition']
        },
        {
          id: '7',
          title: 'Write growth case study',
          description: 'Document recent growth success for the blog',
          status: 'done',
          priority: 'low',
          dueDate: '2023-07-25',
          tags: ['content', 'case study']
        }
      ];
      
      // Define columns
      const boardColumns: Column[] = [
        {
          id: 'todo',
          title: 'To Do',
          status: 'todo',
          icon: <Clock size={18} className="text-gray-400" />,
          tasks: mockTasks.filter(task => task.status === 'todo')
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          status: 'in-progress',
          icon: <ArrowRight size={18} className="text-blue-400" />,
          tasks: mockTasks.filter(task => task.status === 'in-progress')
        },
        {
          id: 'review',
          title: 'Review',
          status: 'review',
          icon: <AlertCircle size={18} className="text-yellow-400" />,
          tasks: mockTasks.filter(task => task.status === 'review')
        },
        {
          id: 'done',
          title: 'Done',
          status: 'done',
          icon: <CheckCircle2 size={18} className="text-green-400" />,
          tasks: mockTasks.filter(task => task.status === 'done')
        }
      ];
      
      setColumns(boardColumns);
      setLoading(false);
    };
    
    // Add a small delay to make loading state noticeable
    const timeout = setTimeout(initializeData, 500);
    
    return () => clearTimeout(timeout);
  }, [session]);
  
  // Handle drag start
  const handleDragStart = (e: React.DragEvent, taskId: string, sourceColumn: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');
    
    if (sourceColumn === targetColumn) return;
    
    setColumns(prevColumns => {
      // Find the task in the source column
      const sourceColumnIndex = prevColumns.findIndex(col => col.id === sourceColumn);
      if (sourceColumnIndex === -1) return prevColumns;
      
      const taskIndex = prevColumns[sourceColumnIndex].tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prevColumns;
      
      // Get the task and update its status
      const task = { ...prevColumns[sourceColumnIndex].tasks[taskIndex] };
      task.status = targetColumn as 'todo' | 'in-progress' | 'review' | 'done';
      
      // Remove the task from the source column
      const newSourceTasks = [...prevColumns[sourceColumnIndex].tasks];
      newSourceTasks.splice(taskIndex, 1);
      
      // Add the task to the target column
      const targetColumnIndex = prevColumns.findIndex(col => col.id === targetColumn);
      if (targetColumnIndex === -1) return prevColumns;
      
      const newTargetTasks = [...prevColumns[targetColumnIndex].tasks, task];
      
      // Update columns
      const newColumns = [...prevColumns];
      newColumns[sourceColumnIndex] = {
        ...newColumns[sourceColumnIndex],
        tasks: newSourceTasks
      };
      newColumns[targetColumnIndex] = {
        ...newColumns[targetColumnIndex],
        tasks: newTargetTasks
      };
      
      return newColumns;
    });
  };
  
  // Filter tasks based on search query
  const filterTasks = (tasks: Task[]) => {
    if (!searchQuery) return tasks;
    
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  // Get priority style classes
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'low':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  return (
    <div className="p-6 pb-20">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Project Board</h1>
        <p className="text-gray-400">Manage and track your Twitter growth projects in one place</p>
        
        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-sm">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-sm">
              <SortAsc size={16} />
              <span>Sort</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:opacity-90 transition-opacity rounded-lg text-sm text-white">
              <PlusCircle size={16} />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Project stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold mt-1">
                {loading ? "-" : columns.reduce((sum, col) => sum + col.tasks.length, 0)}
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-full">
              <BarChart2 size={20} className="text-cyan-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">In Progress</p>
              <p className="text-3xl font-bold mt-1">
                {loading ? "-" : columns.find(col => col.id === 'in-progress')?.tasks.length || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-full">
              <ArrowRight size={20} className="text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Due This Week</p>
              <p className="text-3xl font-bold mt-1">
                {loading ? "-" : "3"}
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-full">
              <Calendar size={20} className="text-purple-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold mt-1">
                {loading ? "-" : "67%"}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Kanban board */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
          {columns.map(column => (
            <div 
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              className="bg-white/5 border border-white/10 rounded-xl p-4 h-fit"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {column.icon}
                  <h3 className="font-semibold">{column.title}</h3>
                  <span className="text-xs text-gray-500 bg-white/5 rounded-full px-2 py-0.5">
                    {filterTasks(column.tasks).length}
                  </span>
                </div>
                
                <button className="p-1 hover:bg-white/10 rounded">
                  <PlusCircle size={16} className="text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-3">
                {filterTasks(column.tasks).map(task => (
                  <div 
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 cursor-move transition-colors"
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {task.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-medium mb-2">{task.title}</h4>
                    <p className="text-xs text-gray-400 mb-3">{task.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {task.assignee && (
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-medium text-white">
                            {task.assignee.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {task.dueDate && (
                          <span className="text-xs text-gray-400 flex items-center">
                            <Calendar size={12} className="mr-1" />
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityStyles(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filterTasks(column.tasks).length === 0 && (
                  <div className="text-center py-6 text-gray-500 text-sm border border-dashed border-white/10 rounded-lg">
                    No tasks in this column
                  </div>
                )}
                
                <button className="w-full py-2 border border-dashed border-white/10 rounded-lg text-sm text-gray-500 hover:bg-white/5 transition-colors">
                  + Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 