import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotte che richiedono autenticazione
const protectedRoutes = ['/dashboard'];

// Export the middleware function
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Verifica se la rotta richiede autenticazione
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Se non è una rotta protetta, continua
  if (!isProtectedRoute) {
    return res;
  }

  // Inizializza il client Supabase
  const supabase = createMiddlewareClient({ req, res });
  
  // Verifica se l'utente è autenticato
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Se non c'è una sessione e la rotta è protetta, reindirizza al login
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Specifica su quali path deve essere eseguito il middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/ (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 