'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Calendar, Truck, Clock } from 'lucide-react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

const FIRMS_DELIVERY_RAW = [
    { id: 1, name: 'Cola', offset: 1, status: 'Yo\'lda' },
    { id: 2, name: 'Pepsi', offset: 1, status: 'Tayyorlanmoqda' },
    { id: 3, name: 'Montella', offset: 2, status: 'Qabul qilingan' },
    { id: 4, name: 'Bliss', offset: 1, status: 'Yo\'lda' },
    { id: 5, name: 'Sochnaya Dolina', offset: 3, status: 'Kutilmoqda' },
    { id: 6, name: 'Gidrolife', offset: 0, status: 'Yetkazilmoqda' },
    { id: 7, name: 'Humson', offset: 4, status: 'Kutilmoqda' },
    { id: 8, name: 'Flavis', offset: 1, status: 'Tayyorlanmoqda' },
];

export default function DastavkaPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const today = useMemo(() => new Date(), []);

    const firmsWithDates = useMemo(() => {
        return FIRMS_DELIVERY_RAW.map(firm => {
            const deliveryDateObj = addDays(today, firm.offset);
            const deliveryDate = format(deliveryDateObj, 'dd.MM.yyyy');

            let relativeDay = `${firm.offset} kundan keyin`;
            if (isToday(deliveryDateObj)) relativeDay = 'bugun';
            else if (isTomorrow(deliveryDateObj)) relativeDay = 'ertaga';

            return {
                ...firm,
                deliveryDate,
                relativeDay
            };
        });
    }, [today]);

    const filteredFirms = firmsWithDates.filter(firm =>
        firm.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Dastavka Kunlari</h1>
                        <p className="text-gray-500 mt-1">Firma buyurtmalari kelishining aniq jadvali (avtomatik yangilanadi)</p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Firmani qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredFirms.map((firm) => (
                        <div
                            key={firm.id}
                            className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all group border-l-4 border-l-red-500"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
                                    <Truck className="text-red-500" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{firm.name}</h3>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span>{firm.deliveryDate}</span>
                                            <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">
                                                {firm.relativeDay}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Holati</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm font-bold text-gray-700">{firm.status}</span>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-xl text-gray-400 group-hover:text-red-500 transition-colors">
                                    <Clock size={20} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredFirms.length === 0 && (
                        <div className="py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
                            <p className="text-gray-400 font-bold">Firma topilmadi</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
