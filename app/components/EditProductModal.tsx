'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { quantity: number; productName: string; size: string }) => void;
    product?: {
        name: string;
        quantity: number;
        size: string;
    };
    mode?: 'edit' | 'add';
}

export default function EditProductModal({ isOpen, onClose, onSave, product, mode = 'edit' }: EditProductModalProps) {
    const [quantity, setQuantity] = useState(product?.quantity || 1);
    const [productName, setProductName] = useState(product?.name || "");
    const [size, setSize] = useState(product?.size || "");

    if (!isOpen) return null;


    const handleSave = () => {
        onSave({ quantity, productName, size });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}>
            <div
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        {mode === 'edit' ? 'Mahsulotni tahrirlash' : 'Savatga qo\'shish'}
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
                        <label className="text-sm font-semibold text-gray-500 ml-1">Mahsulot</label>
                        <select
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            disabled={mode === 'add'}
                            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none appearance-none disabled:opacity-75"
                        >
                            <option value="Coca-Cola 1.5L">Coca-Cola 1.5L</option>
                            <option value="Pepsi 1.5L">Pepsi 1.5L</option>
                            <option value="Fanta 1.5L">Fanta 1.5L</option>
                            <option value="Lays Chips Classic">Lays Chips Classic</option>
                            <option value="Nestlé Water 0.5L">Nestlé Water 0.5L</option>
                            <option value="Snikers Chocolate">Snikers Chocolate</option>
                            {/* Agar mahsulot ro'yxatda bo'lmasa, uni ham qo'shib qo'yamiz */}
                            {!["Coca-Cola 1.5L", "Pepsi 1.5L", "Fanta 1.5L", "Lays Chips Classic", "Nestlé Water 0.5L", "Snikers Chocolate"].includes(productName) && productName && (
                                <option value={productName}>{productName}</option>
                            )}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500 ml-1">Soni</label>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none"
                            >
                                {[1, 2, 3, 4, 5, 10, 20, 50].map(num => (
                                    <option key={num} value={num}>{num} ta</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500 ml-1">Hajmi</label>
                            <select
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                disabled={mode === 'add'}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-gray-800 font-medium focus:ring-2 focus:ring-red-100 transition-all outline-none disabled:opacity-75"
                            >
                                <option value="0.5 L">0.5 L</option>
                                <option value="1.0 L">1.0 L</option>
                                <option value="1.5 L">1.5 L</option>
                                <option value="2.0 L">2.0 L</option>
                                <option value="150 g">150 g</option>
                                <option value="50 g">50 g</option>
                                {/* Agar hajm ro'yxatda bo'lmasa, uni ham qo'shib qo'yamiz */}
                                {!["0.5 L", "1.0 L", "1.5 L", "2.0 L", "150 g", "50 g"].includes(size) && size && (
                                    <option value={size}>{size}</option>
                                )}
                            </select>
                        </div>
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
                        className="flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-red-600 shadow-lg transition-all active:scale-[0.98]"
                    >
                        {mode === 'edit' ? 'Saqlash' : 'Savatga qo\'shish'}
                    </button>
                </div>
            </div>
        </div>
    );
}

