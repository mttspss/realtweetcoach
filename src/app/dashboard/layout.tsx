'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart2,
  Lightbulb,
  Calendar,
  Trophy,
  Settings,
  LogOut,
  ChevronDown,
  Upload,
  CheckSquare,
  Edit,
  Sparkles,
  Home
} from 'lucide-react';
import { useSupabase } from '@/providers/SupabaseProvider';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSupabase();
  const { data: nextAuthSession } = useSession();
  
  // Usa principalmente NextAuth, ma fallback su Supabase se necessario
  const userEmail = nextAuthSession?.user?.email || session?.user?.email || '';
  const userName = nextAuthSession?.user?.name || (userEmail ? userEmail.split('@')[0] : 'User');
  
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-[220px] fixed bg-white/5 backdrop-blur-xl border-r border-white/10 h-full flex flex-col">
        {/* Logo */}
        <div className="px-4 py-5">
          <Link href="/dashboard" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="TweetCoach" 
              width={22} 
              height={22}
              className="mr-2" 
            />
            <span className="text-sm font-semibold">
              <span className="text-white">tweetcoa</span><span className="text-cyan-400">.ch</span>
            </span>
          </Link>
        </div>
        
        {/* Main navigation */}
        <div className="px-3 mt-4 flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        
        {/* Account selector (bottom) */}
        <div className="p-3 border-t border-white/10">
          {/* Workspace dropdown */}
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer mb-3">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-medium bg-cyan-600">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-2">
                <div className="text-xs font-medium text-white">{userName}</div>
                <div className="text-[10px] text-gray-400">{userEmail}</div>
              </div>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          
          {/* Logout button */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center text-xs gap-2 rounded-lg px-3 py-2 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        {children}
      </div>
    </div>
  );
}

function NavLinks() {
  const pathname = usePathname();
  
  const links = [
    { href: '/dashboard', label: 'Project Board', icon: <LayoutDashboard size={16} /> },
    { href: '/dashboard/growth-analyser', label: 'Growth Analyser', icon: <Upload size={16} /> },
    { href: '/dashboard/growth-plan', label: 'Growth Plan', icon: <BarChart2 size={16} /> },
    { href: '/dashboard/content-planner', label: 'Content Planner', icon: <Sparkles size={16} /> },
    { href: '/dashboard/content-calendar', label: 'Content Calendar', icon: <Calendar size={16} /> },
    { href: '/dashboard/tasks', label: 'Task Manager', icon: <CheckSquare size={16} /> },
    { href: '/dashboard/tones', label: 'Voice Tones', icon: <Edit size={16} /> },
    { href: '/ideas', label: 'Ideas', icon: <Lightbulb size={16} /> },
    { href: '/reports', label: 'Reports', icon: <BarChart2 size={16} /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <Settings size={16} /> },
  ];
  
  // Group links into categories
  const mainLinks = links.slice(0, 6);
  const secondaryLinks = links.slice(6);
  
  return (
    <nav className="space-y-1">
      {mainLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-white/10 transition-colors ${
            pathname === link.href || (link.href !== '/dashboard' && pathname?.startsWith(link.href))
              ? 'bg-white/10 text-white font-medium' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
      
      <div className="pt-2 pb-1">
        <p className="px-3 text-[10px] uppercase tracking-wider text-gray-500 font-medium">Other</p>
      </div>
      
      {secondaryLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs hover:bg-white/10 transition-colors ${
            pathname === link.href || (link.href !== '/dashboard' && pathname?.startsWith(link.href))
              ? 'bg-white/10 text-white font-medium' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
} 