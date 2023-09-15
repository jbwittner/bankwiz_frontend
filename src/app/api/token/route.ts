// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { CustomJWT } from '../auth/[...nextauth]/authoptions';
import applogger from '@/tools/AppLogger';

const logger = applogger.childApiLogger('/token');

export async function GET(req: NextRequest) {
  let resultStatus: number = 401;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  if (token) {
    const customJWT: CustomJWT = token;
    if (customJWT.accessTokenExpires) {
      console.log(customJWT.accessTokenExpires);
      if (Date.now() > customJWT.accessTokenExpires * 1000) {
        logger.warn('Expired access token');
      } else {
        resultStatus = 200;
      }
    }
  }

  return NextResponse.json({}, { status: resultStatus });
}
