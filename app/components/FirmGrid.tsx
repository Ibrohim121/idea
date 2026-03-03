'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const FIRMALAR = [
  { id: 1, name: 'Cola' }, { id: 2, name: 'Pepsi' },
  { id: 3, name: 'Montella' }, { id: 4, name: 'Bliss' },
  { id: 5, name: 'Sochnaya Dolina' }, { id: 6, name: 'Gidrolife' },
  { id: 7, name: 'Humson' }, { id: 8, name: 'Flavis' },
];

export default function FirmGrid() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFirmalar = FIRMALAR.filter(firma =>
    firma.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 mt-16 lg:mt-0">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Firmalar</h1>
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredFirmalar.map((firma) => (
          <div
            key={firma.id}
            className="group h-28 md:h-36 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:shadow-xl hover:border-red-200 cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-lg md:text-xl font-bold text-gray-700 group-hover:text-red-600">{firma.name}</span>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2 uppercase tracking-tighter">Mahsulotlarni ko&apos;rish</p>
          </div>
        ))}
        <div className="h-28 md:h-36 bg-white/40 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 font-bold hover:bg-white/60 transition-colors cursor-pointer text-sm md:text-base">
          + QOGANLARI
        </div>
      </div>
    </main>
  );
}