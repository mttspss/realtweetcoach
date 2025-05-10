'use client';

import { Github, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-card-border/30 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <Image 
                src="/images/logo.png"
                alt="Tweetcoa.ch Logo"
                width={36}
                height={36}
                className="transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,231,255,0.5)]"
              />
              <span className="text-xl font-bold">
                <span className="text-white">tweetcoa</span><span className="text-accent">.ch</span>
              </span>
            </Link>
            <p className="text-primary-darker text-sm mt-4 max-w-xs">
              AI-powered Twitter growth platform that helps you analyze, optimize, and scale your Twitter presence.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-primary-darker hover:text-accent transition-colors hover:scale-110 transform duration-300 flex items-center justify-center w-8 h-8 rounded-full bg-card/50 border border-card-border/30">
                <Twitter size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-primary-darker hover:text-accent transition-colors hover:scale-110 transform duration-300 flex items-center justify-center w-8 h-8 rounded-full bg-card/50 border border-card-border/30">
                <Instagram size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="text-primary-darker hover:text-accent transition-colors hover:scale-110 transform duration-300 flex items-center justify-center w-8 h-8 rounded-full bg-card/50 border border-card-border/30">
                <Github size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Features</Link></li>
              <li><Link href="/pricing" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Dashboard</Link></li>
              <li><Link href="/upload" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Upload CSV</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">About Us</Link></li>
              <li><Link href="/blog" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Blog</Link></li>
              <li><Link href="/careers" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Careers</Link></li>
              <li><Link href="/contact" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-primary-darker hover:text-accent text-sm transition-colors hover:translate-x-1 transform inline-flex">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-card-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-darker text-sm">© {new Date().getFullYear()} <span className="text-white">tweetcoa</span><span className="text-accent">.ch</span>. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="flex items-center text-xs text-primary-darker bg-card/50 border border-card-border/30 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent neon-glow mr-2 animate-pulse-slow"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
} 