'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import { Search } from 'lucide-react';

const profiles = [
    {
        id: 1,
        name: "Ibrohim",
        surname: "Akbarov",
        phone: "+998 90 123 45 67",
    },
    {
        id: 2,
        name: "Aziz",
        surname: "Rahimov",
        phone: "+998 91 987 65 43",
    },
    {
        id: 3,
        name: "Malika",
        surname: "Saidova",
        phone: "+998 93 555 22 11",
    },
    {
        id: 4,
        name: "Jasur",
        surname: "Toshmatov",
        phone: "+998 94 444 88 99",
    }
];

export default function KatalogPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 mt-16 lg:mt-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Katalog</h1>
                        <p className="text-gray-500 mt-1">Mutaxassislar va foydalanuvchilar ro'yxati</p>
                    </div>

                    <div className="relative w-full lg:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Profil qidirish..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {profiles.map((profile) => (
                        <ProfileCard
                            key={profile.id}
                            name={profile.name}
                            surname={profile.surname}
                            phone={profile.phone}
                        />
                    ))}

                    {/* Add New Profile Placeholder */}
                    <div className="bg-white/40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 font-bold hover:bg-white/60 transition-colors cursor-pointer min-h-[250px]">
                        <span className="text-3xl mb-2">+</span>
                        <span>YANGI QO'SHISH</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
