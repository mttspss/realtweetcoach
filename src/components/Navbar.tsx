'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check scroll direction
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY < 20);
      
      // Add background when scrolled down
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Scroll to section function
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // If not on homepage, navigate to home first then scroll
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Suprema-style floating navbar */}
      <motion.header 
        className={`fixed z-50 w-full ${scrolled ? 'top-0' : 'top-6'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          top: scrolled ? 0 : isScrollingUp ? '1.5rem' : '-5rem'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-[1120px] mx-auto px-4">
          <div className="suprema-frame bg-black/80 border border-[#00E7FF]/30 backdrop-blur-md rounded-2xl shadow-[0px_16px_30px_0px_rgba(0,0,0,0.5),0px_2px_2px_0px_rgba(0,0,0,0.5),0px_0px_10px_rgba(0,231,255,0.15)]">
            <nav className="flex items-center justify-between px-4 md:px-8 h-[60px]">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <Image 
                  src="/images/logo.png"
                  alt="Tweetcoa.ch Logo"
                  width={36}
                  height={36}
                  className="transition-all duration-300 group-hover:opacity-80"
                />
                <span className="text-base font-bold">
                  <span className="text-white">tweetcoa</span><span className="text-[#00E7FF]">.ch</span>
                </span>
              </Link>

              {/* Center Links (Desktop) */}
              <div className="hidden md:flex items-center space-x-1">
                <NavLink href="/" active={pathname === '/'}>
                  Home
                </NavLink>
                <NavLink 
                  href="#features" 
                  active={pathname === '/features'}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                >
                  Features
                </NavLink>
                <NavLink 
                  href="#pricing" 
                  active={pathname === '/pricing'}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                >
                  Pricing
                </NavLink>
              </div>

              {/* Sign Up Button (Desktop) */}
              <div className="hidden md:block">
                <Link 
                  href="/signup" 
                  className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium bg-white text-black hover:bg-[#00E7FF] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,231,255,0.25)] overflow-hidden group btn-white"
                >
                  <div className="text-slide-container">
                    <span className="text-slide-normal">Sign Up</span>
                    <span className="text-slide-hover">Sign Up</span>
                  </div>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden flex flex-col gap-[5px] items-end justify-center w-8 h-8 rounded-lg transition-colors duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-5 rotate-45 translate-y-[5px]' : 'w-5'}`} />
                <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
                <span className={`block h-[2px] bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[5px]' : 'w-3'}`} />
              </button>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm border-l border-white/5 bg-black/90 backdrop-blur-md transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'calc(var(--nav-height) + 1.5rem)' }}
      >
        <div className="px-6 py-8 flex flex-col gap-4">
          <NavLinkMobile href="/" active={pathname === '/'}>
            Home
          </NavLinkMobile>
          <NavLinkMobile 
            href="#features" 
            active={pathname === '/features'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            Features
          </NavLinkMobile>
          <NavLinkMobile 
            href="#pricing" 
            active={pathname === '/pricing'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('pricing');
            }}
          >
            Pricing
          </NavLinkMobile>

          <div className="mt-8 pt-8 border-t border-white/5">
            <Link
              href="/signup"
              className="relative block w-full text-center px-5 py-2.5 rounded-full bg-white hover:bg-[#00E7FF] text-black font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,231,255,0.25)] overflow-hidden group btn-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="text-slide-container">
                <span className="text-slide-normal">Sign Up</span>
                <span className="text-slide-hover">Sign Up</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ 
  href, 
  children, 
  active = false,
  onClick
}: { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
        active 
          ? 'nav-item-active' 
          : 'text-[#929691] hover:text-white group'
      }`}
      onClick={onClick}
    >
      {active ? (
        <span className="block">{children}</span>
      ) : (
        <div className="text-slide-container">
          <span className="text-slide-normal">{children}</span>
          <span className="text-slide-hover">{children}</span>
        </div>
      )}
    </Link>
  );
}

function NavLinkMobile({ 
  href, 
  children, 
  active = false,
  onClick
}: { 
  href: string; 
  children: React.ReactNode; 
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-3 rounded-xl font-medium text-base block transition-all duration-300 ${
        active 
          ? 'nav-item-active' 
          : 'text-[#929691] hover:text-white hover:bg-black/30 group'
      }`}
      onClick={onClick}
    >
      {active ? (
        <span className="block">{children}</span>
      ) : (
        <div className="text-slide-container">
          <span className="text-slide-normal">{children}</span>
          <span className="text-slide-hover">{children}</span>
        </div>
      )}
    </Link>
  );
} 