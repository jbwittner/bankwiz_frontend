'use client';

import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import logger from '@/tools/logger';

export default function LoginButton() {
  const child = logger.child({ child: 'child_a' });
  logger.info('hello world from client');
  child.info('hello world from client');

  const router = useRouter();

  const toto = {
    tata: 'tptp',
    titre: 'tcoutche',
  };

  const checkLogin = async () => {
    const session = await getSession();
    if (!session) {
      signIn('auth0', {
        callbackUrl: '/app/home',
      });
    } else {
      router.push('/app/home');
    }
  };

  const checkLog = () => {
    logger.info('clivk checkLog');
    logger.warn('test warn 1', toto);
    child.info('clivk checkLog');
    child.warn('test warn 1', toto);
  };

  logger.warn('test warn 2', toto);
  child.warn('test warn 2', toto);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={checkLogin}>
        Sign in
      </Button>
      <Button variant="contained" onClick={checkLog}>
        test
      </Button>
    </React.Fragment>
  );
}
