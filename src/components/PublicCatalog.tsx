import React, { useState } from 'react';
import { Product, Category, Collection } from '../types/product';
import { formatPrice } from '../utils/format';
import { Search, Eye, Sparkles, SlidersHorizontal, ArrowUpRight, Lock, Grid, BookOpen, ListFilter, ShieldCheck, PhoneCall } from 'lucide-react';

interface PublicCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (product: Product) => void;
  onNavigateToUpload: () => void;
}

export const PublicCatalog: React.FC<PublicCatalogProps> = ({
  products,
  onSelectProduct,
  onOpenInquiry,
  onNavigateToUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'newest'>('featured');
  const [displayLayout, setDisplayLayout] = useState<'grid' | 'spread' | 'list'>('grid');

  // Filter products for client viewing (Catalog Active & Vault Only)
  const clientProducts = products.filter(p => {
    const isPublic = p.status === 'Catalog Active' || p.status === 'Vault Only' || p.status === 'Made to Order';
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.gemstone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesCollection = selectedCollection === 'All' || p.collection === selectedCollection;

    return isPublic && matchesSearch && matchesCategory && matchesCollection;
  });

  // Sort products
  const sortedProducts = [...clientProducts].sort((a, b) => {
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const featuredProduct = products.find(p => p.featured) || products[0];

  const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Timepieces', 'Cufflinks', 'High Jewellery'];
  const collections = ['All', 'Colours of Love', 'Details Hidden', 'Generations', 'Ambition', 'Vault & Bespoke'];

  return (
    <div className="space-y-16 pb-24 text-[#1a1a1a]">
      {/* EDITORIAL CATALOG HEADER & BRAND STATEMENT */}
      <section className="bg-white border border-black/10 p-8 sm:p-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f8f7f4] border border-black/10 text-[10px] uppercase tracking-[0.3em] font-sans">
            <Sparkles className="w-3 h-3 text-black/60" />
            <span>House of Parlay — Digital Lookbook 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-light italic leading-tight text-[#1a1a1a]">
            The Fine Jewellery Catalogue
          </h1>

          <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] opacity-60 leading-relaxed max-w-2xl mx-auto">
            Explore rare natural diamonds, unheated Sri Lankan sapphires, Muzo emeralds, and bespoke solid gold creations.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-8 text-[10px] font-sans uppercase tracking-[0.25em] opacity-70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> GIA & SSEF Certified Gemstones
            </span>
            <span>•</span>
            <span>Handmade Solid 18K Alloys</span>
            <span>•</span>
            <span>Confidential Worldwide Shipping</span>
          </div>
        </div>
      </section>

      {/* FEATURED ARTIFACT SHOWCASE */}
      {featuredProduct && (
        <section className="bg-white border border-black/10 overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 bg-[#f8f7f4] relative p-8 sm:p-12 flex items-center justify-center min-h-[280px] sm:min-h-[400px]">
            <img
              src={featuredProduct.primaryImage}
              alt={featuredProduct.title}
              className="w-full h-full max-h-[450px] object-cover border border-black/10 shadow-lg"
            />
            <div className="absolute top-6 left-6 bg-white border border-black/10 text-[9px] uppercase tracking-[0.25em] font-sans px-3 py-1 font-semibold">
              Campaign Spotlight
            </div>
          </div>

          <div className="lg:w-1/2 p-8 sm:p-14 flex flex-col justify-between text-left space-y-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50 mb-2">
                {featuredProduct.collection} Series
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-light italic text-[#1a1a1a] mb-3">
                {featuredProduct.title}
              </h2>

              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#a68d71] mb-6">
                {featuredProduct.subtitleTagline || 'DETAILS HIDDEN. EXCELLENCE REVEALED.'}
              </p>

              <p className="text-sm font-serif italic text-black/80 leading-relaxed mb-6 border-l-2 border-black/20 pl-4">
                "{featuredProduct.description}"
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-black/5 pt-4">
                <div>
                  <span className="block text-[9px] uppercase tracking-widest opacity-40">Composition</span>
                  <span className="font-medium text-black">{featuredProduct.metal}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-widest opacity-40">Gemstone</span>
                  <span className="font-medium text-black">{featuredProduct.gemstone}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-sans uppercase tracking-widest opacity-40">Guiding Value</div>
                <div className="font-serif text-3xl font-light italic text-[#1a1a1a]">
                  {formatPrice(featuredProduct.price, featuredProduct.currency)}
                </div>
              </div>

              <button
                onClick={() => onSelectProduct(featuredProduct)}
                className="h-12 px-6 bg-[#1a1a1a] text-white text-[10px] font-sans uppercase tracking-[0.25em] hover:bg-black transition-colors flex items-center gap-2 font-semibold"
              >
                <span>Inspect Spec</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FILTER & CONTROL BAR */}
      <div className="bg-white border border-black/10 p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalogue by gemstone, series or metal..."
            className="w-full pl-10 pr-4 py-2 border-b border-black/20 bg-transparent text-sm font-serif focus:outline-none focus:border-black placeholder:text-black/40"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border-b border-black/20 bg-transparent text-[11px] font-sans uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>Category: {cat}</option>
            ))}
          </select>

          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="px-3 py-2 border-b border-black/20 bg-transparent text-[11px] font-sans uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
          >
            {collections.map(col => (
              <option key={col} value={col}>Series: {col}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border-b border-black/20 bg-transparent text-[11px] font-sans uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="newest">Sort: Newest First</option>
          </select>

          {/* Layout Mode */}
          <div className="flex border border-black/10 bg-[#f8f7f4] p-1">
            <button
              onClick={() => setDisplayLayout('grid')}
              className={`p-1.5 ${displayLayout === 'grid' ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDisplayLayout('spread')}
              className={`p-1.5 ${displayLayout === 'spread' ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
              title="Editorial Spread"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CATALOG PRESENTATION (GRID MODE) */}
      {displayLayout === 'grid' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-black/10 group flex flex-col justify-between hover:border-black/40 transition-all duration-300 relative"
            >
              {/* Product Visual */}
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
                  <div className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[9px] font-sans uppercase tracking-[0.2em] px-2.5 py-1">
                    Vault Only
                  </div>
                )}

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-white text-black text-[10px] font-sans uppercase tracking-[0.25em] font-semibold">
                    Inspect Artifact
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[9px] font-sans uppercase tracking-[0.25em] opacity-40">
                      {product.collection}
                    </span>
                    <span className="text-[10px] font-mono text-black/40">
                      {product.sku}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-2xl font-light italic text-[#1a1a1a] hover:underline cursor-pointer mb-2"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs font-sans uppercase tracking-wider text-[#a68d71] mb-3 line-clamp-1">
                    {product.subtitleTagline || `${product.metal} • ${product.gemstone}`}
                  </p>

                  <p className="text-xs font-serif italic text-black/70 line-clamp-2 mb-6">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest opacity-40 font-sans">Price Guidance</div>
                    <div className="font-serif text-2xl font-light italic text-[#1a1a1a]">
                      {formatPrice(product.price, product.currency)}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="h-10 px-4 border border-black/20 hover:border-black hover:bg-[#1a1a1a] hover:text-white text-[10px] uppercase tracking-[0.2em] font-sans transition-all"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* CATALOG PRESENTATION (EDITORIAL SPREAD MODE) */}
      {displayLayout === 'spread' && (
        <section className="space-y-12">
          {sortedProducts.map((product, idx) => (
            <div 
              key={product.id}
              className={`bg-white border border-black/10 flex flex-col lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2 bg-[#f8f7f4] p-8 sm:p-12 relative overflow-hidden flex items-center justify-center min-h-[350px]">
                <img
                  src={product.primaryImage}
                  alt={product.title}
                  className="w-full h-full max-h-[400px] object-cover border border-black/10"
                />
              </div>

              <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between text-left space-y-6">
                <div>
                  <div className="text-[10px] font-sans uppercase tracking-[0.3em] opacity-40 mb-2">
                    {product.collection} • {product.category}
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-serif font-light italic text-[#1a1a1a] mb-2">
                    {product.title}
                  </h3>

                  <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#a68d71] mb-6">
                    {product.subtitleTagline || 'EXCELLENCE REVEALED.'}
                  </p>

                  <p className="text-base font-serif italic text-black/80 leading-relaxed mb-6">
                    "{product.description}"
                  </p>

                  <div className="space-y-2 border-t border-black/5 pt-4 text-xs font-sans">
                    <div className="flex justify-between"><span className="opacity-50">Metal:</span> <span className="font-medium">{product.metal}</span></div>
                    <div className="flex justify-between"><span className="opacity-50">Gemstone:</span> <span className="font-medium">{product.gemstone}</span></div>
                    {product.certificate && <div className="flex justify-between"><span className="opacity-50">Certificate:</span> <span className="font-medium">{product.certificate}</span></div>}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest opacity-40 font-sans">Guiding Price</div>
                    <div className="font-serif text-3xl font-light italic">{formatPrice(product.price, product.currency)}</div>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="h-11 px-6 bg-[#1a1a1a] text-white text-[10px] font-sans uppercase tracking-[0.25em] hover:bg-black transition-colors"
                  >
                    View Specifications
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* PRIVATE BESPOKE VAULT BANNER */}
      <section className="bg-[#1a1a1a] text-white p-12 lg:p-16 text-center space-y-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] font-sans">
            Confidential Salon
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light italic">
            Seeking a Unique Custom Commission?
          </h2>
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-white/70 leading-relaxed">
            Our atelier master goldsmiths accept bespoke commissions for custom engagement solitaires and high jewellery heirlooms.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={onNavigateToUpload}
              className="px-6 py-3 bg-white text-black text-[10px] font-sans uppercase tracking-[0.25em] font-medium hover:bg-[#f8f7f4] transition-colors"
            >
              Admin Upload Studio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
