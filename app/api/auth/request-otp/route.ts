import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/app/lib/convexServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email?.toString() ?? "";
    const password = body?.password?.toString() ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email va parol majburiy." },
        { status: 400 }
      );
    }

    const client = getConvexClient();
    await client.action(api.otpActions.requestEmailOtp, { email, password });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Ma'lumotlar noto'g'ri yoki kod yuborilmadi." },
      { status: 400 }
    );
  }
}
