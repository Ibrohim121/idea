import type { NextAuthConfig } from "next-auth";
import crypto from "crypto";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getConvexClient } from "./lib/convexServer";
import { api } from "@/convex/_generated/api";

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

function getEmailAvatarUrl(email?: string) {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return undefined;
  const hash = crypto.createHash("md5").update(normalized).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?d=blank&s=256`;
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
        password: { label: "Parol", type: "password" },
        code: { label: "Kod", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();
        const code = credentials?.code?.toString().trim();

        if (!email || !password || !code) return null;

        try {
          const client = getConvexClient();
          const user = await client.action(api.otpActions.verifyEmailOtp, {
            email,
            password,
            code,
          });

          if (!user) return null;

          const avatar = getEmailAvatarUrl(user.email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: avatar,
          };
        } catch (error) {
          return null;
        }
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

      if (!token.picture && typeof token.email === "string") {
        token.picture = getEmailAvatarUrl(token.email);
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
