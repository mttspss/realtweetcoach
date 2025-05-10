'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { SupabaseClient, Session } from '@supabase/supabase-js';

// Try to import the Supabase client
let createSupabaseBrowserClient: any;
try {
  createSupabaseBrowserClient = require('@/lib/supabaseClient').createSupabaseBrowserClient;
} catch (e) {
  console.warn('Supabase client not available');
}

type SupabaseContextType = {
  supabase: SupabaseClient | null;
  session: Session | null;
  isLoading: boolean;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Skip Supabase if the client creator is not available
    if (!createSupabaseBrowserClient) {
      setIsLoading(false);
      return;
    }

    try {
      // Attempt to create the Supabase client
      const client = createSupabaseBrowserClient();
      setSupabase(client);

      if (!client) {
        setIsLoading(false);
        return;
      }

      const getInitialSession = async () => {
        setIsLoading(true);
        try {
          const { data: { session: initialSession } } = await client.auth.getSession();
          setSession(initialSession);
        } catch (error) {
          console.error('Failed to get initial session:', error);
        } finally {
          setIsLoading(false);
        }
      };

      getInitialSession();

      let subscription: any = null;
      try {
        const { data } = client.auth.onAuthStateChange((_event, sessionState) => {
          setSession(sessionState);
        });

        subscription = data.subscription;
      } catch (error) {
        console.error('Failed to set up auth state change listener:', error);
      }

      return () => {
        if (subscription?.unsubscribe) {
          subscription.unsubscribe();
        }
      };
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      setIsLoading(false);
    }
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, session, isLoading }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}; 