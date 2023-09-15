import applogger from '@/tools/AppLogger';
import { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import * as jose from 'jose';
import { JWT } from 'next-auth/jwt';

const logger = applogger.childApiLogger('AuthOptions');

export interface CustomJWT extends JWT {
  accessToken?: string | null;
  idToken?: string | null;
  accessTokenExpires?: number | null;
  refreshToken?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER ?? '',
      authorization: {
        params: {
          scope: 'offline_access openid email profile',
          prompt: 'login',
          audience: 'Bankwiz_server',
        },
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      logger.info('Callbacks - jwt - token');

      const customToken: CustomJWT = token;

      // Initial sign in
      if (account && user) {
        const access_token: string = account.access_token
          ? account.access_token
          : '';
        const decodedJwt = jose.decodeJwt(access_token);

        customToken.accessToken = access_token;
        customToken.accessTokenExpires = decodedJwt.exp;
        customToken.refreshToken = account.refresh_token;

        return customToken;
      }

      logger.warn('Checking access token expiration');

      if (customToken.accessTokenExpires) {
        console.log(customToken.accessTokenExpires);
        if (Date.now() > customToken.accessTokenExpires * 1000) {
          logger.warn('Expired access token');
        }
      }

      return token;
    },
  },
};
