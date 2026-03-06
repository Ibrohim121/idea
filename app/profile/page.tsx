'use client';

import { useSession, signOut } from "next-auth/react";
import { LogOut, Mail, Moon, ShieldCheck, Sun, User2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../contexts/ThemeContext";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  }

  const fullName = session?.user?.name || "Foydalanuvchi";
  const email = session?.user?.email || "email topilmadi";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={`flex min-h-screen w-full overflow-hidden flex-col lg:flex-row ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Sidebar />

      <main className="flex-1 overflow-y-auto mt-16 lg:mt-0 p-4 lg:p-8">
        <div
          className={`mx-auto max-w-3xl rounded-2xl border p-6 lg:p-8 ${
            isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className={isDark ? "text-slate-300" : "text-slate-500"}>
                Akkaunt malumotlari va sozlamalar.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-black text-white hover:bg-zinc-900"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-[112px_1fr] sm:items-center">
            <div
              className={`h-28 w-28 rounded-2xl flex items-center justify-center text-3xl font-bold ${
                isDark ? "bg-slate-800 text-slate-200" : "bg-red-50 text-red-600"
              }`}
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={fullName}
                  className="h-28 w-28 rounded-2xl object-cover"
                />
              ) : (
                initials || "U"
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User2 size={18} />
                <span className="font-medium">{fullName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                <span>Auth: NextAuth aktiv</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => signOut({ callbackUrl: "/auth" })}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white font-medium hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
