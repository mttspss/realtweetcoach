// Placeholder per l'API ping
export async function GET() {
  return new Response(JSON.stringify({ message: 'pong' }), {
    headers: { 'content-type': 'application/json' }
  });
} 