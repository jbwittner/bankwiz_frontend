import { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH0_CLIENT_SECRET ?? "",
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH0_ISSUER ?? '',
      authorization: { params: { scope: "openid email profile", prompt: "login", audience: 'Bankwiz_server' } },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session({ session, token }) {
      console.log("session", session)
      console.log("token", token)
      //@ts-ignore
      session.user.accessToken = token.accessToken;
      //@ts-ignore
      session.user.id_token = token.id_token;
      return session;
    },
    async jwt({token, account, user }) {
      if (account) token.id_token = account.id_token;
      if (account) token.accessToken = account.access_token;
      return token
    }
  }
};
