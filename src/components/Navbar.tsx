import React from 'react';
import { Plus, Eye, LayoutGrid, RotateCcw, Download, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Product } from '../types/product';

export type ActiveTab = 'catalog' | 'admin' | 'inventory';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
  onResetCatalog: () => void;
  onExportCatalog: () => void;
  products: Product[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  onResetCatalog,
  onExportCatalog,
  products
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/10">
      {/* Top Brand Bar */}
      <div className="bg-[#efede8] border-b border-black/5 py-2 px-6 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] font-sans text-black/60 whitespace-nowrap">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
          <span className="hidden min-[420px]:inline truncate">House of Parlay Haute Joaillerie</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">AI Studio GenAI 3.7 Integrated</span>
          <span className="text-black/30">|</span>
          <span className="font-mono">{products.length} Artifacts</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-3">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 sm:space-x-4 cursor-pointer shrink-0" onClick={() => setActiveTab('catalog')}>
          <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center bg-[#efede8] transition-transform hover:scale-105">
            <div className="w-2 h-2 rounded-full bg-black"></div>
          </div>
          <div className="hidden min-[480px]:block">
            <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-40 leading-none mb-1">
              Official Admin & Boutique
            </div>
            <div className="text-base sm:text-2xl tracking-[0.2em] font-light uppercase font-serif text-[#1a1a1a] whitespace-nowrap">
              House of Parlay
            </div>
          </div>
        </div>

        {/* 3 Main View Tabs */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-widest font-sans font-medium">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-all pb-1 flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'border-b-2 border-black text-black font-semibold'
                : 'opacity-40 hover:opacity-80'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Public Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`transition-all pb-1 flex items-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'border-b-2 border-black text-black font-semibold'
                : 'opacity-40 hover:opacity-80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Inventory Control</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`transition-all pb-1 flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'border-b-2 border-black text-black font-semibold'
                : 'opacity-40 hover:opacity-80'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Upload Registration</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Mobile view toggle */}
          <div className="md:hidden flex border border-black/10 text-[9px] font-sans uppercase shrink-0">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-1.5 py-1 ${activeTab === 'catalog' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Catalog
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-1.5 py-1 ${activeTab === 'inventory' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-1.5 py-1 ${activeTab === 'admin' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Upload
            </button>
          </div>

          <button
            onClick={onOpenAddModal}
            className="h-11 px-3 sm:px-5 bg-[#1a1a1a] text-white text-[11px] uppercase tracking-[0.25em] font-sans hover:bg-black transition-all flex items-center gap-2 font-semibold"
            title="Upload Artifact"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload Artifact</span>
          </button>

          <div className="hidden lg:flex items-center space-x-2 pl-3 border-l border-black/10">
            <button
              onClick={onExportCatalog}
              className="p-2.5 rounded-none border border-black/10 bg-white text-black/60 hover:text-black hover:border-black/30 transition-colors"
              title="Export Catalog JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetCatalog}
              className="p-2.5 rounded-none border border-black/10 bg-white text-black/60 hover:text-black hover:border-black/30 transition-colors"
              title="Reset Presets"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
