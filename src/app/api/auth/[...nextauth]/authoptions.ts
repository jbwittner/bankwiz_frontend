import applogger from '@/tools/AppLogger';
import { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const logger = applogger.childApiLogger('AuthOptions');

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER ?? '',
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'login',
          audience: 'Bankwiz_server',
        },
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account === undefined) {
        logger.debug('Callbacks - jwt - account is undefined');
      } else {
        logger.debug({ account }, 'Callbacks - jwt - account');
      }

      if (user === undefined) {
        logger.debug('Callbacks - jwt - user is undefined');
      } else {
        logger.debug({ user }, 'Callbacks - jwt - user');
      }

      logger.info({ token }, 'Callbacks - jwt - token');

      if (user) token.id = user.id;
      if (account) token.idToken = account.id_token;
      if (account) token.accessToken = account.access_token;

      return token;
    },
  },
};
