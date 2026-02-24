'use client';

import React, { useState } from 'react';
import { User, Phone, Check } from 'lucide-react';

interface ProfileCardProps {
    name: string;
    surname: string;
    phone: string;
    image?: string;
}

export default function ProfileCard({ name, surname, phone, image }: ProfileCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(phone);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center transition-all hover:shadow-md">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 overflow-hidden border-2 border-red-50">
                {image ? (
                    <img src={image} alt={`${name} ${surname}`} className="w-full h-full object-cover" />
                ) : (
                    <User className="text-gray-400" size={48} />
                )}
            </div>
            <h3 className="text-lg font-bold text-gray-800">
                {name} {surname}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-gray-500">
                <Phone size={16} className="text-red-500" />
                <span className="text-sm">{phone}</span>
            </div>
            <button
                onClick={handleCopy}
                className={`mt-6 w-full py-2 px-4 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${copied
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
            >
                {copied ? (
                    <>
                        <Check size={16} />
                        Nusxa olindi!
                    </>
                ) : (
                    "Bog'lanish"
                )}
            </button>
        </div>
    );
}
