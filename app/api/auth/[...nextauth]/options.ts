//https://docs.descope.com/knowledgebase/frameworks/nextauth/

const AuthOptions = {
  providers: [
    {
      id: "descope",
      name: "Descope",
      type: "oauth",
      wellKnown: `https://api.descope.com/P2dIgUhThJjCfrTnQnxUvH9VsAtV/.well-known/openid-configuration`,
      authorization: {
        params: { scope: "openid email profile descope.custom_claims" },
      },
      idToken: true,
      clientId: "P2dIgUhThJjCfrTnQnxUvH9VsAtV",
      clientSecret:
        "K2hiYEBTb2KYjWjHMyOakoCZLJeTTmsfDcCyipKmqewmUQWD4kTvxsGPNLcoMaPAVoMkQ71",
      checks: ["pkce", "state"],
      profile(
        profile: { sub: any; name: any; email: any; picture: any },
        tokens: { id_token: any }
      ) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          idToken: tokens.id_token,
          ...tokens,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
          refresh_token: account.refresh_token,
          profile: {
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture,
          },
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await fetch(
            "https://api.descope.com/oauth2/v1/token",
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                client_id: "P2dIgUhThJjCfrTnQnxUvH9VsAtV",
                client_secret:
                  "K2hiYEBTb2KYjWjHMyOakoCZLJeTTmsfDcCyipKmqewmUQWD4kTvxsGPNLcoMaPAVoMkQ71",
                grant_type: "refresh_token",
                refresh_token: token.refresh_token,
              }),
              method: "POST",
            }
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    async session({ session, token }: any) {
      if (token.profile) {
        session.user = token.profile;
      }

      session.error = token.error;
      session.accessToken = token.access_token;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default AuthOptions;
