'use client';

import Image from 'next/image';
import GetRequestButton from './ButtonCallGet';
import { pino } from 'pino';
import React, { useEffect } from 'react';

export default function LandingPage() {
  return (
    <React.Fragment>
      <GetRequestButton></GetRequestButton>
    </React.Fragment>
  );
}
