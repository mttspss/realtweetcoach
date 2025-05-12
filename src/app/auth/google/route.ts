import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Questa è una simulazione di autenticazione Google
// In un'implementazione reale, qui utilizzeresti una libreria come next-auth
// per gestire il flusso OAuth con Google

export async function GET() {
  // Controlla se l'utente è già autenticato
  const session = await getServerSession(authOptions);
  
  if (session) {
    // Se già autenticato, redirect alla dashboard
    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  }
  
  // Altrimenti, redirect alla pagina di autenticazione Google tramite NextAuth
  return NextResponse.redirect(new URL('/api/auth/signin/google', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
} 