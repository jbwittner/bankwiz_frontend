import NextAuth, { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";


export const authOptions: NextAuthOptions = {
  secret: "secret",
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
      // Send properties to the client, like an access_token and user id from a provider.
      // @ts-ignore
      session.accessToken = token.accessToken

      // @ts-ignore
      session.user.id = token.id
      
      return session

    },
    async jwt({ token, account, profile }) {
      console.log("token : ", token)
      console.log("account : ", account)
      console.log("profile : ", profile)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }