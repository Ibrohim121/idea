import Sidebar from './components/Sidebar';
import FirmGrid from './components/FirmGrid';

export default function CatalogPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white flex-col lg:flex-row">
      {/* 1. Chap taraf */}
      <Sidebar />

      {/* 2. Markaz */}
      <div className="flex-1 overflow-y-auto mt-16 lg:mt-0">
        <FirmGrid />
      </div>
    </div>
  );
}