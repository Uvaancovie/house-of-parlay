import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Gem, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../utils/format';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen || !product) return;

    setSelectedImage('');
    setShowInquiryForm(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setInquiryNotes('');
    setSubmitted(false);
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  const currentImage = selectedImage || product.primaryImage;
  const allImages = [product.primaryImage, ...(product.galleryImages || [])];

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowInquiryForm(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#f8f7f4] text-[#1a1a1a] w-full max-w-5xl border border-black/10 shadow-2xl relative my-8 p-8 sm:p-12 font-serif overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-black/60 hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!showInquiryForm ? (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT: Image Gallery Frame */}
            <div className="lg:w-1/2 space-y-4">
              <div className="aspect-square bg-white border border-black/10 p-6 relative overflow-hidden flex items-center justify-center">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 border border-black/10 text-[9px] uppercase tracking-[0.2em] font-sans px-3 py-1 text-black">
                  {product.sku}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 border overflow-hidden transition-all ${
                        currentImage === img ? 'border-black ring-1 ring-black' : 'border-black/10 opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Specification Details */}
            <div className="lg:w-1/2 flex flex-col justify-between text-left space-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50 mb-2">
                  {product.collection} Series • {product.category}
                </div>

                <h2 className="text-3xl sm:text-4xl font-light italic text-[#1a1a1a] mb-2">
                  {product.title}
                </h2>

                <p className="text-xs font-sans uppercase tracking-widest text-[#a68d71] mb-6">
                  {product.subtitleTagline || 'DETAILS HIDDEN. EXCELLENCE REVEALED.'}
                </p>

                <div className="font-serif text-3xl font-light italic text-[#1a1a1a] mb-6">
                  {formatPrice(product.price, product.currency)}
                </div>

                <p className="text-sm italic leading-relaxed text-black/80 font-serif border-t border-b border-black/10 py-4 mb-6">
                  "{product.description}"
                </p>

                {/* Specs List */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] uppercase tracking-widest font-sans opacity-50 font-semibold mb-2">
                    Artifact Specifications
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans">
                    <div className="text-black/50">Metal Alloy:</div>
                    <div className="text-black font-medium">{product.metal}</div>

                    <div className="text-black/50">Primary Gemstone:</div>
                    <div className="text-black font-medium">{product.gemstone}</div>

                    {product.caratWeight && (
                      <>
                        <div className="text-black/50">Carat Weight:</div>
                        <div className="text-black font-medium">{product.caratWeight}</div>
                      </>
                    )}

                    {product.cutStyle && (
                      <>
                        <div className="text-black/50">Cut & Shape:</div>
                        <div className="text-black font-medium">{product.cutStyle}</div>
                      </>
                    )}

                    {product.certificate && (
                      <>
                        <div className="text-black/50">Gem Certificate:</div>
                        <div className="text-black font-medium">{product.certificate}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-black/10 flex gap-4">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full h-12 bg-[#1a1a1a] text-white text-[11px] uppercase tracking-[0.25em] font-sans hover:bg-black transition-colors font-semibold shadow-md"
                >
                  Request Private Viewing / Inquiry
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* PRIVATE INQUIRY FORM */
          <div className="max-w-xl mx-auto py-6">
            {!submitted ? (
              <form onSubmit={handleSendInquiry} className="space-y-6 text-left">
                <header className="border-b border-black/10 pb-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-50 mb-1">
                    Atelier Concierge
                  </div>
                  <h3 className="text-3xl font-serif font-light italic text-[#1a1a1a]">
                    Private Client Request
                  </h3>
                  <p className="text-xs font-sans text-black/60 mt-1">
                    Request a confidential viewing or custom alteration for <span className="font-semibold text-black">{product.title}</span>.
                  </p>
                </header>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans">Full Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Lord / Lady / Mr. / Ms."
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans">Email Address</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@domain.com"
                      className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans">Direct Telephone</label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-1 font-sans">Viewing Location / Specific Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    placeholder="Mayfair Atelier, New York Salon, or Private Residence..."
                    className="w-full border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-black text-sm font-serif italic resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="w-1/3 h-12 border border-black/20 text-black text-[10px] uppercase tracking-widest font-sans hover:bg-black/5"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-12 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.25em] font-sans hover:bg-black font-semibold"
                  >
                    Transmit Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-black mx-auto" />
                <h3 className="text-2xl font-serif italic text-[#1a1a1a]">Request Transmitted</h3>
                <p className="text-xs font-sans uppercase tracking-widest text-black/60">
                  The House of Parlay Concierge will contact you within two hours.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
