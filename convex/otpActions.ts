"use node";

import crypto from "crypto";
import { v } from "convex/values";
import { action } from "./_generated/server";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function hashOtp(code: string, salt: string) {
  return crypto.createHmac("sha256", salt).update(code).digest("hex");
}

export const requestEmailOtp = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const password = args.password;

    if (!email || !password) {
      throw new Error("INVALID_INPUT");
    }

    const user = await ctx.runQuery("otp:getUserByEmail" as any, { email });
    if (user) {
      const expected = hashPassword(password, user.passwordSalt);
      if (expected !== user.passwordHash) {
        throw new Error("INVALID_CREDENTIALS");
      }
    } else {
      const passwordSalt = crypto.randomBytes(16).toString("hex");
      const passwordHash = hashPassword(password, passwordSalt);
      await ctx.runMutation("otp:createUser" as any, {
        email,
        passwordHash,
        passwordSalt,
        createdAt: Date.now(),
      });
    }

    const otpCode = crypto.randomInt(100000, 1000000).toString();
    const otpSalt = crypto.randomBytes(16).toString("hex");
    const otpHash = hashOtp(otpCode, otpSalt);
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await ctx.runMutation("otp:storeEmailOtp" as any, {
      email,
      otpHash,
      otpSalt,
      expiresAt,
      createdAt: Date.now(),
    });

    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;

    if (!resendKey || !resendFrom) {
      throw new Error("RESEND_NOT_CONFIGURED");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [email],
        subject: "Tasdiqlash kodi",
        text: `Kirish uchun tasdiqlash kodingiz: ${otpCode}`,
      }),
    });

    if (!response.ok) {
      throw new Error("EMAIL_SEND_FAILED");
    }

    return { ok: true };
  },
});

export const verifyEmailOtp = action({
  args: { email: v.string(), password: v.string(), code: v.string() },
  handler: async (ctx, args) => {
    const email = normalizeEmail(args.email);
    const password = args.password;
    const code = args.code.trim();

    if (!email || !password || !code) return null;

    const user = await ctx.runQuery("otp:getUserByEmail" as any, { email });
    if (!user) return null;

    const expectedPassword = hashPassword(password, user.passwordSalt);
    if (expectedPassword !== user.passwordHash) return null;

    const otp = await ctx.runQuery("otp:getLatestEmailOtp" as any, { email });
    if (!otp) return null;

    if (otp.expiresAt < Date.now()) {
      await ctx.runMutation("otp:deleteEmailOtp" as any, { id: otp._id });
      return null;
    }

    const otpHash = hashOtp(code, otp.otpSalt);
    if (otpHash !== otp.otpHash) return null;

    await ctx.runMutation("otp:deleteEmailOtp" as any, { id: otp._id });

    return {
      id: user._id,
      email: user.email,
      name: user.email,
    };
  },
});
