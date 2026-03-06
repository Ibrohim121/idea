'use client';

import React, { useState, useMemo } from 'react';
import { User, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import EditProductModal from './EditProductModal';
import { useSession } from "next-auth/react";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  size: string;
}

interface CartDetailsProps {
  fullWidth?: boolean;
}

const initialItems: CartItem[] = [];

export default function CartDetails({ fullWidth = false }: CartDetailsProps) {
  const { data: session } = useSession();
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const userDisplayName = session?.user?.name?.trim() || "Foydalanuvchi";
  const userEmail = session?.user?.email || "Email topilmadi";
  const userImage = session?.user?.image;

  // localStorage'dan yuklash
  React.useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    };

    loadCart();

    // Boshqa oynalardan (yoki katalogdan) o'zgarishlar kelsa
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  // localStorage'ga saqlash
  const updateCart = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const handleEditClick = (item: CartItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    updateCart(items.filter(item => item.id !== id));
  };

  const handleSave = (newData: { quantity: number; productName: string; size: string }) => {
    if (editingItem) {
      updateCart(items.map(item =>
        item.id === editingItem.id
          ? { ...item, name: newData.productName, quantity: newData.quantity, size: newData.size }
          : item
      ));
    }
  };

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  return (
    <section className={`${fullWidth ? 'flex-1' : 'w-85 hidden 2xl:flex'} bg-white border-l border-gray-200 p-4 md:p-6 flex flex-col h-full`}>
      <div className="flex items-center gap-4 mb-6 md:mb-10 p-3 md:p-4 bg-gray-50 rounded-2xl">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-full flex items-center justify-center text-white overflow-hidden">
          {userImage ? (
            <img
              src={userImage}
              alt={userDisplayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={20} className="md:w-[24px]" />
          )}
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-gray-900 truncate text-sm md:text-base">{userDisplayName}</p>
          <p className="text-[10px] md:text-xs text-gray-500 font-medium truncate">{userEmail}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[10px] md:text-sm">Tanlanganlar</h3>
          <span className="text-[10px] md:text-xs bg-gray-100 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-gray-600 font-bold border border-gray-200">
            {items.length} ta
          </span>
        </div>

        <div className="space-y-2 md:space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between group cursor-pointer p-3 md:p-4 hover:bg-red-50/40 rounded-2xl transition-all border border-transparent hover:border-red-100">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-800 text-xs md:text-sm line-clamp-1">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                    <span className="text-[10px] md:text-xs text-gray-400 bg-gray-50 px-1.5 md:px-2 py-0.5 rounded border border-gray-100">
                      {item.size}
                    </span>
                    <span className="text-[10px] md:text-xs font-black text-red-500">
                      x {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 md:gap-1">
                <button
                  onClick={() => handleEditClick(item)}
                  className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <Pencil size={16} className="md:w-[18px]" />
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                >
                  <Trash2 size={16} className="md:w-[18px]" />
                </button>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-red-500 transition-colors ml-1 hidden md:block" />
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-10 md:py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-sm md:text-base text-gray-400 font-medium">Savat bo&apos;sh</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 md:pt-8 border-t border-gray-100">
        <div className="flex justify-between items-end mb-4 md:mb-6">
          <span className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest leading-none">Umumiy:</span>
          <div className="text-right">
            <span className="font-black text-xl md:text-3xl text-gray-900 block leading-none">
              {totalPrice.toLocaleString('uz-UZ')}
            </span>
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-tighter">so`m</span>
          </div>
        </div>
        <button
          className="w-full bg-gray-900 text-white py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg hover:bg-red-600 transition-all active:scale-[0.98] uppercase tracking-wider">
          Tasdiqlash
        </button>
      </div>

      <EditProductModal
        key={editingItem?.id || 'none'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        product={editingItem || undefined}
      />

    </section>
  );
}
