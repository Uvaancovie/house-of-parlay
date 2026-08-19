export type Category = 
  | 'Rings'
  | 'Necklaces'
  | 'Bracelets'
  | 'Earrings'
  | 'Timepieces'
  | 'Cufflinks'
  | 'High Jewellery'
  | 'Bespoke';

export type Collection = 
  | 'Colours of Love'
  | 'Details Hidden'
  | 'Generations'
  | 'Ambition'
  | 'Vault & Bespoke'
  | 'Signature Classics';

export type MetalType = 
  | '18K Yellow Gold'
  | '18K White Gold'
  | '18K Rose Gold'
  | 'Platinum 950'
  | 'Brushed 18K Yellow Gold'
  | 'Two-Tone Gold';

export type ProductStatus = 
  | 'Catalog Active'
  | 'Vault Only'
  | 'Made to Order'
  | 'Coming Soon'
  | 'Archived';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  subtitleTagline: string;
  sku: string;
  category: Category;
  collection: Collection;
  price: number;
  currency: 'ZAR' | 'USD' | 'GBP' | 'EUR';
  status: ProductStatus;
  featured: boolean;
  primaryImage: string;
  galleryImages: string[];
  metal: MetalType;
  gemstone: string;
  caratWeight?: string;
  cutStyle?: string;
  clarity?: string;
  certificate?: string;
  description: string;
  specifications: ProductSpecification[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilterState {
  searchQuery: string;
  category: Category | 'All';
  collection: Collection | 'All';
  status: ProductStatus | 'All';
  minPrice?: number;
  maxPrice?: number;
  featuredOnly: boolean;
}
