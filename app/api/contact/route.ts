import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'This endpoint supports POST requests for form submissions.' });
}

export async function POST(req: NextRequest) {
  try {
    // The email sending functionality has been removed as requested.
    // This endpoint will now successfully process the request without sending an email.
    await req.json(); // We still read the body to acknowledge the request.
    return NextResponse.json({ message: 'Request received.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}