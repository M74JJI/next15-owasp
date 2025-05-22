import { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { users } from "@/lib/users";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );

        return user ?? null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token as JWT & { role?: string }).role ?? null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && typeof user.role === "string") {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/broken-access-control/secure/login",
  },
};
