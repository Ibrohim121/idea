
'use client';
import React, { useState } from 'react';

import { LayoutGrid, ShoppingCart, Truck, Calendar, Users, Package, Menu, X, User, Moon, Sun } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthButton from './AuthButton';
import { useTheme } from '../contexts/ThemeContext';

// Klasslarni birlashtirish uchun yordamchi funksiya
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { name: "Firmalar", icon: LayoutGrid, path: "/" },
  { name: "Katalog", icon: Package, path: "/katalog" },
  { name: "Dastavka kuni", icon: Calendar, path: "/dastavka" },
  { name: "Savat", icon: ShoppingCart, path: "/savat" },
  { name: "Dastavshiklar", icon: Users, path: "/dastavshiklar" },
  { name: "Profil", icon: User, path: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white border border-gray-200 rounded-xl shadow-md text-gray-600 hover:text-red-500 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col h-screen shrink-0 transition-transform duration-300 transform",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 pt-20 lg:pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <Truck className="text-red-600" size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 lg:block hidden">Logistika</h2>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-8 px-2 lg:hidden">Logistika Paneli</h2>
          <h2 className="text-xl font-bold text-gray-800 mb-8 px-2 lg:block hidden">Panel</h2>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 w-full text-left font-medium px-4 py-3 rounded-lg transition-all",
                    isActive
                      ? "bg-red-50 text-red-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-900 transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        {/* Auth Button */}
        <div>
          <AuthButton />
        </div>
      </aside>
    </>
  );
}
