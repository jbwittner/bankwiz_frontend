'use client';

import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import applogger from '@/tools/AppLogger';

export default function LoginButton() {
  const childLogger = applogger.childComponentLogger('LoginButton');

  const router = useRouter();

  const checkLogin = async () => {
    childLogger.info('Get session');
    const session = await getSession();
    if (!session) {
      childLogger.info('Session null');
      signIn('auth0', {
        callbackUrl: '/app',
      });
    } else {
      childLogger.info(session);
      router.push('/app');
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" endIcon={<LoginIcon />} onClick={checkLogin}>
        Sign in
      </Button>
    </React.Fragment>
  );
}
