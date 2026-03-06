import NextAuth from "next-auth";
import { authConfig } from "@/app/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
export const { GET, POST } = handlers;
