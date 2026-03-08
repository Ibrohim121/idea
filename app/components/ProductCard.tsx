'use client';

import React from 'react';
import { Package, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    name: string;
    price: number;
    size: string;
    image?: string;
    onCartClick?: () => void;
}

export default function ProductCard({ name, price, size, image, onCartClick }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 flex flex-col transition-all hover:border-red-100 group">
            <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 overflow-hidden border border-gray-100 group-hover:bg-red-50/50 transition-colors">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-contain p-4" />
                ) : (
                    <Package className="text-gray-300 group-hover:text-red-300 transition-colors" size={48} />
                )}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-1 md:mb-2 text-left">
                    <h3 className="text-sm md:text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                        {name}
                    </h3>
                    <span className="text-[10px] font-bold bg-red-600 px-1.5 py-0.5 rounded text-white whitespace-nowrap ml-2">
                        {size}
                    </span>
                </div>

                <div className="flex items-end justify-between mt-3 md:mt-4">
                    <div className="text-left">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Narxi:</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg md:text-2xl font-black text-gray-900">
                                {price.toLocaleString('uz-UZ')}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">so&apos;m</span>
                        </div>
                    </div>

                    <button
                        onClick={onCartClick}
                        className="p-2 md:p-3 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all active:scale-95">
                        <ShoppingCart size={16} className="md:w-[20px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}
