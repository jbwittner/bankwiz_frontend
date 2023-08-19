// This is an example of how to read a JSON Web Token from an API route
import logger from '@/tools/logger';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const json = await req.json();
  if (json.level) {
    if (json.level === 'info') {
      logger.info(json);
    } else if (json.level === 'warn') {
      logger.warn(json);
    }
  }
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
