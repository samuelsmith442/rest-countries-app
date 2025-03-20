import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Add caching headers to improve performance
export const revalidate = 3600; // Revalidate at most once per hour

export async function GET() {
  try {
    // Try to read from the project root first, then from public directory as fallback
    let dataPath = path.join(process.cwd(), 'data.json');
    
    // Check if file exists at the root level
    if (!fs.existsSync(dataPath)) {
      // If not, try the public directory
      dataPath = path.join(process.cwd(), 'public', 'data.json');
      
      // If still not found, throw an error
      if (!fs.existsSync(dataPath)) {
        throw new Error('Countries data file not found');
      }
    }
    
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const countries = JSON.parse(fileContents);
    
    // Return the response with caching headers
    return new NextResponse(JSON.stringify(countries), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Error reading countries data:', error);
    return NextResponse.json(
      { error: 'Failed to load countries data' },
      { status: 500 }
    );
  }
}
