import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";


const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: "Ft19Fj18hCfT5gBF1sUjGgLzLTkoFtZz",
      clientSecret: "Y32vrdclwYuCh8wEbDn2lOM15XDRaNfResRBcVGubTaU9MmUfHGufQHj_RTdCGU6",
      issuer: "https://bankwiz-dev.eu.auth0.com"
    })
    // ...add more providers here
  ],

  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },

})

export { handler as GET, handler as POST }