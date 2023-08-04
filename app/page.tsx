import React from 'react';
import { signIn, getSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation'

export default function LandingPage() {

  const checkLogin =async () => {
    const session = await getSession();
    if(!session){
      signIn('auth0', {
        callbackUrl: '/home',
      })
    } else {
      redirect("/home")
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
