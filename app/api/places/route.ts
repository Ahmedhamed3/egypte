import { NextResponse } from 'next/server';
import { placeData } from '@/lib/content';

export async function GET() {
  return NextResponse.json(placeData);
}
