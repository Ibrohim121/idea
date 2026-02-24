'use client';

import React from 'react';
import { Package, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    name: string;
    price: number;
    size: string;
    image?: string;
}

export default function ProductCard({ name, price, size, image }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col transition-all hover:shadow-xl hover:border-red-100 group">
            <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-gray-100 group-hover:bg-red-50/50 transition-colors">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-contain p-4" />
                ) : (
                    <Package className="text-gray-300 group-hover:text-red-300 transition-colors" size={64} />
                )}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                        {name}
                    </h3>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-500 whitespace-nowrap ml-2">
                        {size}
                    </span>
                </div>

                <div className="flex items-end justify-between mt-4">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Narxi:</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-gray-900">
                                {price.toLocaleString('uz-UZ')}
                            </span>
                            <span className="text-xs font-bold text-gray-400 uppercase">so'm</span>
                        </div>
                    </div>

                    <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-gray-200">
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
