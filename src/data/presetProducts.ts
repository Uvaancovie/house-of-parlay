import { Product } from '../types/product';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'hp-prod-001',
    title: 'The Unveiled Radiant Solitaire',
    subtitleTagline: 'DETAILS HIDDEN. EXCELLENCE REVEALED.',
    sku: 'HP-SOL-7701',
    category: 'Rings',
    collection: 'Details Hidden',
    price: 873000,
    currency: 'ZAR',
    status: 'Catalog Active',
    featured: true,
    primaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: '18K Yellow Gold',
    gemstone: 'Radiant Cut Diamond',
    caratWeight: '4.50 ct',
    cutStyle: 'Radiant Cut',
    clarity: 'Internally Flawless (IF)',
    certificate: 'GIA Certified #62241987',
    description: 'Set on hand-polished 18K solid gold, this 4.50-carat radiant cut diamond represents the pinnacle of House of Parlay craftsmanship. Designed with micro-claw prongs and a hidden pavilion basket.',
    specifications: [
      { label: 'Primary Stone', value: '4.50 ct Natural Diamond' },
      { label: 'Color / Clarity', value: 'E / Internally Flawless' },
      { label: 'Band Width', value: '2.1mm Tapered' },
      { label: 'Hallmark', value: 'HP Monogram Stamped' }
    ],
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-15T14:20:00.000Z'
  },
  {
    id: 'hp-prod-002',
    title: 'Colours of Love — Royal Sapphire Halo',
    subtitleTagline: 'THE COLOURS OF LOVE COLLECTION',
    sku: 'HP-COL-8802',
    category: 'Rings',
    collection: 'Colours of Love',
    price: 536400,
    currency: 'ZAR',
    status: 'Catalog Active',
    featured: true,
    primaryImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: '18K Yellow Gold',
    gemstone: 'Ceylon Oval Blue Sapphire',
    caratWeight: '3.80 ct Sapphire + 1.20 ct Diamonds',
    cutStyle: 'Oval Cut',
    clarity: 'VVS1',
    certificate: 'SSEF Gemstone Report #11804',
    description: 'Part of the signature Colours of Love range, featuring an unheated 3.80ct Royal Blue Ceylon Sapphire encompassed by a scintillating scallop of D-Flawless round brilliant diamonds.',
    specifications: [
      { label: 'Gemstone', value: '3.80 ct Ceylon Sapphire' },
      { label: 'Halo Accents', value: '18 Round Brilliant Diamonds' },
      { label: 'Setting', value: 'Bezel Scallop Basket' },
      { label: 'Origin', value: 'Sri Lanka (Ceylon)' }
    ],
    createdAt: '2026-08-02T11:30:00.000Z',
    updatedAt: '2026-08-10T09:15:00.000Z'
  },
  {
    id: 'hp-prod-003',
    title: 'Colours of Love — Emerald Sovereign Halo',
    subtitleTagline: 'VIVID GREEN UNFILTERED OPULENCE',
    sku: 'HP-COL-8803',
    category: 'Rings',
    collection: 'Colours of Love',
    price: 621000,
    currency: 'ZAR',
    status: 'Catalog Active',
    featured: false,
    primaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: '18K Yellow Gold',
    gemstone: 'Muzo Emerald',
    caratWeight: '2.90 ct Emerald + 0.95 ct Diamonds',
    cutStyle: 'Oval Cut',
    clarity: 'Minor Oil (Natural Origin)',
    certificate: 'Gubelin Gem Lab #20045',
    description: 'A glowing Muzo Colombian Emerald enveloped in double-tier diamond cluster detailing. The rich 18K yellow gold band amplifies the intense green hue.',
    specifications: [
      { label: 'Center Gem', value: '2.90 ct Muzo Emerald' },
      { label: 'Side Stones', value: 'F/VS Diamonds' },
      { label: 'Metal', value: '18K Satin Gold Finish' }
    ],
    createdAt: '2026-08-03T14:00:00.000Z',
    updatedAt: '2026-08-12T16:00:00.000Z'
  },
  {
    id: 'hp-prod-004',
    title: 'Ambition Oval Gold Signet',
    subtitleTagline: 'FOR THOSE WHO WEAR THEIR AMBITION.',
    sku: 'HP-AMB-1004',
    category: 'Cufflinks',
    collection: 'Ambition',
    price: 151200,
    currency: 'ZAR',
    status: 'Catalog Active',
    featured: true,
    primaryImage: 'https://images.unsplash.com/photo-1611591475281-8d2813298818?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1611591475281-8d2813298818?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: 'Brushed 18K Yellow Gold',
    gemstone: 'None / Pure Gold',
    description: 'Forged for leaders and modern pioneers. A substantial solid 18K yellow gold signet ring featuring hand-textured micro-stippling and subtle HP monogram emblem on the inner face.',
    specifications: [
      { label: 'Weight', value: '28.5 Grams Solid Gold' },
      { label: 'Face Dimensions', value: '16mm x 12mm Oval' },
      { label: 'Personalization', value: 'Custom Monogram Available' }
    ],
    createdAt: '2026-08-05T09:00:00.000Z',
    updatedAt: '2026-08-14T11:00:00.000Z'
  },
  {
    id: 'hp-prod-005',
    title: 'The Secret Pear Diamond Pendant',
    subtitleTagline: 'THE SECRET IS ALMOST OUT',
    sku: 'HP-SEC-5501',
    category: 'Necklaces',
    collection: 'Vault & Bespoke',
    price: 756000,
    currency: 'ZAR',
    status: 'Vault Only',
    featured: true,
    primaryImage: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: '18K Rose Gold',
    gemstone: 'Pear Cut Diamond',
    caratWeight: '3.10 ct',
    cutStyle: 'Pear Cut',
    clarity: 'VVS1',
    certificate: 'GIA Certified #7721094',
    description: 'An exclusive vault creation. Suspended from a delicate 18K Rose Gold chain, a 3.10-carat Pear Cut D-Color diamond catches every ray of light with ethereal warmth.',
    specifications: [
      { label: 'Diamond', value: '3.10 ct D Color / VVS1' },
      { label: 'Chain Length', value: '18 Inches adjustable to 16' },
      { label: 'Clasp', value: 'HP Monogram Lever Lock' }
    ],
    createdAt: '2026-08-08T15:20:00.000Z',
    updatedAt: '2026-08-16T18:00:00.000Z'
  },
  {
    id: 'hp-prod-006',
    title: 'Generations Emerald Cut Solitaire',
    subtitleTagline: 'TIMELESS BEAUTY. CRAFTED FOR GENERATIONS.',
    sku: 'HP-GEN-3301',
    category: 'Rings',
    collection: 'Generations',
    price: 1224000,
    currency: 'ZAR',
    status: 'Catalog Active',
    featured: true,
    primaryImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: 'Platinum 950',
    gemstone: 'Emerald Cut Diamond',
    caratWeight: '5.20 ct',
    cutStyle: 'Emerald Cut',
    clarity: 'Flawless (FL)',
    certificate: 'GIA Certified #1109482',
    description: 'An heirloom cut for legacy. 5.20 carats of immaculate hall-of-mirrors clarity set between dual tapered baguette diamonds in solid Platinum 950.',
    specifications: [
      { label: 'Center Stone', value: '5.20 ct Emerald Cut' },
      { label: 'Side Baguettes', value: '0.80 ct Total Weight' },
      { label: 'Setting', value: 'Platinum 4-Prong Basket' }
    ],
    createdAt: '2026-08-09T08:10:00.000Z',
    updatedAt: '2026-08-17T12:00:00.000Z'
  },
  {
    id: 'hp-prod-007',
    title: 'Parlay 12mm Solid Gold Cuban Chain',
    subtitleTagline: 'PURE POWER & UNAPOLOGETIC LUXURY',
    sku: 'HP-CHN-9901',
    category: 'Bracelets',
    collection: 'Signature Classics',
    price: 351000,
    currency: 'ZAR',
    status: 'Catalog Active',
    featured: false,
    primaryImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: '18K Yellow Gold',
    gemstone: 'None / Pure Gold',
    description: 'Hand-assembled Miami Cuban link chain in solid 18K Yellow Gold. Each link is hand-beveled and mirror-finished to rest flush against the collar.',
    specifications: [
      { label: 'Width', value: '12.0 mm' },
      { label: 'Gram Weight', value: '142.0 Grams' },
      { label: 'Clasp Mechanism', value: 'Double Security Box Lock' }
    ],
    createdAt: '2026-08-10T11:45:00.000Z',
    updatedAt: '2026-08-18T10:00:00.000Z'
  },
  {
    id: 'hp-prod-008',
    title: 'The Heritage Executive Chronometer',
    subtitleTagline: 'PLAY IN A CLASS OF YOUR OWN.',
    sku: 'HP-WTC-0012',
    category: 'Timepieces',
    collection: 'Ambition',
    price: 561600,
    currency: 'ZAR',
    status: 'Made to Order',
    featured: true,
    primaryImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200'
    ],
    metal: '18K Yellow Gold',
    gemstone: 'Sapphire Crystal + Diamond Markers',
    description: 'A masterpiece of horology featuring an ultra-thin automatic movement encased in 18K solid yellow gold with hand-stitched alligator strap and custom gold HP buckle.',
    specifications: [
      { label: 'Case Diameter', value: '39.0 mm' },
      { label: 'Calibre', value: 'Automatic HP-801 Calibre' },
      { label: 'Power Reserve', value: '72 Hours' },
      { label: 'Strap', value: 'Genuine Alligator Leather' }
    ],
    createdAt: '2026-08-12T16:00:00.000Z',
    updatedAt: '2026-08-18T14:00:00.000Z'
  }
];
