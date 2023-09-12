// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? '',
  });

  // @ts-ignore
  console.log('token', token);
  const opts: RequestInit = {
    method: 'GET',
    // @ts-ignore
    headers: { Authorization: 'Bearer ' + token.accessToken },
  };

  await fetch('http://127.0.0.1:8080/status/public');

  await fetch('http://localhost:8080/user/checkregistration', opts);
  await fetch('http://localhost:8080/status/private', opts);
  await fetch('http://localhost:8080/status/admin', opts);

  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
