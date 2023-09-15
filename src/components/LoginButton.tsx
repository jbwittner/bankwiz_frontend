'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginIcon from '@mui/icons-material/Login';
import applogger from '@/tools/AppLogger';
import { LoadingButton } from '@mui/lab';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const childLogger = applogger.childComponentLogger('LoginButton');

  const router = useRouter();

  const checkLogin = async () => {
    setIsLoading(true);
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
      <LoadingButton
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={checkLogin}
        loading={isLoading}
      >
        Sign in
      </LoadingButton>
    </React.Fragment>
  );
}
