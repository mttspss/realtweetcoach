import { NextResponse } from 'next/server';

// Questa è una simulazione di autenticazione Google
// In un'implementazione reale, qui utilizzeresti una libreria come next-auth
// per gestire il flusso OAuth con Google

export async function GET() {
  // In un'implementazione reale, questo endpoint reindirizzerebbe all'URL di autenticazione Google
  // Per ora, simuliamo reindirizzando alla homepage dopo un "login riuscito"
  
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
} 