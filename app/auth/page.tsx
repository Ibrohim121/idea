'use client';

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, Mail } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  async function handleSendCode() {
    if (!email || !password) {
      setError("Email va parolni kiriting.");
      return;
    }

    setError("");
    setIsSendingCode(true);

    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data?.ok) {
        setError(data?.error || "Kod yuborilmadi. Qayta urinib ko'ring.");
        setIsSendingCode(false);
        return;
      }

      setCodeSent(true);
    } catch (err) {
      setError("Kod yuborishda xatolik yuz berdi.");
    } finally {
      setIsSendingCode(false);
    }
  }

  async function handleCredentialsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsVerifying(true);

    const result = await signIn("credentials", {
      email,
      password,
      code,
      redirect: false,
    });

    setIsVerifying(false);

    if (result?.error) {
      setError("Email, parol yoki kod noto'g'ri.");
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Kirish / Ro&apos;yxatdan o&apos;tish</h1>
        <p className="text-sm text-gray-500 mt-2">
          Tizimga kirish uchun Google yoki email, parol va kod orqali davom eting.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google orqali kirish
          </button>

        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Yoki</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form className="space-y-3" onSubmit={handleCredentialsSubmit}>
          <label className="block">
            <span className="text-sm text-gray-700">Email</span>
            <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <Mail size={16} className="text-gray-400" />
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full outline-none text-sm"
                placeholder="name@gmail.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Parol</span>
            <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
              <Lock size={16} className="text-gray-400" />
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full outline-none text-sm"
                placeholder="Parolingiz"
              />
            </div>
          </label>

          {codeSent ? (
            <label className="block">
              <span className="text-sm text-gray-700">Tasdiqlash kodi</span>
              <div className="mt-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2">
                <KeyRound size={16} className="text-gray-400" />
                <input
                  required
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className="w-full outline-none text-sm"
                  placeholder="6 xonali kod"
                />
              </div>
            </label>
          ) : null}

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          {!codeSent ? (
            <button
              type="button"
              onClick={handleSendCode}
              disabled={isSendingCode}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSendingCode ? "Kod yuborilmoqda..." : "Kodni yuborish"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isVerifying ? "Kutilmoqda..." : "Kodni tasdiqlash va kirish"}
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
