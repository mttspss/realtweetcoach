import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Pong! Realtweetcoach API is live.', timestamp: new Date().toISOString() });
} 