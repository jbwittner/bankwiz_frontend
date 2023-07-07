import { NextAuthOptions } from "next-auth";
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
  },
}
