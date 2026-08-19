import React, { useState } from 'react';
import { Search, Filter, Edit3, Eye, Trash2, Copy, Sparkles, Lock, Plus, Grid, List } from 'lucide-react';
import { Product, Category, Collection, ProductStatus } from '../types/product';
import { formatPrice } from '../utils/format';

interface AdminInventoryProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onDuplicateProduct: (product: Product) => void;
  onToggleStatus: (id: string) => void;
  onOpenAddModal: () => void;
  onSelectProductPreview: (product: Product) => void;
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onDuplicateProduct,
  onToggleStatus,
  onOpenAddModal,
  onSelectProductPreview
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.gemstone.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesCollection = selectedCollection === 'All' || p.collection === selectedCollection;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesCollection && matchesStatus;
  });

  const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Timepieces', 'Cufflinks', 'High Jewellery', 'Bespoke'];
  const collections = ['All', 'Colours of Love', 'Details Hidden', 'Generations', 'Ambition', 'Vault & Bespoke', 'Signature Classics'];
  const statuses = ['All', 'Catalog Active', 'Vault Only', 'Made to Order', 'Coming Soon'];

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white border border-black/10 p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Designation, SKU, Gemstone or Collection..."
            className="w-full pl-10 pr-4 py-2.5 border-b border-black/20 bg-transparent text-sm font-sans focus:outline-none focus:border-black placeholder:text-black/40"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border-b border-black/20 bg-transparent text-[11px] font-sans uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>Category: {c}</option>
            ))}
          </select>

          {/* Collection Dropdown */}
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="px-3 py-2 border-b border-black/20 bg-transparent text-[11px] font-sans uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
          >
            {collections.map(col => (
              <option key={col} value={col}>Series: {col}</option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border-b border-black/20 bg-transparent text-[11px] font-sans uppercase tracking-wider focus:outline-none focus:border-black cursor-pointer"
          >
            {statuses.map(st => (
              <option key={st} value={st}>Status: {st}</option>
            ))}
          </select>

          {/* Layout Mode Toggle */}
          <div className="flex border border-black/10 bg-[#f8f7f4] p-1">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 transition-colors ${layoutMode === 'grid' ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('table')}
              className={`p-1.5 transition-colors ${layoutMode === 'table' ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-2xl font-serif font-light italic text-[#1a1a1a]">
            House Catalogue ({filteredProducts.length})
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] font-sans opacity-50 mt-1">
            Showing registered high jewellery artifacts
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="h-10 px-5 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.25em] font-sans hover:bg-black transition-colors flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Registration</span>
        </button>
      </div>

      {/* CATALOG GRID LAYOUT */}
      {layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-black/10 group flex flex-col justify-between hover:border-black/40 transition-all duration-300 relative"
            >
              {/* Product Visual Container */}
              <div 
                onClick={() => onSelectProductPreview(product)}
                className="aspect-square bg-[#f8f7f4] relative overflow-hidden cursor-pointer flex items-center justify-center p-4 border-b border-black/5"
              >
                <img
                  src={product.primaryImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[9px] uppercase tracking-[0.2em] font-sans px-2.5 py-1 font-semibold border ${
                    product.status === 'Catalog Active'
                      ? 'bg-white text-black border-black/20'
                      : product.status === 'Vault Only'
                      ? 'bg-[#1a1a1a] text-white border-black'
                      : 'bg-[#efede8] text-black/70 border-black/10'
                  }`}>
                    {product.status}
                  </span>
                </div>

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProductPreview(product);
                    }}
                    className="p-2.5 bg-white text-black text-[10px] font-sans uppercase tracking-widest hover:bg-[#f8f7f4] transition-colors"
                    title="View Artifact Spec"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProduct(product);
                    }}
                    className="p-2.5 bg-[#1a1a1a] text-white text-[10px] font-sans uppercase tracking-widest hover:bg-black transition-colors"
                    title="Edit Artifact"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] opacity-40">
                      {product.collection}
                    </span>
                    <span className="text-[10px] font-mono text-black/50">
                      {product.sku}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectProductPreview(product)}
                    className="font-serif text-lg font-light text-[#1a1a1a] hover:underline cursor-pointer line-clamp-1 mb-1"
                  >
                    {product.title}
                  </h3>

                  <p className="text-[11px] font-sans uppercase tracking-wider text-[#a68d71] mb-3 line-clamp-1">
                    {product.subtitleTagline || `${product.metal} • ${product.gemstone}`}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                  <span className="font-serif text-xl font-light italic text-[#1a1a1a]">
                    {formatPrice(product.price, product.currency)}
                  </span>

                  {/* Card Micro Buttons */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onToggleStatus(product.id)}
                      className="p-1.5 text-black/40 hover:text-black transition-colors"
                      title="Toggle Visibility Status"
                    >
                      <Lock className={`w-3.5 h-3.5 ${product.status === 'Vault Only' ? 'text-amber-700' : ''}`} />
                    </button>
                    <button
                      onClick={() => onDuplicateProduct(product)}
                      className="p-1.5 text-black/40 hover:text-black transition-colors"
                      title="Duplicate Record"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-1.5 text-black/30 hover:text-red-700 transition-colors"
                      title="Delete Artifact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* STRUCTURED TABLE VIEW */
        <div className="bg-white border border-black/10 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 bg-[#f8f7f4] text-[10px] font-sans uppercase tracking-[0.2em] text-black/60">
                <th className="py-4 px-6 font-medium">Artifact</th>
                <th className="py-4 px-4 font-medium">SKU</th>
                <th className="py-4 px-4 font-medium">Collection & Category</th>
                <th className="py-4 px-4 font-medium">Metal & Gem</th>
                <th className="py-4 px-4 font-medium">Price (ZAR)</th>
                <th className="py-4 px-4 font-medium">Status</th>
                <th className="py-4 px-6 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-sans">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[#f8f7f4]/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.primaryImage}
                        alt={product.title}
                        className="w-12 h-12 object-cover border border-black/10 bg-[#f8f7f4]"
                      />
                      <div>
                        <div className="font-serif text-base text-[#1a1a1a] font-medium leading-snug">
                          {product.title}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider opacity-50 font-sans">
                          {product.subtitleTagline || 'No Tagline'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-xs opacity-70">
                    {product.sku}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-xs text-black font-medium">{product.collection}</div>
                    <div className="text-[10px] uppercase opacity-50">{product.category}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-xs text-black">{product.metal}</div>
                    <div className="text-[10px] opacity-60 text-[#a68d71]">{product.gemstone}</div>
                  </td>
                  <td className="py-4 px-4 font-serif italic text-base text-[#1a1a1a]">
                    {formatPrice(product.price, product.currency)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[9px] uppercase tracking-widest px-2.5 py-1 border font-semibold ${
                      product.status === 'Catalog Active'
                        ? 'border-black/20 text-black bg-white'
                        : 'border-black/10 text-black/60 bg-[#efede8]'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelectProductPreview(product)}
                        className="p-1.5 text-black/60 hover:text-black"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditProduct(product)}
                        className="p-1.5 text-black/60 hover:text-black"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className="p-1.5 text-black/40 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
