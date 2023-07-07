// This is an example of how to read a JSON Web Token from an API route
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/authoptions';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log('==== before session =====');
  console.log('session', session);
  // @ts-ignore
  console.log('accessToken', session?.accessToken);
  console.log('==== after session =====');
  const token = await getToken({ req, secret: 'secret' });
  console.log('==== before token =====');
  console.log('token', token);
  console.log('==== after token =====');
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
