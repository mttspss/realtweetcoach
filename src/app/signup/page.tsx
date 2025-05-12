'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  // Funzione per gestire il login con Google
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative overflow-hidden">
      {/* Sfondi e luci sfumate */}
      <div className="suprema-glow absolute top-[20%] right-[10%] w-[400px] h-[400px] --glow-color:rgba(0,231,255,0.03); --blur-amount:80px; --opacity:0.6;"></div>
      <div className="suprema-glow absolute bottom-[10%] left-[5%] w-[300px] h-[300px] --glow-color:rgba(29,139,255,0.05); --blur-amount:60px; --opacity:0.5;"></div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto rounded-2xl bg-[#0F0F11] p-8 shadow-[0px_16px_30px_0px_rgba(0,0,0,0.5),0px_2px_2px_0px_rgba(0,0,0,0.5)] border border-white/5"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center mb-2">
                <Image 
                  src="/images/logo.png"
                  alt="Tweetcoa.ch Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-xl font-bold">
                <span className="text-white">tweetcoa</span><span className="text-[#00E7FF]">.ch</span>
              </h1>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
          <p className="text-gray-400 text-center mb-8">Login with your Google account</p>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-100 text-black py-3 px-4 rounded-xl font-medium transition-all hover:shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>

          <div className="text-xs text-gray-500 text-center mt-8">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="text-[#00E7FF] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#00E7FF] hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </motion.div>
      </div>
    </div>
  );
} 