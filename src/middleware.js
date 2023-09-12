import { withAuth } from 'next-auth/middleware';
import jwt from 'jsonwebtoken';

export default withAuth(
  function middleware(req) {
    // some actions here
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) {
          return true;
        }
      },
    },
  },
);

export const config = { matcher: ['/app/:path*'] };
