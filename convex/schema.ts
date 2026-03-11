import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  emailUsers: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    passwordSalt: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
  emailOtps: defineTable({
    email: v.string(),
    otpHash: v.string(),
    otpSalt: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
