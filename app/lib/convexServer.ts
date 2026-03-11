import { ConvexHttpClient } from "convex/browser";

let client: ConvexHttpClient | null = null;

export function getConvexClient() {
  if (client) return client;

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL;
  if (!convexUrl) {
    throw new Error("CONVEX_URL is not set.");
  }

  client = new ConvexHttpClient(convexUrl);
  return client;
}
