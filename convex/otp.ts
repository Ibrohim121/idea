import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    return await ctx.db
      .query("emailUsers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    passwordSalt: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emailUsers", {
      email: normalizeEmail(args.email),
      passwordHash: args.passwordHash,
      passwordSalt: args.passwordSalt,
      createdAt: args.createdAt,
    });
  },
});

export const storeEmailOtp = mutation({
  args: {
    email: v.string(),
    otpHash: v.string(),
    otpSalt: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const existing = await ctx.db
      .query("emailOtps")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();

    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    return await ctx.db.insert("emailOtps", {
      email,
      otpHash: args.otpHash,
      otpSalt: args.otpSalt,
      expiresAt: args.expiresAt,
      createdAt: args.createdAt,
    });
  },
});

export const getLatestEmailOtp = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    return await ctx.db
      .query("emailOtps")
      .withIndex("by_email", (q) => q.eq("email", email))
      .order("desc")
      .first();
  },
});

export const deleteEmailOtp = mutation({
  args: { id: v.id("emailOtps") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
