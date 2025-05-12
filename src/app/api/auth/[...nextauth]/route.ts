// Placeholder per un handler di autenticazione
// Questo file verrà sostituito in futuro con una corretta implementazione di NextAuth

export function GET() {
  return new Response(JSON.stringify({ message: 'Auth API placeholder' }), {
    headers: { 'content-type': 'application/json' }
  });
}

export function POST() {
  return new Response(JSON.stringify({ message: 'Auth API placeholder' }), {
    headers: { 'content-type': 'application/json' }
  });
} 