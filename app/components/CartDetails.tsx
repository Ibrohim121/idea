'use client';

import React, { useState, useMemo } from 'react';
import { User, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import EditProductModal from './EditProductModal';

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

const initialItems: CartItem[] = [
  { id: 1, name: "Coca-Cola 1.5L", quantity: 2, price: 12000, size: "1.5 L" },
  { id: 2, name: "Pepsi 1.5L", quantity: 1, price: 11500, size: "1.5 L" },
  { id: 3, name: "Fanta 1.5L", quantity: 3, price: 11000, size: "1.5 L" },
  { id: 4, name: "Lays Chips Classic", quantity: 1, price: 15000, size: "150 g" },
  { id: 5, name: "Nestlé Water 0.5L", quantity: 12, price: 2500, size: "0.5 L" },
  { id: 6, name: "Snikers Chocolate", quantity: 5, price: 8000, size: "50 g" },
];

export default function CartDetails({ fullWidth = false }: CartDetailsProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const handleEditClick = (item: CartItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = (newData: { quantity: number; productName: string; size: string }) => {
    if (editingItem) {
      setItems(items.map(item =>
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
    <section className={`${fullWidth ? 'flex-1' : 'w-85 hidden 2xl:flex'} bg-white border-l border-gray-200 p-6 flex flex-col h-full`}>
      <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 rounded-2xl">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-200">
          <User size={24} />
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-gray-900 truncate">Abdurahmon Admin</p>
          <p className="text-xs text-gray-500 font-medium">ID: #49582</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Tanlanganlar</h3>
          <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-bold border border-gray-200">
            {items.length} ta mahsulot
          </span>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between group cursor-pointer p-4 hover:bg-red-50/40 rounded-2xl transition-all border border-transparent hover:border-red-100 hover:shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-200" />
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                      {item.size}
                    </span>
                    <span className="text-xs font-black text-red-500">
                      x {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditClick(item)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-red-500 transition-colors ml-1" />
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Savat bo&apos;sh</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-gray-100">
        <div className="flex justify-between items-end mb-6">
          <span className="text-gray-400 font-bold text-xs uppercase tracking-widest leading-none">Umumiy summa:</span>
          <div className="text-right">
            <span className="font-black text-3xl text-gray-900 block leading-none">
              {totalPrice.toLocaleString('uz-UZ')}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">so`m</span>
          </div>
        </div>
        <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-600 shadow-xl shadow-red-100 transition-all active:scale-[0.98] uppercase tracking-wider">
          Buyurtmani tasdiqlash
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
