'use client';

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Mail, LogOut } from "lucide-react";
import { useProfileOverrides } from "../contexts/ProfileOverrides";

export default function AuthButton() {
  const { data: session } = useSession();
  const { overrides, clearOverrides } = useProfileOverrides();
  const displayName = overrides.name || session?.user?.name || "Foydalanuvchi";
  const displayEmail = overrides.email || session?.user?.email || "Email topilmadi";
  const avatarImage = session?.user?.image;

  if (session?.user) {
    return (
      <div className="flex items-center gap-3 p-4 border-t border-gray-200 mt-auto">
        {avatarImage ? (
          <img
            src={avatarImage}
            alt={displayName}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-semibold">
              {displayName?.[0] || displayEmail?.[0] || "U"}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {displayName}
          </p>
          <p className="text-xs text-gray-500 truncate flex items-center gap-1">
            <Mail size={12} />
            {displayEmail}
          </p>
        </div>
        <button
          onClick={() => {
            clearOverrides();
            signOut({ callbackUrl: "/auth" });
          }}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Chiqish"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-gray-200 mt-auto space-y-3">
      <p className="text-sm text-gray-600 text-center">Tizimga kirish uchun auth sahifasiga oting.</p>

      <Link
        href="/auth"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all shadow-md"
      >
        <Mail size={20} />
        Kirish sahifasi
      </Link>
    </div>
  );
}
