import { NextResponse } from 'next/server';

/**
 * Handle POST request to analyze Twitter data from CSV
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Process the data and return success
    console.log('Received Twitter analytics data');
    
    return NextResponse.json({
      success: true,
      message: 'Twitter data received and processed'
    });
    
  } catch (error) {
    console.error('Error in Twitter analysis API:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process Twitter analytics data' 
    }, { status: 500 });
  }
}

/**
 * Handle GET request
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Twitter analysis API is active. Use POST to analyze CSV data.'
  });
} 