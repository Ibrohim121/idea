'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddDastavshikModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { name: string; surname: string; phone: string; firma: string }) => void;
}

export default function AddDastavshikModal({ isOpen, onClose, onSave }: AddDastavshikModalProps) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [firma, setFirma] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (name && surname && phone && firma) {
            onSave({ name, surname, phone, firma });
            // Formani tozalash
            setName('');
            setSurname('');
            setPhone('');
            setFirma('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        Dastavshik qo'shish
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-500 ml-1">Ism</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none"
                            placeholder="Ismingiz"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-500 ml-1">Familiya</label>
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none"
                            placeholder="Familiyangiz"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-500 ml-1">Firma nomi</label>
                        <input
                            type="text"
                            value={firma}
                            onChange={(e) => setFirma(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none"
                            placeholder="Firma nomi"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-500 ml-1">Telefon raqami</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none"
                            placeholder="+998 90 123 45 67"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        Bekor qilish
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!name || !surname || !phone || !firma}
                        className="flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-red-600 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Saqlash
                    </button>
                </div>
            </div>
        </div>
    );
}
