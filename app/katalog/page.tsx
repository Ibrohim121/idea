'use client';

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';
import EditProductModal from '../components/EditProductModal';

const products = [
    { id: 1, name: "Coca-Cola 1.5L", price: 12000, size: "1.5 L" },
    { id: 2, name: "Pepsi 1.5L", price: 11500, size: "1.5 L" },
    { id: 3, name: "Fanta 1.5L", price: 11000, size: "1.5 L" },
    { id: 4, name: "Lays Chips Classic", price: 15000, size: "150 g" },
    { id: 5, name: "Nestlé Water 0.5L", price: 2500, size: "0.5 L" },
    { id: 6, name: "Snikers Chocolate", price: 8000, size: "50 g" },
    { id: 7, name: "Sprite 1.5L", price: 11000, size: "1.5 L" },
    { id: 8, name: "Dena Juice Apple", price: 14000, size: "1.0 L" },
    { id: 9, name: "Hydrolife Water 1.5L", price: 3500, size: "1.5 L" },
    { id: 10, name: "Mars Chocolate", price: 8500, size: "50 g" },
    { id: 11, name: "Pringles Original", price: 28000, size: "165 g" },
    { id: 12, name: "M&Ms Peanut", price: 9000, size: "45 g" },
    { id: 13, name: "Fuse Tea Lemon", price: 9500, size: "0.5 L" },
    { id: 14, name: "Red Bull Energy", price: 22000, size: "250 ml" },
    { id: 15, name: "Tassay Water 1.0L", price: 5000, size: "1.0 L" },
    { id: 16, name: "Doritos Nacho Cheese", price: 18000, size: "100 g" },
];

export default function KatalogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCartClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddToCart = (data: { quantity: number; productName: string; size: string }) => {
        const cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');

        const newCartItem = {
            id: Date.now(), // Noyob ID beramiz
            name: data.productName,
            quantity: data.quantity,
            price: selectedProduct?.price || 0,
            size: data.size
        };

        const updatedCart = [...cartData, newCartItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        // Hodisani trigger qilamiz, CartDetails o'zgarishni sezishi uchun
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 mt-16 lg:mt-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Katalog</h1>
                        <p className="text-gray-500 mt-1 text-sm md:text-base">Hamma mahsulotlar narxi va hajmi bilan</p>
                    </div>

                    <div className="relative w-full lg:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Mahsulot qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            size={product.size}
                            onCartClick={() => handleCartClick(product)}
                        />
                    ))}

                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 text-center">
                            <p className="text-gray-400 font-medium font-bold">Mahsulot topilmadi</p>
                        </div>
                    )}
                </div>
            </main>

            <EditProductModal
                key={selectedProduct?.id || 'none'}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddToCart}
                mode="add"
                product={selectedProduct ? {
                    name: selectedProduct.name,
                    quantity: 1,
                    size: selectedProduct.size
                } : undefined}
            />
        </div>
    );
}
