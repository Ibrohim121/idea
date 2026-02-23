import Sidebar from './components/Sidebar';
import FirmGrid from './components/FirmGrid';

export default function CatalogPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* 1. Chap taraf */}
      <Sidebar />

      {/* 2. Markaz */}
      <FirmGrid />
    </div>
  );
}