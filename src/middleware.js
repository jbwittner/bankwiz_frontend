import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // some actions here
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("///////token///////")
        console.log(token)
        console.log("///////token///////")
        if (token) {
          return token;
        }
      },
    },
  },
);

export const config = { matcher: ["/app/:path*"] }

