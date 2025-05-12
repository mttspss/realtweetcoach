'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Non mostrare la navbar nelle sezioni interne della dashboard
  const isDashboardRoute = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/reports') || 
                          pathname?.startsWith('/ideas') || 
                          pathname?.startsWith('/scheduler') ||
                          pathname?.startsWith('/leaderboard') ||
                          pathname?.startsWith('/settings');
  
  if (isDashboardRoute) {
    return null;
  }
  
  return <Navbar />;
} 