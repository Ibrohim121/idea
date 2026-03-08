import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { buildAvatarDataUrl } from "./lib/avatar";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleProvider =
  googleClientId && googleClientSecret
    ? Google({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
      })
    : null;

if (!googleProvider) {
  console.warn(
    "Google auth disabled: GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET missing."
  );
}

const authSecret =
  process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? undefined;

if (!authSecret) {
  console.warn(
    "NEXTAUTH_SECRET (or AUTH_SECRET) is not set. NextAuth may fail in production."
  );
}

export const authConfig = {
  secret: authSecret,
  trustHost: true,
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    ...(googleProvider ? [googleProvider] : []),
    Credentials({
      id: "credentials",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        firstName: { label: "Ism", type: "text" },
        lastName: { label: "Familiya", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const firstName = credentials?.firstName?.toString().trim();
        const lastName = credentials?.lastName?.toString().trim();

        if (!email || !firstName || !lastName) return null;

        return {
          id: email,
          email,
          name: `${firstName} ${lastName}`,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith("/auth");

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      if (!token.picture) {
        token.picture = buildAvatarDataUrl(
          typeof token.name === "string" ? token.name : undefined,
          typeof token.email === "string" ? token.email : undefined
        );
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.name = typeof token.name === "string" ? token.name : session.user.name;
        session.user.email = typeof token.email === "string" ? token.email : session.user.email;
        session.user.image = typeof token.picture === "string" ? token.picture : session.user.image;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
