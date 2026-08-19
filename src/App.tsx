import React, { useState, useEffect } from 'react';
import { Product } from './types/product';
import { getStoredProducts, saveProducts, resetToPresetProducts } from './utils/storage';
import { Navbar, ActiveTab } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { PublicCatalog } from './components/PublicCatalog';
import { AdminInventory } from './components/AdminInventory';
import { AdminProductForm } from './components/AdminProductForm';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  
  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const spotlightProduct = previewProduct ?? products.find(p => p.featured) ?? products[0] ?? null;

  useEffect(() => {
    const loaded = getStoredProducts();
    setProducts(loaded);
  }, []);

  useEffect(() => {
    if (previewProduct && !products.some(p => p.id === previewProduct.id)) {
      setPreviewProduct(null);
    }
  }, [products, previewProduct]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add or Update Product
  const handleSaveProduct = (product: Product) => {
    let updated: Product[];
    const exists = products.some(p => p.id === product.id);

    if (exists) {
      updated = products.map(p => p.id === product.id ? product : p);
      triggerToast(`Artifact "${product.title}" updated.`);
    } else {
      updated = [product, ...products];
      triggerToast(`Artifact "${product.title}" registered in catalog.`);
    }

    setProducts(updated);
    saveProducts(updated);
    setEditingProduct(null);
  };

  // Delete Product
  const handleDeleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;

    if (window.confirm(`Are you sure you want to delete "${target.title}" from the House catalog?`)) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
      triggerToast(`Artifact "${target.title}" removed.`);
    }
  };

  // Duplicate Product
  const handleDuplicateProduct = (product: Product) => {
    const copy: Product = {
      ...product,
      id: `hp-prod-${Date.now()}`,
      title: `${product.title} (Copy)`,
      sku: `${product.sku}-CPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [copy, ...products];
    setProducts(updated);
    saveProducts(updated);
    triggerToast(`Created duplicate record for "${product.title}".`);
  };

  // Toggle Vault / Catalog Status
  const handleToggleStatus = (id: string) => {
    const updated = products.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Catalog Active' ? 'Vault Only' : 'Catalog Active';
        triggerToast(`"${p.title}" status changed to ${nextStatus}.`);
        return { ...p, status: nextStatus, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    setProducts(updated);
    saveProducts(updated);
  };

  // Reset to Presets
  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to House of Parlay initial preset products? Custom uploaded items will be restored to default.')) {
      const presets = resetToPresetProducts();
      setProducts(presets);
      triggerToast('Catalog reset to House of Parlay campaign presets.');
    }
  };

  // Export JSON
  const handleExportCatalog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `house_of_parlay_catalog_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Catalog JSON exported successfully.');
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a] flex flex-col font-serif selection:bg-[#1a1a1a] selection:text-[#f8f7f4]">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => {
          setEditingProduct(null);
          setIsFormModalOpen(true);
        }}
        onResetCatalog={handleResetCatalog}
        onExportCatalog={handleExportCatalog}
        products={products}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 bg-[#1a1a1a] text-white px-5 py-3 rounded-none shadow-2xl flex items-center gap-3 border border-black/10 text-xs font-sans uppercase tracking-widest animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-white/50 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Universal Product Detail Spotlight */}
        {spotlightProduct && (
          <section className="mb-10 bg-white border border-black/10 overflow-hidden flex flex-col lg:flex-row shadow-sm">
            <div className="lg:w-5/12 bg-[#f8f7f4] p-6 sm:p-8 flex items-center justify-center min-h-[280px]">
              <img
                src={spotlightProduct.primaryImage}
                alt={spotlightProduct.title}
                className="w-full h-full max-h-[360px] object-cover border border-black/10"
              />
            </div>

            <div className="lg:w-7/12 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50 mb-2">
                  Product Detail Spotlight • {spotlightProduct.collection}
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-light italic text-[#1a1a1a] mb-2">
                  {spotlightProduct.title}
                </h2>

                <p className="text-xs font-sans uppercase tracking-widest text-[#a68d71] mb-4">
                  {spotlightProduct.subtitleTagline || 'DETAILS HIDDEN. EXCELLENCE REVEALED.'}
                </p>

                <p className="text-sm font-serif italic leading-relaxed text-black/80 border-l-2 border-black/15 pl-4 mb-6">
                  &quot;{spotlightProduct.description}&quot;
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
                  <div>
                    <div className="text-black/40 uppercase tracking-widest text-[9px]">SKU</div>
                    <div className="font-medium text-black mt-1">{spotlightProduct.sku}</div>
                  </div>
                  <div>
                    <div className="text-black/40 uppercase tracking-widest text-[9px]">Category</div>
                    <div className="font-medium text-black mt-1">{spotlightProduct.category}</div>
                  </div>
                  <div>
                    <div className="text-black/40 uppercase tracking-widest text-[9px]">Metal</div>
                    <div className="font-medium text-black mt-1">{spotlightProduct.metal}</div>
                  </div>
                  <div>
                    <div className="text-black/40 uppercase tracking-widest text-[9px]">Price</div>
                    <div className="font-medium text-black mt-1">
                      {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(spotlightProduct.price)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between border-t border-black/10 pt-5">
                <div className="text-[10px] uppercase tracking-[0.25em] font-sans text-black/50">
                  {spotlightProduct.specifications.length} Specifications Available
                </div>
                <button
                  onClick={() => setPreviewProduct(spotlightProduct)}
                  className="h-12 px-6 bg-[#1a1a1a] text-white text-[10px] font-sans uppercase tracking-[0.25em] hover:bg-black transition-colors font-semibold"
                >
                  Open Full Product Detail
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tab 1: Public Catalog Lookbook */}
        {activeTab === 'catalog' && (
          <PublicCatalog
            products={products}
            onSelectProduct={(p) => setPreviewProduct(p)}
            onOpenInquiry={(p) => setPreviewProduct(p)}
            onNavigateToUpload={() => {
              setEditingProduct(null);
              setIsFormModalOpen(true);
            }}
          />
        )}

        {/* Tab 2: Inventory Control */}
        {activeTab === 'inventory' && (
          <div>
            <StatsBanner products={products} />
            <AdminInventory
              products={products}
              onEditProduct={(p) => {
                setEditingProduct(p);
                setIsFormModalOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
              onDuplicateProduct={handleDuplicateProduct}
              onToggleStatus={handleToggleStatus}
              onOpenAddModal={() => {
                setEditingProduct(null);
                setIsFormModalOpen(true);
              }}
              onSelectProductPreview={(p) => setPreviewProduct(p)}
            />
          </div>
        )}

        {/* Tab 3: Admin Upload Registration */}
        {activeTab === 'admin' && (
          <div>
            <StatsBanner products={products} />
            <div className="bg-white border border-black/10 p-12 text-center space-y-6 max-w-2xl mx-auto my-8">
              <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50">
                Atelier Registration Studio
              </div>
              <h2 className="text-3xl font-serif font-light italic">
                Register New Collection Artifact
              </h2>
              <p className="text-xs font-sans text-black/60 uppercase tracking-widest leading-relaxed">
                Click below to launch the multi-field registration console with Gemini 3.7 AI copywriter assistance and multi-angle photoshoot presets.
              </p>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsFormModalOpen(true);
                }}
                className="px-8 py-4 bg-[#1a1a1a] text-white text-[11px] font-sans uppercase tracking-[0.3em] hover:bg-black transition-colors font-semibold"
              >
                Launch Registration Form
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Admin Add/Edit Modal */}
      <AdminProductForm
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
      />

      {/* Product Detail Spec Modal */}
      <ProductDetailModal
        product={previewProduct}
        isOpen={!!previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  );
}
