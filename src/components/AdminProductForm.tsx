import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, Image as ImageIcon, Plus, Check, Trash2, RefreshCw } from 'lucide-react';
import { Product, Category, Collection, MetalType, ProductStatus, ProductSpecification } from '../types/product';

interface AdminProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
}

const CATEGORIES: Category[] = [
  'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Timepieces', 'Cufflinks', 'High Jewellery', 'Bespoke'
];

const COLLECTIONS: Collection[] = [
  'Colours of Love', 'Details Hidden', 'Generations', 'Ambition', 'Vault & Bespoke', 'Signature Classics'
];

const METALS: MetalType[] = [
  '18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Platinum 950', 'Brushed 18K Yellow Gold', 'Two-Tone Gold'
];

const STATUSES: ProductStatus[] = [
  'Catalog Active', 'Vault Only', 'Made to Order', 'Coming Soon', 'Archived'
];

// Presets from House of Parlay campaign photoshoot
const CAMPAIGN_PRESET_IMAGES = [
  { label: 'Radiant Diamond Solitaire', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Royal Sapphire Halo', url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Muzo Emerald Sovereign', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Ambition Gold Signet', url: 'https://images.unsplash.com/photo-1611591475281-8d2813298818?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Secret Pear Necklace', url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Generations Emerald Cut', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Solid Gold Cuban Chain', url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200' },
  { label: 'Heritage Gold Chronometer', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200' }
];

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct
}) => {
  const [title, setTitle] = useState('');
  const [subtitleTagline, setSubtitleTagline] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<Category>('Rings');
  const [collection, setCollection] = useState<Collection>('Details Hidden');
  const [price, setPrice] = useState<string>('12450.00');
  const [metal, setMetal] = useState<MetalType>('18K Yellow Gold');
  const [gemstone, setGemstone] = useState('D-Flawless Natural Diamond');
  const [caratWeight, setCaratWeight] = useState('3.50 ct');
  const [cutStyle, setCutStyle] = useState('Radiant Cut');
  const [clarity, setClarity] = useState('Internally Flawless (IF)');
  const [certificate, setCertificate] = useState('GIA Certified');
  const [status, setStatus] = useState<ProductStatus>('Catalog Active');
  const [featured, setFeatured] = useState(false);
  const [primaryImage, setPrimaryImage] = useState(CAMPAIGN_PRESET_IMAGES[0].url);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState<ProductSpecification[]>([
    { label: 'Primary Gem', value: '3.50 ct Natural Diamond' },
    { label: 'Metal Purity', value: '750 Solid 18K Yellow Gold' }
  ]);

  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.title || '');
      setSubtitleTagline(initialProduct.subtitleTagline || '');
      setSku(initialProduct.sku || '');
      setCategory(initialProduct.category || 'Rings');
      setCollection(initialProduct.collection || 'Details Hidden');
      setPrice(initialProduct.price ? initialProduct.price.toString() : '0');
      setMetal(initialProduct.metal || '18K Yellow Gold');
      setGemstone(initialProduct.gemstone || '');
      setCaratWeight(initialProduct.caratWeight || '');
      setCutStyle(initialProduct.cutStyle || '');
      setClarity(initialProduct.clarity || '');
      setCertificate(initialProduct.certificate || '');
      setStatus(initialProduct.status || 'Catalog Active');
      setFeatured(!!initialProduct.featured);
      setPrimaryImage(initialProduct.primaryImage || CAMPAIGN_PRESET_IMAGES[0].url);
      setGalleryImages(initialProduct.galleryImages || []);
      setDescription(initialProduct.description || '');
      setSpecifications(initialProduct.specifications || []);
    } else {
      // New Product Defaults
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setTitle('Nocturnal Pearl & Gold Cuff');
      setSubtitleTagline('DETAILS HIDDEN. EXCELLENCE REVEALED.');
      setSku(`PAR-MID-${randomId}-C`);
      setCategory('Rings');
      setCollection('Details Hidden');
      setPrice('12450.00');
      setMetal('18K Yellow Gold');
      setGemstone('Flawless Diamond');
      setCaratWeight('3.50 ct');
      setCutStyle('Radiant Cut');
      setClarity('VVS1');
      setCertificate('GIA Certified');
      setStatus('Catalog Active');
      setFeatured(true);
      setPrimaryImage(CAMPAIGN_PRESET_IMAGES[0].url);
      setGalleryImages([]);
      setDescription('Hand-selected South Sea pearls set in 18k hammered gold, featuring a discreet signature clasp of onyx inlay.');
      setSpecifications([
        { label: 'Composition', value: '18K Gold & South Sea Pearls' },
        { label: 'Clasp', value: 'Discreet Onyx Inlay' }
      ]);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  // Image Upload File Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPrimaryImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Gallery File Upload
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setGalleryImages(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // AI Description Generator endpoint call
  const handleGenerateAICopy = async () => {
    setIsGeneratingCopy(true);
    setAiNotice(null);
    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          metal,
          gemstone,
          collection,
          customPrompt: description
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubtitleTagline(data.tagline);
        setDescription(data.description);
        setAiNotice('Gemini 3.7 Luxury Copy Generated.');
      } else {
        setAiNotice('Could not reach AI copywriter. Please check environment key.');
      }
    } catch (err) {
      console.error(err);
      setAiNotice('AI Generation available via server backend.');
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  const handleAddSpec = () => {
    setSpecifications([...specifications, { label: 'New Spec', value: 'Value' }]);
  };

  const handleUpdateSpec = (index: number, field: 'label' | 'value', value: string) => {
    const next = [...specifications];
    next[index][field] = value;
    setSpecifications(next);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: initialProduct?.id || `hp-prod-${Date.now()}`,
      title: title || 'Untitled Artifact',
      subtitleTagline: subtitleTagline || 'DETAILS HIDDEN. EXCELLENCE REVEALED.',
      sku: sku || `HP-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      collection,
      price: parseFloat(price) || 0,
      currency: 'ZAR',
      status,
      featured,
      primaryImage,
      galleryImages,
      metal,
      gemstone,
      caratWeight,
      cutStyle,
      clarity,
      certificate,
      description,
      specifications,
      createdAt: initialProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onSave(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#f8f7f4] text-[#1a1a1a] w-full max-w-6xl border border-black/10 shadow-2xl relative my-8 flex flex-col lg:flex-row overflow-hidden font-serif">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-black/60 hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Registration Details Form */}
        <div className="lg:w-[500px] border-r border-black/10 p-8 sm:p-10 flex flex-col justify-between bg-white max-h-[85vh] overflow-y-auto">
          <div className="space-y-8">
            <header>
              <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50 mb-1">
                House of Parlay Atelier
              </div>
              <h1 className="text-3xl sm:text-4xl font-light italic leading-tight text-[#1a1a1a]">
                {initialProduct ? 'Edit Artifact Record' : 'New Artifact Registration'}
              </h1>
              <p className="text-[11px] font-sans uppercase tracking-[0.15em] opacity-40 mt-3 leading-relaxed">
                Enter details for the upcoming collection launch.
              </p>
            </header>

            <form id="productForm" onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Product Designation Title */}
              <div className="group relative">
                <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                  Product Designation
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Nocturnal Pearl Cuff"
                  className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-lg font-serif text-[#1a1a1a]"
                />
              </div>

              {/* Subtitle / Tagline + AI Copywriter Trigger */}
              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 font-sans font-medium">
                    Tagline / Romance Motto
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateAICopy}
                    disabled={isGeneratingCopy}
                    className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-black font-sans hover:underline disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                    <span>{isGeneratingCopy ? 'Generating...' : 'AI Copywriter'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={subtitleTagline}
                  onChange={(e) => setSubtitleTagline(e.target.value)}
                  placeholder="e.g. DETAILS HIDDEN. EXCELLENCE REVEALED."
                  className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-xs font-sans uppercase tracking-wider"
                />
                {aiNotice && (
                  <p className="text-[10px] font-sans text-emerald-700 mt-1 uppercase tracking-widest">{aiNotice}</p>
                )}
              </div>

              {/* Collection & Price */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Collection
                  </label>
                  <select
                    value={collection}
                    onChange={(e) => setCollection(e.target.value as Collection)}
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                  >
                    {COLLECTIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full sm:w-36">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Price (ZAR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full sm:w-36">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Visibility Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProductStatus)}
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-xs font-sans uppercase"
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Metal & Gemstone */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Metal Alloy
                  </label>
                  <select
                    value={metal}
                    onChange={(e) => setMetal(e.target.value as MetalType)}
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                  >
                    {METALS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Primary Gemstone
                  </label>
                  <input
                    type="text"
                    value={gemstone}
                    onChange={(e) => setGemstone(e.target.value)}
                    placeholder="e.g. Ceylon Sapphire"
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                  />
                </div>
              </div>

              {/* SKU & Featured Check */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                    Stock SKU
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="border-b border-black/20 pb-1 bg-transparent focus:outline-none focus:border-black text-xs font-mono uppercase w-36"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-3">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-[10px] uppercase tracking-widest font-sans opacity-70">
                    Feature on Homepage
                  </span>
                </label>
              </div>

              {/* Composition Description */}
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                  Composition & Story Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  placeholder="Hand-selected South Sea pearls set in 18k hammered gold..."
                  className="w-full border-b border-black/20 bg-transparent focus:outline-none focus:border-black text-sm italic leading-relaxed resize-none p-1 font-serif"
                />
              </div>

              {/* Technical Specifications */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 font-sans font-medium">
                    Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-[10px] uppercase tracking-wider text-black font-sans hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Spec
                  </button>
                </div>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex gap-2 items-center text-xs">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleUpdateSpec(idx, 'label', e.target.value)}
                        placeholder="Label"
                        className="w-1/3 border-b border-black/20 pb-1 bg-transparent text-[11px] font-sans opacity-70 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleUpdateSpec(idx, 'value', e.target.value)}
                        placeholder="Value"
                        className="flex-1 border-b border-black/20 pb-1 bg-transparent text-[11px] font-sans focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="text-black/40 hover:text-black p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <div className="mt-8 pt-4 border-t border-black/5">
              <button
                type="button"
                onClick={(e) => {
                  const formEl = document.getElementById('productForm') as HTMLFormElement;
                  if (formEl) {
                    if (formEl.checkValidity()) {
                      handleSubmit(e);
                    } else {
                      formEl.reportValidity();
                    }
                  } else {
                    handleSubmit(e);
                  }
                }}
                className="w-full h-14 bg-[#1a1a1a] text-white text-[11px] uppercase tracking-[0.3em] font-sans hover:bg-black transition-colors font-semibold shadow-lg cursor-pointer"
              >
                {initialProduct ? 'Update Artifact Record' : 'Commence Upload'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Assets & Live Preview State */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col bg-[#f8f7f4] justify-between max-h-[85vh] overflow-y-auto">
          <div>
            <div className="flex justify-between items-end mb-8 border-b border-black/5 pb-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest opacity-50 font-sans mb-1">
                  Current Status: Interactive Preview
                </div>
                <h2 className="text-3xl sm:text-4xl font-light italic font-serif">The Preview State</h2>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="w-10 h-[1px] bg-black/20"></div>
                <span className="text-[10px] font-sans tracking-widest opacity-40">01 / 01</span>
              </div>
            </div>

            {/* Campaign Preset Pickers */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-2 font-sans font-medium">
                Select House Photography Preset
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {CAMPAIGN_PRESET_IMAGES.map((img, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setPrimaryImage(img.url)}
                    className={`aspect-square border relative overflow-hidden transition-all ${
                      primaryImage === img.url
                        ? 'border-black ring-1 ring-black scale-105'
                        : 'border-black/10 opacity-60 hover:opacity-100'
                    }`}
                    title={img.label}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Visual Upload Container */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-1 border border-black/10 bg-white min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-6 border border-black/5 pointer-events-none"></div>

                {primaryImage ? (
                  <div className="relative w-full h-full min-h-[300px]">
                    <img
                      src={primaryImage}
                      alt="Primary Artifact Visual"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <label className="px-4 py-2 bg-white text-black text-[10px] font-sans uppercase tracking-widest cursor-pointer shadow-md hover:bg-[#f8f7f4]">
                        Replace Image
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-8 cursor-pointer w-full h-full">
                    <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center mb-4">
                      <ImageIcon className="w-6 h-6 text-black/40" />
                    </div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] opacity-50 mb-1">
                      Drag primary visual here
                    </span>
                    <span className="text-[9px] font-sans text-black/30">Or click to browse file system</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                )}

                <div className="absolute bottom-4 right-4 text-[9px] font-sans uppercase tracking-widest opacity-30 bg-white/80 px-2 py-1">
                  4000 x 4000px
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="w-full sm:w-36 flex sm:flex-col gap-3">
                <label className="h-24 flex-1 border border-black/10 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-black/30 transition-colors">
                  <Plus className="w-5 h-5 text-black/40 mb-1" />
                  <span className="text-[9px] font-sans uppercase tracking-widest opacity-40">Gallery</span>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                </label>

                {galleryImages.map((img, idx) => (
                  <div key={idx} className="h-24 flex-1 border border-black/10 bg-white relative group overflow-hidden">
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom URL Input Fallback */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans font-medium">
                Or Direct Image URL
              </label>
              <input
                type="url"
                value={primaryImage}
                onChange={(e) => setPrimaryImage(e.target.value)}
                placeholder="https://..."
                className="w-full border-b border-black/20 pb-1 bg-transparent text-xs font-mono text-black/80 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <footer className="mt-8 flex justify-between items-center border-t border-black/5 pt-6">
            <div className="flex space-x-8">
              <div>
                <div className="text-[9px] uppercase tracking-widest opacity-40 font-sans mb-0.5">Stock SKU</div>
                <div className="text-xs font-sans font-medium tracking-tight text-black">{sku || 'PAR-MID-081-C'}</div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-widest opacity-40 font-sans mb-0.5">Tier Classification</div>
                <div className="text-xs font-sans font-medium tracking-tight text-black">{category}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 opacity-60">
              <div className="w-2 h-2 rounded-full border border-black bg-black/20"></div>
              <span className="text-[10px] font-sans uppercase tracking-widest">Encryption Active</span>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
};
