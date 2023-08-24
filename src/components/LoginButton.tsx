'use client';

import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import applogger from '@/tools/logger';

export default function LoginButton() {
  const child = applogger.childComponentLogger('LoginButton');

  const router = useRouter();

  const checkLogin = async () => {
    child.info('Get session');
    const session = await getSession();
    if (!session) {
      child.info('Session null');
      signIn('auth0', {
        callbackUrl: '/app/home',
      });
    } else {
      child.info('Session not null');
      router.push('/app/home');
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={checkLogin}>
        Sign in
      </Button>
    </React.Fragment>
  );
}
