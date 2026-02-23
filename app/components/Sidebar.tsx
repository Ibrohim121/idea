
'use client';
import React from 'react';

import { LayoutGrid, ShoppingCart, Truck, Calendar, Users, Package } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-6">
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
          <Truck className="text-red-600" size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-8 px-2">Logistika Paneli</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name}
                href={item.path}
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
    </aside>
  );
}
