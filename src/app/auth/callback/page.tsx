'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthCallbackPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      const exchangeCodeForSession = async () => {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error('Error exchanging code for session:', error.message);
            // Gestisci l'errore, magari reindirizza a una pagina di errore
            router.push('/login?error=auth_callback_failed');
          } else {
            // Reindirizza alla dashboard o alla pagina desiderata dopo il login
            router.push('/dashboard');
          }
        } catch (e: any) {
            console.error('Exception during code exchange:', e.message);
            router.push('/login?error=auth_callback_exception');
        }
      };
      exchangeCodeForSession();
    } else {
        // Se non c'è codice, potrebbe essere un accesso diretto o un errore
        console.warn('No auth code found in callback.');
        router.push('/login?error=no_auth_code');
    }
  }, [supabase, router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-2xl text-neon-cyan animate-pulse">Processing authentication...</p>
      {/* Puoi aggiungere uno spinner qui */}
    </div>
  );
} 