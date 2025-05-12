// Placeholder per l'API hello
export async function GET() {
  return new Response(JSON.stringify({ message: 'hello world' }), {
    headers: { 'content-type': 'application/json' }
  });
}
