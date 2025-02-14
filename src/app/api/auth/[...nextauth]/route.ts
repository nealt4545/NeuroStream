import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        // Replace with your own logic; this is just a demo
        if (username === "user" && password === "pass") {
          return { id: "1", name: "Demo User", email: "user@example.com", isSubscribed: false };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.isSubscribed = user.isSubscribed;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.isSubscribed = token.isSubscribed as boolean;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// Instead of exporting a default export, export GET and POST handlers:
export { handler as GET, handler as POST };
