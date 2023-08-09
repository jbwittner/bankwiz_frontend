'use client'

import React from 'react';
import { signIn, getSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation'

export default function LandingPage() {

  const router = useRouter()

  const checkLogin =async () => {
    const session = await getSession();
    if(!session){
      signIn('auth0', {
        callbackUrl: '/app/home',
      })
    } else {
      router.push("/app/home")
    }
  }

  return (
    <React.Fragment>
      <button
        onClick={checkLogin}
      >
        Sign in
      </button>
    </React.Fragment>
  );
}
