"use client";

import React, { useState } from 'react';
import axios from 'axios';

const GetRequestButton: React.FC = () => {
  const [data, setData] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:8080/status/public');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Make GET Request</button>
      {data && <p>{data}</p>}
    </div>
  );
};

export default GetRequestButton;
