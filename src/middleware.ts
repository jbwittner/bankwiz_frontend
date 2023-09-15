import { withAuth } from 'next-auth/middleware';
import applogger from '@/tools/AppLogger';
import { CustomJWT } from './app/api/auth/[...nextauth]/authoptions';

const logger = applogger.childApiLogger('middleware - withAuth');

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => {
      if (token) {
        const customJWT: CustomJWT = token;
        if (customJWT.accessTokenExpires) {
          if (Date.now() < customJWT.accessTokenExpires * 1000) {
            return true;
          }
        }
      }
      logger.warn('Access token NOK');
      return false;
    },
  },
});

export const config = { matcher: ['/app/:path*'] };
