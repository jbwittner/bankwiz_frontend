'use client';

import React from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';

export default function LoginButton() {
  const router = useRouter();

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

  return (
    <React.Fragment>
      <Button variant="contained" onClick={checkLogin}>
        Sign in
      </Button>
    </React.Fragment>
  );
}
