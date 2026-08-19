import React, { useState } from 'react';
import { Product, Category, Collection } from '../types/product';
import { Eye, Shield, Sparkles, MessageSquare, Compass, ArrowRight } from 'lucide-react';

interface ClientShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (product: Product) => void;
}

export const ClientShowcase: React.FC<ClientShowcaseProps> = ({
  products,
  onSelectProduct,
  onOpenInquiry
}) => {
  const [activeCollection, setActiveCollection] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter only active catalog & vault items for public boutique view
  const visibleProducts = products.filter(p => {
    const isPublic = p.status === 'Catalog Active' || p.status === 'Vault Only' || p.status === 'Made to Order';
    const matchesCollection = activeCollection === 'All' || p.collection === activeCollection;
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return isPublic && matchesCollection && matchesCategory;
  });

  const collections = ['All', 'Colours of Love', 'Details Hidden', 'Generations', 'Ambition'];
  const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Timepieces', 'Cufflinks', 'High Jewellery'];

  return (
    <div className="space-y-16 pb-20">
      {/* EDITORIAL HERO BANNER */}
      <section className="relative border border-black/10 bg-white p-12 lg:p-20 overflow-hidden text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="absolute inset-8 border border-black/5 pointer-events-none"></div>

        <div className="text-[11px] uppercase tracking-[0.4em] font-sans opacity-50 mb-4">
          Atelier House of Parlay — Edition 2026
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-light italic text-[#1a1a1a] max-w-4xl leading-[1.15] mb-6">
          Details Hidden. Excellence Revealed.
        </h1>

        <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] opacity-60 max-w-2xl leading-relaxed mb-8">
          A bespoke digital presentation of hand-selected high jewellery, rare gemstones, and executive horology.
        </p>

        <div className="flex items-center space-x-6 text-[10px] uppercase tracking-[0.25em] font-sans">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <span>GIA & SSEF Verified</span>
          </span>
          <span className="text-black/20">|</span>
          <span>Bespoke Vault Access</span>
        </div>
      </section>

      {/* CATEGORY & SERIES NAVIGATION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-black/10 pb-4 gap-4">
          <div className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#1a1a1a]">
            Curated Series
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-widest font-sans">
            {collections.map(col => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`transition-all pb-1 ${
                  activeCollection === col
                    ? 'border-b-2 border-black font-semibold text-black'
                    : 'opacity-40 hover:opacity-80 text-black'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2 text-[10px] uppercase tracking-wider font-sans">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 border transition-all ${
                activeCategory === cat
                  ? 'bg-[#1a1a1a] text-white border-black font-medium'
                  : 'bg-white text-black/60 border-black/10 hover:border-black/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BOUTIQUE PRODUCTS GALLERY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-black/10 group flex flex-col justify-between hover:border-black/40 transition-all duration-500 relative"
          >
            {/* Visual Frame */}
            <div 
              onClick={() => onSelectProduct(product)}
              className="aspect-square bg-[#f8f7f4] relative overflow-hidden cursor-pointer flex items-center justify-center p-8 border-b border-black/5"
            >
              <img
                src={product.primaryImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {product.status === 'Vault Only' && (
                <div className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[9px] uppercase tracking-[0.2em] font-sans px-3 py-1">
                  Vault Restricted
                </div>
              )}

              {/* View Overlay Button */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-5 py-2.5 bg-white text-black text-[10px] uppercase tracking-[0.25em] font-sans font-semibold shadow-lg">
                  Inspect Spec
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8 flex-1 flex flex-col justify-between text-left">
              <div>
                <div className="text-[9px] font-sans uppercase tracking-[0.25em] opacity-40 mb-1">
                  {product.collection} — {product.category}
                </div>

                <h3 
                  onClick={() => onSelectProduct(product)}
                  className="font-serif text-2xl font-light italic text-[#1a1a1a] hover:underline cursor-pointer mb-2"
                >
                  {product.title}
                </h3>

                <p className="text-xs font-sans text-black/60 uppercase tracking-wider mb-4 line-clamp-1">
                  {product.subtitleTagline || `${product.metal} • ${product.gemstone}`}
                </p>

                <p className="text-sm font-serif italic text-black/70 line-clamp-2 mb-6">
                  "{product.description}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-widest opacity-40 font-sans">Price Guidance</div>
                  <div className="font-serif text-2xl font-light italic text-[#1a1a1a]">
                    {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(product.price)}
                  </div>
                </div>

                <button
                  onClick={() => onOpenInquiry(product)}
                  className="h-10 px-4 bg-transparent border border-black/20 hover:border-black hover:bg-[#1a1a1a] hover:text-white text-[10px] uppercase tracking-[0.2em] font-sans transition-all flex items-center gap-1.5"
                >
                  <span>Inquire Private</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* BOUTIQUE FOOTER */}
      <footer className="border-t border-black/10 pt-12 pb-8 text-center space-y-4">
        <div className="text-xl font-serif tracking-[0.2em] font-light uppercase text-[#1a1a1a]">
          House of Parlay
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50">
          Private Viewing Chambers • Mayfair, London • Geneva • New York
        </p>
        <p className="text-[9px] font-sans text-black/30">
          All images and artifacts rights reserved © 2026 House of Parlay High Jewellery.
        </p>
      </footer>
    </div>
  );
};
