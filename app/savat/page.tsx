'use client';

import Sidebar from '../components/Sidebar';
import CartDetails from '../components/CartDetails';

export default function SavatPage() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-white flex-col lg:flex-row">
            {/* 1. Chap taraf (Sidebar) */}
            <Sidebar />

            {/* 2. Markaz/O'ng taraf (Savat tafsiloti) - Sidebar'dan qolgan qismni egallaydi */}
            <main className="flex-1 overflow-y-auto mt-16 lg:mt-0">
                <CartDetails fullWidth={true} />
            </main>
        </div>
    );
}
