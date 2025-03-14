import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.email = token.email;
          session.user.name = token.name;
        }
      }
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.status !== 200) return null;

          const authData = await response.json();
          if (!authData.jwt || !authData.user) return null;

          return {
            id: authData.user.id,
            email: authData.user.email,
            name: authData.user.name,
            jwt: authData.jwt,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
