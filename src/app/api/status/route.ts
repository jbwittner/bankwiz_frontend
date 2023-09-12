// This is an example of how to read a JSON Web Token from an API route
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH0_CLIENT_SECRET ?? ''
  });
  
  // @ts-ignore
  console.log('token', token);
  const opts: RequestInit = {
    method: 'GET',
    // @ts-ignore
    headers: { Authorization: 'Bearer ' + token.accessToken },
  };
  

  const resultPublic = await fetch('http://127.0.0.1:8080/status/public');

  const checkregistration = await fetch(
    'http://localhost:8080/user/checkregistration',
    opts,
  );
  
  //console.log('resultPublic', resultPublic);
  const resultPrivate = await fetch(
    'http://localhost:8080/status/private',
    opts,
  );
  //console.log('resultPrivate', resultPrivate);
  const resultAdmin = await fetch('http://localhost:8080/status/admin', opts);
  //console.log('resultAdmin', resultAdmin);

  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
