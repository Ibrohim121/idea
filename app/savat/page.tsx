'use client';

import Sidebar from '../components/Sidebar';
import CartDetails from '../components/CartDetails';

export default function SavatPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* 1. Chap taraf (Sidebar) */}
            <Sidebar />

            {/* 2. Markaz/O'ng taraf (Savat tafsiloti) - Sidebar'dan qolgan qismni egallaydi */}
            <CartDetails fullWidth={true} />
        </div>
    );
}
