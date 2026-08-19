import React from 'react';
import { Gem, Lock, Sparkles, DollarSign, Layers } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../utils/format';

interface StatsBannerProps {
  products: Product[];
  onFilterStatus?: (status: string) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ products, onFilterStatus }) => {
  const total = products.length;
  const active = products.filter(p => p.status === 'Catalog Active').length;
  const vault = products.filter(p => p.status === 'Vault Only' || p.status === 'Made to Order').length;
  const totalValuation = products.reduce((acc, p) => acc + (p.price || 0), 0);
  const collections = Array.from(new Set(products.map(p => p.collection))).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
      {/* Total Artifacts */}
      <div className="bg-white border border-black/10 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-black/50 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">Total Artifacts</span>
          <Gem className="w-3.5 h-3.5 text-black/40" />
        </div>
        <div>
          <span className="font-serif text-3xl font-light italic text-[#1a1a1a]">{total}</span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-black/40 ml-2">Registered</span>
        </div>
      </div>

      {/* Active Boutique */}
      <div 
        onClick={() => onFilterStatus && onFilterStatus('Catalog Active')}
        className="bg-white border border-black/10 p-5 flex flex-col justify-between cursor-pointer hover:border-black/30 transition-colors"
      >
        <div className="flex items-center justify-between text-black/50 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">Boutique Active</span>
          <Sparkles className="w-3.5 h-3.5 text-black/40" />
        </div>
        <div>
          <span className="font-serif text-3xl font-light italic text-[#1a1a1a]">{active}</span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-black/40 ml-2">Live Public</span>
        </div>
      </div>

      {/* Vault & Bespoke */}
      <div 
        onClick={() => onFilterStatus && onFilterStatus('Vault Only')}
        className="bg-white border border-black/10 p-5 flex flex-col justify-between cursor-pointer hover:border-black/30 transition-colors"
      >
        <div className="flex items-center justify-between text-black/50 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">Vault Exclusive</span>
          <Lock className="w-3.5 h-3.5 text-black/40" />
        </div>
        <div>
          <span className="font-serif text-3xl font-light italic text-[#1a1a1a]">{vault}</span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-black/40 ml-2">Private</span>
        </div>
      </div>

      {/* Total Valuation */}
      <div className="bg-white border border-black/10 p-5 flex flex-col justify-between col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between text-black/50 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">Catalog Value</span>
          <DollarSign className="w-3.5 h-3.5 text-black/40" />
        </div>
        <div>
          <span className="font-serif text-2xl font-light italic text-[#1a1a1a]">
            {formatPrice(totalValuation)}
          </span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-black/40 block mt-1">ZAR Total</span>
        </div>
      </div>

      {/* Active Collections */}
      <div className="bg-white border border-black/10 p-5 flex flex-col justify-between col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between text-black/50 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium">Collections</span>
          <Layers className="w-3.5 h-3.5 text-black/40" />
        </div>
        <div>
          <span className="font-serif text-3xl font-light italic text-[#1a1a1a]">{collections}</span>
          <span className="text-[10px] font-sans uppercase tracking-widest text-black/40 ml-2">Active Series</span>
        </div>
      </div>
    </div>
  );
};
