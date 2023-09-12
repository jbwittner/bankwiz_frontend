'use client';

import React, { useState } from 'react';
import { signIn, getSession, getCsrfToken, signOut } from 'next-auth/react';
import axios from 'axios';

const GetRequestButton: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  const statusPublic = async () => {
    try {
      const response = await axios.get('http://localhost:8080/status/public');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const apiToken = async () => {
    try {
      await axios.get('/api/token');
    } catch (error) {
      console.error(error);
    }
  };

  const apiStatus = async () => {
    try {
      await axios.get('/api/status');
    } catch (error) {
      console.error(error);
    }
  };

  async function getSessiongetCsrfToken() {
    const session = await getSession();
    console.log(session);
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);

    /* ... */
  }

  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => getSessiongetCsrfToken()}>
        getSessiongetCsrfToken
      </button>
      <button onClick={statusPublic}>statusPublic</button>
      <button onClick={apiToken}>apiToken</button>
      <button onClick={apiStatus}>apiStatus</button>
      {data && <p>{data}</p>}
    </div>
  );
};

export default GetRequestButton;
