import { createClient } from '@supabase/supabase-js';
// Per Server Components e Route Handlers, useresti createServerClient o createRouteHandlerClient
// import { createServerClient, type CookieOptions } from '@supabase/ssr' 
// import { cookies } from 'next/headers' // Solo per Server Components/Actions

// Variabili d'ambiente per Supabase (devono essere configurate nel tuo .env.local)
// NEXT_PUBLIC_SUPABASE_URL=tuo_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=tua_supabase_anon_key

// Get Supabase URL and key with defaults for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

if (!supabaseUrl) {
  console.warn(`Variabile d'ambiente NEXT_PUBLIC_SUPABASE_URL non trovata.`);
  // throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
}
if (!supabaseAnonKey) {
  console.warn(`Variabile d'ambiente NEXT_PUBLIC_SUPABASE_ANON_KEY non trovata.`);
  // throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.");
}

// Funzione generica per creare un client Supabase per il browser (Client Components)
// Questa è la versione più semplice da usare nei componenti client.
// Per Server Components o Route Handlers, dovrai usare le funzioni specifiche 
// di @supabase/ssr (precedentemente auth-helpers-nextjs) che gestiscono i cookie.
export const createSupabaseBrowserClient = () => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
};

// Esempio di come potresti creare un client per Server Component (da usare in page.tsx server-side, layout.tsx server-side)
// export const createSupabaseServerClient = () => {
//   const cookieStore = cookies();
//   if (!supabaseUrl || !supabaseAnonKey) {
//     console.error('Supabase URL or Anon Key is not configured for server client.');
//     return null;
//   }
//   return createServerClient(
//     supabaseUrl,
//     supabaseAnonKey,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//            cookieStore.set({ name, value, ...options });
//         },
//         remove(name: string, options: CookieOptions) {
//           cookieStore.delete({ name, ...options });
//         },
//       },
//     }
//   );
// };

// Nota: createClientComponentClient e createRouteHandlerClient da '@supabase/auth-helpers-nextjs'
// (ora parte di '@supabase/ssr') sono spesso usati direttamente nei componenti/route handlers
// invece di wrapparli qui, perché gestiscono il contesto dei cookie automaticamente.
// Mantengo questo file per centralizzare le URL e le chiavi, e per il browser client base. 