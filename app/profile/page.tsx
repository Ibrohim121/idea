'use client';

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Mail, Moon, Pencil, ShieldCheck, Sun, User2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../contexts/ThemeContext";
import { useProfileOverrides } from "../contexts/ProfileOverrides";
import { buildAvatarDataUrl } from "../lib/avatar";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const { overrides, setOverrides, clearOverrides } = useProfileOverrides();
  const isDark = theme === "dark";
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Yuklanmoqda...</div>;
  }

  const fullName = overrides.name || session?.user?.name || "Foydalanuvchi";
  const email = overrides.email || session?.user?.email || "email topilmadi";
  const avatarImage = session?.user?.image || buildAvatarDataUrl(fullName, email);
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
              {avatarImage ? (
                <img
                  src={avatarImage}
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
                <button
                  onClick={() => {
                    const parts = fullName.split(" ").filter(Boolean);
                    setFirstNameInput(parts[0] ?? "");
                    setLastNameInput(parts.slice(1).join(" "));
                    setIsNameModalOpen(true);
                  }}
                  className="ml-2 inline-flex items-center justify-center rounded-full border border-transparent p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Ism familiya tahrirlash"
                >
                  <Pencil size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>{email}</span>
                <button
                  onClick={() => {
                    setEmailInput(email === "email topilmadi" ? "" : email);
                    setIsEmailModalOpen(true);
                  }}
                  className="ml-2 inline-flex items-center justify-center rounded-full border border-transparent p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Email tahrirlash"
                >
                  <Pencil size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} />
                <span>Auth: NextAuth aktiv</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                clearOverrides();
                signOut({ callbackUrl: "/auth" });
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white font-medium hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </main>

      {isNameModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsNameModalOpen(false)}
        >
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-xl ${
              isDark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Ism familiya tahrirlash</h2>
            <div className="space-y-3">
              <input
                value={firstNameInput}
                onChange={(event) => setFirstNameInput(event.target.value)}
                placeholder="Ism"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900"
              />
              <input
                value={lastNameInput}
                onChange={(event) => setLastNameInput(event.target.value)}
                placeholder="Familiya"
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900"
              />
            </div>
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsNameModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  const nextName = `${firstNameInput} ${lastNameInput}`.trim();
                  if (nextName) {
                    setOverrides({ name: nextName });
                  }
                  setIsNameModalOpen(false);
                }}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {isEmailModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsEmailModalOpen(false)}
        >
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-xl ${
              isDark ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Email tahrirlash</h2>
            <input
              value={emailInput}
              onChange={(event) => setEmailInput(event.target.value)}
              placeholder="Email"
              type="email"
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-900"
            />
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  if (emailInput.trim()) {
                    setOverrides({ email: emailInput.trim() });
                  }
                  setIsEmailModalOpen(false);
                }}
                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
