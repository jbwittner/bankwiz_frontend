'use client';

import React, { useState } from 'react';
import {
  signIn,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import axios from 'axios';

const GetRequestButton: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  const handleClickLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/status/public');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickToken = async () => {
    try {
      await axios.get('/api/token');
    } catch (error) {
      console.error(error);
    }
  };

  async function myFunction() {
    const session = await getSession();
    console.log(session);
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);

    /* ... */
  }

  return (
    <div>
      <button onClick={() => signIn('auth0')}>Sign in</button>
      <button onClick={() => myFunction()}>myFunction</button>
      <button onClick={handleClickLogin}>Make GET Request</button>
      <button onClick={handleClickToken}>getToken</button>
      {data && <p>{data}</p>}
    </div>
  );
};

export default GetRequestButton;
